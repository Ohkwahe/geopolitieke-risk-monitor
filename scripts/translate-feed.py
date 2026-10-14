#!/usr/bin/env python3
"""Risk Monitor 3.0.0: translate PUBLIC RSS headlines/summaries to Dutch with local Argos.

Only source English text is translated; original and rule-based scores remain untouched.
Failure to load model leaves the feed available in English and prints GitHub warning.
"""
from __future__ import annotations

import hashlib
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

FEED_FILE = Path(os.environ.get("RISK_MONITOR_FEED", "data/auto-news.json"))
MAX_PER_RUN = 70
ENGINE = "Argos Translate en→nl"


def fingerprint(title: str, summary: str) -> str:
    return hashlib.sha256((title + "\0" + summary).encode("utf-8")).hexdigest()[:24]


def get_argos_engine():
    """Install only the en→nl model, reusing cached packages across runner jobs."""
    model_dir = os.environ.get("ARGOS_PACKAGES_DIR")
    if model_dir:
        Path(model_dir).mkdir(parents=True, exist_ok=True)
    from argostranslate import package, translate

    pairs = {(p.from_code, p.to_code) for p in package.get_installed_packages() if p.type == "translate"}
    if ("en", "nl") in pairs:
        print("Argos en→nl: geïnstalleerd taalmodel hergebruikt (cache beschikbaar)")
    else:
        print("Argos en→nl: taalmodel ontbreekt; ophalen en installeren")
        package.update_package_index()
        matches = [p for p in package.get_available_packages() if p.from_code == "en" and p.to_code == "nl" and p.type == "translate"]
        if not matches:
            raise RuntimeError("Geen Argos en→nl-taalpakket gevonden")
        package.install_from_path(matches[0].download())
    return lambda value: translate.translate(value, "en", "nl")


def process(doc: dict, engine=None, limit: int = MAX_PER_RUN):
    signals = doc.get("signals", [])
    if not isinstance(signals, list):
        raise ValueError("signals is geen lijst")
    # Newest entries first, with already completed translations retained.
    pending = []
    for item in signals:
        if not isinstance(item, dict):
            continue
        title = item.get("title") or ""
        summary = item.get("summary") or ""
        if not isinstance(title, str) or not isinstance(summary, str) or not title.strip():
            continue
        checksum = fingerprint(title, summary)
        existing = item.get("translation")
        if (isinstance(existing, dict) and existing.get("status") == "translated"
                and existing.get("sourceHash") == checksum
                and isinstance(existing.get("title"), str) and existing.get("title", "").strip()):
            continue
        # Prevent showing outdated Dutch translations when English text changes and
        # the replacement translation is temporarily unavailable.
        if existing:
            item.pop("translation", None)
        pending.append((item, checksum))

    result = {"engine": ENGINE, "language": "nl", "translatedThisRun": 0,
              "pending": len(pending), "failedThisRun": 0, "status": "up_to_date"}
    if not pending:
        doc["translation"] = result
        return doc, result

    if engine is None:
        try:
            engine = get_argos_engine()
        except Exception as error:
            result["status"] = "model_unavailable"
            result["error"] = str(error)[:170]
            doc["translation"] = result
            return doc, result

    for item, checksum in pending[:limit]:
        try:
            original_title, original_summary = item["title"], item.get("summary", "")
            translated_title = engine(original_title).strip()
            translated_summary = engine(original_summary).strip() if original_summary.strip() else ""
            if not translated_title or (original_summary.strip() and not translated_summary):
                raise ValueError("Vertaalresultaat is leeg")
            item["translation"] = {
                "status": "translated", "engine": "argos", "language": "nl",
                "sourceHash": checksum, "title": translated_title,
                "summary": translated_summary, "at": datetime.now(timezone.utc).isoformat()
            }
            result["translatedThisRun"] += 1
        except Exception as error:
            # Do not overwrite an old translation: the UI only shows results for an exact hash.
            result["failedThisRun"] += 1
            print(f"::warning::Vertaling niet beschikbaar voor {item.get('id', '')}: {error}", file=sys.stderr)

    result["pending"] = max(0, len(pending) - result["translatedThisRun"])
    result["status"] = ("ok" if result["pending"] == 0 and result["failedThisRun"] == 0
                        else "partial" if result["translatedThisRun"] else "translation_failed")
    doc["translation"] = result
    history = doc.get("history", [])
    if isinstance(history, list) and history:
        history[-1]["translated"] = result["translatedThisRun"]
        history[-1]["translationPending"] = result["pending"]
    return doc, result


def main():
    doc = json.loads(FEED_FILE.read_text(encoding="utf-8"))
    if doc.get("type") != "automated_headline_feed":
        raise ValueError("Geen ondersteunde Risk Monitor feed")
    doc, status = process(doc)
    doc["schemaVersion"] = "3.0.0"
    FEED_FILE.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Risk Monitor 3.0.0 vertaling:", json.dumps(status, ensure_ascii=False))
    if status["status"] in ("model_unavailable", "translation_failed"):
        print("::warning::Vertaling tijdelijk niet beschikbaar. Originele berichten blijven leesbaar.")


if __name__ == "__main__":
    main()

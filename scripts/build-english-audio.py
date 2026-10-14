"""Generate small English MP3 news briefings for a static GitHub Pages site.

No paid API. Assumes eSpeak NG and FFmpeg are installed (see workflow).
Headlines are a source-based selection and are NOT independently verified.
"""
from __future__ import annotations

import html
import json
import re
import shutil
import subprocess
import tempfile
from datetime import datetime
from pathlib import Path

FEED = Path('data/auto-news.json')
OUT = Path('data/audio')


def clean(raw: object, max_len=220) -> str:
    s = html.unescape(str(raw or ''))
    s = re.sub(r'<[^>]*>', ' ', s)
    s = re.sub(r'!?\[([^\]]+)\]\([^)]*\)', r'\1', s)
    s = re.sub(r'[`*_]+', '', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s[:max_len].rstrip(' ,;:-')


def rank_latest(items: list, limit=6) -> list:
    def when(x):
        try:
            return datetime.fromisoformat(str(x.get('date', '')).replace('Z', '+00:00')).timestamp()
        except (ValueError, TypeError):
            return 0
    return sorted(items, key=when, reverse=True)[:limit]


def categories(signals: list) -> dict[str, list]:
    valid = [x for x in signals if x.get('title') and not x.get('duplicateOf')]
    important = [x for x in valid if x.get('topic') != 'trump' and x.get('category') in ('important', 'review')]
    trump = [x for x in valid if x.get('topic') == 'trump']
    below = [x for x in valid if x.get('category') == 'below' or
             (x.get('topic') == 'trump' and x.get('category') != 'important')]
    return {'important': rank_latest(important), 'trump': rank_latest(trump), 'below': rank_latest(below)}


def lines_for_section(name: str, items: list, period: str) -> str:
    section = {'briefing': 'Daily briefing', 'important': 'Important headlines', 'trump': 'United States and Donald Trump', 'below': 'Below alert threshold'}[name]
    intro = (f'Risk Monitor. {section}. {period}. '
             'These are unverified news headlines, not official safety warnings. ')
    if not items:
        return intro + 'There are no current articles in this section.'
    chunks = [intro]
    for i, item in enumerate(items[:6], 1):
        title = clean(item.get('title'), 175)
        source = clean(item.get('source'), 65)
        summary = clean(item.get('summary'), 170)
        part = f'Headline {i}. {title}. '
        if summary and summary.lower() not in title.lower():
            part += summary + '. '
        if source:
            part += f'Source: {source}. '
        chunks.append(part)
    chunks.append('For details, check the original sources in the Risk Monitor app.')
    return '\n'.join(chunks)


def synthesize(text: str, output: Path, espeak=None) -> None:
    """Write WAV first, then transcoded MP3. Inputs passed as files, never shell arguments."""
    espeak = espeak or shutil.which('espeak-ng') or shutil.which('espeak')
    if not espeak or not shutil.which('ffmpeg'):
        raise RuntimeError('eSpeak NG and FFmpeg are required to create MP3 audio.')
    with tempfile.TemporaryDirectory(prefix='risk-audio-') as td:
        td = Path(td)
        text_file = td / 'script.txt'
        wav_file = td / 'speech.wav'
        text_file.write_text(text, encoding='utf-8')
        subprocess.run([espeak, '-v', 'en-us', '-s', '158', '-p', '48', '-a', '160', '-f', str(text_file), '-w', str(wav_file)], check=True, timeout=120)
        subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', str(wav_file), '-ar', '22050', '-ac', '1', '-b:a', '56k', str(output)], check=True, timeout=120)
    if not output.exists() or output.stat().st_size < 1500:
        raise RuntimeError(f'Generated audio missing or too small: {output}')


def main():
    source = json.loads(FEED.read_text(encoding='utf-8'))
    items = categories(source.get('signals', []))
    now = source.get('generatedAt', '')
    period = 'Morning edition' if 'Ochtend' in source.get('briefing', {}).get('period', '') else 'Evening edition'
    selected = rank_latest(items['important'][:3] + items['trump'][:2] + items['below'][:1], 6)
    sections = {'briefing': selected, **items}
    OUT.mkdir(parents=True, exist_ok=True)
    for kind, articles in sections.items():
        destination = OUT / f'{kind}_en.mp3'
        synthesize(lines_for_section(kind, articles, period), destination)
        print(f'{kind}: {len(articles)} articles, {destination.stat().st_size} bytes')
    (OUT / 'manifest.json').write_text(json.dumps({'generatedAt': now, 'language': 'en',
            'engine': 'espeak-ng, offline GitHub Action', 'status': 'generated',
            'sections': {k: len(v) for k,v in sections.items()},
            'disclaimer': 'Headlines from RSS sources; no independent verification.'}, indent=2) + '\n', encoding='utf-8')

if __name__ == '__main__':
    main()

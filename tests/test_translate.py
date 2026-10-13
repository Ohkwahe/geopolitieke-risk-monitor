import importlib.util
import json
import tempfile
import unittest
from copy import deepcopy
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / 'scripts' / 'translate-feed.py'
spec = importlib.util.spec_from_file_location('risk_translate', SCRIPT)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)


def document():
    return {
        'type': 'automated_headline_feed',
        'schemaVersion': '1.2.0',
        'signals': [
            {'id': '1', 'title': 'Leaders discuss peace deal', 'summary': 'Talks continue in Brussels.',
             'score': {'military': 1, 'belgium': 1, 'novelty': 2, 'reliability': 2}},
            {'id': '2', 'title': 'Europe prepares a response', 'summary': 'The summit continues.', 'category': 'below'}
        ],
        'history': [{'at': '2026-10-13T08:10:00Z', 'added': 2}]
    }


class TranslateTests(unittest.TestCase):
    def test_translate_and_keep_original_and_scores(self):
        d = document()
        calls=[]
        def fake(t):
            calls.append(t)
            return 'NL: ' + t
        result, status = mod.process(d, fake)
        self.assertEqual(status['status'], 'ok')
        self.assertEqual(status['translatedThisRun'], 2)
        self.assertEqual(result['signals'][0]['title'], 'Leaders discuss peace deal')
        self.assertEqual(result['signals'][0]['translation']['title'], 'NL: Leaders discuss peace deal')
        self.assertEqual(result['signals'][0]['score']['military'], 1)
        self.assertEqual(len(calls), 4)
        # cache: unchanged messages must not be translated twice
        result, status = mod.process(result, fake)
        self.assertEqual(status['translatedThisRun'], 0)
        self.assertEqual(len(calls), 4)
        self.assertEqual(status['status'], 'up_to_date')

    def test_changed_text_invalidates_cache(self):
        d, _ = mod.process(document(), lambda s: 'NL '+s)
        d['signals'][0]['title']='New development in Ukraine'
        d, status = mod.process(d, lambda s: 'FRISSER '+s)
        self.assertEqual(status['translatedThisRun'], 1)
        self.assertEqual(d['signals'][0]['translation']['title'], 'FRISSER New development in Ukraine')

    def test_changed_source_fails_safe_if_model_down(self):
        d, _ = mod.process(document(), lambda s:'NL '+s)
        d['signals'][0]['title'] = 'New facts emerge'
        d, status = mod.process(d, lambda s: (_ for _ in ()).throw(Exception('offline')))
        self.assertNotIn('translation', d['signals'][0])
        self.assertEqual(status['failedThisRun'], 1)
        self.assertEqual(d['signals'][0]['title'], 'New facts emerge')

    def test_batch_limit_and_failure_fallback(self):
        d=document()
        d, status=mod.process(d, lambda s:'NL '+s, limit=1)
        self.assertEqual(status['pending'], 1)
        self.assertEqual(status['status'], 'partial')
        d, status=mod.process(d, lambda s: (_ for _ in ()).throw(Exception('offline')))
        self.assertEqual(status['status'], 'translation_failed')
        self.assertEqual(d['signals'][0]['translation']['status'], 'translated')
        self.assertIsNone(d['signals'][1].get('translation'))

    def test_model_failure_preserves_news(self):
        d=document()
        original=deepcopy(d['signals'])
        get_orig=mod.get_argos_engine
        try:
            mod.get_argos_engine=lambda: (_ for _ in ()).throw(OSError('download niet beschikbaar'))
            d,status=mod.process(d)
            self.assertEqual(status['status'],'model_unavailable')
            self.assertEqual(d['signals'],original)
        finally:
            mod.get_argos_engine=get_orig

if __name__ == '__main__':
    unittest.main()

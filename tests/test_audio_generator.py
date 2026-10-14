"""Checks English audio selections without relying on the system voice engine."""
import importlib.util
import unittest
from pathlib import Path

path=Path(__file__).resolve().parent.parent/'scripts/build-english-audio.py'
spec=importlib.util.spec_from_file_location('audio_gen', path)
module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)

class EnglishAudioGeneratorTests(unittest.TestCase):
    def test_english_headlines_and_no_translation(self):
        x={'title':'Original English headline','summary':'Original English summary','source':'BBC News','topic':'trump','category':'below'}
        script=module.lines_for_section('trump',[x],'Evening edition')
        self.assertIn('Original English headline',script)
        self.assertIn('unverified',script)
    def test_categories(self):
        rows=[{'title':'T','topic':'trump','category':'below','date':'2026-10-14T18:00:00Z'},
              {'title':'B','topic':'conflict','category':'important','date':'2026-10-14T18:00:00Z'}]
        choices=module.categories(rows)
        self.assertEqual(len(choices['important']),1)
        self.assertEqual(len(choices['trump']),1)
        self.assertEqual(len(choices['below']),1)
    def test_sanitize_markup(self):
        self.assertEqual(module.clean('<b>Talk</b> &amp; <i>trade</i>'),'Talk & trade')

if __name__=='__main__':unittest.main()

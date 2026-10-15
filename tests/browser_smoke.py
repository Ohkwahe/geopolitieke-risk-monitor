"""Run the maintained v3.0.4 mobile/browser regression suite."""
from pathlib import Path
import runpy
runpy.run_path(str(Path(__file__).with_name('browser_check_v304.py')),run_name='__main__')

import pyautogui
import time
import schedule
import subprocess
from datetime import datetime

# Configuration
WORK_HOURS_START = 9  # 9 AM
WORK_HOURS_END = 17   # 5 PM
ACTIVITY_INTERVAL = 300  # 5 minutes (in seconds)

def jiggle_mouse():
    """Move mouse slightly to simulate activity"""
    try:
        x, y = pyautogui.position()
        pyautogui.moveTo(x + 10, y + 10, duration=0.2)
        pyautogui.moveTo(x - 10, y - 10, duration=0.2)
        pyautogui.moveTo(x, y, duration=0.2)
    except:
        pass

def random_key_press():
    """Simulate occasional keyboard activity"""
    pyautogui.press('shift')

def open_teams():
    subprocess.Popen(['C:\\Users\\Username\\AppData\\Local\\Microsoft\\Teams\\Update.exe'])

def open_spreadsheet():
    subprocess.Popen(['excel', 'C:\\path\\to\\your\\spreadsheet.xlsx'])

def work_simulation():
    current_hour = datetime.now().hour
    if WORK_HOURS_START <= current_hour < WORK_HOURS_END:
        jiggle_mouse()
        random_key_press()

def main():
    # Initial setup
    open_teams()
    open_spreadsheet()
    
    # Schedule periodic activities
    schedule.every(5).minutes.do(work_simulation)
    schedule.every(30).minutes.do(open_teams)
    schedule.every(2).hours.do(open_spreadsheet)

    # Main loop
    while True:
        current_time = datetime.now()
        if current_time.hour >= WORK_HOURS_END:
            break
        schedule.run_pending()
        time.sleep(1)

if __name__ == "__main__":
    pyautogui.FAILSAFE = False  # Disable failsafe
    main()

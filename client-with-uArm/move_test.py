#!/usr/bin/env python3

import time
from uarm.wrapper import SwiftAPI

swift = SwiftAPI(filters={'hwid': 'USB VID:PID=2341:0042'})

swift.waiting_ready(timeout=3)

device_info = swift.get_device_info()
print(device_info)
firmware_version = device_info['firmware_version']
if firmware_version and not firmware_version.startswith(('0.', '1.', '2.', '3.')):
    swift.set_speed_factor(0.0005)

swift.set_mode(0)

swift.reset(wait=True, speed=10000)
swift.set_position(x=200, speed=10000*20)
swift.set_position(y=100)
swift.set_position(z=100)
swift.flush_cmd(wait_stop=True)

swift.set_polar(stretch=200, speed=10000*20)
swift.set_polar(rotation=90)
swift.set_polar(height=150)
print(swift.set_polar(stretch=200, rotation=90, height=150, wait=True))

swift.flush_cmd()

# time.sleep(1)
# print('mv 1')
# swift.set_position(x=0, y=0, z=0, speed=10000*20)
# swift.flush_cmd(wait_stop=True)

# time.sleep(1)
# print('mv 2')
# swift.set_position(x=100, y=100, z=50, speed=10000*20)
# swift.flush_cmd(wait_stop=True)

# time.sleep(1)
# print('mv 3')
# swift.set_position(x=200, y=150, z=100, speed=10000*20)
# swift.flush_cmd(wait_stop=True)

# time.sleep(1)
# print('mv 4')
# swift.set_position(x=90, y=50, z=150, speed=10000*20)
# swift.flush_cmd(wait_stop=True)

# print('step 1')
# swift.set_polar(rotation=10, height=150, speed=1000*200)
# swift.flush_cmd(wait_stop=True)

# print('step 2')
# swift.set_polar(rotation=60, height=0, speed=1000*200)
# swift.flush_cmd(wait_stop=True)

# print('step 3')
# swift.set_polar(rotation=90, height=150, speed=1000*200)
# swift.flush_cmd(wait_stop=True)

# print('step 4')
# swift.set_polar(rotation=120, height=50, speed=1000*200)
# swift.flush_cmd(wait_stop=True)

# print('step 5')
# swift.set_polar(stretch=200, speed=1000*200)
# swift.set_polar(rotation=170, height=150)
# swift.flush_cmd(wait_stop=True)

print('-- move end')

time.sleep(10)

print('-- disconnect')

swift.disconnect()

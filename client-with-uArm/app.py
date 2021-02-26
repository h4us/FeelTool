#!/usr/bin/env python3

import sys
# import time

import asyncio
import socketio

from uarm.wrapper import SwiftAPI

sio = socketio.AsyncClient()
swift = SwiftAPI(filters={'hwid': 'USB VID:PID=2341:0042'})

swift.waiting_ready(timeout=5)

device_info = swift.get_device_info()
print(device_info)

# firmware_version = device_info['firmware_version']
# if firmware_version and not firmware_version.startswith(('0.', '1.', '2.', '3.')):
#     # swift.set_speed_factor(0.0005)

swift.set_speed_factor(100)
swift.set_mode(3)
swift.reset(wait=True, speed=10000)


@sio.event
async def connect():
  print('connected to server')


@sio.event
async def disconnect():
  print('disconnected from server')


@sio.event
def reply(angle, dx, dy):
  print(angle, dx, dy)
  # swift.set_position(
  #   x=dx,
  #   y=dy,
  #   relative=True,
  #   speed=1000*200
  # )
  # swift.set_position(y=max(dy + 100,0))
  # swift.set_position(z=100)
  swift.set_polar(rotation=angle, height=max(dy, 0), speed=1000*500)
  swift.flush_cmd(wait_stop=True)

async def start_server():
  print(sys.argv)
  url = 'http://localhost:8080'
  if len(sys.argv) > 1:
    url = sys.argv[1]
  print('Hello uArm, waiting socket.. (url -> {0})'.format(url))
  await sio.connect(url, socketio_path='/app/socket.io')
  await sio.wait()


if __name__ == '__main__':
  asyncio.run(start_server())
  swift.disconnect()

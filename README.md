# FeelTool

## Beta version (not a release) system diagram

![diagram alpha-1](./docs/alpha-1_diagram_bg_white.png)

### client

A standalone web application to detect face motion, for test.

### client-with-uArm

A Python application, uArm control command sever.

### server

A Node.js application, handling video streams,  detecting face motion (Those sources are included in "public" subdirectory), sending message to uArm control command server.

### electron-app

A Electron application, which converts face motion to uArm control command and operates it.
You can choose a video input from USB-connected (or integrated) webcam or local video files.

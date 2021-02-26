# FeelTool

## alpha version system diagram

![diagram alpha-1](./docs/alpha-1_diagram_bg_white.png)

### client

A standalone web application to detect face motion, for test.

### client-with-uArm

Python application, uArm control command sever.

### server

Node.js (In the future release, it may become Electron app) application, handling video streams,  detecting face motion (Those sources are included in "public" subdirectory), sending message to uArm control command sever
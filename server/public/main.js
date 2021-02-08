let capture;
let tracker;
let w = 640;
let h = 480;

// TODO:
// const socket = io('https://feel-tool.aws.h4us.jp/app/');
const socket = io('http://localhost:8080', {
  path: '/app/socket.io'
});

socket.on('connect', () => {
  console.info('connect', socket.id);
});

function setup() {
  capture = createCapture({
    audio: false,
    video: {
      width: w,
      height: h
    }
  });

  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();

  colorMode(HSB, 100);

  strokeWeight(20);

  textSize(24);
  fill(100, 0, 100);

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);
}

function draw() {
  push();
  translate(width, 0);
  scale(-1, 1);
  image(capture, 0, 0, w, h);
  let positions = tracker.getCurrentPosition();
  let angle;
  let dx;
  let dy;
  if(positions.length > 0) {
    stroke(100, 0, 100);
    line(positions[33][0], positions[33][1], positions[7][0], positions[7][1]);

    dx = positions[33][0] - positions[7][0];
    dy = positions[33][1] - positions[7][1];
    angle = atan2(dy, dx) + HALF_PI;
  }
  pop();

  noStroke();
  text("Degree: " + floor(degrees(angle)), 20, 40);
  text("Diff X: " + floor(dx), 20, 80);
  text("Diff Y: " + floor(dy), 20, 120);

  if (frameCount % 10 == 0 && (angle && dx && dy)) {
    socket.emit('tracking', angle, dx, dy);
  }
}

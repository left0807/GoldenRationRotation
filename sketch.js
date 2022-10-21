/* eslint-disable no-undef, no-unused-vars */
let fibs = [1, 1];
let scale = 1;
let minScale;
let maxScale;
const color = "#ffffff";
const fibLen = 10;
var r = 3;
let pos = 0;
let p = 0;
var phi;
var CANVAS_WIDTH;
var CANVAS_HEIGHT;
let clockwise;
let easing = 0.1;

function initfib() {
  for (let i = 0; i < 25; i++) {
    fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
  }
  phi = fibs[24] / fibs[23];
}
function mouseWheel(event) {
  //print(event.delta);
  pos -= event.delta;
}
function turnLeft() {
  pos += 180;
  pos -= pos % 180;
}
//function turnRight(){pos -= 90}

function setup() {
  CANVAS_HEIGHT = windowHeight * 0.9;
  CANVAS_WIDTH = windowWidth * 0.9;
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  angleMode(DEGREES);
  initfib();

  minScale = fibs[fibLen - 5] / fibs[fibLen - 1];
  maxScale = fibs[fibLen - 1] / fibs[fibLen - 5];

  clockwise = createButton("Next");
  clockwise.position(CANVAS_WIDTH, CANVAS_HEIGHT);
  clockwise.mousePressed(turnLeft);
  //antiwise = createButton('Right')S
  //antiwise.position(0, CANVAS_HEIGHT)
  //antiwise.mousePressed(turnRight)
}

function draw() {
  var dp = pos - p;
  p += dp * easing;
  if(p!=0)
  {
  translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  rotate(-p);

  for (let i = 0; i < fibs.length; i++) {
    const scaledFib = fibs[i] * scale;
    fill(color);
    rect(0, 0, scaledFib, scaledFib);
    arc(scaledFib, 0, 2 * scaledFib, 2 * scaledFib, 90, 180);
    translate(scaledFib, scaledFib);
    rotate(-90);
  }

  if (scale <= minScale || scale >= maxScale) {
    fibs = [1, 1];
    initfib();
    scale = 1;
  } else {
    scale += ((dp * easing) / 360) * 4 * phi;
  }
  }
  //print(pos)
}

/* eslint-disable no-undef, no-unused-vars */
let fibs = [1, 1];
let scale = 1;
let minScale;
let maxScale;
const color = "#ffffff";
const fibLen = 20;
var r = 3;
let pos = 0.3;
let p = 0;
var phi;
var CANVAS_WIDTH;
var CANVAS_HEIGHT;
let clockwise;
let easing = 0.3;
var cnv;
var textscale = 1;

var Blog = {
  title : "Robot team is rubbish",
  text : "Tkt is lolocon, very bad, He need to be caught by fbi"
};

function initfib() {
  var acc = 0;
  for (let i = 0; i < fibLen; i++) {
    fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
  }
  phi = fibs[fibLen-1] / fibs[fibLen-2];
}
function mouseWheel(event) {
  //print(event.delta);
  pos -= event.delta;
}
function turnLeft() {
  pos += 360;
  pos -= pos % 360;
}
function turnRight(){
  pos -= 180;
  pos -= pos%180;
}

function centerCanvas()
{
  var x = (windowWidth - CANVAS_WIDTH)/2
  var y = (windowHeight - CANVAS_HEIGHT)/2
  cnv.position(x, y)
}

function setup() {
  frameRate(30)
  CANVAS_HEIGHT = windowHeight * 0.9;
  CANVAS_WIDTH = windowWidth * 0.9;

  cnv = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  cnv.style('display', 'block');
  centerCanvas()

  angleMode(DEGREES);
  initfib();

  minScale = fibs[fibLen - 5] / fibs[fibLen - 1];
  maxScale = fibs[fibLen - 1] / fibs[fibLen - 5];
}

function windowResized() {
  CANVAS_HEIGHT = windowHeight * 0.9;
  CANVAS_WIDTH = windowWidth * 0.9;

  cnv = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);  
  centerCanvas();
}

function draw() {
  var dp = pos - p;
  p += dp * easing;
  if(dp!=0)
  {
  translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  //canvas.position(0, 0)
  rotate(-p);

  for (let i = 0; i < fibs.length; i++) {
    const scaledFib = fibs[i] * scale;
    fill(scaledFib*0.5);
    stroke(255 - scaledFib)
    rect(0, 0, scaledFib, scaledFib);
    fill(255)
    text(i, 0, 0);
    
    arc(scaledFib, 0, 2 * scaledFib, 2 * scaledFib, 90, 180);

    translate(scaledFib, 0);


    //rotate(-90);
    
    fill(255 -scaledFib)
    for(let j = 1; j <= 10; j++){
      line(-scaledFib, 0, -scaledFib+20, 0)
      //translate(0, scaledFib/10);
      rotate(-9);
    }
    translate(-scaledFib, 0);

  }

  if (scale <= minScale || scale >= maxScale) {
    fibs = [1, 1];
    initfib();
    scale = 1;
  } else {
    scale = phi ** (p%360/90)
    scale += (dp * easing)/90 * phi;
  }
  }
  //print(pos)
  
}

// Create connection to Node.JS Server
const socket = io();

let bSize = 30; // brush size
let canvas;
let drawIsOn = false;
let colorR;
let colorG;
let colorB;

function setup() {
  canvas = createCanvas(500, 500);

  colorR = random(0, 255);
  colorG = random(0, 255);
  colorB = random(0, 255);

  //set styling for the sketch
  background(0, 70);
  noStroke();
}

function draw() {

  if (drawIsOn) {
    fill(colorR, colorG, colorB);
    circle(mouseX, mouseY, bSize);
  }

}

//we only want to draw if the click is on the canvas not on our GUI
function mousePressed() {
  drawIsOn = true;
}

function mouseReleased() {
  drawIsOn = false;
}

function mouseDragged() { // Function to save the event "drawing" inside a POJO
  socket.emit("drawing", { // POJO syntaxis
    xpos: mouseX,
    ypos: mouseY,
    userS: bSize,
    colR: colorR,
    colG: colorG,
    colB: colorB
  });
}

function drawStuff(data) {
  fill(data.colR, data.colG, data.colB);
  circle(data.xpos, data.ypos, data.userS);
};

////IMPLEMENT MULTI-USER DRAWING////



////IMPLEMENT MULTI-USER DRAWING////


//Events we are listening for

socket.on("drawing", (data) => {
  drawStuff(data);
});

// Connect to Node.JS Server
socket.on("connect", () => {
  console.log(socket.id);
});

// Callback function on the event we disconnect
socket.on("disconnect", () => {
  console.log(socket.id);
});

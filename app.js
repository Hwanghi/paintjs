const canvas = document.getElementById("jsCanvas"),
  colors = document.getElementById("jsColors"),
  brush = document.getElementById("jsRange");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = '#2c2c2c';


canvas.width = document.getElementById("jsCanvas").offsetWidth;
canvas.height = document.getElementById("jsCanvas").offsetHeight;


let painting = false;

// Colleciton of drawn lines.
const lines = [];
let originX = 0, originY = 0;
let newX = 0, newY = 0;

function startPainting(event){
  painting = true;
  originX = event.offsetX;
  originY = event.offsetY;
}

function stopPainting(event) {
  painting = false;
  if (event.type === "mouseup") {
    newX = event.offsetX;
    newY = event.offsetY;
    lines.push( [[originX, originY], [newX, newY]] );
  }
}

function onMouseMove (event){
  newX = event.offsetX;
  newY = event.offsetY;
  if(painting) { 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /** TO DO
     * this code is very slow.
     * so I will correct this redering lines part to low data and fast speed  
     */
    for (line of lines) {
      drawLine(line[0][0], line[0][1], line[1][0], line[1][1]);
    }
    drawLine(originX, originY, newX, newY);
  }
}

function drawLine( fromX, fromY, toX, toY ) {
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
}

function changeColor(event) {
  ctx.strokeStyle = event.path[0].style["background-color"];
}

function changeBrush(size) {
  ctx.lineWidth = size;
}


if(canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  colors.addEventListener("click", changeColor);
}
var canvas,ctx;
var xmax=500, ymax=500;
var startflag=0, score=0;
var i=0;
var turnkey;
var x,y;
var xy="";

// Define the canvas and context
function init() {
 canvas=document.getElementById("tron");
 ctx=canvas.getContext("2d");
 //drawTronFrame();
 //printStartMsg();
 setInterval(clickblink,100);
}

function drawTronFrame() {
// Drawing a rectangular enclosure for tron
 ctx.beginPath();
 ctx.fillStyle="black";
 ctx.rect(0,0,xmax,ymax);
 ctx.stroke();
 ctx.fill();
}

function printStartMsg() {
 if((startflag==0) && (score==0)) {
  ctx.fillStyle="white";
  ctx.font="20px Georgia";
  ctx.fillText("Click on some point to start",120,240);
 }
}

function clickblink() {
 if((startflag==0) && (score==0)) { 
  drawTronFrame();
  printStartMsg(); 
  ctx.beginPath();
  ctx.strokeStyle="white";
  ctx.arc(125,235,30+(i*5),0,2*Math.PI);
  ctx.stroke();
  i++;
  ctx.arc(125,235,30+(i*5),0,2*Math.PI);
  ctx.stroke();
  if(i==5) i=0;

  var cursor=new Image(); 
  cursor.src="cursor.png";
  if(i%4==0) {
   ctx.beginPath();
   ctx.drawImage(cursor,125,250,20,25); 
  }
 }
}


function moveUp() {
 ctx.beginPath();
 ctx.strokeStyle="white";
 ctx.moveTo(x,y);
 y--;
 e2="_"+x+" "+y+"_";
 e1=new RegExp(e2,"g");
 if((x<=0) || (x>=500) || (y<=0) || (y>=500)) {
  alert("Game Over!");
  clearInterval(turnkey);
 }
 else if(e1.test(xy)==0) {
  xy+=e2; 
  ctx.lineTo(x,y);
  ctx.stroke();
 }
 else {
  alert("Game Over!");
  clearInterval(turnkey);
 }
}
function moveLeft() {
 ctx.beginPath();
 ctx.strokeStyle="white";
 ctx.moveTo(x,y);
 x--;
 e2="_"+x+" "+y+"_";
 e1=new RegExp(e2,"g");
 if((x<=0) || (x>=500) || (y<=0) || (y>=500)) {
  alert("Game Over!");
  clearInterval(turnkey);
 }
 else if(e1.test(xy)==0) { 
  xy+=e2; 
  ctx.lineTo(x,y);
  ctx.stroke();
 }
 else {
  alert("Game Over!");
  clearInterval(turnkey);
 }
}
function moveDown() {
 ctx.beginPath();
 ctx.strokeStyle="white";
 ctx.moveTo(x,y);
 y++;
 e2="_"+x+" "+y+"_";
 e1=new RegExp(e2,"g");
 if((x<=0) || (x>=500) || (y<=0) || (y>=500)) {
  alert("Game Over!");
  clearInterval(turnkey);
 }
 else if(e1.test(xy)==0) { 
  xy+=e2; 
  ctx.lineTo(x,y);
  ctx.stroke();
 }
 else {
  alert("Game Over!");
  clearInterval(turnkey);
 }
}
function moveRight() {
 ctx.beginPath();
 ctx.strokeStyle="white";
 ctx.moveTo(x,y);
 x++;
 e2="_"+x+" "+y+"_";
 e1=new RegExp(e2,"g");
 if((x<=0) || (x>=500) || (y<=0) || (y>=500)) {
  alert("Game Over!");
  clearInterval(turnkey);
 }
 else if(e1.test(xy)==0) { 
  xy+=e2; 
  ctx.lineTo(x,y);
  ctx.stroke();
 }
 else {
  alert("Game Over!");
  clearInterval(turnkey);
 }
}

function start(e) {
 startflag=1;
 xy="";
 drawTronFrame();
 x=e.clientX;
 y=e.clientY;
 e="_"+x+" "+y+"_";
 ctx.beginPath();
 ctx.moveTo(x,y);
 if(x>=250) {
  if(y>=x) {
   turnkey=setInterval(moveUp,10);
  }
  else {
   turnkey=setInterval(moveLeft,10);
  }
 }
 else { //if(x<250) 
  if(y<x) {
   turnkey=setInterval(moveDown,10);
  }
  else {
   turnkey=setInterval(moveRight,10);
  }
 }
}

function turn(e) {
 clearInterval(turnkey);
 if(e.keyCode==37) turnkey=setInterval(moveLeft,0);
 else if(e.keyCode==38) turnkey=setInterval(moveUp,0);
 else if(e.keyCode==39) turnkey=setInterval(moveRight,0);
 else if(e.keyCode==40) turnkey=setInterval(moveDown,0);
}

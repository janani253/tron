var canvas,ctx;
var xmax=500, ymax=500;
var startflag=0, score=0;
var i=0;
var turnkey,turnkey1,turnkey2;
var x,y,x1,y1,x2,y2;
var xy="";
var numplayers;


// Ask for # players
function asknplayers() {
 document.getElementById('players_dialog').showModal();
}

function selnplayer() {
 if(document.getElementById("players1").checked==true) numplayers=1;
 else if(document.getElementById("players2").checked==true) numplayers=2;
 init();
}

// Define the canvas and context
function init() {
 canvas=document.getElementById("tron");
 ctx=canvas.getContext("2d");
 //drawTronFrame();
 //printStartMsg();
 clearInterval(turnkey);
 if(numplayers==1) {
  turnkey=setInterval(clickBlink,100);
  document.getElementById("instruction").innerHTML="Use the arrow keys to navigate.";
  document.getElementById("goal").innerHTML="Escape the walls and any trail left behind by your path.";
 }
 else if(numplayers==2) { 
  turnkey=setInterval(pressSpace,500);
  document.getElementById("instruction").innerHTML="Player 1: Use the arrow keys to navigate.<br />Player 2: Use keys Z(&#8592;),S(&#8593;),X(&#8595;),C(&#8594;) for navigation.";
  document.getElementById("goal").innerHTML="Escape the walls and any trail left behind by your or your opponent's path.";
 }
 
}

function drawTronFrame() {
// Drawing a rectangular enclosure for tron
 ctx.beginPath();
 ctx.fillStyle="black";
 ctx.rect(0,0,xmax,ymax);
 ctx.stroke();
 ctx.fill();
}

// Print start message for 1 player
function printClickStartMsg() {
 if(startflag==0) {
  ctx.fillStyle="white";
  ctx.font="100% Georgia";
  ctx.fillText("Click on some point to start",130,240);
 }
}

// Print start message for 2 players
function printSpaceStartMsg() {
 if(startflag==0) {
  ctx.fillStyle="white";
  ctx.font="100% Georgia";
  ctx.fillText("Press "+"  "+"  "+"  "+" Spacebar "+"  "+"  "+"  "+"  "+" to start",140,240);
 }
}

// 1 players click on a point to start
function clickBlink() {
 if(startflag==0) { 
  drawTronFrame();
  printClickStartMsg(); 
  ctx.beginPath();
  ctx.strokeStyle="white";
  ctx.arc(135,235,30+(i*5),0,2*Math.PI);
  ctx.stroke();
  i++;
  ctx.arc(135,235,30+(i*5),0,2*Math.PI);
  ctx.stroke();
  if(i>=5) i=0;

  var cursor=new Image(); 
  cursor.src="cursor.png";
  if(i%4==0) {
   ctx.beginPath();
   ctx.drawImage(cursor,135,250,20,25); 
  }
 }
}

// 2 players press spacebar to start
function pressSpace() {
 if((startflag==0) && (score==0)) { 
  drawTronFrame();
  printSpaceStartMsg(); 
  if(i%2==0) {
   ctx.beginPath();
   ctx.strokeStyle="white";
   ctx.rect(200,220,100,30);
   ctx.stroke();
  }
  i++;
 }
}


function moveUp(n) {
 if(n==1) { x=x1; y=y1; linecolor="cyan"; }
 else if(n==2) { x=x2; y=y2; linecolor="yellow"; }
 ctx.beginPath();
 ctx.strokeStyle=linecolor;
 ctx.moveTo(x,y);
 y--;
 e2="_"+x+" "+y+"_";
 e1=new RegExp(e2,"g");
 if((x<=0) || (x>=500) || (y<=0) || (y>=500)) {
  gameOver(n);
 }
 else if(e1.test(xy)==0) {
  xy+=e2; 
  ctx.lineTo(x,y);
  ctx.stroke();
 }
 else {
  gameOver(n);
 }
 if(n==1) { x1=x; y1=y; }
 else if(n==2) { x2=x; y2=y; }
}
function moveLeft(n) {
 if(n==1) { x=x1; y=y1; linecolor="cyan"; }
 else if(n==2) { x=x2; y=y2; linecolor="yellow"; }
 ctx.beginPath();
 ctx.strokeStyle=linecolor;
 ctx.moveTo(x,y);
 x--;
 e2="_"+x+" "+y+"_";
 e1=new RegExp(e2,"g");
 if((x<=0) || (x>=500) || (y<=0) || (y>=500)) {
  gameOver(n);
 }
 else if(e1.test(xy)==0) { 
  xy+=e2; 
  ctx.lineTo(x,y);
  ctx.stroke();
 }
 else {
  gameOver(n);
 }
 if(n==1) { x1=x; y1=y; }
 else if(n==2) { x2=x; y2=y; }
}
function moveDown(n) { 
 if(n==1) { x=x1; y=y1; linecolor="cyan"; }
 else if(n==2) { x=x2; y=y2; linecolor="yellow"; }
 ctx.beginPath();
 ctx.strokeStyle=linecolor;
 ctx.moveTo(x,y);
 y++;
 e2="_"+x+" "+y+"_";
 e1=new RegExp(e2,"g");
 if((x<=0) || (x>=500) || (y<=0) || (y>=500)) {
  gameOver(n);
 }
 else if(e1.test(xy)==0) { 
  xy+=e2; 
  ctx.lineTo(x,y);
  ctx.stroke();
 }
 else {
  gameOver(n);
 }
 if(n==1) { x1=x; y1=y; }
 else if(n==2) { x2=x; y2=y; }
}
function moveRight(n) {
 if(n==1) { x=x1; y=y1; linecolor="cyan"; }
 else if(n==2) { x=x2; y=y2; linecolor="yellow"; } 
 ctx.beginPath();
 ctx.strokeStyle=linecolor;
 ctx.moveTo(x,y);
 x++;
 e2="_"+x+" "+y+"_";
 e1=new RegExp(e2,"g");
 if((x<=0) || (x>=500) || (y<=0) || (y>=500)) {
  gameOver(n);
 }
 else if(e1.test(xy)==0) { 
  xy+=e2; 
  ctx.lineTo(x,y);
  ctx.stroke();
 }
 else {
  gameOver(n);
 }
 if(n==1) { x1=x; y1=y; }
 else if(n==2) { x2=x; y2=y; }
}

function start(e) {
 if(numplayers==1) start1(e);
}

function start1(e) {
 startflag=1;
 xy="";
 drawTronFrame();
 x1=e.clientX;
 y1=e.clientY;
 e="_"+x1+" "+y1+"_";
 ctx.beginPath();
 ctx.moveTo(x1,y1);
 if(x1>=250) {
  if(y1>=x1) {
   turnkey1=setInterval(function(){moveUp(1);},10);
  }
  else {
   turnkey1=setInterval(function(){moveLeft(1);},10);
  }
 }
 else { //if(x<250) 
  if(y1<x1) {
   turnkey1=setInterval(function(){moveDown(1);},10);
  }
  else {
   turnkey1=setInterval(function(){moveRight(1);},10);
  }
 }
}

function start2() {
 x1=10; y1=10;
 x2=490; y2=490;
 turnkey1=setInterval(function(){moveDown(1);},10);
 turnkey2=setInterval(function(){moveUp(2);},10);
}

function gameOver(n) {
 alert("Game Over! \nPlayer "+n+" loses!");
 clearInterval(turnkey1);
 clearInterval(turnkey2);
 startflag=0;
}

function turn(e) {
// clearInterval(turnkey1);
// clearInterval(turnkey2);
 clearInterval(turnkey);
 if(numplayers==2) { 
  if((e.keyCode==32) || (e.charCode==32))
  {
   start2();
  }
  else if(e.keyCode==37) { clearInterval(turnkey1); turnkey1=setInterval(function(){moveLeft(1);},0); }
  else if(e.keyCode==38) { clearInterval(turnkey1); turnkey1=setInterval(function(){moveUp(1);},0); }
  else if(e.keyCode==39) { clearInterval(turnkey1); turnkey1=setInterval(function(){moveRight(1);},0); }
  else if(e.keyCode==40) { clearInterval(turnkey1); turnkey1=setInterval(function(){moveDown(1);},0); }
  else if((e.keyCode==90) || (e.charCode==90)) { clearInterval(turnkey2); turnkey2=setInterval(function(){moveLeft(2);},0); }
  else if((e.keyCode==83) || (e.charCode==83)) { clearInterval(turnkey2); turnkey2=setInterval(function(){moveUp(2);},0); }
  else if((e.keyCode==67) || (e.charCode==67)) { clearInterval(turnkey2); turnkey2=setInterval(function(){moveRight(2);},0); }
  else if((e.keyCode==120) || (e.charCode==120)) { clearInterval(turnkey2); turnkey2=setInterval(function(){moveDown(2);},0); }
 }
 else {
  if(e.keyCode==37) { clearInterval(turnkey1); turnkey1=setInterval(function(){moveLeft(1);},0); }
  else if(e.keyCode==38) { clearInterval(turnkey1); turnkey1=setInterval(function(){moveUp(1);},0); }
  else if(e.keyCode==39) { clearInterval(turnkey1); turnkey1=setInterval(function(){moveRight(1);},0); }
  else if(e.keyCode==40) { clearInterval(turnkey1); turnkey1=setInterval(function(){moveDown(1);},0); }
 }
}

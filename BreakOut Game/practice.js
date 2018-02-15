var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 30, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(350, 85, 50, 50);
ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
ctx.stroke();
//ctx.fillStyle = "#FF0000";
//ctx.fill();
ctx.closePath();

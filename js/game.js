// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
		function( callback ){
			return window.setTimeout(callback, 1000 / 60);
		};
})();

window.cancelRequestAnimFrame = ( function() {
	return  window.cancelAnimationFrame          ||
			window.webkitCancelRequestAnimationFrame ||
			window.mozCancelRequestAnimationFrame    ||
			window.oCancelRequestAnimationFrame      ||
			window.msCancelRequestAnimationFrame     ||
		clearTimeout;
} )();

//DO NOT TOUCH CODE ABOVE

//console.log('Holla');

//Step 01 .. vnq .. Create game cnavas and track mouse position
var gameCanvas = document.getElementById("canvas");         //Store HTML5 canvas tag into JS variable

var ctx = gameCanvas.getContext("2d");          //Creates context 2D

//Window Size Constants
var W = window.innerWidth;
var H = window.innerHeight;


var mouseObj = {};

gameCanvas.width = W;
gameCanvas.height = H;

function paintCanvas(){
    ctx.fillStyle = "#2c3e50";
    ctx.fillRect(0, 0, W, H);
    
    
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "50px sans-serif";
    ctx.fillText("Hello World!", 10, 50);
}

paintCanvas();


function trackPosition(evt){
    mouseObj.x = evt.pageX;
    mouseObj.y = evt.pageY;
    console.log("Cursor X is: " + mouseObj.x + "\nCursor Y is: " + mouseObj.y);
}

gameCanvas.addEventListener("mousemove", trackPosition, true);

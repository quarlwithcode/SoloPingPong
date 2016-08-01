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
// Do No Touch Above Code



// Step 01 ..vnq.. Create game canvas and track mouse position

var gameCanvas = document.getElementById("canvas");
// Store HTML5 canvas tag into JS variable

var ctx = gameCanvas.getContext("2d"); // Create context 2D
var W = window.innerWidth;
var H = window.innerHeight;

var mouseObj = {};

gameCanvas.width = W;
gameCanvas.height = H;


// Step 02 ..vnq.. Clear page canvas by covering it in black
function paintCanvas() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
}
paintCanvas();


function trackPosition(evt) {
    mouseObj.x = evt.pageX;
    mouseObj.y = evt.pageY;
    //console.log("Cursor x is: " + mouseObj.x + " Cursor y is: " + mouseObj.y);
}
gameCanvas.addEventListener("mousemove", trackPosition, true);


// Step 03 ..vnq.. Place a ball on the canvas
var ball = {}; // Ball Object
ball = {
    x: 50,
    y: 50,
    r: 15,
    c: "#ffffff",
    vx: 4,
    vy: 8,
    
    draw : function() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fill();
    }
}
ball.draw();

// Step 04 ..vnq.. Place a start button on the canvas
var startBtn = {}; //Start button object
startBtn = {
    w: 100,
    h: 50,
    x: W / 2 - 50,
    y: H / 2 - 25,
    
    draw: function() {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        
        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("Start", W / 2, H / 2);
    }
}
startBtn.draw();

// Step 04 ..vnq.. Place a start button on the canvas
var startInstruct = {}; //Start button object
startInstruct = {
    w: 100,
    h: 50,
    x: W / 2,
    y: H / 2 + 100,
    
    draw: function() {
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        
        ctx.font = "30px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("Instructions", this.x, this.y);
        ctx.textAlign = "left";
        ctx.font = "18px Arial, sans-serif";
        ctx.fillText("Use your mouse to move the paddles and hit the ball.", this.x-200, this.y+50);
        ctx.fillText("If the ball gets behind one of your paddles you lose.", this.x-200, this.y+75);
        ctx.fillText("Every 4 points the ball will speed and your paddles' heights will decrease.", this.x-200, this.y+100);
        ctx.fillText("Survive as long as you can and score as many points as you can!", this.x-200, this.y+125);
    }
}
startInstruct.draw();

// Step 05 ..vnq.. Place score and points on canvas
var points = 0; // Game Points
function paintScore() {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = "18px Arial, sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('Score: ' + points, W/2, 20);
}
paintScore();

// Step 06 ..vnq.. Place paddles (top and bottom) on canvas

function paddlePosition(TB){
    this.w = 5;
    this.h = 150;
    
    this.y = H/2 - this.h/2;
    
    if(TB == "top"){
        this.x = 0;
    } else {
        this.x = W - this.w;
    }
}

var paddlesArray = []; //Paddles Array

paddlesArray.push(new paddlePosition("top"));
paddlesArray.push(new paddlePosition("bottom"));
console.log("Top paddly y is: " + paddlesArray[0].y);
console.log("Bottom paddly y is: " + paddlesArray[1].y);


function paintPaddles(){
    for(var lp = 0; lp < paddlesArray.length; lp++){
        p = paddlesArray[lp];
        
        switch(lp){
            case 0:
                ctx.fillStyle = "#ff0000";
                break;
            case 1:
                ctx.fillStyle = "#0000ff";
                break;
            default:
                ctx.fillStyle = "#ffffff";
                break;
        }
        
        ctx.fillRect(p.x, p.y, p.w, p.h);
    }
}

paintPaddles();

// Step 07 ..vnq..  Detect when the user clicks on the screen

gameCanvas.addEventListener("mousedown", btnClick, true);

function btnClick(evt){
    var mx = evt.pageX;
    var my = evt.pageY;
    
    // User clicked on start button
    if(mx >= startBtn.x && mx <= startBtn.x + startBtn.w){
        if(my >= startBtn.y && my <= startBtn.y + startBtn.h){
           // console.log("jeez");  
            startBtn = {};
            startInstruct = {};
            animloop();
        }
    }
    
    if(flagGameOver == 1){
        // User clicked on restart button
        if(mx >= restartBtn.x && mx <= restartBtn.x + restartBtn.w){
            if(my >= restartBtn.y && my <= restartBtn.y + restartBtn.h){
                // reset game
                points = 0;
                ball.x = 20;
                ball.y = 20;
                ball.vx = 4;
                ball.vy = 8;
                
                flagGameOver = 0;
               
                animloop();
            }
        }
    }
}


//Function for running the whole game animation

var init;
function animloop(){
    //console.log("loop");
    init = requestAnimFrame(animloop);
    refreshCanvasFun();
}

//Step 08 ..vnq.. Draw everything on canvas recursively

function refreshCanvasFun(){
    paintCanvas();
    paintPaddles();
    ball.draw();
    paintScore();
    update();
}

function update(){
    //move the paddles, track the mouse
    for (var lp = 0; lp < paddlesArray.length; lp++){
        p = paddlesArray[lp];
        p.y = mouseObj.y - p.h / 2; 
    }
    //move the ball
    ball.x += ball.vx;
    ball.y += ball.vy;
    
    //check for balll paddle collision
    check4collision();
}

function check4collision(){
    var pTop = paddlesArray[0];
    var pBot = paddlesArray[1];
    
    if(collides(ball, pTop)){
        collideAction(ball, pTop);
    } else if(collides(ball, pBot)){
        collideAction(ball, pBot);
    } else {
//        Ball went off the top or bottom of screen
        if (ball.x - ball.r > W){
            // Game over
            gameOver();
        } else if(ball.x + ball.r < 0){
            //Game over
             gameOver();
        }
        
        //ball hits the side of the screen
        if (ball.y + ball.r > H){
            ball.vy = -ball.vy;
            ball.y = H - ball.r;
        } else if(ball.y - ball.r < 0){
            ball.vy = -ball.vy;
            ball.y = ball.r;
        }
    }
    
    //SPARKLES
    if(flagCollision == 1){
        for(var k = 0; k < particleCount; k++){
            particles.push(new createParticles(particlePos.x, particlePos.y, particleDir));
            randNum1 = Math.floor(Math.random()*(256-50+1)+50);
            randNum2 = Math.floor(Math.random()*(256-50+1)+50);
            randNum3 = Math.floor(Math.random()*(256-50+1)+50);
        }
    }
    
    //Emit particles
    emitParticles();
    
    //reset collision flag
    flagCollision = 0;
}

function createParticles(x, y, d){
    this.x = x || 0;
    this.y = y || 0;
    
    this.radius = 2;
    this.vx = d * Math.random()*1.5;
    this.vy = -1.5 + Math.random()*3;
    
}

var randNum1;
var randNum2;
var randNum3;

function emitParticles(){
   
    
    console.log(randNum1);
    
    for(var j = 0; j < particles.length; j++){
        console.log(true);
        par = particles[j];
        
        ctx.beginPath();
        ctx.fillStyle = "rgb(" + randNum1 + "," + randNum2 + "," + randNum3 + ")";
        if(par.radius > 0){
            ctx.arc(par.x, par.y, par.radius, 0, Math.PI*2, false);
        }
        ctx.fill();
        
        par.x += par.vx;
        par.y += par.vy;
        
        //reduce rad of particle so that it dies after a few seconds
        par.radius = Math.max(par.radius - 0.05, 0.0);
    }
}

var paddleHit;      //which paddle was hit 0 = top, 1 = bottom
function collides(b, p){
    if(b.y + b.r >= p.y && b.y - b.r <= p.y + p.h){
        if(b.x >= (p.x - p.w) && p.x > 0){
            paddleHit = 0;
            return true;
        } else if(b.x <= p.w && p.x === 0){
            paddleHit = 1;
            return true;
        } else {
            return false;
        }
    }
}

var collisionSnd = document.getElementById("collide");


function collideAction(b, p){
//    console.log("paddle hit: " + paddleHit);
    if(collisionSnd){
        collisionSnd.play();
    }
    //reverse velocity
    ball.vx = -ball.vx;
    
    
    if(paddleHit == 0){
        // ball hit top paddle
        ball.x = p.x - p.w;
        
        particlePos.x = ball.x+(ball.r/2);
        particleDir = -1;
    } else if(paddleHit == 1){
        // ball hit bottom paddle
        ball.x = p.w + ball.r;
        
        particlePos.x = ball.x-ball.r;
        particleDir = 1;
    }
    //increment score
    points++;
    increaseSpd();
    
    //Sparkles
    particlePos.y = ball.y;
    flagCollision = 1;
}

//SPARKLES

var flagCollision = 0; // flag var for when ball collides with paddles for particles
var particles = []; //array for particles
var particlePos = {}; // object to contain the position of collision
var particleDir = 1; // var to control the direction of particles
var particleCount = 20;

//Check for collision

function increaseSpd(){
    
    //increase ball speed after every four points
    if(points % 4 == 0){
        if(Math.abs(ball.vx) < 15){
            if(ball.vx < 0){
                ball.vx += -1
            } else {
                ball.vx += 1;
            }

            if(ball.vy < 0){
                ball.vy += -2;
            } else {
                ball.vy += 2;
            }
        }
        
        paddlesArray[0].h -= 4;
        paddlesArray[1].h -= 4;
    }
    
}

var flagGameOver = 0;

//function to run when game is over
function gameOver(){
    //console.log("game over");
    
    // Display final score
    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Arial, san-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over - You Scored " + points + " points!", W/2, H/2 + 25);
    
    // Stop the animation
    cancelRequestAnimFrame(init);
    
    // Display replay button
    restartBtn.draw();
    
    // Set game over flag to true
    flagGameOver = 1;
}

var restartBtn = {}; //Start button object
restartBtn = {
    w: 100,
    h: 50,
    x: W / 2 - 50,
    y: H / 2 - 50,
    
    draw: function() {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = "2";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        
        ctx.font = "18px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("Replay?", W/2, H/2 - 25);
    }
}




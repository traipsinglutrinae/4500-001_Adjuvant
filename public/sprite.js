let drone = new Image();
let img = new Image();


// image source for isometric map.
img.src = "landscape.png";

// upload sprite image for drone animation
drone.src = "Drone_sprite.png";
drone.height = 15;
drone.width = 34;
drone.onload = function() {
    window.requestAnimationFrame(gameLoop);
};


let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

// scales drone image, can adjust if we need
const SCALE = 1;
const WIDTH = 35;
const HEIGHT = 25;
const SCALED_WIDTH = SCALE * WIDTH;
const SCALED_HEIGHT = SCALE * HEIGHT;

// holds position for left and right endpoints of indicator cone.
let leftX = 125;
let rightX = 175;
let radius = 25;
let squareY = 415;


// draws all canvas elements: drone, indicator line, iso map
function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(drone,
        frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
        canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);


    // draws iso map
    ctx.drawImage(img, 0, 353);
    // draws indicator cone.
    ctx.beginPath();
    ctx.moveTo(canvasX + 19, canvasY + 20);
    ctx.fillStyle = "rgba(192,192,192,0.5)";
    ctx.lineTo(leftX, 446.5);
    ctx.lineTo(rightX, 446.5);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "rgba(192,192,192,0.5)";
    ctx.rect(leftX, squareY, radius*2, radius*2);
    // ctx.arc(150, 893/2, radius, 0, 2 * Math.PI);
    ctx.fill();



}

// captures keypress events, could probably do this another way, but I took this from an online source so I just left
// it unchanged.
let keyPresses = {};

window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
    keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
    keyPresses[event.key] = false;
}

// sets starting position for drone sprite and movement speed.
const MOVEMENT_SPEED = 1.25;
let positionX = 132;
let positionY = 225;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //captures up and down movement.
    if (keyPresses.PageUp) {
        // If drone has not reached maximum height, update position.
        // maximum height set to y = 0.
        if (positionY >= 0) {
            positionY -= MOVEMENT_SPEED;
            if (leftX > 65) {
                leftX -= 0.30;
                rightX += 0.30;
                radius += 0.30;
                squareY -= 0.30;
            }
        }
    } else if (keyPresses.PageDown) {
        // If drone has not reached minimum height, update position.
        // minimum height set to y = 270.
        if (positionY <= 300) {
            positionY += MOVEMENT_SPEED;
            if (rightX <= 300){
                if (leftX < 140) {
                    leftX += 0.30;
                }
                if (rightX > 160) {
                    rightX -= 0.30;
                }
                if (radius > 10){
                    radius -= 0.30;
                }
                if (squareY < 440){
                    squareY += 0.30;
                }
            }

        }
    }
    drawFrame(0, 0, positionX, positionY);



    // animates canvas
    window.requestAnimationFrame(gameLoop);
}
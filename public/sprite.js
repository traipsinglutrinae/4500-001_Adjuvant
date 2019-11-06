let drone = new Image();
let img = new Image();


// image source for isometric map, used random image file, can change later.
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

let lineWidth = 10;
let leftX = 0;
let rightX = 350;


// draws all canvas elements: drone, indicator line, iso map
function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(drone,
        frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
        canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);

    // draws indicator line.
    ctx.beginPath();
    ctx.moveTo(canvasX + 19, canvasY + 20);
    ctx.fillStyle = "grey";
    // ctx.strokeStyle = "grey";
    // ctx.lineWidth = lineWidth;
    // ctx.strokeOpacity = 5;
    // ctx.lineTo(168, 550);
    ctx.lineTo(leftX, 540);
    ctx.lineTo(rightX, 540);
    ctx.fill();

    // draws iso map
    ctx.drawImage(img, 0, 353);
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
const MOVEMENT_SPEED = 1;
let positionX = 140;
let positionY = 250;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //captures up and down movement.
    if (keyPresses.w) {
        // If drone has not reached maximum height, update position.
        if (positionY >= 0) {
            positionY -= MOVEMENT_SPEED;
            lineWidth += 1;
        }
    } else if (keyPresses.s) {
        // If drone has not reached minimum height, update position.
        if (positionY <= 300) {
            positionY += MOVEMENT_SPEED;
            if (lineWidth >= 5) {
                lineWidth -= 1;
            }
        }
    // }

    // captures left and right movement, not implemented at this point.
    // if (keyPresses.a) {
    //     positionX -= MOVEMENT_SPEED;
    // } else if (keyPresses.d) {
    //     positionX += MOVEMENT_SPEED;
    }
    drawFrame(0, 0, positionX, positionY);

    // animates canvas
    window.requestAnimationFrame(gameLoop);
}
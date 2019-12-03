let drone = new Image();
let img = new Image();


// image source for isometric map.

img.src = "img/landscape.png";

// upload sprite image for drone animation
drone.src = "img/Drone_sprite.png";

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
// let leftX = 125;
// let rightX = 175;
let leftX = 65;
let rightX = 255;
let radius = 95;
let squareY = 370;


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
let charCode;
let altitude = 1300;
let viewable = altitude * altitude;

window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
    // Sets code of pressed key to charCode: 189 == Minus and 187 == Equal.
    charCode = typeof event.which == "number" ? event.which : event.keyCode;
}

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
    // Sets charCode to zero once key is no longer pressed.
    charCode = 0;
}

// sets starting position for drone sprite and movement speed.

const MOVEMENT_SPEED = 1.25;
let positionX = 140;
let positionY = 0;


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //captures up and down movement.
    if (charCode == 189) {
        // If drone has not reached maximum height, update position.
        // maximum height set to y = 0.
        if (positionY >= 0) {
            positionY -= MOVEMENT_SPEED;
            if(altitude < 1300) {
                altitude += 7;
            }
            viewable = altitude * altitude;
            if (leftX > 65) {
                leftX -= 0.30;
                rightX += 0.30;
                radius += 0.30;
                squareY -= 0.30;
            }

        }
    } else if (charCode == 187) {
        // If drone has not reached minimum height, update position.
        // minimum height set to y = 270.

        if (positionY <= 300) {
            positionY += MOVEMENT_SPEED;
            if (altitude > 0) {
                altitude -= 7;
            }
            viewable = altitude * altitude;
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

    // Rounds the altitude value 1 decimal place.
    let rounded = Math.round(altitude*10) / 10;
    if (rounded < 0){
        rounded = 0.0;
    }

    // Injects the rounded drone altitude into canvas element.
    document.getElementById("drone altitude").innerHTML = "Drone Altitude: " + rounded + " miles";
    document.getElementById("altitude").innerHTML = "Drone Altitude: " + rounded + " miles";
    document.getElementById("viewable area").innerHTML = "Viewable Area: " + viewable + "Sq. miles";
    // animates canvas
    window.requestAnimationFrame(gameLoop);

}

let graphData = [];

function snapShot(){
    graphData.push(altitude);
    graphData.push(viewable);
}

function graph() {
    let n = 0;
    let HTML = "<table border=1 width=100% bgcolor='red' style='color: brown'><tr><th>Altitude</th><th>Viewable Area(Sq Miles)</th></tr>";
    while(n < 6) {
        HTML += "<tr><td align=center>" + graphData[n] + "</td><td align=center>" + graphData[n + 1] + "</td>";
        n += 2;
    }
    document.getElementById("graph").innerHTML = HTML;
}

function clearGraph() {
    graphData = [];
    document.getElementById("graph").innerHTML = "<p></p>"
}



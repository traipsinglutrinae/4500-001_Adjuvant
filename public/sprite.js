let drone = new Image();
let img = new Image();

// image source for isometric map.

img.src = "img/mp1.png";

let altitude = 1300;
let zoomAltitude = 1300;
let width = 1013;
let height = 1313;

let zoomPercent = zoomAltitude / altitude;
let viewable = width * zoomPercent * (height * zoomPercent);

function changeMiniMap() {
  switch (currentMap) {
    case 1:
      img.src = "img/mp1.png";
      width = 1013;
      height = 1313;
      break;
    case 2:
      img.src = "img/mp2.png";
      width = 118;
      height = 118;
      break;
    case 3:
      img.src = "img/mp3.png";
      width = 1.25;
      height = 1.27;
      break;
    case 4:
      img.src = "img/mp4.png";
      width = 15;
      height = 9.25;
      break;
    case 5:
      img.src = "img/mp5.png";
      width = 1.25;
      height = 1.3;
      break;
    default:
      img.src = "img/mp1.png";
      width = 1013;
      height = 1313;
  }
}

// upload sprite image for drone animation
drone.src = "img/Drone_sprite.png";

drone.height = 15;
drone.width = 34;
drone.onload = function() {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");
  window.requestAnimationFrame(gameLoop);
};

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

// scales drone image, can adjust if we need
const SCALE = 1;
const WIDTH = 35;
const HEIGHT = 25;
const SCALED_WIDTH = SCALE * WIDTH;
const SCALED_HEIGHT = SCALE * HEIGHT;

// holds position for left and right endpoints of indicator cone.
let leftX = 65;
let rightX = 255;
let radius = 95;
let squareY = 370;

// draws all canvas elements: drone, indicator line, iso map
function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(
    drone,
    frameX * WIDTH,
    frameY * HEIGHT,
    WIDTH,
    HEIGHT,
    canvasX,
    canvasY,
    SCALED_WIDTH,
    SCALED_HEIGHT
  );

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
  ctx.rect(leftX, squareY, radius * 2, radius * 2);
  ctx.fill();
}

// captures keypress events, could probably do this another way, but I took this from an online source so I just left
// it unchanged.
let charCode;

window.addEventListener("keydown", keyDownListener);
function keyDownListener(event) {
  // Sets code of pressed key to charCode: 189 == Minus and 187 == Equal.
  charCode = typeof event.which == "number" ? event.which : event.keyCode;
}

window.addEventListener("keyup", keyUpListener);
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
      if (zoomAltitude < 1300) {
        zoomAltitude += 7;
        zoomPercent = zoomAltitude / altitude;
      }
      positionY = 300 - Math.round(zoomPercent * 300);
      viewable = width * zoomPercent * (height * zoomPercent);
      leftX = 65 + 75 * (1 - zoomPercent);
      rightX = 255 - 95 * (1 - zoomPercent);
      radius = 95 - 85 * (1 - zoomPercent);
      squareY = 370 + 70 * (1 - zoomPercent);
    }

    map.zoomTo((1 - zoomPercent) * 100);
  } else if (charCode == 187) {
    // If drone has not reached minimum height, update position.
    // minimum height set to y = 300.

    if (positionY <= 300) {
      if (zoomAltitude > 0) {
        zoomAltitude -= 7;
        zoomPercent = zoomAltitude / altitude;
      }
      positionY = 300 - Math.round(zoomPercent * 300);
      viewable = width * zoomPercent * (height * zoomPercent);
      leftX = 65 + 75 * (1 - zoomPercent);
      rightX = 255 - 95 * (1 - zoomPercent);
      radius = 95 - 85 * (1 - zoomPercent);
      squareY = 370 + 70 * (1 - zoomPercent);
    }

    map.zoomTo((1 - zoomPercent) * 100);
  }

  drawFrame(0, 0, positionX, positionY);

  // Rounds the altitude value to 1 decimal place.
  let rounded = Math.round(zoomAltitude * 10) / 10;
  if (rounded < 0) {
    rounded = 0.0;
  }

  // Injects the rounded drone altitude into canvas element.
  document.getElementById("drone altitude").innerHTML =
    "Drone Altitude: " + rounded + " miles";
  document.getElementById("altitude").innerHTML =
    "Drone Altitude: " + rounded + " miles";

  rounded = Math.round(viewable * 10) / 10;
  if (rounded < 0) {
    rounded = 0.0;
  }

  document.getElementById("viewable area").innerHTML =
    "Viewable Area: " + rounded + "Sq. miles";
  // animates canvas
  window.requestAnimationFrame(gameLoop);
}

let graphData = [];
let snaps = 0;
function snapShot() {
  if (zoomAltitude < 0) {
    graphData.push(0);
  } else {
    graphData.push(zoomAltitude);
  }
  graphData.push(viewable);
  snaps += 1;
}

function graph() {
  let n = 0;
  let HTML =
    "<table border=1 width=100% bgcolor='red' style='color: brown'><tr><th>Altitude</th><th>Viewable Area(Sq Miles)</th></tr>";
  while (n < snaps + 2) {
    HTML +=
      "<tr><td align=center>" +
      graphData[n] +
      "</td><td align=center>" +
      graphData[n + 1] +
      "</td>";
    n += 2;
  }
  document.getElementById("graph").innerHTML = HTML;
}

function clearGraph() {
  graphData = [];
  snaps = 0;
  document.getElementById("graph").innerHTML = "<p></p>";
}

function drawGraph() {
  var x = document.getElementById("graphDiv");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function makeGraph() {
  var gtx = document.getElementById("myGraph");
  var scatterChart = new Chart(gtx, {
    type: "line",
    data: {
      datasets: [
        {
          title: {
            text:
              "Graph of Snapshots: [X:Drone Altitude (miles)] [Y:Viewable Surface Area (square miles)]"
          },
          label: "Snapshot",
          data: [
            {
              x: graphData[0],
              y: graphData[1]
            },
            {
              x: graphData[2],
              y: graphData[3]
            },
            {
              x: graphData[4],
              y: graphData[5]
            },
            {
              x: graphData[6],
              y: graphData[7]
            },
            {
              x: graphData[8],
              y: graphData[9]
            },
            {
              x: graphData[10],
              y: graphData[11]
            },
            {
              x: graphData[12],
              y: graphData[13]
            },
            {
              x: graphData[14],
              y: graphData[15]
            },
            {
              x: graphData[16],
              y: graphData[17]
            },
            {
              x: graphData[18],
              y: graphData[19]
            },
            {
              x: graphData[20],
              y: graphData[21]
            }
          ]
        }
      ]
    },
    options: {
      scales: {
        xAxes: [
          {
            type: "linear",
            position: "bottom"
          }
        ]
      }
    }
  });
}

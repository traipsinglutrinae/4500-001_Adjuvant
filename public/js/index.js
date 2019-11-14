function injectMap(imgLocation) {
  const map = `<div id="mapzoom" class="mapzoom" onload="mapzoom.add(this);"><div id="wrapper" unselectable="on"><div id="mapper" unselectable="on"><img id="currentMap" src="${imgLocation}" width="800" height="600" alt="" border="0"/></div>`;

  // $("#map").empty();
  // const canvasDiv = $("#map");
  // const canvas = $(`<canvas id="myCanvas" width="200" height="100"></canvas>`);
  const canvas = $("#myCanvas")[0];
  console.log(canvas);
  const ctx = canvas.getContext("2d");
  const img = $(
    `<img id="currentMap" src="${imgLocation}" width="800" height="600" alt="" border="0"/>`
  )[0];
  ctx.drawImage(img, 10, 10);
  // $("#map").append(canvasDiv);
  // $("#mapzoom").focus();
}

function changeMap() {
  currentMap = ++currentMap > 5 ? 1 : currentMap;

  switch (currentMap) {
    case 1:
      injectMap("img/1.jpg");
      break;
    case 2:
      injectMap("img/2.jpg");
      break;
    case 3:
      injectMap("img/3.jpg");
      break;
    case 4:
      injectMap("img/4.jpg");
      break;
    case 5:
      injectMap("img/5.jpg");
      break;
    default:
      injectMap("img/1.jpg");
  }
}

document.addEventListener("DOMContentLoaded", event => {
  // injectMap("img/1.jpg");
});

window.onload = function() {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const img = new Image(); // Image constructor
  img.onload = () => {
    ctx.drawImage(img, 0, 0, 800, 600);
  };
  img.src = "img/1.jpg";
};

let currentMap = 1;

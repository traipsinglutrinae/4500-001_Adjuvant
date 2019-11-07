function injectMap(imgLocation) {
  const map = `<div id="mapzoom" class="mapzoom" onload="mapzoom.add(this);"><div id="wrapper" unselectable="on"><div id="mapper" unselectable="on"><img id="currentMap" onLoad="mapzoom.add(this);" src="${imgLocation}" width="800" height="600" alt="" border="0"/></div>`;

  $("#map").empty();
  $("#map").append(map);
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
  injectMap("img/1.jpg");
});

let currentMap = 1;

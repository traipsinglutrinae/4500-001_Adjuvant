class SatMap {
  constructor(canvas) {
    this.canvas = canvas || undefined;
    this.zoomLevel = 0;
    this.xPercent = 0;
    this.yPercent = 0;
  }

  zoomIn() {
    this.zoomLevel = this.zoomLevel < 100 ? this.zoomLevel + 0.5 : 100;
    this.render();
  }

  zoomOut() {
    this.zoomLevel = this.zoomLevel > 0 ? this.zoomLevel - 0.5 : 0;
    this.render();
  }

  zoomTo(percent) {
    this.zoomLevel = percent;
    if (this.zoomLevel > 100) {
      this.zoomLevel = 100;
    } else if (this.zoomLevel < 0) {
      this.zoomLevel = 0;
    }

    this.render;
  }

  moveRight() {
    this.xPercent = this.xPercent < 100 ? this.xPercent + 0.5 : 100;
    this.render();
  }

  moveLeft() {
    this.xPercent = this.xPercent > 0 ? this.xPercent - 0.5 : 0;
    this.render();
  }

  moveUp() {
    this.yPercent = this.yPercent > 0 ? this.yPercent - 0.5 : 0;
    this.render();
  }

  moveDown() {
    this.yPercent = this.yPercent < 100 ? this.yPercent + 0.5 : 100;
    this.render();
  }

  render() {
    const ctx = this.canvas.getContext("2d");

    const img = new Image(); // Image constructor
    img.onload = () => {
      const srcRight = img.width * (100 - this.zoomLevel) * 0.01;
      const srcBottom = img.height * (100 - this.zoomLevel) * 0.01;
      const srcLeft = img.width * this.xPercent * 0.01;
      const srcTop = img.height * this.yPercent * 0.01;

      console.log(srcLeft, srcTop, srcRight, srcBottom, this);

      ctx.fillStyle = "#333";
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.drawImage(
        img,
        srcLeft,
        srcTop,
        srcLeft + srcRight,
        srcTop + srcBottom,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      // ctx.drawImage(img, 600, 450, 800, 600);
    };
    img.src = "img/1.jpg";
  }
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

const map = new SatMap();

document.addEventListener("DOMContentLoaded", event => {
  // injectMap("img/1.jpg");
});

window.onload = function() {
  const canvas = document.getElementById("myCanvas");
  map.canvas = canvas;
  map.render();
};

document.onkeypress = function(e) {
  e = e || window.event;
  var charCode = typeof e.which == "number" ? e.which : e.keyCode;
  switch (charCode) {
    case 61:
      map.zoomIn();
      break;
    case 45:
      map.zoomOut();
      break;
    case 100:
      map.moveRight();
      break;
    case 97:
      map.moveLeft();
      break;
    case 119:
      map.moveUp();
      break;
    case 115:
      map.moveDown();
      break;
    default:
      console.log(charCode);
  }
};

let currentMap = 1;

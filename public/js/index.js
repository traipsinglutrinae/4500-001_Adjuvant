class SatMap {
  constructor(canvas) {
    this.canvas = canvas || undefined;
    this.zoomLevel = 0;
    this.xCenter = 0;
    this.yCenter = 0;
    this.stepScale = 10;
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  zoomIn() {
    this.zoomLevel = this.zoomLevel < 100 ? this.zoomLevel + 1 : 100;
    this.render();
  }

  zoomOut() {
    this.zoomLevel = this.zoomLevel > 0 ? this.zoomLevel - 1 : 0;
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
    const maxRight = (-1 * this.width) / 2;
    this.xCenter -= this.stepScale; //* (100 - this.zoomLevel);
    this.xCenter = this.xCenter <= maxRight ? maxRight : this.xCenter;
    this.render();
  }

  moveLeft() {
    const maxLeft = this.width / 2;
    this.xCenter += this.stepScale; // * (100 - this.zoomLevel);
    this.xCenter = this.xCenter >= maxLeft ? maxLeft : this.xCenter;
    this.render();
  }

  moveUp() {
    this.render();
  }

  moveDown() {
    this.render();
  }

  render() {
    const ctx = this.canvas.getContext("2d");

    const img = new Image(); // Image constructor
    img.onload = () => {
      const windowScale = {
        height: img.height / this.height,
        width: img.width / this.width
      };
      const srcWindow = {
        height: (100 - this.zoomLevel) * 0.01 * img.height,
        width: (100 - this.zoomLevel) * 0.01 * img.width
      };
      const srcLeft = this.xCenter * windowScale.width; // + srcWindow.width;
      const srcTop = this.yCenter * windowScale.height; // - srcWindow.height;
      const srcRight = this.xCenter * windowScale.width + srcWindow.width;
      const srcBottom = this.yCenter * windowScale.height + srcWindow.height;

      const ratio = (srcRight - srcLeft) / (srcBottom - srcTop);

      ctx.fillStyle = "#333";
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.drawImage(
        img,
        srcLeft,
        srcTop,
        srcRight,
        srcBottom,
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

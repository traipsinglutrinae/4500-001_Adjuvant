const waldoConfig = [
  {
    src: "img/waldoPNG/w1.png",
    x: 3400,
    y: 2130
  },
  {
    src: "img/waldoPNG/w2.png",
    x: 3400,
    y: 2130
  },
  {
    src: "img/waldoPNG/w3.png",
    x: 3400,
    y: 2130
  },
  {
    src: "img/waldoPNG/w4.png",
    x: 3400,
    y: 2130
  },
  {
    src: "img/waldoPNG/w5.png",
    x: 3400,
    y: 2130
  }
];

class SatMap {
  constructor(canvas, img, waldoInfo) {
    this.canvas = canvas || undefined;
    this.zoomLevel = 0;
    this.xCenter = 0;
    this.yCenter = 0;
    this.stepScale = 10;
    this.ctx = undefined;
    this.waldo = waldoInfo;
    this.img = img;
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

    this.render();
  }

  moveRight() {
    const maxRight = -this.spareWidth / 2;
    this.xCenter -= this.stepScale;
    this.xCenter = this.xCenter <= maxRight ? maxRight : this.xCenter;
    this.render();
  }

  moveLeft() {
    const maxLeft = this.spareWidth / 2;
    this.xCenter += this.stepScale;
    this.xCenter = this.xCenter >= maxLeft ? maxLeft : this.xCenter;
    this.render();
  }

  moveUp() {
    const maxUp = this.spareHeight / 2;
    this.yCenter += this.stepScale;
    this.yCenter = this.yCenter >= maxUp ? maxUp : this.yCenter;
    this.render();
  }

  moveDown() {
    const maxDown = -this.spareHeight / 2;
    this.yCenter -= this.stepScale;
    this.yCenter = this.yCenter <= maxDown ? maxDown : this.yCenter;
    this.render();
  }

  render() {
    this.ctx = this.canvas.getContext("2d");

    const img = new Image(); // Image constructor
    img.onload = () => {
      const windowScale = {
        height: img.height / this.height,
        width: img.width / this.width
      };

      let srcLeft, srcTop, captureHeight, captureWidth;
      if (img.height < img.width) {
        const ratio = this.canvas.width / this.canvas.height;

        captureHeight =
          this.zoomLevel === 100
            ? 100
            : (100 - this.zoomLevel) * 0.01 * img.height;
        captureWidth = captureHeight * ratio;
      } else {
        const ratio = this.height / this.width;

        captureWidth =
          this.zoomLevel === 100
            ? 100
            : (100 - this.zoomLevel) * 0.01 * img.width;
        captureHeight = captureWidth * ratio;
      }

      this.captureHeight = captureHeight;
      this.captureWidth = captureWidth;
      this.spareWidth = img.width - captureWidth;
      this.spareHeight = img.height - captureHeight;
      srcLeft = this.xCenter + Math.abs(captureWidth - img.width) / 2;
      srcTop = this.yCenter + Math.abs(captureHeight - img.height) / 2;

      this.ctx.fillStyle = "#333";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(
        img,
        srcLeft,
        srcTop,
        this.captureWidth,
        this.captureHeight,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );

      if (this.zoomLevel > 80) {
        const waldo = new Image();
        waldo.onload = () => {
          //draw waldo
          this.ctx.drawImage(
            waldo,
            (this.waldo.x - srcLeft - this.spareWidth / 2) *
              (1 / windowScale.width),
            (this.waldo.y - srcTop + this.spareHeight / 2) *
              (1 / windowScale.height),
            this.zoomLevel - 70,
            this.zoomLevel - 70
          );
        };
        waldo.src = this.waldo.src;
      }
    };
    img.src = this.img;
  }
}

function changeMap() {
  currentMap = ++currentMap > 5 ? 1 : currentMap;

  switch (currentMap) {
    case 1:
      map.img = "img/1.jpg";
      break;
    case 2:
      map.img = "img/2.jpg";
      break;
    case 3:
      map.img = "img/3.jpg";
      break;
    case 4:
      map.img = "img/4.jpg";
      break;
    case 5:
      map.img = "img/5.jpg";
      break;
    default:
      map.img = "img/1.jpg";
  }

  map.render();
  changeMiniMap();
}

const map = new SatMap(undefined, "img/1.jpg", waldoConfig[1]);

window.onload = function() {
  const canvas = document.getElementById("myCanvas");
  map.canvas = canvas;
  map.render();
};

document.onkeypress = function(e) {
  e = e || window.event;
  var charCode = typeof e.which == "number" ? e.which : e.keyCode;
  switch (charCode) {
    case 100:
      map.moveLeft();
      break;
    case 97:
      map.moveRight();
      break;
    case 119:
      map.moveUp();
      break;
    case 115:
      map.moveDown();
      break;
    default:
  }
};

let currentMap = 1;

// grab all DIV elements in the document
let divs = document.querySelectorAll(".polygon-animate");

// helper method to get a multitude of a
// random number as an integer
const rand = (multi) => {
  return parseInt(multi * Math.random(), 10);
};

// get width and height of the window
let ww = window.innerWidth;
let wh = window.innerHeight;

// define biggest possible value as constraint
let constraint = Math.min(ww, wh);

// move the dots by changing the CSS values
function move() {
  // loop over all DIV elements
  divs.forEach((div) => {
    // Balls can be the width of the constraint
    // or less
    let w = rand(constraint);

    // x and y position limited to screen space
    let x = rand(ww - w);
    let y = rand(wh - w);

    // apply styles
    div.style.width = 20 + "px";
    div.style.height = 20 + "px";
    div.style.top = y + "px";
    div.style.left = x + "px";

    // 'move' dot with 900ms or more
    div.style.transition = rand(100) + 8000 + "ms";

    // apply random colour
    div.style.background = `#21CAFF
    `;
  });
}
move();
// change dots every second
window.setInterval(move, 16000);
// end ANimate circle

const secondFrameStart = 3000;
const timeOnFrame = 3000;
const startDeg = -90;
const degRange = 180;
let tickArray = [];
let guageFrame = 0;
let rgbRedValue = 255;

// t: current time, b: begInnIng value, c: change In value, d: duration
function easeInOutCubic(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
  return (-c / 2) * (--t * (t - 2) - 1) + b;
}

function spawnColor(iter) {
  this.goFrames = 0;
  this.color = rgbRedValue;
  this.iteration = iter;
  this.fillColor = function () {
    if (this.goFrames <= 20) {
      var $el = document.querySelector(
        ".js-guage-svg > path:nth-child(" + String(this.iteration) + ")"
      );
      document.querySelector(
        ".js-guage-svg > path:nth-child(" + String(this.iteration) + ")"
      ).style.fill = "#44BCFF";
      this.color = this.color - rgbRedValue / 20;
      this.goFrames = this.goFrames + 1;
      this.reqAnim = requestAnimationFrame(this.fillColor.bind(this));
    } else {
      this.goFrames = 0;
      this.color = rgbRedValue;
      cancelAnimationFrame(this.reqAnim);
    }
  };
}

function engageGuage() {
  let totalFrames = 100;
  let currChild = 0;
  let reqGuage;

  if (guageFrame < totalFrames) {
    var deg = startDeg + easeInOutCubic(guageFrame, 0, degRange, totalFrames);
    var iteration = Math.floor(
      easeInOutCubic(
        guageFrame,
        0,
        document.querySelectorAll(".js-guage-svg > path").length + 1,
        totalFrames
      )
    );
    document.querySelector(".js-needle").style.transform =
      "rotateZ(" + deg + "deg)";
    if (currChild != iteration) {
      tickArray[iteration] = new spawnColor(iteration);
      tickArray[iteration].fillColor();
      currChild = iteration;
    }
    guageFrame++;
    reqGuage = requestAnimationFrame(engageGuage);
  } else {
    guageFrame = 0;
    cancelAnimationFrame(reqGuage);
    setTimeout(reset, 1000);
  }
}

function reset() {
  Array.prototype.forEach.call(
    document.querySelectorAll(".js-guage-svg > path"),
    function (el, i) {
      el.style.fill = "";
    }
  );
  document.querySelector(".js-needle").style.transform =
    "rotateZ(" + startDeg + "deg)";
  tickArray = [];
  setTimeout(engageGuage, 1000);
}

reset();
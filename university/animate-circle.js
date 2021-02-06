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

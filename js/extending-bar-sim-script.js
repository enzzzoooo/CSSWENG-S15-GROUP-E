// wall
let wall = {
  x: 65 - canvasOrigin.x,
  y: 250 - canvasOrigin.y,
  width: 168,
  height: 534,
  color: '#595959'
}

function setup() {
  let canvas = createCanvas(822, 534);
  canvas.parent('canvas-container');
  angleMode(DEGREES);

}

function draw() {
  background('#D9D9D9');

  // Draw wall
  fill(wall.color);
  stroke('#000000');
  strokeWeight(1);
  strokeCap(SQUARE);
  rect(wall.x,wall.y,wall.width,wall.height);

}
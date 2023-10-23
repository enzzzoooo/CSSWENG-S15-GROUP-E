let canvasOrigin = {
    x: 65,
    y: 244,
}

// wall
let wall = {
    x: 65 - canvasOrigin.x,
    y: 244 - canvasOrigin.y,
    width: 168,
    height: 534,
    color: '#595959'
}

// yellowBar
let yellowBar = {
    x: 212 - canvasOrigin.x,
    y: 481 - canvasOrigin.y,
    width: 362,
    height: 30,
    color: '#FFB81C',
    angle: 0
}

// greyBar
let greyBar = {
    x: 205.36 - canvasOrigin.x,
    y: 336 - canvasOrigin.y,
    width: 303.28,
    height: 13.37,
    color: '#747474',
    angle: 28.42
}

function setup() {
    let canvas = createCanvas(822, 534)
    canvas.parent('canvasContainer');
    angleMode(DEGREES);


    let button = document.getElementById('changeDrawing');
    button.addEventListener('click', changeDrawing);
}

function changeDrawing() {
    TweenMax.to(yellowBar, 1, {angle: 25, width: 396.36});
    TweenMax.to(greyBar, 1, {angle: 43.51, width: 366.73});
}

function draw() {
    background('#D9D9D9');

    fill(wall.color);
    rect(wall.x,wall.y,wall.width,wall.height);
    

    // yellowBar
    fill(yellowBar.color);
    translate(yellowBar.x,yellowBar.y - yellowBar.height/2);
    rotate(yellowBar.angle)
    rect(0,yellowBar.height/2,yellowBar.width,yellowBar.height);
    rotate(-yellowBar.angle)
    translate(-yellowBar.x,-yellowBar.y + yellowBar.height/2);
   
    
    // greyBar
    fill(greyBar.color);
    translate(greyBar.x,greyBar.y);
    rotate(greyBar.angle)
    rect(0,greyBar.height/2,greyBar.width,greyBar.height);
    translate(-greyBar.x,-greyBar.y);
    rotate(-greyBar.angle)
}

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
    change: 0,
    animation: false,
    width: 362,
    height: 30,
    color: '#FFB81C',
    angle: 0
}

// greyBar
let greyBar = {
    x: 205.36 - canvasOrigin.x,
    y: 336 - canvasOrigin.y,
    change: 0,
    animation: false,
    width: 303.28,
    height: 13.37,
    color: '#747474',
    angle: 28.42
}

let t = 0;

function setup() {
    let canvas = createCanvas(822, 534)
    canvas.parent('canvas-container');
    angleMode(DEGREES);


    let button = document.getElementById('change-drawing');
    button.addEventListener('click', changeDrawing);

    let reset = document.getElementById('reset-drawing');
    reset.addEventListener('click', resetDrawing);
}

function changeDrawing() {
    yellowBar.change = 170;
    yellowBar.animation = true;

    greyBar.change = (yellowBar.change*greyBar.width/yellowBar.width)
    greyBar.animation = true;

}

function resetDrawing() {
    yellowBar.change = 0;
    yellowBar.animation = false;

    greyBar.change = 0;
    greyBar.animation = false;

    t = 0;

}

function easing(x) {
    return 1 - Math.pow(1 - x, 3);
}

function draw() {
    background('#D9D9D9');

    fill(wall.color);
    stroke('#000000');
    strokeWeight(1);
    strokeCap(SQUARE);
    rect(wall.x,wall.y,wall.width,wall.height);


    // yellowBar

    stroke(yellowBar.color);
    strokeWeight(yellowBar.height);

    if(yellowBar.animation && t < 1){
        t += 0.05
        line(yellowBar.x, yellowBar.y, yellowBar.x+yellowBar.width, yellowBar.y+(yellowBar.change*easing(t)))
    } else {
        line(yellowBar.x, yellowBar.y, yellowBar.x+yellowBar.width, yellowBar.y+yellowBar.change)
    }

    stroke(greyBar.color);
    strokeWeight(greyBar.height);
    if(greyBar.animation && t < 1){
        line(greyBar.x, greyBar.y, greyBar.x+greyBar.width, (yellowBar.y-yellowBar.height/2)+(greyBar.change*easing(t)))
    } else {
        line(greyBar.x, greyBar.y, greyBar.x+greyBar.width, (yellowBar.y-yellowBar.height/2)+greyBar.change)
    }

    strokeWeight(1);
    stroke('#000000');
    fill('#FFFFFF');
    circle(yellowBar.x, yellowBar.y, 30)
    circle(greyBar.x, greyBar.y, 30)
    if(greyBar.animation && t < 1){
        circle(greyBar.x+greyBar.width, (yellowBar.y-yellowBar.height/2)+greyBar.change*easing(t), 30)
    } else {
        circle(greyBar.x+greyBar.width, (yellowBar.y-yellowBar.height/2)+greyBar.change, 30)
    }



    // greyBar

}

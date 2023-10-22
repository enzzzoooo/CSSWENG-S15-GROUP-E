

function deformation(load, length, crossArea, elasticity) {
    return (load * length) / (crossArea * elasticity)
}

function squareCrossArea(width) {
    return width * width
}

function cylinderCrossArea(radius) {
    return Math.PI * radius * radius
}

function pythagorean(a, b) {
    return Math.sqrt(a * a + b * b)
}


function internalHanging(lengthRope, upwardRope, distanceRope, downward, upward, distancesDown, distancesUp) {
    downwardForces = 0;
    upwardForces = 0;

    // Get total of downward forces
    for (i = 0; i < downward.length; i++){
        downwardForces += distancesDown[i] * downward[i]
    }

    // Get total of upward forces
    for (i = 0; i < upward.length; i++){
        downwardUp += distancesUp[i] * upward[i]
    }

    return (downwardForces - upwardForces)/((upwardRope * distanceRope)/lengthRope)
}

function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(15);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 15;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}

let canvasOrigin = {
    x: 65,
    y: 250,
}

let settings = {
    ropeHeight: 3000,
    ropeDistance: 4000,
    yellowBarWidth: 6000,
    greyRopeModulus: 200
}

// wall
let wall = {
    x: 65 - canvasOrigin.x,
    y: 250 - canvasOrigin.y,
    width: 168,
    height: 534,
    color: '#595959'
}

// yellowBar
let yellowBar = {
    x: 230 - canvasOrigin.x,
    y: 500 - canvasOrigin.y,
    change: 0,
    animation: false,
    width: settings.yellowBarWidth / 20,
    height: 100,
    color: '#FFB81C',
    angle: 0
}

// greyBar
let greyBar = {
    x: 230 - canvasOrigin.x,
    y: yellowBar.y - 3000/20,
    change: 0,
    animation: false,
    width: 4000 / 20,
    height: 50,
    color: '#747474',
    angle: 28.42
}

let t = 0;

let forces = []

function preload() {
    font = loadFont('.\\public\\Avenir LT Std 55 Roman.otf');
}

function setup() {
    let canvas = createCanvas(822, 534)
    canvas.parent('canvas-container');
    angleMode(DEGREES);


    let button = document.getElementById('change-drawing');
    button.addEventListener('click', changeDrawing);

    let reset = document.getElementById('reset-drawing');
    reset.addEventListener('click', resetDrawing);

    forces[0] = [createVector(yellowBar.x + yellowBar.width, yellowBar.y),  createVector(0, 37*1.5), 'coral']

    textFont(font);
    textSize(20);
}

function changeDrawing() {

    downward = []
    downwardDistances = []

    forces.forEach(force => {
        downward.push((force[1].y/1.5))
        downwardDistances.push((force[0].x - yellowBar.x)*20)
    });
    console.log(downward)
    console.log(downwardDistances)


    ropeLength = pythagorean(settings.ropeHeight, settings.ropeDistance)
    deformationGrey = deformation(internalHanging(ropeLength, settings.ropeHeight, settings.ropeDistance, downward, [], downwardDistances, []), ropeLength, cylinderCrossArea(greyBar.height/2), settings.greyRopeModulus);
    yellowBar.change = settings.yellowBarWidth * ropeLength / settings.ropeHeight / settings.ropeDistance * deformationGrey * 20;
    console.log(internalHanging(ropeLength, settings.ropeHeight, settings.ropeDistance, downward, [], downwardDistances, []))
    console.log(settings.yellowBarWidth)
    console.log(ropeLength)
    console.log(settings.ropeHeight)
    console.log(settings.ropeDistance)
    console.log(deformationGrey)
    console.log(yellowBar.change)
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

function mouseReleased() {
    forces.forEach(force => {
        force[3] = false;
    });
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
    strokeWeight(yellowBar.height/3);
    if(yellowBar.animation && t < 1){
        t += 0.035
        line(yellowBar.x, yellowBar.y, yellowBar.x+yellowBar.width, yellowBar.y+(yellowBar.change*easing(t)))
    } else {
        stroke(yellowBar.color + '80');
        line(yellowBar.x, yellowBar.y, yellowBar.x+yellowBar.width, yellowBar.y)
        stroke(yellowBar.color);
        line(yellowBar.x, yellowBar.y, yellowBar.x+yellowBar.width, yellowBar.y+yellowBar.change)
    }

    stroke(greyBar.color);
    strokeWeight(greyBar.height/3);
    if(greyBar.animation && t < 1){
        line(greyBar.x, greyBar.y, greyBar.x+greyBar.width, (yellowBar.y-yellowBar.height/3/2)+(greyBar.change*easing(t)))
    } else {
        stroke(greyBar.color + '80');
        line(greyBar.x, greyBar.y, greyBar.x+greyBar.width, (yellowBar.y-yellowBar.height/3/2))
        stroke(greyBar.color)
        line(greyBar.x, greyBar.y, greyBar.x+greyBar.width, (yellowBar.y-yellowBar.height/3/2)+greyBar.change)
    }

    strokeWeight(1);
    stroke('#000000');
    fill('#FFFFFF');
    circle(yellowBar.x, yellowBar.y, 30)
    circle(greyBar.x, greyBar.y, 30)
    if(greyBar.animation && t < 1){
        circle(greyBar.x+greyBar.width, (yellowBar.y-yellowBar.height/3/2)+greyBar.change*easing(t), 30)
    } else {
        stroke('#000000' + '80');
        fill('#FFFFFF' + '80');
        circle(greyBar.x+greyBar.width, (yellowBar.y-yellowBar.height/3/2), 30)
        stroke('#000000');
        fill('#FFFFFF');
        circle(greyBar.x+greyBar.width, (yellowBar.y-yellowBar.height/3/2)+greyBar.change, 30)
    }

    if(!yellowBar.animation){

        forces.forEach(force => {
            drawArrow(force[0], force[1], force[2])
        });

        forces.forEach(force => {
            if(dist(mouseX, mouseY, force[0].x, force[0].y + force[1].y + 15) < 5){
                strokeWeight(0)
                fill(255, 255, 200, 175);
                circle(force[0].x, force[0].y + force[1].y + 15, 10);
                if(mouseIsPressed){
                    force[3] = true;
                }
            }

            if (force[3]){
                strokeWeight(0);
                fill(255, 255, 200, 250);
                    circle(force[0].x, force[0].y + force[1].y + 15, 10);
                force[1] = createVector(0, -(force[0].y - mouseY + 15))
                fill(0, 0, 0, 255)
                text(((-(force[0].y - mouseY + 15))/1.5).toFixed(2), mouseX + 20, mouseY);
            }
        });
    }

    if(greyBar.animation && t >= 1){
        strokeWeight(0)
        fill('black')
        text((yellowBar.change/20).toFixed(2) + 'mm', yellowBar.x + (settings.yellowBarWidth / 20), (yellowBar.y + yellowBar.change / 2));
    }





    // greyBar

}

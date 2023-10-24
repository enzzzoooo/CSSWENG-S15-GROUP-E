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
        downwardForces += (distancesDown[i]) * downward[i]
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
    ropeHeight: 2500,
    ropeDistance: 4750,
    yellowBarWidth: 7000,
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
    y: 525 - canvasOrigin.y,
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
    y: yellowBar.y - settings.ropeHeight/20,
    change: 0,
    animation: false,
    width: settings.ropeDistance / 20,
    height: 50,
    color: '#747474',
    angle: 28.42
}

let t = 0;

let forces = []
let displayData = false;

function preload() {
    font = loadFont('.\\public\\Avenir LT Std 55 Roman.otf');
}

function setup() {
    let canvas = createCanvas(822, 534)
    canvas.parent('canvas-container');
    angleMode(DEGREES);


    let button = document.getElementById('playContainer');
    button.addEventListener('click', changeDrawing);

    let reset = document.getElementById('reset-drawing');
    reset.addEventListener('click', resetDrawing);

    let toggle = document.getElementById('toggle');
    toggle.addEventListener("change", function () {
        displayData = !displayData;
    });
  
    let changeWood = document.getElementById('changeMatToWood');
    changeWood.addEventListener('click', changeMaterialToWood);
    let changeMetal = document.getElementById('changeMatToMetal');
    changeMetal.addEventListener('click', changeMaterialToMetal);
    let changeLog = document.getElementById('changeMatToLog');
    changeLog.addEventListener('click', changeMaterialToLog);
    let changeSteel = document.getElementById('changeMatToSteel');
    changeSteel.addEventListener('click', changeMaterialToSteel);
    let changeRuby = document.getElementById('changeMatToRuby');
    changeRuby.addEventListener('click', changeMaterialToRuby);

    forces[0] = [createVector(yellowBar.x + yellowBar.width, yellowBar.y),  createVector(0, 39*2), 'coral']

    textFont(font);
    textSize(20);
}

let deformationGrey = 0;

function changeDrawing() {

    downward = []
    downwardDistances = []

    forces.forEach(force => {
        downward.push(parseFloat((force[1].y/2).toFixed(1)))
        downwardDistances.push((force[0].x - yellowBar.x)*20)
    });
    console.log(downward)
    console.log(downwardDistances)


    ropeLength = pythagorean(settings.ropeHeight, settings.ropeDistance)
    console.log(ropeLength)
    deformationGrey = deformation(internalHanging(ropeLength, settings.ropeHeight, settings.ropeDistance, downward, [], downwardDistances, []), ropeLength, cylinderCrossArea(greyBar.height/2), settings.greyRopeModulus);
    console.log(deformationGrey)
    yellowBar.change = settings.yellowBarWidth * ropeLength / settings.ropeHeight / settings.ropeDistance * deformationGrey * 20;
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

    deformationGrey = 0;
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

function curlyBracket(length){
    mid = length/2
    mid += 20
    noFill();
    bezier(0, 0, 20, 0, 0, length/2, 20, length/2)
    bezier(20, length/2, 0, length/2, 20, length, 0, length)
}

function showData(){
    // Yellow Bar
    push()
    strokeWeight(0)
    fill('black')
    textAlign(CENTER)
    angular = atan2(yellowBar.y+(yellowBar.change*easing(t)) - yellowBar.y, yellowBar.x+yellowBar.width - yellowBar.x);
    translate(yellowBar.x+yellowBar.width, yellowBar.y+(yellowBar.height/3/2)+(yellowBar.change*easing(t)))
    rotate(angular);
    text((yellowBar.width*20).toFixed(2) + 'mm', -(yellowBar.width/2), 40);
    strokeWeight(1.5)
    translate(0, 0)
    rotate(90)
    curlyBracket(dist(yellowBar.x, yellowBar.y, yellowBar.x+yellowBar.width,yellowBar.y+(yellowBar.change*easing(t))))

    // Grey Bar
    resetMatrix()

    strokeWeight(0)
    fill('black')
    textAlign(CENTER)

    angular = atan2(((yellowBar.y)+(greyBar.change*easing(t))) - greyBar.y, (greyBar.x+greyBar.width) - greyBar.x);
    translate(greyBar.x, greyBar.y)
    rotate(angular);
    text(((pythagorean(settings.ropeHeight, settings.ropeDistance)) + deformationGrey*easing(t)).toFixed(2) + 'mm', dist(greyBar.x, greyBar.y, (greyBar.x+greyBar.width),((yellowBar.y)+(greyBar.change*easing(t))))/2, -40);
    strokeWeight(1.5)
    rotate(-90)
    translate(12, 0)
    curlyBracket(dist(greyBar.x, greyBar.y, (greyBar.x+greyBar.width),((yellowBar.y)+(greyBar.change*easing(t)))))

    // Height of rope
    resetMatrix()

    strokeWeight(0)
    fill('white')
    stroke('white')
    textAlign(CENTER)
    translate(yellowBar.x, yellowBar.y)
    text((settings.ropeHeight).toFixed(2) + 'mm', -90, -(settings.ropeHeight/20/2) + 5);
    strokeWeight(1.5)
    rotate(-180)
    translate(15, 0)
    curlyBracket(settings.ropeHeight/20)

    // Distance of rope
    resetMatrix()

    strokeWeight(0)
    fill('black')
    stroke('black')
    textAlign(CENTER)
    translate(yellowBar.x, yellowBar.y)
    angular = atan2(((yellowBar.y)+(greyBar.change*easing(t))) - yellowBar.y, (greyBar.x+greyBar.width) - yellowBar.x);
    rotate(angular);
    text((settings.ropeDistance).toFixed(2) + 'mm', settings.ropeDistance/20/2, -25);
    strokeWeight(1.5)
    rotate(-90)
    translate(0, 0)
    curlyBracket(dist(yellowBar.x, yellowBar.y, (greyBar.x+greyBar.width),((yellowBar.y)+(greyBar.change*easing(t)))))

    pop()
}

function changeMaterialToWood(){
    resetDrawing();
    if(greyBar.color != '#B48777' && settings.greyRopeModulus != 100){
        greyBar.color = '#B48777';
        settings.greyRopeModulus = 100;
    }
    else{
        greyBar.color = '#747474';
        settings.greyRopeModulus = 200;
    }
}

function changeMaterialToMetal(){
    resetDrawing();
    if(greyBar.color != '#CCC9C9' && settings.greyRopeModulus != 300){
        greyBar.color = '#CCC9C9';
        settings.greyRopeModulus = 300;
    }
    else{
        greyBar.color = '#747474';
        settings.greyRopeModulus = 200;
    }
}

function changeMaterialToLog(){
    resetDrawing();
    if(greyBar.color != '#724D3F' && settings.greyRopeModulus != 400){
        greyBar.color = '#724D3F';
        settings.greyRopeModulus = 400;
    }
    else{
        greyBar.color = '#747474';
        settings.greyRopeModulus = 200;
    }
}

function changeMaterialToSteel(){
    resetDrawing();
    if(greyBar.color != '#000000' && settings.greyRopeModulus != 500){
        greyBar.color = '#000000';
        settings.greyRopeModulus = 500;
    }
    else{
        greyBar.color = '#747474';
        settings.greyRopeModulus = 200;
    }
}

function changeMaterialToRuby(){
    resetDrawing();
    if(greyBar.color != '#FD0606' && settings.greyRopeModulus != 600){
        greyBar.color = '#FD0606';
        settings.greyRopeModulus = 600;
    }
    else{
        greyBar.color = '#747474';
        settings.greyRopeModulus = 200;
    }
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
        line(greyBar.x, greyBar.y, greyBar.x+greyBar.width, (yellowBar.y)+(greyBar.change*easing(t)))
    } else {
        stroke(greyBar.color + '80');
        line(greyBar.x, greyBar.y, greyBar.x+greyBar.width, (yellowBar.y))
        stroke(greyBar.color)
        line(greyBar.x, greyBar.y, greyBar.x+greyBar.width, (yellowBar.y)+greyBar.change)
    }

    strokeWeight(1);
    stroke('#000000');
    fill('#FFFFFF');
    circle(yellowBar.x, yellowBar.y, 30)
    circle(greyBar.x, greyBar.y, 25)
    if(greyBar.animation && t < 1){
        circle(greyBar.x+greyBar.width, (yellowBar.y)+greyBar.change*easing(t), 25)
    } else {
        stroke('#000000' + '80');
        fill('#FFFFFF' + '80');
        circle(greyBar.x+greyBar.width, (yellowBar.y), 25)
        stroke('#000000');
        fill('#FFFFFF');
        circle(greyBar.x+greyBar.width, (yellowBar.y)+greyBar.change, 25)
    }
    resetMatrix()

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

            if(displayData || force[3]){
            strokeWeight(0);
            fill(0, 0, 0, 250);
            text((force[1].y/2).toFixed(1), force[0].x + 10, (force[0].y*2 + force[1].y)/2);
            }

            if (force[3]){
                strokeWeight(0);
                fill(255, 255, 200, 250);
                    circle(force[0].x, force[0].y + force[1].y + 15, 10);
                force[1] = createVector(0, -(force[0].y - mouseY + 15))
            }
        });
    }

    // After animation
    if(greyBar.animation && t >= 1){
        resetMatrix()
        strokeWeight(0)
        fill('black')
        translate(yellowBar.x + yellowBar.width, yellowBar.y)
        text((yellowBar.change/20).toFixed(2) + 'mm', 25, yellowBar.change/2 + 5);
        strokeWeight(1.5)
        curlyBracket(yellowBar.change)
    }

    resetMatrix()

    if(displayData){
        showData()
    }
    resetMatrix()




    // greyBar

}

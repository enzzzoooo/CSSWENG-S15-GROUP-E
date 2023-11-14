// For interacting with the elements outside of the canvas
let bigBarWidth;
let youngsModulus;
let arrowForce;
let crossArea;
let pivotPointWall;
let givenAngle;
let pivotPointBar;
let arrowPoint;
let snapInput;

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

// Added by Joseph
function deflectionAtPoint(load, length, crossArea, elasticity, angle, ropeDistance, calcDistance) {
    let radians = toRadians(angle);
    console.log("b: " + length);
    console.log("P: " + load);
    console.log("E: " + elasticity);
    console.log("A: " + crossArea);
    console.log("angle: " + angle);
    return (load * length) / (ropeDistance * crossArea * elasticity * Math.pow(Math.sin(radians),2) * Math.cos(radians)) * calcDistance;
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function deformExtending(lengths, forces, crossAreas, elasticities){
    internal1 = 0 - forces[0]
    internal2 = 0 - forces[0] - forces[1]
    internal3 = 0 - forces[3]

    deformations = []

    deformations[0] = deformation(internal1, lengths[0], crossAreas[0], elasticities[0])
    deformations[1] = deformation(internal2, lengths[1], crossAreas[1], elasticities[1])
    deformations[2] = deformation(internal3, lengths[2], crossAreas[2], elasticities[2])

    return deformations
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
    snapValue: 50,
    bigBarWidth: 1000,
    smallBarWidth: 2000,
    bigBarHeight: 100,
    smallBarHeight: 50,
    bigBarModulus: 200,
    smallBarModulus: 200,
    angle1Distance: 1000,
    angle2Distance: 2000
}

// wall
let wall = {
    x: 65 - canvasOrigin.x,
    y: 250 - canvasOrigin.y,
    width: 168,
    height: 534,
    color: '#595959'
}

// bigBar
let bigBar = {
    x: 234 - canvasOrigin.x,
    y: 525 - canvasOrigin.y,
    change: 0,
    animation: false,
    width: settings.bigBarWidth / 20,
    height: 200,
    color: '#FFB81C',
    angle: 0
}

// smallBar
let smallBar = {
    x: 234 - canvasOrigin.x + (settings.bigBarWidth/20),
    y: bigBar.y,
    change: 0,
    animation: false,
    width: settings.smallBarWidth / 20,
    height: 100,
    color: '#747474',
    angle: 0
}

let t = 0;

let forces = []
let active = false;
let addedForce = false;
let displayData = false;
let displayForce = false;
let heightChange = false;
let distanceChange = false;
let barChange = false;
let lengthChange = false;
let inputOfCrossArea =false;

function preload() {
    font = loadFont('.\\fonts\\Avenir LT Std 55 Roman.otf');
}

function setup() {
    let canvas = createCanvas(822, 534)
    canvas.parent('canvas-container');
    angleMode(DEGREES);


    let button = document.getElementById('change-drawing');
    button.addEventListener('click', changeDrawing);

    let reset = document.getElementById('reset-drawing');
    reset.addEventListener('click', resetDrawing);

    let toggle = document.getElementById('toggle');
    toggle.addEventListener("click", function () {
        displayData = !displayData;
        let toggleImg = document.getElementById('toggleImg');
        if (toggleImg.src.includes('toggle-data-show')) {
            toggleImg.src = 'imgs/toggle-data-hide.png';
        } else {
            toggleImg.src = 'imgs/toggle-data-show.png';
        }
    });


    let forceButton = document.getElementById('force');
    forceButton.addEventListener("click", function () {
        displayForce = !displayForce;
        let forceImg = document.getElementById('forceImg');
        if (forceImg.src.includes('force-data-show')) {
            forceImg.src = 'imgs/force-data-hide.png';
        } else {
            forceImg.src = 'imgs/force-data-show.png';
        }
    });


    let addButton = document.getElementById('add');
    addButton.addEventListener("click", function () {
        addedForce = !addedForce
        if (addedForce){
            addForce()
        } else {
            removeForce()
        }
        // ADD IMAGE for + and dotted +
        let forceImg = document.getElementById('forceImg');
        if (forceImg.src.includes('force-data-show')) {
            forceImg.src = 'imgs/force-data-hide.png';
        } else {
            forceImg.src = 'imgs/force-data-show.png';
        }
    });


    let changeWood = document.getElementById('changeMatToWood');
    changeWood.addEventListener('click', function(event) {
        // Calculate the relative position of the mouse click
        var mouseX = event.clientX;
        var mouseY = event.clientY;

        var buttonRect = changeWood.getBoundingClientRect();
        var relativeX = mouseX - buttonRect.left;
        var relativeY = mouseY - buttonRect.top;

        console.log('Relative position:', relativeX, relativeY);
        var buttonLength = buttonRect.right - buttonRect.left;
        var buttonHalf = buttonLength/2
        if (relativeX <= buttonHalf){
            resetDrawing();
            if(bigBar.color != '#B48777' && settings.bigBarModulus != 100){
                bigBar.color = '#B48777';
                settings.bigBarModulus = 100;
            }
            else{
                bigBar.color = '#FFB81C';
                settings.bigBarModulus = 200;
            }
        } else {
            resetDrawing();
            if(smallBar.color != '#B48777' && settings.smallBarModulus != 100){
                smallBar.color = '#B48777';
                settings.smallBarModulus = 100;
            }
            else{
                smallBar.color = '#747474';
                settings.smallBarModulus = 200;
            }
        }
    });
    let changeMetal = document.getElementById('changeMatToMetal');
    changeMetal.addEventListener('click', function(event) {
        // Calculate the relative position of the mouse click
        var mouseX = event.clientX;
        var mouseY = event.clientY;

        var buttonRect = changeMetal.getBoundingClientRect();
        var relativeX = mouseX - buttonRect.left;
        var relativeY = mouseY - buttonRect.top;

        console.log('Relative position:', relativeX, relativeY);
        var buttonLength = buttonRect.right - buttonRect.left;
        var buttonHalf = buttonLength/2
        if (relativeX <= buttonHalf){
            resetDrawing();
            if(bigBar.color != '#CCC9C9' && settings.bigBarModulus != 300){
                bigBar.color = '#CCC9C9';
                settings.bigBarModulus = 300;
            }
            else{
                bigBar.color = '#FFB81C';
                settings.bigBarModulus = 200;
            }
        } else {
            resetDrawing();
            if(smallBar.color != '#CCC9C9' && settings.smallBarModulus != 300){
                smallBar.color = '#CCC9C9';
                settings.smallBarModulus = 300;
            }
            else{
                smallBar.color = '#747474';
                settings.smallBarModulus = 200;
            }
        }
    });
    let changeLog = document.getElementById('changeMatToLog');
    changeLog.addEventListener('click', function(event) {
        // Calculate the relative position of the mouse click
        var mouseX = event.clientX;
        var mouseY = event.clientY;

        var buttonRect = changeLog.getBoundingClientRect();
        var relativeX = mouseX - buttonRect.left;
        var relativeY = mouseY - buttonRect.top;

        console.log('Relative position:', relativeX, relativeY);
        var buttonLength = buttonRect.right - buttonRect.left;
        var buttonHalf = buttonLength/2
        if (relativeX <= buttonHalf){
            resetDrawing();
            if(bigBar.color != '#724D3F' && settings.bigBarModulus != 400){
                bigBar.color = '#724D3F';
                settings.bigBarModulus = 400;
            }
            else{
                bigBar.color = '#747474';
                settings.bigBarModulus = 200;
            }
        } else {
            resetDrawing();
            if(smallBar.color != '#B48777' && settings.smallBarModulus != 400){
                smallBar.color = '#B48777';
                settings.smallBarModulus = 400;
            }
            else{
                smallBar.color = '#747474';
                settings.smallBarModulus = 200;
            }
        }
    });
    let changeSteel = document.getElementById('changeMatToSteel');
    changeSteel.addEventListener('click', function(event) {
        // Calculate the relative position of the mouse click
        var mouseX = event.clientX;
        var mouseY = event.clientY;

        var buttonRect = changeSteel.getBoundingClientRect();
        var relativeX = mouseX - buttonRect.left;
        var relativeY = mouseY - buttonRect.top;

        console.log('Relative position:', relativeX, relativeY);
        var buttonLength = buttonRect.right - buttonRect.left;
        var buttonHalf = buttonLength/2
        if (relativeX <= buttonHalf){
            resetDrawing();
            if(bigBar.color != '#000000' && settings.bigBarModulus != 500){
                bigBar.color = '#000000';
                settings.bigBarModulus = 500;
            }
            else{
                bigBar.color = '#FFB81C';
                settings.bigBarModulus = 200;
            }
        } else {
            resetDrawing();
            if(smallBar.color != '#000000' && settings.smallBarModulus != 500){
                smallBar.color = '#000000';
                settings.smallBarModulus = 500;
            }
            else{
                smallBar.color = '#747474';
                settings.smallBarModulus = 200;
            }
        }
    });
    let changeRuby = document.getElementById('changeMatToRuby');
    changeRuby.addEventListener('click', function(event) {
        // Calculate the relative position of the mouse click
        var mouseX = event.clientX;
        var mouseY = event.clientY;

        var buttonRect = changeRuby.getBoundingClientRect();
        var relativeX = mouseX - buttonRect.left;
        var relativeY = mouseY - buttonRect.top;

        console.log('Relative position:', relativeX, relativeY);
        var buttonLength = buttonRect.right - buttonRect.left;
        var buttonHalf = buttonLength/2
        if (relativeX <= buttonHalf){
            resetDrawing();
            if(bigBar.color != '#FD0606' && settings.bigBarModulus != 600){
                bigBar.color = '#FD0606';
                settings.bigBarModulus = 600;
            }
            else{
                bigBar.color = '#FFB81C';
                settings.bigBarModulus = 200;
            }
        } else {
            resetDrawing();
            if(smallBar.color != '#FD0606' && settings.smallBarModulus != 600){
                smallBar.color = '#FD0606';
                settings.smallBarModulus = 600;
            }
            else{
                smallBar.color = '#747474';
                settings.smallBarModulus = 200;
            }
        }
    });

    forces[0] = [createVector(bigBar.x + bigBar.width, bigBar.y),  createVector(10 * 3, 0), 'coral']
    console.log("x: " + forces[0][0].x, "y: " + forces[0][0].y)

    textFont(font);
    textSize(20);
    snapInput = select('#snapInterval');
    bigBarWidth = select('#bigBarWidth');
    smallBarWidth = select('#smallBarWidth');



    /*
    // For interacting with elements outside the canvas

    youngsModulus = select('#youngsModulus');
    arrowForce = select('#arrowForce');
    crossArea = select('#crossArea');

    // pivotPointWall = select('#pivotPointWall');

    givenAngle = select('#givenAngle');


    arrowPoint = select('#arrowPoint');
    */

    snapInput.input(function () {
        console.log("snapInput: " + snapInput.value());
        settings.snapValue = snapInput.value();
        console.log("settings.snapValue: " + settings.snapValue);

        if(settings.snapValue == 0) {
            settings.snapValue = 1;
        }
    });

    bigBarWidth.input(function () {
        // Debugging
        // console.log("bigBarwidth: " + bigBarWidth.value());
        // console.log("settings.bigBarWidth: " + settings.bigBarWidth);
        // console.log("bigBar.width: " + bigBar.width);
        settings.bigBarWidth = parseFloat(bigBarWidth.value());
        bigBar.width = settings.bigBarWidth / 20;
        updateForces();
    });


    smallBarWidth.input(function() {

        settings.smallBarWidth = parseFloat(pivotPointBar.value());


        // Debugging
        // console.log("pivotPointBar: " + pivotPointBar.value());
        // console.log("settings.ropeDistance: " + settings.ropeDistance);
        // console.log("temp: " + temp);
        // console.log("smallBar.width + smallBar.x: " + smallBar.width + smallBar.x);
        // console.log("bigBar.x: " + bigBar.x);
    });

    /*


    givenAngle.input(function () {
        pivotPointWall = pivotPointBar.value() * Math.tan((givenAngle.value() * Math.PI) / 180);



        let temp = -(pivotPointWall/20 - bigBar.y);
        if (temp < bigBar.y){
            smallBar.y = temp
            settings.ropeHeight = parseFloat(pivotPointWall);
        } else {
            smallBar.y = bigBar.y;
        }
    });




    // pivotPointWall.input(function() {

    //     let temp = -(pivotPointWall.value()/20 - bigBar.y);
    //     if(temp < bigBar.y){
    //         smallBar.y = temp
    //         settings.ropeHeight = parseFloat(pivotPointWall.value());
    //     } else {
    //         smallBar.y = bigBar.y;
    //     }

    //     // Debugging
    //     // console.log("pivotPointWall: " + pivotPointWall.value());
    //     // console.log("settings.ropeHeight: " + settings.ropeHeight);
    //     // console.log("temp: " + temp);
    //     // console.log("smallBar.y: " + smallBar.y);
    //     // console.log("bigBar.y: " + bigBar.y);
    // });




    arrowPoint.input(function() {
        forces[0][0].x = parseFloat(arrowPoint.value())/20 + bigBar.x;
        settings.angleDistance = parseFloat(arrowPoint.value());
    });

    crossArea.input(function () {
        if (crossArea.value() != 0) {
            inputOfCrossArea = true;
        } else {
            inputOfCrossArea = false;
        }
    });

    youngsModulus.input(function () {
        settings.greyRopeModulus = parseFloat(youngsModulus.value());
    });

    arrowForce.input(function() {
        if(arrowForce.value() > 0){
            forces[0][1].y = parseFloat(arrowForce.value()) * 2;
        } else {
            forces[0][1].y = 0;
        }
    });
    */



}

let deformationGrey = 0;

function changeDrawing() {

    downward = []
    downwardDistances = []

    forces.forEach(force => {
        downward.push(parseFloat((force[1].y/2).toFixed(1)))
        downwardDistances.push(round((force[1].x/3).toFixed(1) / 0.5) * 0.5)
    });
    console.log(downward)
    console.log(downwardDistances)


    document.getElementById('forceCable').textContent = ropeForce.toFixed(4) + 'kN';
    document.getElementById('deformationCable').textContent = deformationGrey.toFixed(4) + 'mm';

    if (atan2(bigBar.change, settings.bigBarWidth) > 5){
        alert(
            "Too much deflection. Since the angle generated from the force is greater than 5°, this simulation does not have accurate values. Take the results with that in mind."
        )
    }

    alert(
        "Force in Cable: " + internalHanging(ropeLength, settings.ropeHeight, settings.ropeDistance, downward, [], downwardDistances, []) + "\n" +
        "Deformation Grey: " + deformationGrey + "\n" +
        "Deflection at pivot point: " + deflectionB + "\n" +
        "Deflection at end of bar: " + (bigBar.change) + "\n" +
        "Deflection at force point: " + deflectionForce
        );
}

function resetDrawing() {
    bigBar.change = 0;
    bigBar.animation = false;

    smallBar.change = 0;
    smallBar.animation = false;

    deformationGrey = 0;
    t = 0;

}


function easing(x) {
    return 1 - Math.pow(1 - x, 3);
}

function addForce() {
    forces[1] = [createVector(bigBar.x + bigBar.width + smallBar.width, bigBar.y),  createVector(15 * 3, 0), 'crimson']
    settings.angle2Distance = settings.bigBarWidth + settings.smallBarWidth
    console.log("x: " + forces[1][0].x, "y: " + forces[1][0].y)
}

function removeForce() {
    forces.splice(1, 1)
}

function updateForces(){
    forces.forEach((force, index) => {
        if(force[0].y != bigBar.y){
            force[0].y = bigBar.y;
        }
        if(force[0].x > bigBar.x + bigBar.width + smallBar.width){
            force[0].x = bigBar.x + bigBar.width + smallBar.width
            if(index == 0){
                settings.angle1Distance = settings.bigBarWidth + settings.smallBarWidth
                console.log(settings.angle1Distance)
            } else {
                settings.angle2Distance = settings.bigBarWidth + settings.smallBarWidth
                console.log(settings.angle2Distance)
            }
        }
    });

}

function mouseReleased() {
    forces.forEach(force => {
        force[3] = false;
        force[4] = false;
    });
    active = false;
    heightChange = false;
    distanceChange = false;
    barChange = false;
    lengthChange = false;
}


function changeMaterialToWood(x, y){
    resetDrawing();
    if(smallBar.color != '#B48777' && settings.greyRopeModulus != 100){
        smallBar.color = '#B48777';
        settings.greyRopeModulus = 100;
    }
    else{
        smallBar.color = '#747474';
        settings.greyRopeModulus = 200;
    }

    // Get the element's position relative to the document
    var elementRect = clickableElement.getBoundingClientRect();
    var elementX = elementRect.left;
    var elementY = elementRect.top;

    // Calculate the mouse position relative to the element
    var relativeX = x - elementX;
    var relativeY = y - elementY;

    console.log('Mouse clicked at:', relativeX, relativeY);
}

function changeMaterialToMetal(){
    resetDrawing();
    if(smallBar.color != '#CCC9C9' && settings.greyRopeModulus != 300){
        smallBar.color = '#CCC9C9';
        settings.greyRopeModulus = 300;
    }
    else{
        smallBar.color = '#747474';
        settings.greyRopeModulus = 200;
    }
}

function changeMaterialToLog(){
    resetDrawing();
    if(smallBar.color != '#724D3F' && settings.greyRopeModulus != 400){
        smallBar.color = '#724D3F';
        settings.greyRopeModulus = 400;
    }
    else{
        smallBar.color = '#747474';
        settings.greyRopeModulus = 200;
    }
}

function changeMaterialToSteel(){
    resetDrawing();
    if(smallBar.color != '#000000' && settings.greyRopeModulus != 500){
        smallBar.color = '#000000';
        settings.greyRopeModulus = 500;
    }
    else{
        smallBar.color = '#747474';
        settings.greyRopeModulus = 200;
    }
}

function changeMaterialToRuby(){
    resetDrawing();
    if(smallBar.color != '#FD0606' && settings.greyRopeModulus != 600){
        smallBar.color = '#FD0606';
        settings.greyRopeModulus = 600;
    }
    else{
        smallBar.color = '#747474';
        settings.greyRopeModulus = 200;
    }
}

function curlyBracket(length){
    mid = length/2
    mid += 20
    noFill();
    bezier(0, 0, 20, 0, 0, length/2, 20, length/2)
    bezier(20, length/2, 0, length/2, 20, length, 0, length)
}

function draw() {
    background('#D9D9D9');

    fill(wall.color);
    stroke('#000000');
    strokeWeight(1);
    strokeCap(SQUARE);
    rect(wall.x,wall.y,wall.width,wall.height);


    // bigBar

    stroke(bigBar.color);
    strokeWeight(bigBar.height/3);
    if(bigBar.animation && t < 1){
        t += 0.035

    } else {
        stroke(bigBar.color + '80');
        line(bigBar.x, bigBar.y, bigBar.x+bigBar.width, bigBar.y)
        stroke(bigBar.color);
        line(bigBar.x, bigBar.y, bigBar.x+bigBar.width, bigBar.y+(bigBar.change/10))
    }

    stroke(smallBar.color);
    strokeWeight(smallBar.height/3);
    if(smallBar.animation && t < 1){
        line(bigBar.x + bigBar.width, smallBar.y, bigBar.x + bigBar.width+smallBar.width, (bigBar.y)+(smallBar.change/10*easing(t)))
    } else {
        stroke(smallBar.color + '80');
        line(bigBar.x + bigBar.width, smallBar.y, bigBar.x + bigBar.width+smallBar.width, (bigBar.y))
        stroke(smallBar.color)
        line(bigBar.x + bigBar.width, smallBar.y, bigBar.x + bigBar.width+smallBar.width, (bigBar.y)+(smallBar.change/10))
    }

    resetMatrix()


    // Force values
    if(!bigBar.animation){

        forces.forEach(force => {
            drawArrow(force[0], force[1], force[2])

        });

        forces.forEach((force,index) => {
            if (force[1].x >= 0){
                if(dist(mouseX, mouseY, force[0].x + force[1].x + 15, force[0].y) < 9){
                    strokeWeight(0)
                    fill(255, 255, 200, 175);
                    circle(force[0].x + force[1].x + 15, force[0].y, 20);
                    if(mouseIsPressed & !active){
                        force[3] = true;
                        active = true;
                    }
                }
            } else {
                if(dist(mouseX, mouseY, force[0].x + force[1].x - 15, force[0].y) < 9){
                    strokeWeight(0)
                    fill(255, 255, 200, 175);
                    circle(force[0].x + force[1].x - 15, force[0].y, 20);
                    if(mouseIsPressed & !active){
                        force[3] = true;
                        active = true;
                    }
                }
            }
            if (force[1].x >= 0){
                if(mouseY > force[0].y - 7.5 && mouseY < force[0].y + 7.5 &&
                    mouseX > force[0].x + 10 && mouseX < force[0].x + force[1].x - 10){
                    drawArrow(force[0], force[1], 'tomato');
                    strokeWeight(0)
                    fill(255, 255, 200, 175);
                    if(mouseIsPressed & !active){
                        force[4] = true;
                        active = true;
                    }
                }
            }
            if(force[4]){
                drawArrow(force[0], force[1], 'orangered');
                if(mouseX > bigBar.x && mouseX < bigBar.x + bigBar.width + smallBar.width){
                    force[0].x = mouseX;
                } else if (mouseX > bigBar.x + bigBar.width + smallBar.width){
                    force[0].x = bigBar.x + bigBar.width + smallBar.width
                } else if (mouseX < bigBar.x){
                    force[0].x = bigBar.x
                }

                console.log(index);

                if (index == 0){
                    settings.angle1Distance = Math.round((force[0].x - 170) * 20 / settings.snapValue) * settings.snapValue
                } else {
                    settings.angle2Distance = Math.round((force[0].x - 170) * 20 / settings.snapValue) * settings.snapValue
                }
            }

            push()
            if(displayForce || force[4]){
                // Distance of rope
                resetMatrix()
                strokeWeight(0)
                fill('black')
                stroke('black')
                textAlign(CENTER)
                translate(bigBar.x, bigBar.y)
                angular = atan2(((bigBar.y)+((smallBar.change/10)*easing(t))) - bigBar.y, (bigBar.x + bigBar.width+smallBar.width) - bigBar.x);
                rotate(angular);
                if(index == 0){
                    text(settings.angle1Distance.toFixed(2) + 'mm', (dist(bigBar.x, bigBar.y, force[0].x, force[0].y))/2, -25);
                } else if (!displayForce) {
                    text(settings.angle2Distance.toFixed(2) + 'mm', (dist(bigBar.x, bigBar.y, force[0].x, force[0].y))/2, -25);
                } else {
                    text(settings.angle2Distance.toFixed(2) + 'mm', (dist(bigBar.x, bigBar.y, force[0].x, force[0].y))/2, -65);
                }

                strokeWeight(1.5)
                rotate(-90)
                translate(0, 0)
                if (displayForce && index == 1){
                    translate(40, 0)
                    curlyBracket(dist(bigBar.x, bigBar.y, force[0].x, force[0].y))
                    translate(0,0);
                } else{
                    curlyBracket(dist(bigBar.x, bigBar.y, force[0].x, force[0].y))
                }

                resetMatrix()
            }
            pop()

            if(displayData || force[3] || displayForce){
                strokeWeight(0);
                fill(0, 0, 0, 250);
                text(round((force[1].x/3).toFixed(1) / 0.5) * 0.5 + " kN", force[0].x + (force[1].x/3/2), (force[0].y + 35));
            }

            if (force[3]){
                strokeWeight(0);
                fill(255, 255, 200, 250);
                if(force[1].x >= 0){
                    circle(force[0].x + force[1].x + 15, force[0].y, 25);
                } else {
                    circle(force[0].x + force[1].x - 15, force[0].y, 25);
                }
                if(mouseX <= force[0].x){
                    force[1] = createVector(-(force[0].x - mouseX - 15), 0)
                } else {
                    force[1] = createVector((mouseX - 15) - force[0].x, 0)
                }
            }
        });
    }
    resetMatrix();

    // Change values
    if(!bigBar.animation){


        // Rope Distance
        if(dist(mouseX, mouseY, bigBar.x + bigBar.width + smallBar.width, bigBar.y) < 15){
            strokeWeight(0)
            fill(255, 255, 150, 180);
            circle(bigBar.x + bigBar.width + smallBar.width, bigBar.y, 24);
            if(mouseIsPressed && !active){
                distanceChange = true
                active = true
            }
        }
        if(distanceChange){
            strokeWeight(0);
            fill(255, 200, 90, 255);
            circle(bigBar.x + (settings.bigBarWidth/20) + smallBar.width, bigBar.y, 24);
            if(mouseX > bigBar.x + (settings.bigBarWidth/20) && mouseX < 600){
                smallBar.width = mouseX - bigBar.x - bigBar.width;
                settings.smallBarWidth = Math.round(dist(mouseX, smallBar.y, bigBar.x + bigBar.width, smallBar.y) * 20 / settings.snapValue) * settings.snapValue;
            } else if(mouseX < bigBar.x + (settings.bigBarWidth/20)){
                smallBar.width = 10;
                settings.smallBarWidth = Math.round(dist(bigBar.x + bigBar.width, smallBar.y, bigBar.x + bigBar.width + smallBar.width, smallBar.y) * 20 / settings.snapValue) * settings.snapValue;;
            } else if(mouseX > 600){
                smallBar.width = 600 - bigBar.x - bigBar.width;
                settings.smallBarWidth = Math.round(dist(bigBar.x + bigBar.width, smallBar.y, bigBar.x + bigBar.width + smallBar.width, smallBar.y) * 20 / settings.snapValue) * settings.snapValue;
            }
            updateForces()
        }


        // Bar Length
        if(dist(mouseX, mouseY, bigBar.x + bigBar.width, bigBar.y) < 10){
            strokeWeight(0)
            fill(255, 255, 150, 180);
            circle(bigBar.x + bigBar.width, bigBar.y, 15);
            if(mouseIsPressed && !active){
                lengthChange = true
                active = true
            }
        }
        if(lengthChange){
            strokeWeight(0);
            fill(255, 200, 90, 255);
            circle(bigBar.x + bigBar.width, bigBar.y, 15);
            if(mouseX > 550){
                bigBar.width = 550 - bigBar.x;
                settings.bigBarWidth = Math.round(dist(bigBar.x, bigBar.y, bigBar.x + bigBar.width, bigBar.y) * 20 / settings.snapValue) * settings.snapValue;
            }
            else if(mouseX < bigBar.x + 5){
                bigBar.width = 5;
                settings.bigBarWidth = 100;
            } else {
                bigBar.width = mouseX - bigBar.x;
                console.log()
                settings.bigBarWidth = Math.round(dist(bigBar.x, bigBar.y, bigBar.x + bigBar.width, bigBar.y) * 20 / settings.snapValue) * settings.snapValue;
            }


        }



    }



    // After animation
    if(smallBar.animation && t >= 1){
        resetMatrix()
        strokeWeight(0)
        fill('black')
        translate(bigBar.x + bigBar.width, bigBar.y)
        text((bigBar.change).toFixed(2) + 'mm', 25, bigBar.change/10/2 + 5);
        strokeWeight(1.5)
        curlyBracket(bigBar.change/10)
    }

    push()

    if(displayData || lengthChange){
        //Yellow Bar
        resetMatrix()
        strokeWeight(0)
        fill('black')
        textAlign(CENTER)
        angular = atan2(bigBar.y+(bigBar.change/10*easing(t)) - bigBar.y, bigBar.x+bigBar.width - bigBar.x);
        translate(bigBar.x+bigBar.width, bigBar.y+(bigBar.height/3/2)+(bigBar.change/10*easing(t)))
        rotate(angular);
        text((settings.bigBarWidth).toFixed(2) + 'mm', -(bigBar.width/2), 40);
        strokeWeight(1.5)
        translate(0, 0)
        rotate(90)
        curlyBracket(dist(bigBar.x, bigBar.y, bigBar.x+bigBar.width,bigBar.y+(bigBar.change/10*easing(t))))
        resetMatrix()
    }

    if(displayData || distanceChange){
        // Distance of rope
        resetMatrix()
        strokeWeight(0)
        fill('black')
        stroke('black')
        textAlign(CENTER)
        translate(bigBar.x + bigBar.width, smallBar.y)
        angular = atan2(((bigBar.y)+(smallBar.change/10*easing(t))) - bigBar.y, (bigBar.x + bigBar.width+smallBar.width) - bigBar.x);
        rotate(angular);
        text((settings.smallBarWidth).toFixed(2) + 'mm', smallBar.width/2, -25);
        strokeWeight(1.5)
        rotate(-90)
        translate(0, 0)
        curlyBracket(settings.smallBarWidth/20)

        resetMatrix()
    }
    pop()


    // // Hover feature Test
    // if (mouseX > bigBar.x && mouseX < bigBar.x + bigBar.width && mouseY > bigBar.y && mouseY < bigBar.y + bigBar.height)

    snapInput.value(settings.snapValue);
    bigBarWidth.value(settings.bigBarWidth);
    smallBarWidth.value(settings.smallBarWidth);
    // Added by Joseph
    // For interacting with elements outside the canvas
        /*
        givenAngle.value(parseFloat((Math.atan(settings.ropeHeight/settings.ropeDistance) * 180 / Math.PI).toFixed(2)));


        arrowPoint.value(settings.angleDistance);

        if(inputOfCrossArea == false){
            crossArea.value(cylinderCrossArea(smallBar.height/2).toFixed(2));
        }
        youngsModulus.value(settings.greyRopeModulus);
        arrowForce.value(forces[0][1].y / 2);

        */

}

// For Exit button
const exitButton = document.getElementById('exit-button');
exitButton.addEventListener('click', () => {
    window.location.href = "../index.html";
});

// Joseph
// For Switching materials in the materialSelect
const materialElements = document.querySelectorAll('.material');
materialElements.forEach((element) => {
    element.addEventListener('click', () => {
        let active;
        if (element.classList.contains('active')) {
            active = true;
        }
        materialElements.forEach((el) => {
            el.classList.remove('active');
        });
        if (active == true) {
            element.classList.remove('active');
        } else {
            element.classList.add('active');
        }
    });
});

// Joseph
// For Switching the materialSelect tabs
function openTabs(evt, tabName) {
    let i, tabContent, tabLinks;

    tabContent = document.getElementsByClassName("tab");
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tabLinks.length; i++) {
      tabLinks[i].classList.remove("active");

    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
  }

// For disabling snap when off
const snapCheckbox = document.getElementById('snapToggle');
const intervalContainer = document.getElementById('intervalContainer');
snapCheckbox.addEventListener('click', () => {
    if (snapCheckbox.checked) {
        intervalContainer.classList.add('active');
    } else {
        settings.snapValue = 1;
        intervalContainer.classList.remove('active');
    }
});

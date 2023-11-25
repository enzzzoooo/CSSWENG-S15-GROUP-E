// For interacting with the elements outside of the canvas
let yellowBarWidth;
let youngsModulus;
let forceMagnitude;
let crossArea;
let pivotPointWall;
let givenAngle;
let pivotPointBar;
let forcePoint;
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

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
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

function drawStrokedLine(x1, y1, x2, y2, lineHeight, strokecolor){
    push();
    stroke(strokecolor)
    strokeWeight(lineHeight + 1)
    line(x1 - 0.5, y1, x2 + 0.5, y2)
    pop();
}

function drawArrow(base, vec, myColor, size) {
    push();
    stroke(myColor);
    strokeWeight(size);
    fill(myColor);
    translate(base.x, base.y);
    if(vec.x >= 0){
        line(0, 0, vec.x, vec.y - 15);
    } else {
        line(0, 0, vec.x, vec.y + 15)
    }
    rotate(vec.heading());
    let arrowSize = 12/5;
    translate(vec.mag() - arrowSize - 15, 0);
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
    ropeCrossArea: Math.round((cylinderCrossArea(25) + Number.EPSILON) * 100) / 100,
    ropeAwayFromWall: 0,
    yellowBarWidth: 6000,
    ropeModulus: 200,
    snapValue: 50,
    forceDistance: 6000,
    forceMagnitude: 39,
    ropeMaterial: 1
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

// rope
let rope = {
    x: 230 - canvasOrigin.x,
    y: yellowBar.y - settings.ropeHeight/20,
    change: 0,
    animation: false,
    width: settings.ropeDistance / 20,
    height: 50,
    color: '#bbdbf0',
    angle: 28.42
}

let t = 0;

let forces = []
let active = false;
let displayData = false;
let displayForce = false;
let heightChange = false;
let distanceChange = false;
let barChange = false;
let lengthChange = false;
let inputOfCrossArea = false;

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
        console.log((rope.x + yellowBar.x + yellowBar.width) / 2)
        console.log((rope.y + yellowBar.y) / 2 + 20)
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


    let changeWood = document.getElementById('changeMatToWood');
    changeWood.addEventListener('click', function(event) {
        resetDrawing();
        rope.color = '#B48777';
        settings.ropeModulus = 15;
    });
    let changeMetal = document.getElementById('changeMatToMetal');
    changeMetal.addEventListener('click', function(event) {
        resetDrawing();
        rope.color = '#CCC9C9';
        settings.ropeModulus = 69;
    });
    let changeBronze = document.getElementById('changeMatToBronze');
    changeBronze.addEventListener('click', function(event) {
        resetDrawing();
        rope.color = '#724D3F';
        settings.ropeModulus = 100
    });
    let changeSteel = document.getElementById('changeMatToSteel');
    changeSteel.addEventListener('click', function(event) {
        resetDrawing();
        rope.color = '#bbdbf0';
        settings.ropeModulus = 200;
    });
    let changeNylon = document.getElementById('changeMatToNylon');
    changeNylon.addEventListener('click', function(event) {
        resetDrawing();
        rope.color = '#FD0606';
        settings.ropeModulus = 2;
    });


    forces[0] = [createVector(yellowBar.x + yellowBar.width, yellowBar.y),  createVector(0, 150), 'coral']
    console.log("x: " + forces[0][0].x, "y: " + forces[0][0].y)

    textFont(font);
    textSize(20);


    // For interacting with elements outside the canvas
    yellowBarWidth = select('#yellowBarWidth');
    youngsModulus = select('#youngsModulus');
    forceMagnitude = select('#forceMagnitude');
    crossArea = select('#crossArea');

    // pivotPointWall = select('#pivotPointWall');

    givenAngle = select('#givenAngle');

    pivotPointBar = select('#pivotPointBar');
    forcePoint = select('#forcePoint');

    snapInput = select('#snapInterval');

    givenAngle.input(function () {
        pivotPointWall = pivotPointBar.value() * Math.tan((givenAngle.value() * Math.PI) / 180);
        let temp = -(pivotPointWall/20 - yellowBar.y);
        if (temp < yellowBar.y){
            rope.y = temp
            settings.ropeHeight = parseFloat(pivotPointWall);
        } else {
            rope.y = yellowBar.y;
            settings.ropeHeight = 0;
        }
    });

    snapInput.input(function () {
        settings.snapValue = snapInput.value();

        if(settings.snapValue == 0) {
            settings.snapValue = 1;
        }
    });


    pivotPointBar.input(function() {
        let temp = pivotPointBar.value()/20 + yellowBar.x - rope.x;

        if(temp + rope.x > yellowBar.x){
            rope.width = temp
            settings.ropeDistance = parseFloat(pivotPointBar.value());
        } else {
            rope.width = yellowBar.x;
        }
    });

    yellowBarWidth.input(function () {

        settings.yellowBarWidth = parseFloat(yellowBarWidth.value());
        yellowBar.width = settings.yellowBarWidth / 20;
        updateForces();
    });

    forcePoint.input(function() {
        if(forcePoint.value() > 0){
            forces[0][0].x = parseFloat(forcePoint.value())/20 + yellowBar.x;
            settings.forceDistance = parseFloat(forcePoint.value());
        } else {
            settings.forceDistance = 0
        }

    });

    crossArea.input(function () {
        if(crossArea.value() > 0){
        settings.ropeCrossArea = parseFloat(crossArea.value());
        } else {
            settings.ropeCrossArea = 0;
        }
    });

    youngsModulus.input(function () {
        settings.ropeModulus = parseFloat(youngsModulus.value());
    });

    forceMagnitude.input(function() {
        if(forceMagnitude.value() > 0){
            forces[0][1].y = parseFloat(forceMagnitude.value()) * 5;
            if (forces[0][1].y >= 150){
                forces[0][1].y = 150;
            }
            settings.forceMagnitude = parseFloat(forceMagnitude.value())
        } else {
            forces[0][1].y = 1;
            settings.forceMagnitude = 0
        }
    });
}

let deformationGrey = 0;

function changeDrawing() {

    document.getElementById('change-drawing').setAttribute("disabled", "true");

    downward = []
    downwardDistances = []

    forces.forEach(force => {
        downward.push(parseFloat(settings.forceMagnitude))
        downwardDistances.push(settings.forceDistance)
    });
    console.log(downward)
    console.log(downwardDistances)


    ropeLength = pythagorean(parseFloat(settings.ropeHeight), parseFloat(settings.ropeDistance))
    console.log(ropeLength)
    // Changed by Joseph
    ropeForce = internalHanging(ropeLength, settings.ropeHeight, parseFloat(settings.ropeDistance), downward, [], downwardDistances, [])
    deformationGrey = deformation(ropeForce, ropeLength, crossArea.value(), parseFloat(settings.ropeModulus));
    console.log("Cross Area: " + crossArea.value())
    console.log(deformationGrey)
    yellowBar.change = parseFloat(settings.yellowBarWidth) * ropeLength / parseFloat(settings.ropeHeight) / parseFloat(settings.ropeDistance) * deformationGrey;
    console.log(yellowBar.change)
    yellowBar.animation = true;

    rope.change = (yellowBar.change*rope.width/yellowBar.width)
    rope.animation = true;

    deflectionB = rope.change
    deflectionForce = yellowBar.change * parseFloat(settings.forceDistance) / parseFloat(settings.yellowBarWidth);
    // Displaying Results
    document.getElementById('forceCable').textContent = ropeForce.toFixed(2) + 'kN';
    document.getElementById('deformationCable').textContent = deformationGrey.toFixed(4) + 'mm';
    document.getElementById('deflectionAtPointB').textContent = deflectionB.toFixed(4) + 'mm';
    document.getElementById('deflectionAtPointEnd').textContent = (yellowBar.change).toFixed(4) + 'mm';
    document.getElementById('deflectionAtPointForce').textContent = deflectionForce.toFixed(4) + 'mm';
    document.getElementById('angleBar').textContent = atan2(yellowBar.change, settings.yellowBarWidth).toFixed(2) + '°';

    warning = false;

    if (atan2(yellowBar.change, settings.yellowBarWidth) >= 5){
        const popupText = document.getElementById('popup-text');
        popupText.textContent = "Too much deflection. Since the angle generated from the force reaches 5°, this simulation is not entirely accurate. Take the results with that in mind.";

        const popup = document.getElementById('sim-error-popup-wrapper');
        popup.style.display = 'flex';

        const exitButton = document.getElementById('close-error-popup');
        exitButton.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }

    alert(
        "Force in Cable: " + internalHanging(ropeLength, settings.ropeHeight, settings.ropeDistance, downward, [], downwardDistances, []) + "\n" +
        "Deformation Grey: " + deformationGrey + "\n" +
        "Deflection at pivot point: " + deflectionB + "\n" +
        "Deflection at end of bar: " + (yellowBar.change) + "\n" +
        "Deflection at force point: " + deflectionForce
        );


    var button = document.getElementById('change-drawing');
    button.removeEventListener('click', changeDrawing);
    button.classList.add('disabled');
}

function resetDrawing() {
    var button = document.getElementById('change-drawing');
    button.addEventListener('click', changeDrawing);
    button.classList.remove('disabled')

    document.getElementById('forceCable').textContent = "";
    document.getElementById('deformationCable').textContent = "";
    document.getElementById('deflectionAtPointB').textContent = "";
    document.getElementById('deflectionAtPointEnd').textContent = "";
    document.getElementById('deflectionAtPointForce').textContent = "";
    document.getElementById('angleBar').textContent = "";

    yellowBar.change = 0;
    yellowBar.animation = false;

    rope.change = 0;
    rope.animation = false;

    deformationGrey = 0;
    t = 0;

}


function easing(x) {
    return 1 - Math.pow(1 - x, 3);
}

function updateForces(){
    forces.forEach(force => {
        if(force[0].y != yellowBar.y){
            force[0].y = yellowBar.y;
        }
        if(force[0].x > yellowBar.x + yellowBar.width){
            force[0].x = yellowBar.x + yellowBar.width
            settings.forceDistance = settings.yellowBarWidth
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


    // yellowBar


    // After animation

    resetMatrix()

    stroke(yellowBar.color);
    strokeWeight(yellowBar.height/3);
    if(yellowBar.animation && t < 1){
        t += 0.035
        drawStrokedLine(yellowBar.x, yellowBar.y, yellowBar.x+yellowBar.width, yellowBar.y+(yellowBar.change/3*easing(t)), yellowBar.height/3, 'black');
        stroke(yellowBar.color)
        line(yellowBar.x, yellowBar.y, yellowBar.x+yellowBar.width, yellowBar.y+(yellowBar.change/3*easing(t)))
    } else {
        stroke(yellowBar.color + '80');
        line(yellowBar.x, yellowBar.y, yellowBar.x+yellowBar.width, yellowBar.y)
        stroke(yellowBar.color);
        drawStrokedLine(yellowBar.x, yellowBar.y, yellowBar.x+yellowBar.width, yellowBar.y+(yellowBar.change/3), yellowBar.height/3, 'black');
        line(yellowBar.x, yellowBar.y, yellowBar.x+yellowBar.width, yellowBar.y+(yellowBar.change/3))
    }

    stroke(rope.color);
    strokeWeight(rope.height/3);
    if(rope.animation && t < 1){
        drawStrokedLine(rope.x, rope.y, rope.x+rope.width, (yellowBar.y)+(rope.change/3*easing(t)), rope.height/3, 'black');
        line(rope.x, rope.y, rope.x+rope.width, (yellowBar.y)+(rope.change/3*easing(t)))
    } else {
        stroke(rope.color + '80');
        line(rope.x, rope.y, rope.x+rope.width, (yellowBar.y))
        stroke(rope.color)
        drawStrokedLine(rope.x, rope.y, rope.x+rope.width, yellowBar.y+(rope.change/3), (rope.height)/3, 'black')
        line(rope.x, rope.y, rope.x+rope.width, (yellowBar.y)+(rope.change/3))
    }

    strokeWeight(1);
    stroke('#000000');
    fill('#FFFFFF');
    circle(yellowBar.x, yellowBar.y, 30)
    circle(rope.x, rope.y, 25)
    if(rope.animation && t < 1){
        circle(rope.x+rope.width, (yellowBar.y)+rope.change/3*easing(t), 25)
    } else {
        stroke('#000000' + '80');
        fill('#FFFFFF' + '80');
        circle(rope.x+rope.width, (yellowBar.y), 25)
        stroke('#000000');
        fill('#FFFFFF');
        circle(rope.x+rope.width, (yellowBar.y)+(rope.change/3), 25)
    }
    resetMatrix()


    // Force values


    forces.forEach(force => {
        drawArrow(force[0], force[1], force[2], 12)

    });

    forces.forEach(force => {
        if(dist(mouseX, mouseY, force[0].x, force[0].y + force[1].y) < 10){
            strokeWeight(0)
            fill(255, 255, 200, 175);
            circle(force[0].x, force[0].y + force[1].y, 25);
            if(mouseIsPressed & !active){
                force[3] = true;
                active = true;
            }
        }

        if(mouseX > force[0].x - 7.5 && mouseX < force[0].x + 7.5 &&
            mouseY > force[0].y + 10 && mouseY < force[0].y + force[1].y - 10){
            drawArrow(force[0], force[1], 'tomato', 12);
            strokeWeight(0)
            fill(255, 255, 200, 175);
            if(mouseIsPressed & !active){
                force[4] = true;
                active = true;
            }
        }
        if(force[4]){
            drawArrow(force[0], force[1], 'orangered', 12);
            if(mouseX > yellowBar.x && mouseX < yellowBar.x + yellowBar.width){
                force[0].x = mouseX;
                settings.forceDistance = Math.round((force[0].x - 165) * 20 / settings.snapValue) * settings.snapValue
            } else if (mouseX > yellowBar.x + yellowBar.width){
                force[0].x = yellowBar.x + yellowBar.width
                settings.forceDistance = Math.round((force[0].x - 165) * 20 / settings.snapValue) * settings.snapValue
            } else if (mouseX < yellowBar.x){
                force[0].x = yellowBar.x
                settings.forceDistance = Math.round((force[0].x - 165) * 20 / settings.snapValue) * settings.snapValue
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
            translate(yellowBar.x, yellowBar.y)
            angular = atan2(((yellowBar.y)+((rope.change/3)*easing(t))) - yellowBar.y, (rope.x+rope.width) - yellowBar.x);
            rotate(angular);
            text(settings.forceDistance.toFixed(2) + 'mm', (dist(yellowBar.x, yellowBar.y, force[0].x, force[0].y))/2, -25);
            strokeWeight(1.5)
            rotate(-90)
            translate(0, 0)
            curlyBracket(dist(yellowBar.x, yellowBar.y, force[0].x, force[0].y))

            resetMatrix()
        }
        pop()

        if(displayData || force[3] || displayForce){
            strokeWeight(0);
            fill(0, 0, 0, 250);
            text(settings.forceMagnitude + " kN", force[0].x + 15, (force[0].y*2 + force[1].y)/2);
        }

        if (force[3]){
            strokeWeight(0);
            fill(255, 255, 200, 250);
                circle(force[0].x, force[0].y + force[1].y, 25);
            if(mouseY > yellowBar.y){
                force[1] = createVector(0, -(force[0].y - mouseY))
                settings.forceMagnitude = (Math.round(((force[1].y) / 5 ) / 0.5) * 0.5).toFixed(1)
            } if(mouseY < yellowBar.y + 2){
                force[1] = createVector(0, 5 / 5)
                settings.forceMagnitude = (Math.round((5 / 5 ) / 0.5) * 0.5).toFixed(1)
            }

            if(force[1].y >= 150) {
                force[1].y = 150;
            }
        }
    });

    resetMatrix();

    // Change values
    if(!yellowBar.animation){
        // Rope Height
        if(dist(mouseX, mouseY, rope.x, rope.y) < 15){
            strokeWeight(0)
            fill(255, 255, 150, 180);
            circle(rope.x, rope.y, 24);
            if(mouseIsPressed && !active){
                heightChange = true
                active = true
            }
        }
        if(heightChange){
            strokeWeight(0);
            fill(255, 200, 90, 255);
            circle(rope.x, rope.y, 24);
            if(mouseY < yellowBar.y){
                rope.y = mouseY;
                settings.ropeHeight = Math.round(dist(yellowBar.x, mouseY, yellowBar.x, yellowBar.y) * 20 / settings.snapValue) * settings.snapValue;
            } else if(mouseY > yellowBar.y){
                rope.y = yellowBar.y;
                settings.ropeHeight = dist(yellowBar.x, yellowBar.y, yellowBar.x, yellowBar.y) * 20;
            } if(mouseY < 15) {
                rope.y = 15;
                settings.ropeHeight = Math.round(dist(yellowBar.x, rope.y, yellowBar.x, yellowBar.y) * 20 / settings.snapValue) * settings.snapValue;
            }
        }


        // Rope Distance
        if(dist(mouseX, mouseY, rope.x + rope.width, yellowBar.y) < 15){
            strokeWeight(0)
            fill(255, 255, 150, 180);
            circle(rope.x + rope.width, yellowBar.y, 24);
            if(mouseIsPressed && !active){
                distanceChange = true
                active = true
            }
        }
        if(distanceChange){
            strokeWeight(0);
            fill(255, 200, 90, 255);
            circle(rope.x + rope.width, yellowBar.y, 24);
            if(mouseX > yellowBar.x && mouseX < yellowBar.x + yellowBar.width){
                rope.width = mouseX - yellowBar.x;
                settings.ropeDistance = Math.round(dist(mouseX, yellowBar.y, yellowBar.x, yellowBar.y) * 20 / settings.snapValue) * settings.snapValue;
            } else if(mouseX < yellowBar.x){
                rope.width = 0;
                settings.ropeDistance = dist(yellowBar.x, yellowBar.y, yellowBar.x, yellowBar.y) * 20;
            } else if(mouseX > yellowBar.x + yellowBar.width){
                rope.width = yellowBar.width;
                settings.ropeDistance = settings.yellowBarWidth
            }
        }


        // Yellow Bar Change
        if(dist(mouseX, mouseY, yellowBar.x, yellowBar.y) < 20){
            strokeWeight(0)
            fill(255, 255, 150, 180);
            circle(yellowBar.x, yellowBar.y, 29);
            if(mouseIsPressed && !active){
                barChange = true
                active = true
            }
        }
        if(barChange){
            strokeWeight(0);
            fill(255, 200, 90, 255);
            circle(yellowBar.x, yellowBar.y, 29);
            if(mouseY > rope.y && mouseY < 350){
                yellowBar.y = mouseY;
                settings.ropeHeight = Math.round(dist(yellowBar.x, mouseY, rope.x, rope.y) * 20 / settings.snapValue) * settings.snapValue;
                updateForces();
            } else if(mouseY < rope.y){
                yellowBar.y = rope.y;
                settings.ropeHeight = dist(yellowBar.x, yellowBar.y, rope.x, rope.y) * 20;
                updateForces();
            } if(mouseY > 350){
                yellowBar.y = 350;
                settings.ropeHeight = Math.round(dist(yellowBar.x, yellowBar.y, rope.x, rope.y) * 20 / settings.snapValue) * settings.snapValue;
                updateForces();
            }
        }

        // Bar Length
        if(dist(mouseX, mouseY, yellowBar.x + yellowBar.width, yellowBar.y) < 10){
            strokeWeight(0)
            fill(255, 255, 150, 180);
            circle(yellowBar.x + yellowBar.width, yellowBar.y, 15);
            if(mouseIsPressed && !active){
                lengthChange = true
                active = true
            }
        }
        if(lengthChange){
            strokeWeight(0);
            fill(255, 200, 90, 255);
            circle(yellowBar.x + yellowBar.width, yellowBar.y, 15);
            if(Math.round(dist(mouseX, yellowBar.y, yellowBar.x, yellowBar.y) * 20 / settings.snapValue) * settings.snapValue > 10000){
                yellowBar.width = (10000 / 20);
                settings.yellowBarWidth = 10000;
            }
            else if(mouseX > rope.x + rope.width){
                yellowBar.width = mouseX - yellowBar.x;
                settings.yellowBarWidth = Math.round(dist(mouseX, yellowBar.y, yellowBar.x, yellowBar.y) * 20 / settings.snapValue) * settings.snapValue;
                updateForces();
            } else if(mouseX < rope.x + rope.width){
                yellowBar.width = rope.width;
                settings.yellowBarWidth = settings.ropeDistance
                updateForces();
            }


        }



    }



    // After animation
    if(rope.animation && t >= 1){
        resetMatrix()
        strokeWeight(0)
        fill('black')
        translate(yellowBar.x + yellowBar.width, yellowBar.y)
        text((yellowBar.change).toFixed(2) + 'mm', 25, yellowBar.change/3/2 + 5);
        strokeWeight(1.5)
        drawArrow(createVector(15, 0), createVector(0, Math.max(25, yellowBar.change/3 + 10)), 'black', 5)
    }

    push()

    if(displayData || lengthChange){
        //Yellow Bar
        resetMatrix()
        strokeWeight(0)
        fill('black')
        textAlign(CENTER)
        angular = atan2(yellowBar.y+(yellowBar.change/3*easing(t)) - yellowBar.y, yellowBar.x+yellowBar.width - yellowBar.x);
        translate(yellowBar.x+yellowBar.width, yellowBar.y+(yellowBar.height/3/2)+(yellowBar.change/3*easing(t)))
        rotate(angular);
        text((settings.yellowBarWidth).toFixed(2) + 'mm', -(yellowBar.width/2), 40);
        strokeWeight(1.5)
        translate(0, 0)
        rotate(90)
        curlyBracket(dist(yellowBar.x, yellowBar.y, yellowBar.x+yellowBar.width,yellowBar.y+(yellowBar.change/3*easing(t))))
        resetMatrix()
    }
    if(displayData || barChange || heightChange || distanceChange){
        // Grey Bar
        resetMatrix()

        strokeWeight(0)
        fill('black')
        textAlign(CENTER)

        angular = atan2(((yellowBar.y)+(rope.change/3*easing(t))) - rope.y, (rope.x+rope.width) - rope.x);
        translate(rope.x, rope.y)
        rotate(angular);
        text(((pythagorean(settings.ropeHeight, settings.ropeDistance)) + deformationGrey*easing(t)).toFixed(2) + 'mm', dist(rope.x, rope.y, (rope.x+rope.width),((yellowBar.y)+(rope.change/3*easing(t))))/2, -40);
        strokeWeight(1.5)
        rotate(-90)
        translate(12, 0)
        curlyBracket(dist(rope.x, rope.y, (rope.x+rope.width),((yellowBar.y)+(rope.change/3*easing(t)))))
        resetMatrix()

        // Added by Joseph
        // Display angle between the two bars [SHOWING ANGULAR DATA][want to make curve but dk how...]
        strokeWeight(0)
        fill('black')
        textAlign(CENTER)
        let angle = parseFloat((Math.atan(settings.ropeHeight/settings.ropeDistance) * 180 / Math.PI).toFixed(2))
        text(`Angle: ${angle.toFixed(2)}°`, yellowBar.x + rope.width + 75, yellowBar.y - 50);
        strokeWeight(2)
        fill(255, 0, 0, 0);
        arc(rope.x + rope.width, yellowBar.y, 75, 75, 180, 180 + (Math.atan(settings.ropeHeight/settings.ropeDistance) * 180 / Math.PI));
        fill('black')
    }

    if(displayData || heightChange || barChange){
        // Height of rope
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


        resetMatrix()
    }

    if(displayData || distanceChange){
        // Distance of rope
        resetMatrix()
        strokeWeight(0)
        fill('black')
        stroke('black')
        textAlign(CENTER)
        translate(yellowBar.x, yellowBar.y)
        angular = atan2(((yellowBar.y)+(rope.change/3*easing(t))) - yellowBar.y, (rope.x+rope.width) - yellowBar.x);
        rotate(angular);
        text((settings.ropeDistance).toFixed(2) + 'mm', settings.ropeDistance/20/2, -25);
        strokeWeight(1.5)
        rotate(-90)
        translate(0, 0)
        curlyBracket(dist(yellowBar.x, yellowBar.y, (rope.x+rope.width),((yellowBar.y)+(rope.change/3*easing(t)))))

        resetMatrix()
    }
    pop()



    // Added by Joseph
    // For interacting with elements outside the canvas
    givenAngle.value(parseFloat((Math.atan(settings.ropeHeight/settings.ropeDistance) * 180 / Math.PI).toFixed(2)));
    pivotPointBar.value(settings.ropeDistance);
    yellowBarWidth.value(settings.yellowBarWidth);
    forcePoint.value(settings.forceDistance);
    crossArea.value(settings.ropeCrossArea);
    youngsModulus.value(settings.ropeModulus);
    forceMagnitude.value(settings.forceMagnitude);
    snapInput.value(settings.snapValue);


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
        element.classList.add('active');
        var name = element.getAttribute("alt")
        switch(name){
            case "Wood":
                settings.ropeMaterial = 0;
                break;
            case "Steel":
                settings.ropeMaterial = 1;
                break;
            case "Nylon":
                settings.ropeMaterial = 2;
                break;
            case "Bronze":
                settings.ropeMaterial = 3;
                break;
            case "Aluminum":
                settings.ropeMaterial = 4;
                break;
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

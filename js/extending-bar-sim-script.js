// For interacting with the elements outside of the canvas
// objectTab1
let bigBarWidth;
let bigBarForcePoint;
let bigBarCrossArea;
let bigBarModulus;
let bigBarForceValue;

// objectTab2
let smallBarWidth;
let smallBarForcePoint;
let smallBarCrossArea;
let smallBarModulus;
let smallBarForceValue;

// old variables



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
        line(0, 0, vec.x - 15, vec.y);
    } else {
        line(0, 0, vec.x + 15, vec.y)
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
    snapValue: 50,
    bigBarWidth: 1000,
    smallBarWidth: 2000,
    bigBarHeight: 200,
    smallBarHeight: 100,
    bigBarModulus: 200,
    smallBarModulus: 69,
    bigBarLimit: 0,
    smallBarLimit: 0,
    force1Distance: 1000,
    force2Distance: 0,
    force1Value: 10.0,
    force2Value: 0,
    crossArea1: 200,
    crossArea2: 100,
    material1: 1,
    material2: 4
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
    color: '#bbdbf0',
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
    color: '#CCC9C9',
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
let inputOfCrossArea = false;
let force1Move = false;
let force2Move = false;
let force1MoveToo = false;
let force2MoveToo = false;
let materialLimit = [85, 250, 45, 100, 95]

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
        let addImg = document.getElementById('addImg');
        if (addImg.src.includes('force-add-show')) {
            addImg.src = 'imgs/force-add-hide.png';
        } else {
            addImg.src = 'imgs/force-add-show.png';
        }
    });

    // objectTab1

    let changeWood1 = document.getElementById('changeMatToWood1');
    changeWood1.addEventListener('click', function(event) {
        resetDrawing();
        bigBar.color = '#B48777';
        settings.bigBarModulus = 15;
    });
    let changeMetal1 = document.getElementById('changeMatToMetal1');
    changeMetal1.addEventListener('click', function(event) {
        resetDrawing();
        bigBar.color = '#CCC9C9';
        settings.bigBarModulus = 69;
    });
    let changeBronze1 = document.getElementById('changeMatToBronze1');
    changeBronze1.addEventListener('click', function(event) {
        resetDrawing();
        bigBar.color = '#724D3F';
        settings.bigBarModulus = 100
    });
    let changeSteel1 = document.getElementById('changeMatToSteel1');
    changeSteel1.addEventListener('click', function(event) {
        resetDrawing();
        bigBar.color = '#bbdbf0';
        settings.bigBarModulus = 200;
    });
    let changeNylon1 = document.getElementById('changeMatToNylon1');
    changeNylon1.addEventListener('click', function(event) {
        resetDrawing();
        bigBar.color = '#FD0606';
        settings.bigBarModulus = 50;
    });

    // objectTab2

    let changeWood2 = document.getElementById('changeMatToWood2');
    changeWood2.addEventListener('click', function(event) {
        resetDrawing();
        smallBar.color = '#B48777';
        settings.smallBarModulus = 15;
    });
    let changeMetal2 = document.getElementById('changeMatToMetal2');
    changeMetal2.addEventListener('click', function(event) {
        resetDrawing();
        smallBar.color = '#CCC9C9';
        settings.smallBarModulus = 69;
    });
    let changeBronze2 = document.getElementById('changeMatToBronze2');
    changeBronze2.addEventListener('click', function(event) {
        resetDrawing();
        smallBar.color = '#B48777';
        settings.smallBarModulus = 100;
    });
    let changeSteel2 = document.getElementById('changeMatToSteel2');
    changeSteel2.addEventListener('click', function(event) {
        resetDrawing();
        smallBar.color = '#bbdbf0';
        settings.smallBarModulus = 200;
    });
    let changeNylon2 = document.getElementById('changeMatToNylon2');
    changeNylon2.addEventListener('click', function(event) {
        resetDrawing();
        smallBar.color = '#FD0606';
        settings.smallBarModulus = 2;
    });

    forces[0] = [createVector(bigBar.x + bigBar.width, bigBar.y),  createVector(10 * 5, 0), 'coral']
    console.log("x: " + forces[0][0].x, "y: " + forces[0][0].y)

    textFont(font);
    textSize(20);

    snapInput = select('#snapInterval');

    // objectTab1
    bigBarWidth = select('#bigBarWidth');
    bigBarCrossArea = select('#bigBarCrossArea');
    bigBarModulus = select('#bigBarModulus');
    bigBarForcePoint = select('#bigBarForcePoint');
    bigBarForceValue = select('#bigBarForceValue');

    // objectTab2
    smallBarWidth = select('#smallBarWidth');
    smallBarCrossArea = select('#smallBarCrossArea');
    smallBarModulus = select('#smallBarModulus');
    smallBarForcePoint = select('#smallBarForcePoint');
    smallBarForceValue = select('#smallBarForceValue');


    snapInput.input(function () {
        console.log("snapInput: " + snapInput.value());
        settings.snapValue = snapInput.value();
        console.log("settings.snapValue: " + settings.snapValue);

        if(settings.snapValue == 0) {
            settings.snapValue = 1;
        }
    });

    // objectTab1
    bigBarWidth.input(function () {
        settings.bigBarWidth = parseFloat(bigBarWidth.value());
        bigBar.width = settings.bigBarWidth / 20;
        updateForces();
    });

    smallBarWidth.input(function() {
        settings.smallBarWidth = parseFloat(pivotPointBar.value());
        smallBar.width = settings.smallBarWidth / 20;
        updateForces();
    });


    // objectTab1
    bigBarWidth.input(function () {
        settings.bigBarWidth = parseFloat(bigBarWidth.value());
        bigBar.width = settings.bigBarWidth / 20;
        updateForces();
    });

    bigBarForcePoint.input(function () {
        forces[0][0].x = parseFloat(bigBarForcePoint.value())/20 + bigBar.x;
        settings.force1Distance = parseFloat(bigBarForcePoint.value());
        updateForces();
    });

    bigBarCrossArea.input(function () {
        settings.bigBarHeight = parseInt(bigBarCrossArea.value());
    });

    bigBarModulus.input(function () {
        settings.bigBarModulus = parseFloat(bigBarModulus.value());
    });

    bigBarForceValue.input(function () {
        forces[0][1].x = parseFloat(bigBarForceValue.value()) * 5;
        if (forces[0][1].x >= 150){
            forces[0][1].x = 150;
        } else if (forces[0][1].x <= -150){
            forces[0][1].x = -150;
        }
        settings.force1Value = parseFloat(bigBarForceValue.value())
    });

    // objectTab2
    smallBarWidth.input(function() {
        settings.smallBarWidth = parseFloat(pivotPointBar.value());
        smallBar.width = settings.smallBarWidth / 20;
        updateForces();
    });

    smallBarForcePoint.input(function() {
        if(addedForce){
            smallBarForcePoint.removeAttribute('readonly');


            forces[1][0].x = parseFloat(smallBarForcePoint.value())/20 + bigBar.x;
            settings.force2Distance = parseFloat(smallBarForcePoint.value());
            updateForces();
        } else {
            smallBarForcePoint.attribute('readonly', '');
        }
    });

    smallBarCrossArea.input(function () {
        settings.smallBarHeight = parseInt(smallBarCrossArea.value());
    });

    smallBarModulus.input(function () {
        settings.smallBarModulus = parseFloat(smallBarModulus.value());
    });

    smallBarForceValue.input(function () {


        if(addedForce) {
            smallBarForceValue.removeAttribute('readonly');
            forces[1][1].x = parseFloat(smallBarForceValue.value()) * 5;
            if (forces[1][1].x >= 150){
                forces[1][1].x = 150;
            } else if (forces[1][1].x <= -150){
                forces[1][1].x = -150;
            }
            settings.force2Value = parseFloat(smallBarForceValue.value())
        } else {
            smallBarForceValue.attribute('readonly', '');
        }
    });

    // Setup Material
}

let deformationGrey = 0;

function changeDrawing() {
    var bigForces = []
    var smallForces = []
    if(settings.force1Distance <= settings.bigBarWidth) {
        bigForces.push([settings.force1Value, settings.force1Distance])
    } else {
        bigForces.push([settings.force1Value, settings.force1Distance])
        smallForces.push([settings.force1Value, settings.force1Distance])
    }

    if(forces.length > 1) {
        if(settings.force2Distance <= settings.bigBarWidth) {
            bigForces.push([settings.force1Value, settings.force2Distance])
        } else {
            bigForces.push([settings.force1Value, settings.force2Distance])
            smallForces.push([settings.force1Value, settings.force2Distance])
        }
    }

    var bigLoadLength = 0;
    var smallLoadLength = 0;
    var bigLoad = 0;
    var smallLoad = 0;

    bigForces.forEach(bigforce => {
        bigLoadLength += bigforce[0] * Math.min(settings.bigBarWidth, bigforce[1]);
        bigLoad += bigforce[0];
        console.log("Added bigLoadLength = " + bigforce[0] * Math.min(settings.bigBarWidth, bigforce[1]));
    });
    console.log("Total bigLoadLength = " + bigLoadLength);

    smallForces.forEach(smallforce => {
        smallLoadLength += smallforce[0] * Math.min(settings.smallBarWidth, smallforce[1] - settings.bigBarWidth);
        smallLoad += smallforce[0];
        console.log("Added smallLoadLength = " + smallforce[0] * Math.min(settings.smallBarWidth, smallforce[1] - settings.bigBarWidth));
    });
    console.log("Total smallLoadLength = " + smallLoadLength);

    var bigDeformation = 0;
    var smallDeformation = 0;

    if(bigLoadLength != 0){
        bigDeformation = bigLoadLength / settings.bigBarModulus / settings.bigBarHeight;
    }
    if(smallLoadLength != 0){
        smallDeformation = bigDeformation + (smallLoadLength / settings.smallBarModulus / settings.smallBarHeight);
    }

    bigBar.change = bigDeformation;
    smallBar.change = smallDeformation;



    if(bigDeformation < 0){
        document.getElementById('deformationFirst').textContent = -(bigDeformation).toFixed(4) + 'mm' + " (contraction)";
    } else if (bigDeformation > 0) {
        document.getElementById('deformationFirst').textContent = bigDeformation.toFixed(4) + 'mm' + " (elongation)";
    } else {
        document.getElementById('deformationFirst').textContent = "0.0000mm";
    }

    if(smallDeformation < 0){
        document.getElementById('deformationSecond').textContent = -(smallDeformation).toFixed(4) + 'mm' + " (contraction)";
    } else if (smallDeformation > 0) {
        document.getElementById('deformationSecond').textContent = smallDeformation.toFixed(4) + 'mm' + " (elongation)";
    } else {
        document.getElementById('deformationSecond').textContent = "0.0000mm";
    }

    if(bigDeformation < 0){
        document.getElementById('deflectionFirst').textContent = Math.abs(bigDeformation).toFixed(4) + 'mm' + " (to the left)";
    } else if (bigDeformation > 0) {
        document.getElementById('deflectionFirst').textContent = Math.abs(bigDeformation).toFixed(4) + 'mm' + " (to the right)";
    } else {
        document.getElementById('deflectionFirst').textContent = "0.0000mm";
    }

    if(bigDeformation + smallDeformation < 0){
        document.getElementById('deflectionSecond').textContent = Math.abs(bigDeformation + smallDeformation).toFixed(4) + 'mm' + " (to the left)";
    } else if (bigDeformation + smallDeformation > 0) {
        document.getElementById('deflectionSecond').textContent = Math.abs(bigDeformation + smallDeformation).toFixed(4) + 'mm' + " (to the right)";
    } else {
        document.getElementById('deflectionSecond').textContent = "0.0000mm";
    }

    bigMaterialAxial = bigLoad * 1000 / settings.bigBarHeight
    smallMaterialAxial = smallLoad * 1000 / settings.smallBarHeight
    console.log("bigMaterialAxial = " + bigMaterialAxial);
    console.log("smallMaterialAxial = " + smallMaterialAxial);

    alert(
        "Deformation of First Bar: " + bigDeformation.toFixed(4) + "\n" +
        "Deformation of Second Bar: " + smallDeformation.toFixed(4) + "\n" +
        "Deflection at End of First Bar: " + Math.abs(bigDeformation).toFixed(4) + "\n" +
        "Deflection at End of Second Bar: " + Math.abs(bigDeformation + smallDeformation).toFixed(4) + "\n"
        );

    bigBar.animation = true;
    smallBar.animation = true;

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
    forces[1] = [createVector(bigBar.x + bigBar.width + smallBar.width, bigBar.y),  createVector(15 * 5, 0), 'crimson']
    settings.force2Distance = settings.bigBarWidth + settings.smallBarWidth
    settings.force2Value = 15.0;
    console.log("x: " + forces[1][0].x, "y: " + forces[1][0].y)
}

function removeForce() {
    forces.splice(1, 1)
    settings.force2Distance = 0;
    settings.force2Value = 0;
    smallBarForcePoint.value(0)
    smallBarForceValue.value(0)
}

function updateForces(){
    forces.forEach((force, index) => {
        if(force[0].y != bigBar.y){
            force[0].y = bigBar.y;
        }
        if(force[0].x > bigBar.x + bigBar.width + smallBar.width){
            force[0].x = bigBar.x + bigBar.width + smallBar.width
            if(index == 0){
                settings.force1Distance = settings.bigBarWidth + settings.smallBarWidth
                console.log(settings.force1Distance)
            } else {
                settings.force2Distance = settings.bigBarWidth + settings.smallBarWidth
                console.log(settings.force2Distance)
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
    force1Move = false;
    force2Move = false;
    force1MoveToo = false;
    force2MoveToo = false;
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
        drawStrokedLine(bigBar.x, bigBar.y, bigBar.x+bigBar.width+(bigBar.change*easing(t)), bigBar.y, bigBar.height/3, 'black');
        line(bigBar.x, bigBar.y, bigBar.x+bigBar.width+(bigBar.change*easing(t)), bigBar.y)
    } else {
        drawStrokedLine(bigBar.x, bigBar.y, bigBar.x+bigBar.width+(bigBar.change), bigBar.y, bigBar.height/3, 'black');
        line(bigBar.x, bigBar.y, bigBar.x+bigBar.width+(bigBar.change), bigBar.y)
    }

    stroke(smallBar.color);
    strokeWeight(smallBar.height/3);
    if(smallBar.animation && t < 1){
        drawStrokedLine(bigBar.x + bigBar.width + (bigBar.change*easing(t)), smallBar.y, bigBar.x + bigBar.width+smallBar.width + (bigBar.change*easing(t)) + (smallBar.change*easing(t)), (bigBar.y), smallBar.height/3, 'black');
        line(bigBar.x + bigBar.width + (bigBar.change*easing(t)), smallBar.y, bigBar.x + bigBar.width+smallBar.width + (bigBar.change*easing(t)) + (smallBar.change*easing(t)), (bigBar.y))
    } else {
        drawStrokedLine(bigBar.x + bigBar.width + bigBar.change, smallBar.y, bigBar.x + bigBar.width + smallBar.width + (bigBar.change) + (smallBar.change), bigBar.y, smallBar.height/3, 'black');
        line(bigBar.x + bigBar.width + bigBar.change, smallBar.y, bigBar.x + bigBar.width + smallBar.width + (bigBar.change) + (smallBar.change), bigBar.y)
    }

    resetMatrix()

    if(bigBar.animation) {
        drawingContext.setLineDash([6, 6]);
        stroke(0);
        strokeWeight(2);
        noFill();
        rectMode(CENTER);
        rect((bigBar.x + (bigBar.width/2)), bigBar.y, bigBar.width, bigBar.height/3)
        rect((bigBar.x + bigBar.width + (smallBar.width/2)), bigBar.y, smallBar.width, smallBar.height/3)
        drawingContext.setLineDash([]);
        resetMatrix()
        rectMode(CORNER)
    }

    // Force values


    forces.forEach(force => {
        drawArrow(force[0], force[1], force[2], 12)

    });

    forces.forEach((force,index) => {

        if(dist(mouseX, mouseY, force[0].x + force[1].x, force[0].y) < 9){
            strokeWeight(0)
            fill(255, 255, 200, 175);
            circle(force[0].x + force[1].x, force[0].y, 20);
            if(mouseIsPressed & !active){
                resetDrawing()
                force[3] = true;
                active = true;
            }
        }

        if (force[1].x >= 0){
            if(mouseY > force[0].y - 7.5 && mouseY < force[0].y + 7.5 &&
                mouseX > force[0].x + 10 && mouseX < force[0].x + force[1].x - 10){
                drawArrow(force[0], force[1], 'tomato', 12);
                strokeWeight(0)
                fill(255, 255, 200, 175);
                if(mouseIsPressed & !active){
                    resetDrawing()
                    force[4] = true;
                    active = true;
                }
            }
        } else {
            if(mouseY > force[0].y - 7.5 && mouseY < force[0].y + 7.5 &&
                mouseX < force[0].x + 10 && mouseX > force[0].x + force[1].x - 10){
                drawArrow(force[0], force[1], 'tomato', 12);
                strokeWeight(0)
                fill(255, 255, 200, 175);
                if(mouseIsPressed & !active){
                    resetDrawing()
                    force[4] = true;
                    active = true;

                }
            }
        }
        if(force[4]){
            drawArrow(force[0], force[1], 'orangered', 12);
            if(mouseX > bigBar.x && mouseX < bigBar.x + bigBar.width + smallBar.width){
                force[0].x = mouseX;
            } else if (mouseX > bigBar.x + bigBar.width + smallBar.width){
                force[0].x = bigBar.x + bigBar.width + smallBar.width
            } else if (mouseX < bigBar.x){
                force[0].x = bigBar.x
            }



            if (index == 0){
                settings.force1Distance = Math.round((force[0].x - 170) * 20 / settings.snapValue) * settings.snapValue
            } else {
                settings.force2Distance = Math.round((force[0].x - 170) * 20 / settings.snapValue) * settings.snapValue
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
            angular = atan2(((bigBar.y)+((smallBar.change)*easing(t))) - bigBar.y, (bigBar.x + bigBar.width+smallBar.width) - bigBar.x);
            rotate(angular);
            if(index == 0){
                text(settings.force1Distance.toFixed(2) + 'mm', (dist(bigBar.x, bigBar.y, force[0].x, force[0].y))/2, -25);
            } else if (!displayForce) {
                text(settings.force2Distance.toFixed(2) + 'mm', (dist(bigBar.x, bigBar.y, force[0].x, force[0].y))/2, -25);
            } else {
                text(settings.force2Distance.toFixed(2) + 'mm', (dist(bigBar.x, bigBar.y, force[0].x, force[0].y))/2, -65);
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
            if(index == 0){
                text(settings.force1Value + " kN", force[0].x + (force[1].x/5), (force[0].y + 35));
            } else {
                text(settings.force2Value + " kN", force[0].x + (force[1].x/5), (force[0].y + 35));
            }
        }

        if (force[3]){
            strokeWeight(0);
            fill(255, 255, 200, 250);
            var forceValue = 0;

            circle(mouseX, mouseY, 25);
            if(mouseX <= force[0].x){
                force[1] = createVector(-(force[0].x - mouseX), 0)
                forceValue = (Math.round(((-(force[0].x - mouseX)) / 5 ) / 0.5) * 0.5).toFixed(1)
            } else {
                force[1] = createVector((mouseX) - force[0].x, 0)
                forceValue = (Math.round(((mouseX) - force[0].x) / 5 / 0.5) * 0.5).toFixed(1)
            }

            if(force[1].x >= 150) {
                force[1].x = 150;
            } else if (force[1] <= 150) {
                force[1].x = -150;
            }

            if (index == 0){
                settings.force1Value = forceValue
            } else {
                settings.force2Value = forceValue
            }
        }
    });

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

                if(settings.force1Distance == settings.bigBarWidth + settings.smallBarWidth){
                    force1Move = true;
                } else if (settings.force2Distance == settings.bigBarWidth + settings.smallBarWidth){
                    force2Move = true;
                }
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


            if(force1Move){
                forces[0][0].x = bigBar.x + bigBar.width + smallBar.width
                settings.force1Distance = settings.bigBarWidth + settings.smallBarWidth
            }
            if(force2Move){
                forces[1][0].x = bigBar.x + bigBar.width + smallBar.width
                settings.force2Distance = settings.bigBarWidth + settings.smallBarWidth
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

                if(settings.force1Distance == settings.bigBarWidth){
                    force1Move = true;
                } else if (settings.force2Distance == settings.bigBarWidth){
                    force2Move = true;
                }

                if(settings.force1Distance == settings.smallBarWidth + settings.bigBarWidth){
                    force1MoveToo = true;
                } else if(settings.force2Distance == settings.smallBarWidth + settings.bigBarWidth){
                    force2MoveToo = true;
                }
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

            if(force1Move){
                forces[0][0].x = bigBar.x + bigBar.width
                settings.force1Distance = settings.bigBarWidth
            }
            if(force2Move){
                forces[1][0].x = bigBar.x + bigBar.width
                settings.force2Distance = settings.bigBarWidth
            }
            if(force1MoveToo){
                forces[0][0].x = bigBar.x + bigBar.width + smallBar.width
                settings.force1Distance = settings.bigBarWidth + settings.smallBarWidth
            }
            if(force2MoveToo){
                forces[1][0].x = bigBar.x + bigBar.width + smallBar.width
                settings.force2Distance = settings.bigBarWidth + settings.smallBarWidth
            }


            updateForces()

        }



    }



    // After animation
    if(smallBar.animation && t >= 1){
        resetMatrix()
        strokeWeight(0)
        fill('black')
        translate(bigBar.x + bigBar.width, bigBar.y)
        text((bigBar.change).toFixed(2) + 'mm', -20, -80);
        rotate(90)
        strokeWeight(1.5)
        rotate(-90)
        translate(0, -80)
        if(bigBar.change >= 0){
            drawArrow(createVector(0, 15), createVector(Math.max(25, bigBar.change + 10), 0), 'black', 5)
        } else {
            drawArrow(createVector(0, 15), createVector(Math.min(-25, bigBar.change + 10), 0), 'black', 5)
        }

        resetMatrix()
        strokeWeight(0)
        fill('black')
        translate(bigBar.x + bigBar.width + smallBar.width, bigBar.y)
        text((bigBar.change + smallBar.change).toFixed(2) + 'mm', -20, -60);
        rotate(90)
        strokeWeight(1.5)
        rotate(-90)
        translate(0, -60)
        if(bigBar.change + smallBar.change >= 0){
            drawArrow(createVector(0, 15), createVector(Math.max(25, bigBar.change + smallBar.change + 10), 0), 'black', 5)
        } else {
            drawArrow(createVector(0, 15), createVector(Math.min(-25, bigBar.change + smallBar.change + 10), 0), 'black', 5)
        }
    }

    push()

    if(displayData || lengthChange){
        //Yellow Bar
        resetMatrix()
        strokeWeight(0)
        fill('black')
        stroke('black')
        textAlign(CENTER)
        translate(bigBar.x+bigBar.width + bigBar.change*easing(t) , bigBar.y+(bigBar.height/3/2))
        text((settings.bigBarWidth + (bigBar.change*easing(t))).toFixed(2) + 'mm', -(bigBar.width/2), 40);
        strokeWeight(1.5)
        translate(0, 0)
        rotate(90)
        curlyBracket(dist(bigBar.x, bigBar.y, bigBar.x+bigBar.width+(bigBar.change*easing(t)),bigBar.y))
        resetMatrix()
    }

    if(displayData || distanceChange){
        // Distance of rope
        resetMatrix()
        strokeWeight(0)
        fill('black')
        stroke('black')
        textAlign(CENTER)
        translate(bigBar.x + bigBar.width + bigBar.change*easing(t), smallBar.y)


        text((settings.smallBarWidth + (smallBar.change*easing(t))).toFixed(2) + 'mm', smallBar.width/2, -25);
        strokeWeight(1.5)
        rotate(-90)
        translate(0, 0)
        curlyBracket(dist(bigBar.x + bigBar.width +(bigBar.change*easing(t)), bigBar.y, bigBar.x + bigBar.width + smallBar.width + (bigBar.change*easing(t)) + (smallBar.change*easing(t)),bigBar.y))

        resetMatrix()
    }
    pop()


    // // Hover feature Test
    // if (mouseX > bigBar.x && mouseX < bigBar.x + bigBar.width && mouseY > bigBar.y && mouseY < bigBar.y + bigBar.height)

    // objectTab1
    bigBarWidth.value(settings.bigBarWidth);
    bigBarForcePoint.value(settings.force1Distance);
    bigBarCrossArea.value(settings.bigBarHeight);
    bigBarModulus.value(settings.bigBarModulus);
    bigBarForceValue.value(settings.force1Value);

    // objectTab2
    smallBarWidth.value(settings.smallBarWidth);

    if (addedForce) {
        smallBarForcePoint.value(settings.force2Distance);
    } else {
        smallBarForcePoint.value(0);
    }
    smallBarCrossArea.value(settings.smallBarHeight);
    smallBarModulus.value(settings.smallBarModulus);
    if (addedForce) {
        smallBarForceValue.value(settings.force2Value);
    } else {
        smallBarForceValue.value(0);
    }

}

// For Exit button
const exitButton = document.getElementById('exit-button');
exitButton.addEventListener('click', () => {
    window.location.href = "../index.html";
});

// Joseph
// For Switching materials in the materialSelect
const materialElements = document.querySelectorAll('.material');
const materialElements2 = document.querySelectorAll('.material2');

materialElements.forEach((element) => {
    element.addEventListener('click', () => {
        let active;
        if (element.classList.contains('active')) {
            active = true;
        }
        // Check if element is in objectTab1
        if (element.closest('#objectTab1')) {
            materialElements.forEach((el) => {
                if (el.closest('#objectTab1')) {
                    el.classList.remove('active');
                }
            });
            element.classList.add('active');
            var name = element.getAttribute("alt")
            console.log("Material1 " + name)
            switch(name){
                case "Wood":
                    settings.material1 = 0;
                    break;
                case "Steel":
                    settings.material1 = 1;
                    break;
                case "Nylon":
                    settings.material1 = 2;
                    break;
                case "Bronze":
                    settings.material1 = 3;
                    break;
                case "Aluminum":
                    settings.material1 = 4;
                    break;
            }
            console.log(settings.material1);
        }
    });
});

materialElements2.forEach((element) => {
    element.addEventListener('click', () => {
        let active;
        if (element.classList.contains('active')) {
            active = true;
        }
        // Check if element is in objectTab2
        if (element.closest('#objectTab2')) {
            materialElements2.forEach((el) => {
                if (el.closest('#objectTab2')) {
                    el.classList.remove('active');
                }
            });
            element.classList.add('active');
            switch(name){
                case "Wood":
                    settings.material2 = 0;
                    break;
                case "Steel":
                    settings.material2 = 1;
                    break;
                case "Nylon":
                    settings.material2 = 2;
                    break;
                case "Bronze":
                    settings.material2 = 3;
                    break;
                case "Aluminum":
                    settings.material2 = 4;
                    break;
            }
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

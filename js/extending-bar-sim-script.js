// For interacting with the elements outside of the canvas
let bigBarWidth;
let smallBarWidth;
let youngsModulus;
let forcePoint1;
let forcePoint2
let forceMagni1;
let forceMagni2
let crossArea1;
let crossArea2;



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

function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(12);
    fill(myColor);
    translate(base.x, base.y);
    if(vec.x >= 0){
        line(0, 0, vec.x - 15, vec.y);
    } else {
        line(0, 0, vec.x + 15, vec.y)
    }
    rotate(vec.heading());
    let arrowSize = 5;
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
    smallBarModulus: 200,
    force1Distance: 1000,
    force2Distance: 0,
    force1Magni: 10,
    force2Magni: 0,
    crossArea1: 200,
    crossArea2: 100
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
let force1Move = false;
let force2Move = false;

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

    forces[0] = [createVector(bigBar.x + bigBar.width, bigBar.y),  createVector(10 * 5, 0), 'coral']
    console.log("x: " + forces[0][0].x, "y: " + forces[0][0].y)

    textFont(font);
    textSize(20);
    snapInput = select('#snapInterval');
    bigBarWidth = select('#bigBarWidth');
    smallBarWidth = select('#smallBarWidth');
    forcePoint1 = select('#forcePoint1');
    forcePoint2 = select('#forcePoint2');
    forceMagni1 = select('#forceMagni1');
    forceMagni2 = select('#forceMagni2');
    crossArea1 = select('#crossArea1');
    crossArea2 = select('#crossArea2');



    /*
    // For interacting with elements outside the canvas

    youngsModulus = select('#youngsModulus');
    forceMagni = select('#forceMagni');
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
        smallBar.width = settings.smallBarWidth / 20;
        updateForces();


        // Debugging
        // console.log("pivotPointBar: " + pivotPointBar.value());
        // console.log("settings.ropeDistance: " + settings.ropeDistance);
        // console.log("temp: " + temp);
        // console.log("smallBar.width + smallBar.x: " + smallBar.width + smallBar.x);
        // console.log("bigBar.x: " + bigBar.x);
    });

    forcePoint1.input(function() {

        forces[0][0].x = parseFloat(forcePoint1.value())/20 + bigBar.x;
        settings.force1Distance = parseFloat(forcePoint1.value());
        updateForces();
        // Debugging
        // console.log("pivotPointBar: " + pivotPointBar.value());
        // console.log("settings.ropeDistance: " + settings.ropeDistance);
        // console.log("temp: " + temp);
        // console.log("smallBar.width + smallBar.x: " + smallBar.width + smallBar.x);
        // console.log("bigBar.x: " + bigBar.x);
    });

    forcePoint2.input(function() {

        if(forces.length > 1){
            forces[1][0].x = parseFloat(forcePoint2.value())/20 + bigBar.x;
            settings.force2Distance = parseFloat(forcePoint2.value());
            updateForces();
        }


        // Debugging
        // console.log("pivotPointBar: " + pivotPointBar.value());
        // console.log("settings.ropeDistance: " + settings.ropeDistance);
        // console.log("temp: " + temp);
        // console.log("smallBar.width + smallBar.x: " + smallBar.width + smallBar.x);
        // console.log("bigBar.x: " + bigBar.x);
    });

    forceMagni1.input(function() {
        if(forceMagni1.value() > 0){
            forces[0][1].x = parseFloat(forceMagni1.value()) * 5;
            if (forces[0][1].x >= 150){
                forces[0][1].x = 150;
            } else if (forces[0][1].x <= -150){
                forces[0][1].x = -150;
            }
            settings.force1Magni = parseFloat(forceMagni1.value())
        } else {
            forces[0][1].x = 5;
            settings.force1Magni = 5
        }
    });

    forceMagni2.input(function() {
        if(forces.length > 0){
            if(forceMagni2.value() != 0){
                forces[1][1].x = parseFloat(forceMagni2.value()) * 5;
                if (forces[1][1].x >= 150){
                    forces[1][1].x = 150;
                } else if (forces[1][1].x <= -150){
                    forces[1][1].x = -150;
                }
                settings.force2Magni = parseFloat(forceMagni2.value())
            } else {
                forces[1][1].x = 5;
                settings.force2Magni = 5
            }
        }
    })


    crossArea1.input(function() {
        settings.bigBarHeight = crossArea1.input();
    });

    crossArea2.input(function() {
        settings.smallBarHeight = crossArea2.input();
    })



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

    forceMagni.input(function() {
        if(forceMagni.value() > 0){
            forces[0][1].y = parseFloat(forceMagni.value()) * 2;
        } else {
            forces[0][1].y = 0;
        }
    });
    */
    forcePoint2.attribute('disabled', 'true');
    forceMagni2.attribute('disabled', 'true');
}

let deformationGrey = 0;

function changeDrawing() {
    var bigForces = []
    var smallForces = []
    if(settings.force1Distance <= settings.bigBarWidth) {
        bigForces.push([settings.force1Magni, settings.force1Distance])
    } else {
        bigForces.push([settings.force1Magni, settings.force1Distance])
        smallForces.push([settings.force1Magni, settings.force1Distance])
    }

    if(forces.length > 1) {
        if(settings.force2Distance <= settings.bigBarWidth) {
            bigForces.push([settings.force1Magni, settings.force2Distance])
        } else {
            bigForces.push([settings.force1Magni, settings.force2Distance])
            smallForces.push([settings.force1Magni, settings.force2Distance])
        }
    }

    var bigLoadLength = 0;
    var smallLoadLength = 0;

    bigForces.forEach(bigforce => {
        bigLoadLength += bigforce[0] * Math.min(settings.bigBarWidth, bigforce[1]);
        console.log("Added bigLoadLength = " + bigforce[0] * Math.min(settings.bigBarWidth, bigforce[1]));
    });
    console.log("Total bigLoadLength = " + bigLoadLength);

    smallForces.forEach(smallforce => {
        smallLoadLength += smallforce[0] * Math.min(settings.smallBarWidth, smallforce[1] - settings.bigBarWidth);
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

    if (atan2(bigBar.change, settings.bigBarWidth) > 5){
        alert(
            "Too much deflection. Since the angle generated from the force is greater than 5°, this simulation does not have accurate values. Take the results with that in mind."
        )
    }

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
    forcePoint2.removeAttribute('disabled');
    forceMagni2.removeAttribute('disabled');

    forces[1] = [createVector(bigBar.x + bigBar.width + smallBar.width, bigBar.y),  createVector(15 * 5, 0), 'crimson']
    settings.force2Distance = settings.bigBarWidth + settings.smallBarWidth
    forceMagni2.value(15)
    console.log("x: " + forces[1][0].x, "y: " + forces[1][0].y)
}

function removeForce() {
    forces.splice(1, 1)
    settings.force2Distance = 0;
    settings.force2Magni = 0;
    forcePoint2.value(0)
    forceMagni2.value(0)

    forcePoint2.attribute('disabled', 'true');
    forceMagni2.attribute('disabled', 'true');
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
        drawStrokedLine(bigBar.x, bigBar.y, bigBar.x+bigBar.width+(bigBar.change/2*easing(t)), bigBar.y, bigBar.height/3, 'black');
        line(bigBar.x, bigBar.y, bigBar.x+bigBar.width+(bigBar.change/2*easing(t)), bigBar.y)
    } else {
        drawStrokedLine(bigBar.x, bigBar.y, bigBar.x+bigBar.width+(bigBar.change/2), bigBar.y, bigBar.height/3, 'black');
        line(bigBar.x, bigBar.y, bigBar.x+bigBar.width+(bigBar.change/2), bigBar.y)
    }

    stroke(smallBar.color);
    strokeWeight(smallBar.height/3);
    if(smallBar.animation && t < 1){
        drawStrokedLine(bigBar.x + bigBar.width + (bigBar.change/2*easing(t)), smallBar.y, bigBar.x + bigBar.width+smallBar.width + (bigBar.change/2*easing(t)) + (smallBar.change/2*easing(t)), (bigBar.y), smallBar.height/3, 'black');
        line(bigBar.x + bigBar.width + (bigBar.change/2*easing(t)), smallBar.y, bigBar.x + bigBar.width+smallBar.width + (bigBar.change/2*easing(t)) + (smallBar.change/2*easing(t)), (bigBar.y))
    } else {
        drawStrokedLine(bigBar.x + bigBar.width + bigBar.change/2, smallBar.y, bigBar.x + bigBar.width + smallBar.width + (bigBar.change/2) + (smallBar.change/2), bigBar.y, smallBar.height/3, 'black');
        line(bigBar.x + bigBar.width + bigBar.change/2, smallBar.y, bigBar.x + bigBar.width + smallBar.width + (bigBar.change/2) + (smallBar.change/2), bigBar.y)
    }

    resetMatrix()

    // Force values


    forces.forEach(force => {
        drawArrow(force[0], force[1], force[2])

    });

    forces.forEach((force,index) => {
        if (force[1].x >= 0){
            if(dist(mouseX, mouseY, force[0].x + force[1].x, force[0].y) < 9){
                strokeWeight(0)
                fill(255, 255, 200, 175);
                circle(force[0].x + force[1].x, force[0].y, 20);
                if(mouseIsPressed & !active){
                    force[3] = true;
                    active = true;
                }
            }
        } else {
            if(dist(mouseX, mouseY, force[0].x + force[1].x, force[0].y) < 9){
                strokeWeight(0)
                fill(255, 255, 200, 175);
                circle(force[0].x + force[1].x, force[0].y, 20);
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
        } else {
            if(mouseY > force[0].y - 7.5 && mouseY < force[0].y + 7.5 &&
                mouseX < force[0].x + 10 && mouseX > force[0].x + force[1].x - 10){
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
            angular = atan2(((bigBar.y)+((smallBar.change/2)*easing(t))) - bigBar.y, (bigBar.x + bigBar.width+smallBar.width) - bigBar.x);
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
                text(settings.force1Magni + " kN", force[0].x + (force[1].x/5), (force[0].y + 35));
            } else {
                text(settings.force2Magni + " kN", force[0].x + (force[1].x/5), (force[0].y + 35));
            }
        }

        if (force[3]){
            strokeWeight(0);
            fill(255, 255, 200, 250);
            var forceMagni = 0;

            circle(mouseX, mouseY, 25);
            if(mouseX <= force[0].x){
                force[1] = createVector(-(force[0].x - mouseX), 0)
                forceMagni = (Math.round(((-(force[0].x - mouseX)) / 5 ) / 0.5) * 0.5).toFixed(1)
            } else {
                force[1] = createVector((mouseX) - force[0].x, 0)
                forceMagni = (Math.round(((mouseX) - force[0].x) / 5 / 0.5) * 0.5).toFixed(1)
            }

            if(force[1].x >= 150) {
                force[1].x = 150;
            } else if (force[1] <= 150) {
                force[1].x = -150;
            }

            if (index == 0){
                settings.force1Magni = forceMagni
            } else {
                settings.force2Magni = forceMagni
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

                console.log(settings.force2Distance)
                console.log(settings.bigBarWidth)
                console.log(settings.smallBarWidth)

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
                console.log("success")
                forces[0][0].x = bigBar.x + bigBar.width + smallBar.width
                settings.force1Distance = settings.bigBarWidth + settings.smallBarWidth
            }
            if(force2Move){
                console.log("success")
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


            updateForces()

        }



    }



    // After animation
    if(smallBar.animation && t >= 1){
        resetMatrix()
        strokeWeight(0)
        fill('black')
        translate(bigBar.x + bigBar.width + bigBar.change/2, bigBar.y)
        text((bigBar.change).toFixed(2) + 'mm', -20, 120);
        rotate(90)
        strokeWeight(1.5)
        translate(80, 0);
        curlyBracket(bigBar.change/2)

        resetMatrix()
        strokeWeight(0)
        fill('black')
        translate(bigBar.x + bigBar.width + bigBar.change/2 + smallBar.width + smallBar.change/2, bigBar.y)
        text((smallBar.change).toFixed(2) + 'mm', -20, 120);
        rotate(90)
        strokeWeight(1.5)
        translate(80, 0);
        curlyBracket(smallBar.change/2)
    }

    push()

    if(displayData || lengthChange){
        //Yellow Bar
        resetMatrix()
        strokeWeight(0)
        fill('black')
        stroke('black')
        textAlign(CENTER)
        translate(bigBar.x+bigBar.width + bigBar.change/2*easing(t) , bigBar.y+(bigBar.height/3/2))
        text((settings.bigBarWidth + (bigBar.change*easing(t))).toFixed(2) + 'mm', -(bigBar.width/2), 40);
        strokeWeight(1.5)
        translate(0, 0)
        rotate(90)
        curlyBracket(dist(bigBar.x, bigBar.y, bigBar.x+bigBar.width+(bigBar.change/2*easing(t)),bigBar.y))
        resetMatrix()
    }

    if(displayData || distanceChange){
        // Distance of rope
        resetMatrix()
        strokeWeight(0)
        fill('black')
        stroke('black')
        textAlign(CENTER)
        translate(bigBar.x + bigBar.width + bigBar.change/2*easing(t), smallBar.y)


        text((settings.smallBarWidth + (smallBar.change*easing(t))).toFixed(2) + 'mm', smallBar.width/2, -25);
        strokeWeight(1.5)
        rotate(-90)
        translate(0, 0)
        curlyBracket(dist(bigBar.x + bigBar.width +(bigBar.change/2*easing(t)), bigBar.y, bigBar.x + bigBar.width + smallBar.width + (bigBar.change/2*easing(t)) + (smallBar.change/2*easing(t)),bigBar.y))

        resetMatrix()
    }
    pop()


    // // Hover feature Test
    // if (mouseX > bigBar.x && mouseX < bigBar.x + bigBar.width && mouseY > bigBar.y && mouseY < bigBar.y + bigBar.height)

    snapInput.value(settings.snapValue);
    bigBarWidth.value(settings.bigBarWidth);
    smallBarWidth.value(settings.smallBarWidth);
    crossArea1.value(settings.bigBarHeight);
    crossArea2.value(settings.smallBarHeight);
    forcePoint1.value(settings.force1Distance);
    forcePoint2.value(settings.force2Distance);
    forceMagni1.value(Math.round(forces[0][1].x / 5 / 0.5) * 0.5);
    if(forces.length > 1) {
        forceMagni1.value(Math.round(forces[0][1].x / 5 / 0.5) * 0.5);
    } else {
        forceMagni2.value(0)
    }



    // Added by Joseph
    // For interacting with elements outside the canvas
        /*
        givenAngle.value(parseFloat((Math.atan(settings.ropeHeight/settings.ropeDistance) * 180 / Math.PI).toFixed(2)));


        arrowPoint.value(settings.angleDistance);

        if(inputOfCrossArea == false){
            crossArea.value(cylinderCrossArea(smallBar.height/2).toFixed(2));
        }
        youngsModulus.value(settings.greyRopeModulus);
        forceMagni.value(forces[0][1].y / 2);

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

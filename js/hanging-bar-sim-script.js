// For interacting with the elements outside of the canvas
let yellowBarWidth;
let youngsModulus;
let arrowForce;
let crossArea;
let pivotPointWall;
let givenAngle;
let pivotPointBar;
let arrowPoint;

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
function deflectionAtPoint(load, length, crossArea, elasticity, angle) {
    let radians = toRadians(angle);
    console.log("b: " + length);
    console.log("P: " + load);
    console.log("E: " + elasticity);
    console.log("A: " + crossArea);
    console.log("angle: " + angle);
    return (load * length) / (crossArea*elasticity * Math.pow(Math.sin(radians),2) * Math.cos(radians));
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
let active = false;
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
    console.log("x: " + forces[0][0].x, "y: " + forces[0][0].y)

    textFont(font);
    textSize(20);


    // For interacting with elements outside the canvas
    yellowBarWidth = select('#yellowBarWidth');
    youngsModulus = select('#youngsModulus');
    arrowForce = select('#arrowForce');
    crossArea = select('#crossArea');
    
    // pivotPointWall = select('#pivotPointWall');

    givenAngle = select('#givenAngle');

    pivotPointBar = select('#pivotPointBar');
    arrowPoint = select('#arrowPoint');
    
    givenAngle.input(function () {
        pivotPointWall = pivotPointBar.value() * Math.tan((givenAngle.value() * Math.PI) / 180);
        


        let temp = -(pivotPointWall/20 - yellowBar.y);
        if (temp < yellowBar.y){
            greyBar.y = temp
            settings.ropeHeight = parseFloat(pivotPointWall);
        } else {
            greyBar.y = yellowBar.y;
        }
    });


    // pivotPointWall.input(function() {

    //     let temp = -(pivotPointWall.value()/20 - yellowBar.y);
    //     if(temp < yellowBar.y){
    //         greyBar.y = temp
    //         settings.ropeHeight = parseFloat(pivotPointWall.value());
    //     } else {
    //         greyBar.y = yellowBar.y;
    //     }

    //     // Debugging
    //     // console.log("pivotPointWall: " + pivotPointWall.value());
    //     // console.log("settings.ropeHeight: " + settings.ropeHeight);
    //     // console.log("temp: " + temp);
    //     // console.log("greyBar.y: " + greyBar.y);
    //     // console.log("yellowBar.y: " + yellowBar.y);
    // });

    pivotPointBar.input(function() {
        let temp = pivotPointBar.value()/20 + yellowBar.x - greyBar.x;

        if(temp + greyBar.x > yellowBar.x){
            greyBar.width = temp
            settings.ropeDistance = parseFloat(pivotPointBar.value());
        } else {
            greyBar.width = yellowBar.x;
        }
        
        // Debugging
        // console.log("pivotPointBar: " + pivotPointBar.value());
        // console.log("settings.ropeDistance: " + settings.ropeDistance);
        // console.log("temp: " + temp);
        // console.log("greyBar.width + greyBar.x: " + greyBar.width + greyBar.x);
        // console.log("yellowBar.x: " + yellowBar.x);
    });

    yellowBarWidth.input(function () {
        // Debugging
        // console.log("yellowbarwidth: " + yellowBarWidth.value());
        // console.log("settings.yellowBarWidth: " + settings.yellowBarWidth);
        // console.log("yellowBar.width: " + yellowBar.width);
        settings.yellowBarWidth = yellowBarWidth.value();
        yellowBar.width = settings.yellowBarWidth / 20;
        updateForces();
    });

    arrowPoint.input(function() {     
        forces[0][0].x = arrowPoint.value()/20 + yellowBar.x;
    });

    crossArea.input(function () {
        if (crossArea.value() != 0) {
            inputOfCrossArea = true;
        } else {
            inputOfCrossArea = false;
        }
    });    

    youngsModulus.input(function () {
        settings.greyRopeModulus = youngsModulus.value();
    });

    arrowForce.input(function() {
        forces[0][1].y = arrowForce.value() * 2;
    });


    
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
    // Changed by Joseph
    if (inputOfCrossArea == true) {
        deformationGrey = deformation(internalHanging(ropeLength, settings.ropeHeight, settings.ropeDistance, downward, [], downwardDistances, []), ropeLength, crossArea.value(), settings.greyRopeModulus);
    } else {
        deformationGrey = deformation(internalHanging(ropeLength, settings.ropeHeight, settings.ropeDistance, downward, [], downwardDistances, []), ropeLength, cylinderCrossArea(greyBar.height/2), settings.greyRopeModulus);
    }
    console.log("Cross Area: " + crossArea.value())
    console.log("Cross Area: " + cylinderCrossArea(greyBar.height/2))
    console.log(deformationGrey)
    yellowBar.change = settings.yellowBarWidth * ropeLength / settings.ropeHeight / settings.ropeDistance * deformationGrey * 20;
    console.log(yellowBar.change)
    yellowBar.animation = true;

    greyBar.change = (yellowBar.change*greyBar.width/yellowBar.width)
    greyBar.animation = true;

    deflectionB = deflectionAtPoint(arrowForce.value(), arrowPoint.value(), crossArea.value(), settings.greyRopeModulus, givenAngle.value())
 
    // Displaying Results
    document.getElementById('forceCable').textContent = internalHanging(ropeLength, settings.ropeHeight, settings.ropeDistance, downward, [], downwardDistances, []).toFixed(4);
    document.getElementById('deformationCable').textContent = deformationGrey.toFixed(4);
    document.getElementById('deflectionAtPointB').textContent = deflectionB.toFixed(4);
    
    alert(
        "Force in Cable: " + internalHanging(ropeLength, settings.ropeHeight, settings.ropeDistance, downward, [], downwardDistances, []) + "\n" +
        "Deformation Grey: " + deformationGrey + "\n" + 
        "Deflection at pointB: " + deflectionB
        );
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

function updateForces(){
    forces.forEach(force => {
        if(force[0].y != yellowBar.y){
            force[0].y = yellowBar.y;
        }
        if(force[0].x > yellowBar.x + yellowBar.width){
            force[0].x = yellowBar.x + yellowBar.width
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


    // Force values
    if(!yellowBar.animation){

        forces.forEach(force => {
            drawArrow(force[0], force[1], force[2])

        });

        forces.forEach(force => {
            if(dist(mouseX, mouseY, force[0].x, force[0].y + force[1].y + 15) < 5){
                strokeWeight(0)
                fill(255, 255, 200, 175);
                circle(force[0].x, force[0].y + force[1].y + 15, 10);
                if(mouseIsPressed & !active){
                    force[3] = true;
                    active = true;
                }
            }

            if(mouseX > force[0].x - 7.5 && mouseX < force[0].x + 7.5 &&
                mouseY > force[0].y + 10 && mouseY < force[0].y + force[1].y){
                drawArrow(force[0], force[1], 'tomato');
                strokeWeight(0)
                fill(255, 255, 200, 175);
                if(mouseIsPressed & !active){
                    force[4] = true;
                    active = true;
                }
            }
            if(force[4]){
                drawArrow(force[0], force[1], 'orangered');
                if(mouseX > yellowBar.x && mouseX < yellowBar.x + yellowBar.width){
                    force[0].x = mouseX
                } else if (mouseX > yellowBar.x + yellowBar.width){
                    force[0].x = yellowBar.x + yellowBar.width
                } else if (mouseX < yellowBar.x){
                    force[0].x = yellowBar.x
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
                angular = atan2(((yellowBar.y)+(greyBar.change*easing(t))) - yellowBar.y, (greyBar.x+greyBar.width) - yellowBar.x);
                rotate(angular);
                text((dist(yellowBar.x, yellowBar.y, force[0].x, force[0].y)*20).toFixed(2) + 'mm', (dist(yellowBar.x, yellowBar.y, force[0].x, force[0].y))/2, -25);
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
                text((force[1].y/2).toFixed(1) + " kN", force[0].x + 15, (force[0].y*2 + force[1].y)/2);
            }

            if (force[3]){
                strokeWeight(0);
                fill(255, 255, 200, 250);
                    circle(force[0].x, force[0].y + force[1].y + 15, 10);
                if(mouseY > yellowBar.y + 15){
                    force[1] = createVector(0, -(force[0].y - mouseY + 15))
                } if(mouseY < yellowBar.y + 15){
                    force[1] = createVector(0, 0)
                }
            }
        });
    }
    resetMatrix();

    // Change values
    if(!yellowBar.animation){
        // Rope Height
        if(dist(mouseX, mouseY, greyBar.x, greyBar.y) < 15){
            strokeWeight(0)
            fill(255, 255, 150, 180);
            circle(greyBar.x, greyBar.y, 24);
            if(mouseIsPressed && !active){
                heightChange = true
                active = true
            }
        }
        if(heightChange){
            strokeWeight(0);
            fill(255, 200, 90, 255);
            circle(greyBar.x, greyBar.y, 24);
            if(mouseY < yellowBar.y){
                greyBar.y = mouseY;
                settings.ropeHeight = dist(yellowBar.x, mouseY, yellowBar.x, yellowBar.y) * 20;
            } else if(mouseY > yellowBar.y){
                greyBar.y = yellowBar.y;
                settings.ropeHeight = dist(yellowBar.x, yellowBar.y, yellowBar.x, yellowBar.y) * 20;
            }
        }


        // Rope Distance
        if(dist(mouseX, mouseY, greyBar.x + greyBar.width, yellowBar.y) < 15){
            strokeWeight(0)
            fill(255, 255, 150, 180);
            circle(greyBar.x + greyBar.width, yellowBar.y, 24);
            if(mouseIsPressed && !active){
                distanceChange = true
                active = true
            }
        }
        if(distanceChange){
            strokeWeight(0);
            fill(255, 200, 90, 255);
            circle(greyBar.x + greyBar.width, yellowBar.y, 24);
            if(mouseX > yellowBar.x && mouseX < yellowBar.x + yellowBar.width){
                greyBar.width = mouseX - yellowBar.x;
                settings.ropeDistance = dist(mouseX, yellowBar.y, yellowBar.x, yellowBar.y) * 20;
            } else if(mouseX < yellowBar.x){
                greyBar.width = 0;
                settings.ropeDistance = dist(yellowBar.x, yellowBar.y, yellowBar.x, yellowBar.y) * 20;
            } else if(mouseX > yellowBar.x + yellowBar.width){
                greyBar.width = yellowBar.width;
                settings.ropeDistance = dist(yellowBar.x + yellowBar.width, yellowBar.y, yellowBar.x, yellowBar.y) * 20;
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
            if(mouseY > greyBar.y && mouseY < 350){
                yellowBar.y = mouseY;
                settings.ropeHeight = dist(yellowBar.x, mouseY, greyBar.x, greyBar.y) * 20;
                updateForces();
            } else if(mouseY < greyBar.y){
                yellowBar.y = greyBar.y;
                settings.ropeHeight = dist(yellowBar.x, yellowBar.y, greyBar.x, greyBar.y) * 20;
                updateForces();
            } if(mouseY > 350){
                yellowBar.y = 350;
                settings.ropeHeight = dist(yellowBar.x, yellowBar.y, greyBar.x, greyBar.y) * 20;
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
            if(mouseX > greyBar.x + greyBar.width){
                yellowBar.width = mouseX - yellowBar.x;
                settings.yellowBarWidth = dist(mouseX, yellowBar.y, yellowBar.x, yellowBar.y) * 20;
                updateForces();
            } else if(mouseX < greyBar.x + greyBar.width){
                yellowBar.width = greyBar.width;
                settings.yellowBarWidth = dist(greyBar.x + greyBar.width, yellowBar.y, yellowBar.x, yellowBar.y) * 20;
                updateForces();
            }
        }



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

    push()

    if(displayData || lengthChange){
        //Yellow Bar
        resetMatrix()
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
        resetMatrix()
    }
    if(displayData || barChange || heightChange || distanceChange){
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
        resetMatrix()
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
        angular = atan2(((yellowBar.y)+(greyBar.change*easing(t))) - yellowBar.y, (greyBar.x+greyBar.width) - yellowBar.x);
        rotate(angular);
        text((settings.ropeDistance).toFixed(2) + 'mm', settings.ropeDistance/20/2, -25);
        strokeWeight(1.5)
        rotate(-90)
        translate(0, 0)
        curlyBracket(dist(yellowBar.x, yellowBar.y, (greyBar.x+greyBar.width),((yellowBar.y)+(greyBar.change*easing(t)))))

        resetMatrix()
    }
    pop()


    // // Hover feature Test
    // if (mouseX > yellowBar.x && mouseX < yellowBar.x + yellowBar.width && mouseY > yellowBar.y && mouseY < yellowBar.y + yellowBar.height) 


    // Added by Joseph
    // For interacting with elements outside the canvas
    givenAngle.value(parseFloat((Math.atan(settings.ropeHeight/settings.ropeDistance) * 180 / Math.PI).toFixed(2)));
    pivotPointBar.value(settings.ropeDistance);
    yellowBarWidth.value(settings.yellowBarWidth);
    arrowPoint.value(forces[0][0].x * 20 - 3300);

    if(inputOfCrossArea == false){
        crossArea.value(squareCrossArea(greyBar.height/2));
    }
    youngsModulus.value(settings.greyRopeModulus);
    arrowForce.value(forces[0][1].y / 2);
    
}

// For Exit button
const exitButton = document.getElementById('exit-button');
exitButton.addEventListener('click', () => {
    window.location.href = "../index.html";
});

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
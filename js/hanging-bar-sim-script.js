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
let ropeAwayFromWall;

// Finds deformation using normal deformation formula.
function deformation(load, length, crossArea, elasticity) {

    return (load * length) / (crossArea * elasticity)
}

// Finds the answer of the pythagorean formula of A^2 + B^2 = C^2 of two numbers
function pythagorean(a, b) {
    return Math.sqrt((a * a) + (b * b))
}

// Returns angle of degrees to radians
function toRadians(angle) {
    return angle * (Math.PI / 180);
}

// Returns angle of radians to degrees
function toDegrees(angle) {
    return angle * (180 / Math.PI);
}
function calculateAngle(a, b, c) {
    // Calculate the cosine of the angle using the Law of Cosines
    let cosC = ((-Math.pow(a, 2)) - Math.pow(b, 2) + Math.pow(c, 2)) / -(2 * a * b);

    // Use arccosine to find the angle in radians
    let angleInRadians = Math.acos(cosC);
    // Convert the angle from radians to degrees
    let angleInDegrees = angleInRadians * (180 / Math.PI);

    return angleInDegrees;
}

// Finds internal forces on object.
// If rope is perpendicular, the formula is simplified.
function internalHanging(forceMagnitude, forceDistance, lengthRope, heightRope, distanceRope, distancefromWall) {
    if(distanceRope - distancefromWall != 0){
        return forceMagnitude * forceDistance /(heightRope * distanceRope / lengthRope)
    } else {
        return forceMagnitude * forceDistance / distanceRope
    }
}

// Draws stroke for the lines generated in the code.
//    NOTE:
//    ~ Does not look right for slanted lines (may fix in the last bugfix but it might not be worth it)
function drawStrokedLine(x1, y1, x2, y2, lineHeight, strokecolor){
    push();
    stroke(strokecolor)
    strokeWeight(lineHeight + 1)
    line(x1 - 0.5, y1, x2 + 0.5, y2)
    pop();
}

// Draws an arrow.
// base - variable of the starting point of arrow
// vec - variable of the vector that indicates the direction of the arrow.
// myColor - the color of the resulting arrow
// size - the size of the resulting arrow
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

// Variable for canvas origin
let canvasOrigin = {
    x: 65,
    y: 250,
}

// Various variables used in the program
// ropeHeight - height of rope
// ropeDistance - distance of rope pivot point from wall
// ropeCrossArea - cross area of rope
// yellowBarWidth - width of bar
// ropeModulus - young's modulus of rope
// snapValue - value of increment for distances
// forceDistance - distance of force from wall
// forceMagnitude - magnitude of force
// ropeMaterial - from 0 to 4 that indicates kind of material used. (NOTE: not used yet)
let settings = {
    ropeHeight: 3000,
    ropeDistance: 4000,
    ropeCrossArea: 100,
    ropeAwayFromWall: 0,
    yellowBarWidth: 6000,
    ropeModulus: 200,
    snapValue: 50,
    forceDistance: 6000,
    forceMagnitude: 39,
    ropeMaterial: 1
}

// Wall variables
let wall = {
    x: 65 - canvasOrigin.x,
    y: 250 - canvasOrigin.y,
    width: 168,
    height: 534,
    color: '#999999'
}

// Variables for yellow bar
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

// Variables for rope
let rope = {
    x: 230 - canvasOrigin.x,
    y: yellowBar.y - settings.ropeHeight/20,
    change: 0,
    animation: false,
    end: settings.ropeDistance / 20 + yellowBar.x,
    height: 50,
    color: '#bbdbf0',
    angle: 28.42
}

// Variable for time used for animation
let t = 0;

// Various global variables used throughout.
let forces = []
let active = false;
let displayData = true;
let displayForce = false;
let heightChange = false;
let distanceChange = false;
let barChange = false;
let lengthChange = false;
let inputOfCrossArea = false;
let keeptoWall = true;

// Loads font.
function preload() {
    font = loadFont('.\\fonts\\Avenir LT Std 55 Roman.otf');
}

// Setup for simulation.
function setup() {

    // Creates canvas.
    let canvas = createCanvas(822, 534)
    canvas.parent('canvas-container');
    angleMode(DEGREES);

    // Button for changing drawing
    let button = document.getElementById('change-drawing');
    button.addEventListener('click', changeDrawing);

    // Button for reseting drawing
    let reset = document.getElementById('reset-drawing');
    reset.classList.add('disabled')

    // Button for displaying data on and off
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

    // Button for displaying force data on and off
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

    // Buttons for changing materials
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
    let changeBrass = document.getElementById('changeMatToBrass');
    changeBrass.addEventListener('click', function(event) {
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

    // Set the starting force.
    forces[0] = [createVector(yellowBar.x + yellowBar.width, yellowBar.y),  createVector(0, 150), "#EB7911"]

    // Setup text
    textFont(font);
    textSize(20);


    // For interacting with elements outside the canvas (textboxes)
    yellowBarWidth = select('#yellowBarWidth');
    youngsModulus = select('#youngsModulus');
    forceMagnitude = select('#forceMagnitude');
    ropeAwayFromWall = select('#ropeDistanceAway');
    crossArea = select('#crossArea');
    givenAngle = select('#givenAngle');
    pivotPointBar = select('#pivotPointBar');
    forcePoint = select('#forcePoint');
    snapInput = select('#snapInterval');

    // Sets up the textboxes
    givenAngle.input(function () {
        givenAngle.value(givenAngle.value().replace(/[^\d.]|(?<=\..*)\./g, ''));
        if(parseFloat(settings.ropeAwayFromWall) != parseFloat(settings.ropeDistance)){
            var temp = 0;
            //console.log(givenAngle.value())
            if(givenAngle.value() < 90){
                pivotPointWall = parseFloat(settings.ropeDistance) * Math.tan((givenAngle.value() * Math.PI) / 180);
                //console.log(pivotPointWall);
                temp = -(pivotPointWall/20 - yellowBar.y);
                //console.log(temp);
            } else {
                temp = 0
            }


            if (temp < yellowBar.y && temp >= 20){
                rope.y = temp
                settings.ropeHeight = parseFloat(pivotPointWall);
            } else if (temp < 20) {
                rope.y = 20
                settings.ropeHeight = Math.round(dist(yellowBar.x, yellowBar.y, rope.x, rope.y) * 20 / settings.snapValue) * settings.snapValue;
                givenAngle.value(parseFloat(calculateAngle(parseFloat(settings.ropeDistance), pythagorean(parseFloat(settings.ropeHeight), parseFloat(settings.ropeDistance) - parseFloat(settings.ropeAwayFromWall)),pythagorean(parseFloat(settings.ropeHeight), parseFloat(settings.ropeAwayFromWall))).toFixed(2)))
                //console.log(parseFloat(settings.ropeHeight));
            } else {
                rope.y = yellowBar.y;
                settings.ropeHeight = 0;
            }
        } else {
            givenAngle.value(90)
        }
    });

    snapInput.input(function () {
        snapInput.value(snapInput.value().replace(/[^\d]|(?<=\..*)\./g, ''));
        settings.snapValue = snapInput.value();

        if(isNaN(parseFloat(snapInput.value()))){
            snapInput.value(0)
        }

        if(settings.snapValue < 0) {
            settings.snapValue = 0;
        }
    });


    pivotPointBar.input(function() {
        pivotPointBar.value(pivotPointBar.value().replace(/[^\d]|(?<=\..*)\./g, ''));

        if(isNaN(parseFloat(pivotPointBar.value()))){
            pivotPointBar.value(0)
        }

        if(pivotPointBar.value()/20 > (rope.x - yellowBar.x) && pivotPointBar.value() < parseFloat(settings.yellowBarWidth)){
            rope.end = parseFloat(pivotPointBar.value()/20) + yellowBar.x
            settings.ropeDistance = parseFloat(pivotPointBar.value());
        } else if (pivotPointBar.value()/20 < rope.x) {
            rope.end = rope.x;
            settings.ropeDistance = parseFloat(settings.ropeAwayFromWall);
        } else {
            rope.end = yellowBar.x + yellowBar.width;
            settings.ropeDistance = parseFloat(settings.yellowBarWidth);
        }
    });

    yellowBarWidth.input(function () {
        yellowBarWidth.value(yellowBarWidth.value().replace(/[^\d]|(?<=\..*)\./g, ''));

        if(isNaN(parseFloat(yellowBarWidth.value()))){
            yellowBarWidth.value(0)
        }

        if(yellowBarWidth.value()/20 > 0 && yellowBarWidth.value() <= 10000){
            settings.yellowBarWidth = parseFloat(yellowBarWidth.value());
            yellowBar.width = settings.yellowBarWidth / 20;
        } else if (yellowBarWidth.value()/20 < 0) {
            settings.yellowBarWidth = 0;
            yellowBar.width = 0
        } else {
            rope.end = 10000/20;
            settings.ropeDistance = parseFloat(10000);
        }
        updateForces();
    });

    forcePoint.input(function() {
        forcePoint.value(forcePoint.value().replace(/[^\d]|(?<=\..*)\./g, ''));

        if(isNaN(parseFloat(forcePoint.value()))){
            forcePoint.value(0)
        }

        if(forcePoint.value() < 0){
            forces[0][0].x = yellowBar.x;
            settings.forceDistance = 0
        } else if (forcePoint.value() > settings.yellowBarWidth){
            forces[0][0].x = yellowBar.width + yellowBar.x;
            settings.forceDistance = settings.yellowBarWidth
        } else {
            forces[0][0].x = parseFloat(forcePoint.value())/20 + yellowBar.x;
            settings.forceDistance = parseFloat(forcePoint.value());
        }
    });

    crossArea.input(function () {
        crossArea.value(crossArea.value().replace(/[^\d]|(?<=\..*)\./g, ''));

        if(isNaN(parseFloat(crossArea.value()))){
            crossArea.value(0)
        }

        if(crossArea.value() > 0){
            settings.ropeCrossArea = parseFloat(crossArea.value());
        } else {
            settings.ropeCrossArea = 0;
        }
    });

    youngsModulus.input(function () {
        youngsModulus.value(youngsModulus.value().replace(/[^\d]|(?<=\..*)\./g, ''));

        if(isNaN(parseFloat(youngsModulus.value()))){
            youngsModulus.value(0)
        }

        if(youngsModulus.value() > 0){
            settings.ropeModulus = parseFloat(youngsModulus.value());
        } else {
            settings.ropeModulus = 0;
        }
    });

    forceMagnitude.input(function() {
        forceMagnitude.value(forceMagnitude.value().replace(/[^\d]|(?<=\..*)\./g, ''));

        if(isNaN(parseFloat(forceMagnitude.value()))){
            forceMagnitude.value(0)
        }

        if(forceMagnitude.value() > 0){
            forces[0][1].y = parseFloat(forceMagnitude.value()) * 5;
            if (forces[0][1].y >= 150){
                forces[0][1].y = 150;
            }
            settings.forceMagnitude = parseFloat(forceMagnitude.value())
        } else {
            forces[0][1].y = 5 * 5;
            settings.forceMagnitude = 0
        }
    });

    ropeAwayFromWall.input(function () {
        ropeAwayFromWall.value(ropeAwayFromWall.value().replace(/[^\d]|(?<=\..*)\./g, ''));

        if(isNaN(parseFloat(ropeAwayFromWall.value()))){
            ropeAwayFromWall.value(0)
        }

        if (parseFloat(ropeAwayFromWall.value()) <= 0){
            rope.x = yellowBar.x
            settings.ropeAwayFromWall = 0;
        } else if (parseFloat(ropeAwayFromWall.value()) >= parseFloat(settings.ropeDistance)){
            rope.x = rope.end;
            settings.ropeAwayFromWall = parseFloat(settings.ropeDistance);
        } else {
            rope.x = (parseFloat(ropeAwayFromWall.value()) / 20) + yellowBar.x;
            settings.ropeAwayFromWall = parseFloat(ropeAwayFromWall.value())
        }
    });

    document.getElementById('ropeDistanceAway').setAttribute("disabled", "true");
}

// Deformation variable. For simulation text displaying the rope length.
let deformationGrey = 0;

// Calculates the answers and displays the change as an animation.
function changeDrawing() {

    document.getElementById('change-drawing').setAttribute("disabled", "true");

    downward = []
    downwardDistances = []

    // Gets the force & distance. Originally had a more broad implementation, but now it just pushes the info of one force.
    forces.forEach(force => {
        downward.push(parseFloat(settings.forceMagnitude))
        downwardDistances.push(settings.forceDistance)
    });


    // Get the necessary values
    ropeLength = pythagorean(parseFloat(settings.ropeHeight), parseFloat(settings.ropeDistance) - parseFloat(settings.ropeAwayFromWall))
    ropeForce = internalHanging(parseFloat(settings.forceMagnitude), parseFloat(settings.forceDistance), ropeLength, parseFloat(settings.ropeHeight), parseFloat(settings.ropeDistance), parseFloat(settings.ropeAwayFromWall))
    deformationGrey = deformation(ropeForce, ropeLength, crossArea.value(), parseFloat(settings.ropeModulus));

    // Modifies the simulation settings (also checks if it is 90 degrees first)
    if(parseFloat(settings.ropeAwayFromWall) == parseFloat(settings.ropeDistance)){
        rope.change = deformationGrey;
        yellowBar.change = deformationGrey * parseFloat(settings.yellowBarWidth) / parseFloat(settings.ropeDistance)
    } else{
        yellowBar.change = parseFloat(settings.yellowBarWidth) * ropeLength / parseFloat(settings.ropeHeight) / parseFloat(settings.ropeDistance) * deformationGrey;
        rope.change = (yellowBar.change*(rope.end - rope.x)/yellowBar.width)
    }

    // Starts the animation.
    yellowBar.animation = true;
    rope.animation = true;

    // Other necessary values
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

    // If deflection is more than 5 degrees, warning is popped up.
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

    // Makes alert of the information
    alert(
        "Force in Cable: " + ropeForce + "\n" +
        "Deformation Grey: " + deformationGrey + "\n" +
        "Deflection at pivot point: " + deflectionB + "\n" +
        "Deflection at end of bar: " + (yellowBar.change) + "\n" +
        "Deflection at force point: " + deflectionForce + "\n" + "\n" +
        "Check results tab for all the info."
        );

    // Disables play button.
    var button = document.getElementById('change-drawing');
    button.removeEventListener('click', changeDrawing);
    button.classList.add('disabled');

    // Enables reset button.
    var button2 = document.getElementById('reset-drawing');
    button2.addEventListener('click', resetDrawing);
    button2.classList.remove('disabled');
}

// Resets the simulation.
function resetDrawing() {
    // Reenables play button.
    var button = document.getElementById('change-drawing');
    button.addEventListener('click', changeDrawing);
    button.classList.remove('disabled')

    // Disables reset button
    var button2 = document.getElementById('reset-drawing');
    button2.removeEventListener('click', changeDrawing);
    button2.classList.add('disabled');

    // Empty results page.
    document.getElementById('forceCable').textContent = "";
    document.getElementById('deformationCable').textContent = "";
    document.getElementById('deflectionAtPointB').textContent = "";
    document.getElementById('deflectionAtPointEnd').textContent = "";
    document.getElementById('deflectionAtPointForce').textContent = "";
    document.getElementById('angleBar').textContent = "";

    // Reset simulation settings
    yellowBar.change = 0;
    yellowBar.animation = false;
    rope.change = 0;
    rope.animation = false;

    deformationGrey = 0;
    t = 0;

}

// Easing function for the simulation animation.
function easing(x) {
    return 1 - Math.pow(1 - x, 3);
}

// Updates the forces so forces and rope stay inside the lengths of the bar.
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

    if (parseFloat(settings.ropeDistance) > parseFloat(settings.yellowBarWidth)){
        rope.end = yellowBar.x + yellowBar.width
        settings.ropeDistance = settings.yellowBarWidth
    }

}

// Resets all variables related to modifying the simulation when mouse is released.
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

// Generates a curly bracket with a given length.
function curlyBracket(length){
    mid = length/2
    mid += 20
    noFill();
    bezier(0, 0, 20, 0, 0, length/2, 20, length/2)
    bezier(20, length/2, 0, length/2, 20, length, 0, length)
}

// Main function.
function draw() {
    // Set up background
    background('#D9D9D9');

    fill(wall.color);
    stroke('#000000');
    strokeWeight(1);
    strokeCap(SQUARE);
    rect(wall.x,wall.y,wall.width,wall.height);




    // Displays rope and bar. yellowBar.change and rope.change is zero before pressing play.
    resetMatrix()
    stroke(yellowBar.color);
    strokeWeight(yellowBar.height/3);
    if(yellowBar.animation && t < 1){
        t += 0.030
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
        drawStrokedLine(rope.x, rope.y, rope.end, (yellowBar.y)+(rope.change/3*easing(t)), rope.height/3, 'black');
        line(rope.x, rope.y, rope.end, (yellowBar.y)+(rope.change/3*easing(t)))
    } else {
        stroke(rope.color + '80');
        line(rope.x, rope.y, rope.end, (yellowBar.y))
        stroke(rope.color)
        drawStrokedLine(rope.x, rope.y, rope.end, yellowBar.y+(rope.change/3), (rope.height)/3, 'black')
        line(rope.x, rope.y, rope.end, (yellowBar.y)+(rope.change/3))
    }

    // Add circles for intersections and pivot points.
    strokeWeight(1);
    stroke('#000000');
    fill('#FFFFFF');
    circle(yellowBar.x, yellowBar.y, 30)
    circle(rope.x, rope.y, 25)
    if(rope.animation && t < 1){
        circle(rope.end, (yellowBar.y)+rope.change/3*easing(t), 25)
    } else {
        stroke('#000000' + '80');
        fill('#FFFFFF' + '80');
        circle(rope.end, (yellowBar.y), 25)
        stroke('#000000');
        fill('#FFFFFF');
        circle(rope.end, (yellowBar.y)+(rope.change/3), 25)
    }
    resetMatrix()


    // Draws arrows for forces.
    forces.forEach(force => {
        if(yellowBar.animation){
            drawArrow(force[0], force[1], force[2] + "60", 12)
        }else {
            drawArrow(force[0], force[1], force[2], 12)
        }

    });

    // Controls force data and force manipulation
    forces.forEach(force => {
        // Checks if mouse is near the end of the mouse
        if(dist(mouseX, mouseY, force[0].x, force[0].y + force[1].y) < 10){
            strokeWeight(0)
            fill(255, 255, 200, 175);
            circle(force[0].x, force[0].y + force[1].y, 25);
            if(mouseIsPressed & !active){
                force[3] = true;
                active = true;
            }
        }

        // Checks if the mouse is in the body part of arrow.
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

        // If clicked at body part, moves arrow/force to where mouse is dragged.
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

        // Displays distance of force away from wall.
        if((displayForce || force[4])){
            resetMatrix()
            strokeWeight(0)
            fill('black')
            stroke('black')
            textAlign(CENTER)
            translate(yellowBar.x, yellowBar.y)
            angular = atan2(((yellowBar.y)+((rope.change/3)*easing(t))) - yellowBar.y, rope.end - yellowBar.x);
            rotate(angular);
            text(settings.forceDistance.toFixed(2) + 'mm', (dist(yellowBar.x, yellowBar.y, force[0].x, force[0].y))/2, -25);
            strokeWeight(1.5)
            rotate(-90)
            translate(0, 0)
            curlyBracket(dist(yellowBar.x, yellowBar.y, force[0].x, force[0].y))

            resetMatrix()
        }
        pop()

        // Displays force magnitude
        if(displayData || force[3] || displayForce){
            strokeWeight(0);
            fill(0, 0, 0, 250);
            text(settings.forceMagnitude + " kN", force[0].x + 15, (force[0].y*2 + force[1].y)/2);
        }

        // If clicked at arrow end, changes force based on where mouse is dragged.
        // Arrow will stop at a certain point, but force can still be changed if dragged further.
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

    // Changes to various variables using simulation.
    if(!yellowBar.animation){

        // Checks if mouse is near rope starting point. If clicked, will move it to where mouse is located.
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
            if(mouseY <= yellowBar.y && mouseY >= 15){
                rope.y = mouseY;
                settings.ropeHeight = Math.round(dist(yellowBar.x, rope.y, yellowBar.x, yellowBar.y) * 20 / settings.snapValue) * settings.snapValue;
            } else if(mouseY < 15) {
                rope.y = 15;
                settings.ropeHeight = Math.round(dist(yellowBar.x, 15, yellowBar.x, yellowBar.y) * 20 / settings.snapValue) * settings.snapValue;
            } else {
                rope.y = yellowBar.y;
                settings.ropeHeight = Math.round(dist(yellowBar.x, yellowBar.y, yellowBar.x, yellowBar.y) * 20 / settings.snapValue) * settings.snapValue;
            }

            // If keep to wall is disabled, it can be dragged away from wall.
            if(!keeptoWall){
                if(mouseX < rope.end && mouseX > yellowBar.x) {
                    rope.x = mouseX;
                    settings.ropeAwayFromWall = Math.round(dist(rope.x, yellowBar.y, yellowBar.x, yellowBar.y) * 20 / settings.snapValue) * settings.snapValue;
                } else if (mouseX >= rope.end) {
                    rope.x = rope.end;
                    settings.ropeAwayFromWall = parseFloat(settings.ropeDistance);
                } else {
                    rope.x = yellowBar.x;
                    settings.ropeAwayFromWall = 0;
                }
            }
        }


        // Checks if mouse is near rope pivot point. If clicked, will move under to where mouse is located.
        // Will always stick to the bar.
        if(dist(mouseX, mouseY, rope.end, yellowBar.y) < 15){
            strokeWeight(0)
            fill(255, 255, 150, 180);
            circle(rope.end, yellowBar.y, 24);
            if(mouseIsPressed && !active){
                distanceChange = true
                active = true
            }
        }
        if(distanceChange){
            strokeWeight(0);
            fill(255, 200, 90, 255);
            circle(rope.end, yellowBar.y, 24);
            if(mouseX > rope.x && mouseX < yellowBar.x + yellowBar.width){
                rope.end = mouseX;
                settings.ropeDistance = Math.round(dist(mouseX, yellowBar.y, yellowBar.x, yellowBar.y) * 20 / settings.snapValue) * settings.snapValue;
            } else if(mouseX <= rope.x){
                rope.end = rope.x;
                settings.ropeDistance = parseFloat(settings.ropeAwayFromWall)
            } else if(mouseX >= yellowBar.x + yellowBar.width){
                rope.end = yellowBar.x + yellowBar.width;
                settings.ropeDistance = settings.yellowBarWidth
            }
        }


        // Checks if mouse is near the bar starting point. If clicked, will move it to where mouse is located.
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

        // Checks if mouse is near the bar end point. If clicked, will change length based on mouse position.
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
            else if(mouseX > rope.end){
                yellowBar.width = mouseX - yellowBar.x;
                settings.yellowBarWidth = Math.round(dist(mouseX, yellowBar.y, yellowBar.x, yellowBar.y) * 20 / settings.snapValue) * settings.snapValue;
                updateForces();
            } else if(mouseX < rope.end){
                yellowBar.width = rope.end - yellowBar.x;
                settings.yellowBarWidth = parseFloat(settings.ropeDistance)
                updateForces();
            }
        }
    }

    // After animation, it will display the amount of deflection at the end of bar.
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

    // Displaying other data.

    // Length of bar
    if(displayData || lengthChange){
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
    // Length of rope.
    if(displayData || barChange || heightChange || distanceChange){
        resetMatrix()

        strokeWeight(0)
        fill('black')
        textAlign(CENTER)

        angular = atan2(((yellowBar.y)+(rope.change/3*easing(t))) - rope.y, rope.end - rope.x);
        translate(rope.x, rope.y)
        rotate(angular);
        text(((pythagorean(parseFloat(settings.ropeHeight), parseFloat(settings.ropeDistance) - parseFloat(settings.ropeAwayFromWall))) + deformationGrey*easing(t)).toFixed(2) + 'mm', dist(rope.x, rope.y, (rope.end),((yellowBar.y)+(rope.change/3*easing(t))))/2, -40);
        strokeWeight(1.5)
        rotate(-90)
        translate(12, 0)
        curlyBracket(dist(rope.x, rope.y, rope.end,((yellowBar.y)+(rope.change/3*easing(t)))))
        resetMatrix()
        if(!yellowBar.animation){
            strokeWeight(0)
            fill('black')
            textAlign(CENTER)
            let angle = parseFloat(calculateAngle(parseFloat(settings.ropeDistance), pythagorean(parseFloat(settings.ropeHeight), parseFloat(settings.ropeDistance) - parseFloat(settings.ropeAwayFromWall)),pythagorean(parseFloat(settings.ropeHeight), parseFloat(settings.ropeAwayFromWall))).toFixed(2))
            text(`Angle: ${angle.toFixed(2)}°`, rope.end + 125, yellowBar.y - 50);
            strokeWeight(2)
            fill(255, 0, 0, 0);
            arc(rope.end, yellowBar.y, 75, 75, 180, 180 + (Math.atan(parseFloat(settings.ropeHeight)/parseFloat(settings.ropeDistance)) * 180 / Math.PI));
            fill('black')
        }
    }
    // Length or Rope Origin from Wall
    if((displayData || heightChange || distanceChange) && !keeptoWall && parseFloat(settings.ropeAwayFromWall) > 0){
        // Grey Bar
        resetMatrix()
        strokeWeight(0)
        fill('black')
        stroke('black')
        textAlign(CENTER)
        translate(yellowBar.x, rope.y)
        text((parseFloat(settings.ropeAwayFromWall)).toFixed(2) + 'mm', (rope.x - yellowBar.x)/2, -25);
        strokeWeight(1.5)
        rotate(-90)
        translate(0, 0)
        curlyBracket(dist(yellowBar.x, yellowBar.y, rope.x, yellowBar.y))

        resetMatrix()
    }
    // Height of Rope from Bar
    if(displayData || heightChange || barChange){
        strokeWeight(0)
        fill('white')
        stroke('white')
        textAlign(CENTER)
        translate(yellowBar.x, yellowBar.y)
        text((settings.ropeHeight).toFixed(2) + 'mm', -90, -(settings.ropeHeight/20/2) + 5);
        strokeWeight(1.5)
        rotate(-180)
        translate(15, 0)
        curlyBracket(parseFloat(settings.ropeHeight)/20)


        resetMatrix()
    }

    // Distance of Rope Pivot Point Away From Wall
    if(displayData || distanceChange){
        resetMatrix()
        strokeWeight(0)
        fill('black')
        stroke('black')
        textAlign(CENTER)
        translate(yellowBar.x, yellowBar.y)
        angular = atan2(((yellowBar.y)+(rope.change/3*easing(t))) - yellowBar.y, (rope.end) - yellowBar.x);
        rotate(angular);
        text((settings.ropeDistance).toFixed(2) + 'mm', parseFloat(settings.ropeDistance)/20/2, -25);
        strokeWeight(1.5)
        rotate(-90)
        translate(0, 0)
        curlyBracket(dist(yellowBar.x, yellowBar.y, rope.end,((yellowBar.y)+(rope.change/3*easing(t)))))

        resetMatrix()
    }
    pop()



    // Sets the textboxes to the given values of settings.

    givenAngle.value(parseFloat(calculateAngle(parseFloat(settings.ropeDistance), pythagorean(parseFloat(settings.ropeHeight), parseFloat(settings.ropeDistance) - parseFloat(settings.ropeAwayFromWall)),pythagorean(parseFloat(settings.ropeHeight), parseFloat(settings.ropeAwayFromWall))).toFixed(2)))
    pivotPointBar.value(parseFloat(settings.ropeDistance));
    yellowBarWidth.value(settings.yellowBarWidth);
    forcePoint.value(settings.forceDistance);
    crossArea.value(settings.ropeCrossArea);
    youngsModulus.value(settings.ropeModulus);
    forceMagnitude.value(settings.forceMagnitude);
    snapInput.value(settings.snapValue);
    ropeAwayFromWall.value(parseFloat(settings.ropeAwayFromWall))


}

// For Exit button
const exitButton = document.getElementById('exit-button');
exitButton.addEventListener('click', () => {
    window.location.href = "./lesson-picker.html";
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
            case "Brass":
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

// Keep to wall checkbox. Makes sure the rope is set back to wall if reenabled.
const wallCheckbox = document.getElementById('wallToggle');
wallCheckbox.addEventListener('click', () => {
    if (wallCheckbox.checked) {
        keeptoWall = true;
        rope.x = yellowBar.x
        settings.ropeAwayFromWall = 0;
        document.getElementById('ropeDistanceAway').setAttribute("disabled", "true");
    } else {
        keeptoWall = false;
        document.getElementById('ropeDistanceAway').removeAttribute("disabled", "true");
    }
});

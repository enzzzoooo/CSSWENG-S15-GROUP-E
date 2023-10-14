

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

function momentHanging(lengthRope, upwardRope, distanceRope, downward, upward, distancesDown, distancesUp) {
    downwardForces = 0;
    for (i = 0; i < downward.length; i++){
        downwardForces += distancesDown[i] * downward[i]
    }
    console.log(downwardForces)
    upwardForces = 0;
    for (i = 0; i < upward.length; i++){
        downwardUp += distancesUp[i] * upward[i]
    }
    console.log(upwardForces)
    return (downwardForces - upwardForces)/((upwardRope * distanceRope)/lengthRope)
}

result = momentHanging(5, 3, 4, [39], [], [6], []);
deformation = deformation(result, 5000, cylinderCrossArea(50/2), 200)
console.log(result);
console.log(deformation);

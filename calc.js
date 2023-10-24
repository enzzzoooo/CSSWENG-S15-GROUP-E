

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
    console.log(downwardForces)

    // Get total of upward forces
    for (i = 0; i < upward.length; i++){
        downwardUp += distancesUp[i] * upward[i]
    }
    console.log(upwardForces)

    return (downwardForces - upwardForces)/((upwardRope * distanceRope)/lengthRope)
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

function deformTwoBars(lengths, forces, crossAreas, elasticities){

}

deform =
console.log(result);
console.log(deform);

result = deformExtending([3000, 3000, 3000], [150, -400, 150, 100], [200, 100, 100], [200, 70, 70])
console.log(result);

export{
    deformation,
    squareCrossArea,
    cyclinderCrossArea,
    pythagorean,
    internalHanging,
}

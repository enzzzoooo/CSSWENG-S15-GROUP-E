let possible = {
    forceP: [1, 2, 3, 4, 5],
    x1: [1, 2, 3, 4, 5],
    angles: [30, 35, 40],
    crossAreas: [10, 15, 20, 25, 30],
    modulus: [200]
}

let forceP = 0;
let x1 = 0;
let x2 = 0;
let x3 = 0;
let x4 = 0;
let y = 0;
let angle = 0;
let area1 = 0;
let area2 = 0;
let area3 = 0;
let modulus1 = 0
let modulus2 = 0
let modulus3 = 0
let quiz1_Pad = 0
let quiz1_Pcf = 0
let quiz1_Pbg = 0
let quiz2_Dad = 0
let quiz2_Dcf = 0
let quiz2_Dbg = 0
let quiz4_Dc = 0
let quiz6_Dd = 0
let quiz6_Df = 0
let quiz7_a = 0

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function sin(degrees) {
    return Math.sin(degrees * (Math.PI / 180));
}

function cos(degrees) {
    return Math.cos(degrees * (Math.PI / 180));
}

function atan(degrees) {
    return Math.atan(degrees) * (180 / Math.PI);
}

function generateValues() {
    forceP = possible.forceP[getRandomInt(0, possible.forceP.length)];
    x1 = possible.x1[getRandomInt(0, possible.x1.length)];
    x2 = 4 * x1
    x3 = 3 * x1
    x4 = 2 * x1
    y = 2 * x1
    angle = possible.angles[getRandomInt(0, possible.angles.length)];
    area1 = possible.crossAreas[getRandomInt(0, possible.crossAreas.length)];
    area2 = possible.crossAreas[getRandomInt(0, possible.crossAreas.length)];
    area3 = possible.crossAreas[getRandomInt(0, possible.crossAreas.length)];
    modulus1 = 200;
    modulus2 = 200;
    modulus3 = 200;

    console.log("forceP = " + forceP)
    console.log("x1 = " + x1)
    console.log("x2 = " + x2)
    console.log("x3 = " + x3)
    console.log("x4 = " + x4)
    console.log("y = " + y)
    console.log("angle = " + angle);
    console.log("area1 = " + area1);
    console.log("area2 = " + area2);
    console.log("area3 = " + area3);
    console.log("modulus1 = " + modulus1);
    console.log("modulus2 = " + modulus2);
    console.log("modulus3 = " + modulus3);

    quiz1_Pad = x4 * forceP / (x3 + x4)
    quiz1_Pcf = x3 * forceP / (x3 + x4)
    quiz1_Pbg = x3 * forceP / (x1 * sin(angle))
    console.log("quiz1_Pad = " + (quiz1_Pad * 1000).toFixed(2))
    console.log("quiz1_Pcf = " + (quiz1_Pcf * 1000).toFixed(2))
    console.log("quiz1_Pbg = " + (quiz1_Pbg * 1000).toFixed(2))

    quiz2_Dad = quiz1_Pad * y / (area2 * modulus2)
    quiz2_Dcf = quiz1_Pcf * y / (area3 * modulus3)
    quiz2_Dbg = quiz1_Pbg * x1 / (cos(angle) * area1 * area2)
    console.log("quiz2_Dad = " + (quiz2_Dad * 1000).toFixed(2))
    console.log("quiz2_Dcf = " + (quiz2_Dcf * 1000).toFixed(2))
    console.log("quiz2_Dbg = " + (quiz2_Dbg * 1000).toFixed(2))

    quiz4_Dc = (quiz2_Dbg / sin(angle)) * ((x1 + x2) / x1)
    console.log("quiz4_Dc = " + (quiz4_Dc * 1000).toFixed(2))

    quiz6_Dd = quiz2_Dad
    quiz6_Df = quiz4_Dc + quiz2_Dcf
    console.log("quiz6_Dd = " + (quiz6_Dd * 1000).toFixed(2))
    console.log("quiz6_Df = " + (quiz6_Df * 1000).toFixed(2))

    quiz7_a = atan(Math.abs(quiz6_Df - quiz6_Dd) / (1000 * (x3 + x4)))
    console.log("quiz7_a = " + (quiz7_a * 1000).toFixed(2))
}

generateValues()

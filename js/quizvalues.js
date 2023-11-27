var possible = {
    forceP: [1, 2, 3, 4, 5],
    x1: [1, 2, 3, 4, 5],
    angles: [30, 35, 40],
    crossAreas: [10, 15, 20, 25, 30],
    modulus: [200]
}

var forceP = 0;
var x1 = 0;
var x2 = 0;
var x3 = 0;
var x4 = 0;
var y = 0;
var angle = 0;
var area1 = 0;
var area2 = 0;
var area3 = 0;
var modulus1 = 0
var modulus2 = 0
var modulus3 = 0
var quiz1_Pad = 0
var quiz1_Pcf = 0
var quiz1_Pbg = 0
var quiz2_Dad = 0
var quiz2_Dcf = 0
var quiz2_Dbg = 0
var quiz4_Dc = 0
var quiz6_Dd = 0
var quiz6_Df = 0
var quiz7_a = 0

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
    if(!sessionStorage.getItem("scriptExecuted") || sessionStorage.getItem("scriptExecuted") == null){
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

        quiz1_Pad = parseFloat((x4 * forceP / (x3 + x4)).toFixed(2))
        quiz1_Pcf = parseFloat(x3 * forceP / (x3 + x4).toFixed(2))
        quiz1_Pbg = parseFloat(x3 * forceP / (x1 * sin(angle)).toFixed(2))
        console.log("quiz1_Pad = " + (quiz1_Pad).toFixed(2))
        console.log("quiz1_Pcf = " + (quiz1_Pcf).toFixed(2))
        console.log("quiz1_Pbg = " + (quiz1_Pbg).toFixed(2))

        quiz2_Dad = parseFloat(quiz1_Pad * y / (area2 * modulus2).toFixed(2))
        quiz2_Dcf = parseFloat(quiz1_Pcf * y / (area3 * modulus3).toFixed(2))
        quiz2_Dbg = parseFloat(quiz1_Pbg * x1 / (cos(angle) * area1 * modulus1).toFixed(2))
        console.log("cos_angle = " + cos(angle))
        console.log("quiz2_Dad = " + (quiz2_Dad * 1000).toFixed(2))
        console.log("quiz2_Dcf = " + (quiz2_Dcf * 1000).toFixed(2))
        console.log("quiz2_Dbg = " + (quiz2_Dbg * 1000).toFixed(2))

        quiz4_Dc = parseFloat((quiz2_Dbg / sin(angle)) * ((x1 + x2) / x1).toFixed(2))
        console.log("quiz4_Dc = " + (quiz4_Dc * 1000).toFixed(2))

        quiz6_Dd = quiz2_Dad
        quiz6_Df = quiz4_Dc + quiz2_Dcf
        console.log("quiz6_Dd = " + (quiz6_Dd * 1000).toFixed(2))
        console.log("quiz6_Df = " + (quiz6_Df * 1000).toFixed(2))

        quiz7_a = atan(Math.abs(quiz6_Df - quiz6_Dd)*1000 / (1000 * (x3 + x4)))
        console.log("quiz7_a = " + (quiz7_a).toFixed(2))

        sessionStorage.setItem("scriptExecuted", true);
        sessionStorage.setItem("forceP", forceP);
        sessionStorage.setItem("x1", x1);
        sessionStorage.setItem("x2", x2);
        sessionStorage.setItem("x3", x3);
        sessionStorage.setItem("x4", x4);
        sessionStorage.setItem("y", y);
        sessionStorage.setItem("angle", angle);
        sessionStorage.setItem("area1", area1);
        sessionStorage.setItem("area2", area2);
        sessionStorage.setItem("area3", area3);
        sessionStorage.setItem("modulus1", modulus1);
        sessionStorage.setItem("modulus2", modulus2);
        sessionStorage.setItem("modulus3", modulus3);
        sessionStorage.setItem("quiz1_Pad", quiz1_Pad);
        sessionStorage.setItem("quiz1_Pcf", quiz1_Pcf);
        sessionStorage.setItem("quiz1_Pbg", quiz1_Pbg);
        sessionStorage.setItem("quiz2_Dad", quiz2_Dad);
        sessionStorage.setItem("quiz2_Dcf", quiz2_Dcf);
        sessionStorage.setItem("quiz2_Dbg", quiz2_Dbg);
        sessionStorage.setItem("quiz4_Dc", quiz4_Dc);
        sessionStorage.setItem("quiz6_Dd", quiz6_Dd);
        sessionStorage.setItem("quiz6_Df", quiz6_Df);
        sessionStorage.setItem("quiz7_a", quiz7_a);
    }
    else {
        forceP = sessionStorage.getItem("forceP");
        x1 = sessionStorage.getItem("x1");
        x2 = sessionStorage.getItem("x2");
        x3 = sessionStorage.getItem("x3");
        x4 = sessionStorage.getItem("x4");
        y = sessionStorage.getItem("y");
        angle = sessionStorage.getItem("angle");
        area1 = sessionStorage.getItem("area1");
        area2 = sessionStorage.getItem("area2");
        area3 = sessionStorage.getItem("area3");
        modulus1 = sessionStorage.getItem("modulus1");
        modulus2 = sessionStorage.getItem("modulus2");
        modulus3 = sessionStorage.getItem("modulus3");
        quiz1_Pad = parseFloat(sessionStorage.getItem("quiz1_Pad"));
        quiz1_Pcf = parseFloat(sessionStorage.getItem("quiz1_Pcf"));
        quiz1_Pbg = parseFloat(sessionStorage.getItem("quiz1_Pbg"));
        quiz2_Dad = parseFloat(sessionStorage.getItem("quiz2_Dad"));
        quiz2_Dcf = parseFloat(sessionStorage.getItem("quiz2_Dcf"));
        quiz2_Dbg = parseFloat(sessionStorage.getItem("quiz2_Dbg"));
        quiz4_Dc = parseFloat(sessionStorage.getItem("quiz4_Dc"));
        quiz6_Dd = parseFloat(sessionStorage.getItem("quiz6_Dd"));
        quiz6_Df = parseFloat(sessionStorage.getItem("quiz6_Df"));
        quiz7_a = parseFloat(sessionStorage.getItem("quiz7_a"));
    }
}

generateValues()

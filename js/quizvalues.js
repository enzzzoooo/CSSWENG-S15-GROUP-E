var possible = {
    forceP: [1, 2, 3, 4, 5],
    x1: [1, 2, 3, 4, 5],
    angles: [30, 35, 40],
    crossAreas: [10, 15, 20, 25, 30],
    modulus: [200]
}

let myData = {
    forceP: 0,
    x1: 0,
    x2: 0,
    x3: 0,
    x4: 0,
    y: 0,
    angle: 0,
    area1: 0,
    area2: 0,
    area3: 0,
    modulus1: 0,
    modulus2: 0,
    modulus3: 0,
    quiz1_Pad: 0,
    quiz1_Pcf: 0,
    quiz1_Pbg: 0,
    quiz2_Dad: 0,
    quiz2_Dcf: 0,
    quiz2_Dbg: 0,
    quiz4_Dc: 0,
    quiz6_Dd: 0,
    quiz6_Df: 0,
    quiz7_a: 0
};

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
    if(window.name.trim() == ""){
        myData.forceP = possible.forceP[getRandomInt(0, possible.forceP.length)];
        myData.x1 = possible.x1[getRandomInt(0, possible.x1.length)];
        myData.x2 = 4 * myData.x1;
        myData.x3 = 3 * myData.x1;
        myData.x4 = 2 * myData.x1;
        myData.y = 2 * myData.x1;
        myData.angle = possible.angles[getRandomInt(0, possible.angles.length)];
        myData.area1 = possible.crossAreas[getRandomInt(0, possible.crossAreas.length)];
        myData.area2 = possible.crossAreas[getRandomInt(0, possible.crossAreas.length)];
        myData.area3 = possible.crossAreas[getRandomInt(0, possible.crossAreas.length)];
        myData.modulus1 = 200;
        myData.modulus2 = 200;
        myData.modulus3 = 200;

        /*
        console.log("forceP = " + myData.forceP);
        console.log("x1 = " + myData.x1);
        console.log("x2 = " + myData.x2);
        console.log("x3 = " + myData.x3);
        console.log("x4 = " + myData.x4);
        console.log("y = " + myData.y);
        console.log("angle = " + myData.angle);
        console.log("area1 = " + myData.area1);
        console.log("area2 = " + myData.area2);
        console.log("area3 = " + myData.area3);
        console.log("modulus1 = " + myData.modulus1);
        console.log("modulus2 = " + myData.modulus2);
        console.log("modulus3 = " + myData.modulus3);
        */

        myData.quiz1_Pad = parseFloat((myData.x4 * myData.forceP / (myData.x3 + myData.x4)).toFixed(5));
        myData.quiz1_Pcf = parseFloat((myData.x3 * myData.forceP / (myData.x3 + myData.x4)).toFixed(5));
        myData.quiz1_Pbg = parseFloat((myData.x3 * myData.forceP / (myData.x1 * sin(myData.angle))).toFixed(5));

        /*
        console.log("quiz1_Pad = " + myData.quiz1_Pad.toFixed(2));
        console.log("quiz1_Pcf = " + myData.quiz1_Pcf.toFixed(2));
        console.log("quiz1_Pbg = " + myData.quiz1_Pbg.toFixed(2));
        */

        myData.quiz2_Dad = parseFloat((myData.quiz1_Pad * myData.y / (myData.area2 * myData.modulus2)).toFixed(5));
        myData.quiz2_Dcf = parseFloat((myData.quiz1_Pcf * myData.y / (myData.area3 * myData.modulus3)).toFixed(5));
        myData.quiz2_Dbg = parseFloat((myData.quiz1_Pbg * myData.x1 / (cos(myData.angle) * myData.area1 * myData.modulus1)).toFixed(5));
/*
        console.log("cos_angle = " + Math.cos(myData.angle));
        console.log("quiz2_Dad = " + (myData.quiz2_Dad * 1000).toFixed(2));
        console.log("quiz2_Dcf = " + (myData.quiz2_Dcf * 1000).toFixed(2));
        console.log("quiz2_Dbg = " + (myData.quiz2_Dbg * 1000).toFixed(2));
*/
        myData.quiz4_Dc = parseFloat(((myData.quiz2_Dbg / sin(myData.angle)) * ((myData.x1 + myData.x2) / myData.x1)).toFixed(5));

        //console.log("quiz4_Dc = " + (myData.quiz4_Dc * 1000).toFixed(2));

        myData.quiz6_Dd = myData.quiz2_Dad;
        myData.quiz6_Df = myData.quiz4_Dc + myData.quiz2_Dcf;

        //console.log("quiz6_Dd = " + (myData.quiz6_Dd * 1000).toFixed(2));
        //console.log("quiz6_Df = " + (myData.quiz6_Df * 1000).toFixed(2));

        myData.quiz7_a = atan(Math.abs(myData.quiz6_Df - myData.quiz6_Dd) * 1000 / (1000 * (myData.x3 + myData.x4)));

        //console.log("quiz7_a = " + myData.quiz7_a.toFixed(2));

        window.name = JSON.stringify(myData);
    }
    else {
        myData = JSON.parse(window.name);
        /*
        console.log("forceP = " + myData.forceP);
        console.log("x1 = " + myData.x1);
        console.log("x2 = " + myData.x2);
        console.log("x3 = " + myData.x3);
        console.log("x4 = " + myData.x4);
        console.log("y = " + myData.y);
        console.log("angle = " + myData.angle);
        console.log("area1 = " + myData.area1);
        console.log("area2 = " + myData.area2);
        console.log("area3 = " + myData.area3);
        console.log("modulus1 = " + myData.modulus1);
        console.log("modulus2 = " + myData.modulus2);
        console.log("modulus3 = " + myData.modulus3);

        console.log("quiz1_Pad = " + myData.quiz1_Pad.toFixed(2));
        console.log("quiz1_Pcf = " + myData.quiz1_Pcf.toFixed(2));
        console.log("quiz1_Pbg = " + myData.quiz1_Pbg.toFixed(2));

        console.log("cos_angle = " + Math.cos(myData.angle));
        console.log("quiz2_Dad = " + (myData.quiz2_Dad * 1000).toFixed(2));
        console.log("quiz2_Dcf = " + (myData.quiz2_Dcf * 1000).toFixed(2));
        console.log("quiz2_Dbg = " + (myData.quiz2_Dbg * 1000).toFixed(2));

        console.log("quiz4_Dc = " + (myData.quiz4_Dc * 1000).toFixed(2));

        console.log("quiz6_Dd = " + (myData.quiz6_Dd * 1000).toFixed(2));
        console.log("quiz6_Df = " + (myData.quiz6_Df * 1000).toFixed(2));

        console.log("quiz7_a = " + myData.quiz7_a.toFixed(2));
        */



    }
}


generateValues()


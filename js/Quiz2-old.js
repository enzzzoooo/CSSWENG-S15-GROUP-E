var popupsimulationText = document.getElementById("popupsimulationText");
if (popupsimulationText) {
    popupsimulationText.addEventListener("click", function (e) {
        // Please sync "Simulation" to the project
    });
}

var popuplessonsText = document.getElementById("popuplessonsText");
if (popuplessonsText) {
    popuplessonsText.addEventListener("click", function (e) {
        // Please sync "Lesson Layout" to the project
    });
}

var popupcreditsText = document.getElementById("popupcreditsText");
if (popupcreditsText) {
    popupcreditsText.addEventListener("click", function (e) {
        // Please sync "Credits" to the project
    });
}

var image202309172257391501Icon = document.getElementById(
"image202309172257391501Icon"
);
if (image202309172257391501Icon) {
    image202309172257391501Icon.addEventListener("click", function () {
        var popup = document.getElementById("menuDropdownContainer");
        if (!popup) return;
        var popupStyle = popup.style;
        if (popupStyle) {
            popupStyle.display = "flex";
            popupStyle.zIndex = 100;
            popupStyle.backgroundColor = "rgba(113, 113, 113, 0.3)";
            popupStyle.alignItems = "center";
            popupStyle.justifyContent = "center";
        }
        popup.setAttribute("closable", "");

        var onClick =
        popup.onClick ||
        function (e) {
            if (e.target === popup && popup.hasAttribute("closable")) {
                popupStyle.display = "none";
            }
        };
        popup.addEventListener("click", onClick);
    });
}
var homeButton = document.getElementsByClassName("home")[0];
var lessonButton = document.getElementById("popuplessonsText");
if (homeButton) {
    homeButton.addEventListener("click", function (e) {
        window.location.href = "./index.html";
    });
}
if (lessonButton) {
    lessonButton.addEventListener("click", function (e) {
        window.location.href = "./lesson-picker.html";
    });
}

var forcePElement = document.getElementsByClassName("p-1kn2")[0];
var x1Element = document.getElementById("x1");
var x2Element = document.getElementById("x2");
var x3Element = document.getElementById("x3");
var x4Element = document.getElementById("x4");
var yElement = document.getElementById("y");
var angleElement = document.getElementById("angle");
var a1Element = document.getElementById("a1");
var a2Element = document.getElementById("a2");
var a3Element = document.getElementById("a3");
var e1Element = document.getElementById("e1");
var e2Element = document.getElementById("e2");
var e3Element = document.getElementById("e3");
var PadElement = document.getElementsByClassName("pad-04kn")[0];
var PbgElement = document.getElementsByClassName("pbg-6kn")[0];
var PcfElement = document.getElementsByClassName("pcf-06kn")[0];

//Displaying the specs of the problem based on the generated values
forcePElement.innerText = "P = " + forceP + "kN";
x1Element.innerText = "X1 = " + x1 + " m";
x2Element.innerText = "X2 = " + x2 + " m";
x3Element.innerText = "X3 = " + x3 + " m";
x4Element.innerText = "X4 = " + x4 + " m";
yElement.innerText = "y = " + y + "m";
angleElement.innerText = " = " + angle + "°";
a1Element.innerText= "A1 = " + (area1) + ` \\(mm^2\\)`;
a2Element.innerText= "A2 = " + (area2) + ` \\(mm^2\\)`;
a3Element.innerText= "A3 = " + (area3) + ` \\(mm^2\\)`;
e1Element.innerText = "E1 = " + modulus1 + " GPa";
e2Element.innerText = "E2 = " + modulus2 + " GPa";
e3Element.innerText = "E3 = " + modulus3 + " GPa";
PadElement.innerText = `\\(P_{AD}\\) = ` + quiz1_Pad.toFixed(2) + "kN";
PbgElement.innerText = `\\(P_{BG}\\) = ` + quiz1_Pbg.toFixed(2) + "kN";
PcfElement.innerText = `\\(P_{CF}\\) = ` + quiz1_Pcf.toFixed(2) + "kN";

var rectangleButton = document.getElementById("no2_checkbutton");
var hintpanel = document.getElementsByClassName("answer-prompt4")[0];
var checkText = document.getElementById("checkText");
var deltaBG = document.getElementById("delta_BG_input");
var deltaAD = document.getElementById("delta_AD_input");
var deltaCF = document.getElementById("delta_CF_input");
var incorrectAttempts = 0;

// Prevent more the 2 decimal places
deltaBG.addEventListener('input', function() {
    if (this.value.includes('.')) {
        const decimalPlaces = this.value.split('.')[1];
        if (decimalPlaces && decimalPlaces.length > 2) {
            this.value = this.value.slice(0, this.value.indexOf('.') + 3);
        }
    }
});
deltaAD.addEventListener('input', function() {
    if (this.value.includes('.')) {
        const decimalPlaces = this.value.split('.')[1];
        if (decimalPlaces && decimalPlaces.length > 2) {
            this.value = this.value.slice(0, this.value.indexOf('.') + 3);
        }
    }
});
deltaCF.addEventListener('input', function() {
    if (this.value.includes('.')) {
        const decimalPlaces = this.value.split('.')[1];
        if (decimalPlaces && decimalPlaces.length > 2) {
            this.value = this.value.slice(0, this.value.indexOf('.') + 3);
        }
    }
});

if (rectangleButton) {
    rectangleButton.addEventListener("click", function (e) {
        if(checkText.innerText == "Proceed"){
            window.location.href = "./Quiz3.html";
        }
        else if((Math.abs(deltaBG.value - parseFloat((quiz2_Dbg * 1000).toFixed(2))) < 0.02) && (Math.abs(deltaAD.value - parseFloat((quiz2_Dad * 1000).toFixed(2))) < 0.02) && (Math.abs(deltaCF.value - parseFloat((quiz2_Dcf * 1000).toFixed(2))) < 0.02)){
            checkText.innerText = "Proceed";
            rectangleButton.style.backgroundColor = "green";
            deltaBG.style.backgroundColor = "lightgreen";
            deltaAD.style.backgroundColor = "lightgreen";
            deltaCF.style.backgroundColor = "lightgreen";
        }
        else{
            incorrectAttempts += 1;
            checkText.innerText = "Try Again";
            if(incorrectAttempts >= 5){
                hintpanel.classList.add("animation");
            }
            if(Math.abs(deltaBG.value - parseFloat((quiz2_Dbg * 1000).toFixed(2))) < 0.02){
                deltaBG.style.backgroundColor = "lightgreen";
            }
            else{
                deltaBG.style.backgroundColor = "lightcoral";
            }
            if(Math.abs(deltaAD.value - parseFloat((quiz2_Dad * 1000).toFixed(2))) < 0.02){
                deltaAD.style.backgroundColor = "lightgreen";
            }
            else{
                deltaAD.style.backgroundColor = "lightcoral";
            }
            if(Math.abs(deltaCF.value - parseFloat((quiz2_Dcf * 1000).toFixed(2))) < 0.02){
                deltaCF.style.backgroundColor = "lightgreen";
            }
            else{
                deltaCF.style.backgroundColor = "lightcoral";
            }
        }
    });
}

if (checkText) {
    checkText.addEventListener("click", function (e) {
        if(checkText.innerText == "Proceed"){
            window.location.href = "./Quiz3.html";
        }
        else if((Math.abs(deltaBG.value - parseFloat((quiz2_Dbg * 1000).toFixed(2))) < 0.02) && (Math.abs(deltaAD.value - parseFloat((quiz2_Dad * 1000).toFixed(2))) < 0.02) && (Math.abs(deltaCF.value - parseFloat((quiz2_Dcf * 1000).toFixed(2))) < 0.02)){
            checkText.innerText = "Proceed";
            rectangleButton.style.backgroundColor = "green";
            deltaBG.style.backgroundColor = "lightgreen";
            deltaAD.style.backgroundColor = "lightgreen";
            deltaCF.style.backgroundColor = "lightgreen";
        }
        else{
            incorrectAttempts += 1;
            checkText.innerText = "Try Again";
            if(incorrectAttempts >= 5){
                hintpanel.classList.add("animation");
            }
            if(Math.abs(deltaBG.value - parseFloat((quiz2_Dbg * 1000).toFixed(2))) < 0.02){
                deltaBG.style.backgroundColor = "lightgreen";
            }
            else{
                deltaBG.style.backgroundColor = "lightcoral";
            }
            if(Math.abs(deltaAD.value - parseFloat((quiz2_Dad * 1000).toFixed(2))) < 0.02){
                deltaAD.style.backgroundColor = "lightgreen";
            }
            else{
                deltaAD.style.backgroundColor = "lightcoral";
            }
            if(Math.abs(deltaCF.value - parseFloat((quiz2_Dcf * 1000).toFixed(2))) < 0.02){
                deltaCF.style.backgroundColor = "lightgreen";
            }
            else{
                deltaCF.style.backgroundColor = "lightcoral";
            }
        }
    });
}

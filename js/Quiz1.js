var image202309172257391501Icon = document.getElementById("image202309172257391501Icon");
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

var force = document.getElementsByClassName("p-1kn5")[0];
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

//Displaying the specs of the problem based on the generated values
force.innerText = "P = " + forceP + "kN";
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

var checkButton = document.getElementById("no1_checkbutton");
var checkButtonText = document.getElementById("no1_checkbuttontext");
var PBG = document.getElementById("P_BG_input");
var PAD = document.getElementById("P_AD_input");
var PCF = document.getElementById("P_CF_input");

// Prevent more the 2 decimal places
PBG.addEventListener('input', function() {
    if (this.value.includes('.')) {
        const decimalPlaces = this.value.split('.')[1];
        if (decimalPlaces && decimalPlaces.length > 2) {
            this.value = this.value.slice(0, this.value.indexOf('.') + 3);
        }
    }
});
PAD.addEventListener('input', function() {
    if (this.value.includes('.')) {
        const decimalPlaces = this.value.split('.')[1];
        if (decimalPlaces && decimalPlaces.length > 2) {
            this.value = this.value.slice(0, this.value.indexOf('.') + 3);
        }
    }
});
PCF.addEventListener('input', function() {
    if (this.value.includes('.')) {
        const decimalPlaces = this.value.split('.')[1];
        if (decimalPlaces && decimalPlaces.length > 2) {
            this.value = this.value.slice(0, this.value.indexOf('.') + 3);
        }
    }
});

if (checkButton) {
    checkButton.addEventListener("click", function (e) {
        if(checkButtonText.innerText == "Proceed"){
            window.location.href = "./Quiz2.html";
        }
        else if((Math.abs(PBG.value - parseFloat(quiz1_Pbg.toFixed(2))) < 0.02) && (Math.abs(PAD.value - parseFloat(quiz1_Pad.toFixed(2))) < 0.02) && (Math.abs(PCF.value - parseFloat(quiz1_Pcf.toFixed(2))) < 0.02)){
            checkButtonText.innerText = "Proceed";
            checkButton.style.backgroundColor = "green";
            PBG.style.backgroundColor = "lightgreen";
            PAD.style.backgroundColor = "lightgreen";
            PCF.style.backgroundColor = "lightgreen";
        }
        else{
            checkButtonText.innerText = "Try Again";
            if(Math.abs(PBG.value - parseFloat(quiz1_Pbg.toFixed(2))) < 0.02){
                PBG.style.backgroundColor = "lightgreen";
            }
            else{
                PBG.style.backgroundColor = "lightcoral";
            }
            if(Math.abs(PAD.value - parseFloat(quiz1_Pad.toFixed(2))) < 0.02){
                PAD.style.backgroundColor = "lightgreen";
            }
            else{
                PAD.style.backgroundColor = "lightcoral";
            }
            if(Math.abs(PCF.value - parseFloat(quiz1_Pcf.toFixed(2))) < 0.02){
                PCF.style.backgroundColor = "lightgreen";
            }
            else{
                PCF.style.backgroundColor = "lightcoral";
            }
        }
    });
}
if (checkButtonText) {
    checkButtonText.addEventListener("click", function (e) {
        if(checkButtonText.innerText == "Proceed"){
            window.location.href = "./Quiz2.html";
        }
        else if((Math.abs(PBG.value - parseFloat(quiz1_Pbg.toFixed(2))) < 0.02) && (Math.abs(PAD.value - parseFloat(quiz1_Pad.toFixed(2))) < 0.02) && (Math.abs(PCF.value - parseFloat(quiz1_Pcf.toFixed(2))) < 0.02)){
            checkButtonText.innerText = "Proceed";
            checkButton.style.backgroundColor = "green";
            PBG.style.backgroundColor = "lightgreen";
            PAD.style.backgroundColor = "lightgreen";
            PCF.style.backgroundColor = "lightgreen";
        }
        else{
            checkButtonText.innerText = "Try Again";
            if(Math.abs(PBG.value - parseFloat(quiz1_Pbg.toFixed(2))) < 0.02){
                PBG.style.backgroundColor = "lightgreen";
            }
            else{
                PBG.style.backgroundColor = "lightcoral";
            }
            if(Math.abs(PAD.value - parseFloat(quiz1_Pad.toFixed(2))) < 0.02){
                PAD.style.backgroundColor = "lightgreen";
            }
            else{
                PAD.style.backgroundColor = "lightcoral";
            }
            if(Math.abs(PCF.value - parseFloat(quiz1_Pcf.toFixed(2))) < 0.02){
                PCF.style.backgroundColor = "lightgreen";
            }
            else{
                PCF.style.backgroundColor = "lightcoral";
            }
        }
    });
}

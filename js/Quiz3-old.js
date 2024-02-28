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

var forcePElement = document.getElementsByClassName("p-1kn1")[0];
var x1Element = document.getElementById("x1panel");
var x2Element = document.getElementById("x2");
var x3Element = document.getElementById("x3");
var x4Element = document.getElementById("x4");
var yElement = document.getElementById("y");
var angleElement = document.getElementById("anglepanel");
var a1Element = document.getElementById("a1panel");
var a2Element = document.getElementById("a2");
var a3Element = document.getElementById("a3");
var e1Element = document.getElementById("e1panel");
var e2Element = document.getElementById("e2");
var e3Element = document.getElementById("e3");

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

var explanationpane1 = document.getElementById("answerPromptContainer");
var explanationpane2 = document.getElementById("answerPromptContainer1");
var explanationpane1text = document.getElementById("explanationpane1text");
var explanationpane2text = document.getElementById("explanationpane2text");
var explanationpane1symbol = document.getElementById("explanationpane1symbol");
var explanationpane2symbol = document.getElementById("explanationpane2symbol");
var rectangle16 = document.getElementById("rectangle16");
var checkButtonText = document.getElementById("checkButtonText");
var deltaBG = document.getElementById("deltaBG");
var deltaBGoverCos = document.getElementById("deltaBG/cos");
var deltaBGoverSin = document.getElementById("deltaBG/sin");
var deltaBGtimesCos = document.getElementById("deltaBG*cos");
var deltaBGtimesSin = document.getElementById("deltaBG*sin");
var dC = document.getElementById("dC");
var deltaCF = document.getElementById("deltaCF");
var dBplusdC = document.getElementById("dB+dC");
var dCplusdeltaCF = document.getElementById("dC+deltaCF");
rectangle16.addEventListener("click", function (e) {
    if(checkButtonText.innerText == "Proceed"){
        window.location.href = "./Quiz4.html"; /*Go to Quiz no 4*/
    }
    else if(deltaBGoverSin.checked && dC.checked){
        explanationpane1text.textContent="Correct!";
        explanationpane2text.textContent="Correct!";
        explanationpane1.style.backgroundColor="var(--color-darkslategray)";
        explanationpane1symbol.src="./imgs/group.svg";
        explanationpane2.style.backgroundColor="var(--color-darkslategray)";
        explanationpane2symbol.src="./imgs/group.svg";
        if (explanationpane1.classList.contains("animation")) {
            explanationpane1.classList.remove("animation");
            void explanationpane1.offsetWidth;
            explanationpane1.classList.add("animation");
        }
        explanationpane1.classList.add("animation");
        if (explanationpane2.classList.contains("animation")) {
            explanationpane2.classList.remove("animation");
            void explanationpane2.offsetWidth;
            explanationpane2.classList.add("animation");
        }
        explanationpane2.classList.add("animation");
        checkButtonText.innerText = "Proceed";
        rectangle16.style.backgroundColor = "green";
    }
    else{
        checkButtonText.innerText = "Try Again";
        if(deltaBG.checked){
            explanationpane1text.textContent="Incorrect! Cable BG is not oriented vertically.";
            explanationpane1.style.backgroundColor="var(--color-brown)";
            explanationpane1symbol.src="./imgs/vector1.svg";
            if (explanationpane1.classList.contains("animation")) {
                explanationpane1.classList.remove("animation");
                void explanationpane1.offsetWidth;
                explanationpane1.classList.add("animation");
            }
            explanationpane1.classList.add("animation");
        }
        else if(deltaBGoverSin.checked){
            explanationpane1text.textContent="Correct!";
            explanationpane1.style.backgroundColor="var(--color-darkslategray)";
            explanationpane1symbol.src="./imgs/group.svg";
            if (explanationpane1.classList.contains("animation")) {
                explanationpane1.classList.remove("animation");
                void explanationpane1.offsetWidth;
                explanationpane1.classList.add("animation");
            }
            explanationpane1.classList.add("animation");
        }
        else {
            explanationpane1text.textContent="Incorrect! Redo your analysis (you may go back to the discussion)";
            explanationpane1.style.backgroundColor="var(--color-brown)";
            explanationpane1symbol.src="./imgs/vector1.svg";
            if (explanationpane1.classList.contains("animation")) {
                explanationpane1.classList.remove("animation");
                void explanationpane1.offsetWidth;
                explanationpane1.classList.add("animation");
            }
            explanationpane1.classList.add("animation");
        }
        if(dBplusdC.checked){
            explanationpane2text.textContent="Incorrect! The deflections of points B and C do not lie along the same axis.";
            explanationpane2.style.backgroundColor="var(--color-brown)";
            explanationpane2symbol.src="./imgs/vector1.svg";
            if (explanationpane2.classList.contains("animation")) {
                explanationpane2.classList.remove("animation");
                void explanationpane2.offsetWidth;
                explanationpane2.classList.add("animation");
            }
            explanationpane2.classList.add("animation");
        }
        else if(dC.checked){
            explanationpane2text.textContent="Correct!";
            explanationpane2.style.backgroundColor="var(--color-darkslategray)";
            explanationpane2symbol.src="./imgs/group.svg";
            if (explanationpane2.classList.contains("animation")) {
                explanationpane2.classList.remove("animation");
                void explanationpane2.offsetWidth;
                explanationpane2.classList.add("animation");
            }
            explanationpane2.classList.add("animation");
        }
        else{
            explanationpane2text.textContent="Incorrect! The deformation of cable CF does not affect the deflection of point C.";
            explanationpane2.style.backgroundColor="var(--color-brown)";
            explanationpane2symbol.src="./imgs/vector1.svg";
            if (explanationpane2.classList.contains("animation")) {
                explanationpane2.classList.remove("animation");
                void explanationpane2.offsetWidth;
                explanationpane2.classList.add("animation");
            }
            explanationpane2.classList.add("animation");
        }
    }
});

var submit = document.getElementById("no3_tryagainbutton");
submit.addEventListener("click", function (e) {
    if(checkButtonText.innerText == "Proceed"){
        window.location.href = "./Quiz4.html"; /*Go to Quiz no 4*/
    }
    else if(deltaBGoverSin.checked && dC.checked){
        explanationpane1text.textContent="Correct!";
        explanationpane2text.textContent="Correct!";
        explanationpane1.style.backgroundColor="var(--color-darkslategray)";
        explanationpane1symbol.src="./imgs/group.svg";
        explanationpane2.style.backgroundColor="var(--color-darkslategray)";
        explanationpane2symbol.src="./imgs/group.svg";
        if (explanationpane1.classList.contains("animation")) {
            explanationpane1.classList.remove("animation");
            void explanationpane1.offsetWidth;
            explanationpane1.classList.add("animation");
        }
        explanationpane1.classList.add("animation");
        if (explanationpane2.classList.contains("animation")) {
            explanationpane2.classList.remove("animation");
            void explanationpane2.offsetWidth;
            explanationpane2.classList.add("animation");
        }
        explanationpane2.classList.add("animation");
        checkButtonText.innerText = "Proceed";
        rectangle16.style.backgroundColor = "green";
    }
    else{
        checkButtonText.innerText = "Try Again";
        if(deltaBG.checked){
            explanationpane1text.textContent="Incorrect! Cable BG is not oriented vertically.";
            explanationpane1.style.backgroundColor="var(--color-brown)";
            explanationpane1symbol.src="./imgs/vector1.svg";
            if (explanationpane1.classList.contains("animation")) {
                explanationpane1.classList.remove("animation");
                void explanationpane1.offsetWidth;
                explanationpane1.classList.add("animation");
            }
            explanationpane1.classList.add("animation");
        }
        else if(deltaBGoverSin.checked){
            explanationpane1text.textContent="Correct!";
            explanationpane1.style.backgroundColor="var(--color-darkslategray)";
            explanationpane1symbol.src="./imgs/group.svg";
            if (explanationpane1.classList.contains("animation")) {
                explanationpane1.classList.remove("animation");
                void explanationpane1.offsetWidth;
                explanationpane1.classList.add("animation");
            }
            explanationpane1.classList.add("animation");
        }
        else {
            explanationpane1text.textContent="Incorrect! Redo your analysis (you may go back to the discussion)";
            explanationpane1.style.backgroundColor="var(--color-brown)";
            explanationpane1symbol.src="./imgs/vector1.svg";
            if (explanationpane1.classList.contains("animation")) {
                explanationpane1.classList.remove("animation");
                void explanationpane1.offsetWidth;
                explanationpane1.classList.add("animation");
            }
            explanationpane1.classList.add("animation");
        }
        if(dBplusdC.checked){
            explanationpane2text.textContent="Incorrect! The deflections of points B and C do not lie along the same axis.";
            explanationpane2.style.backgroundColor="var(--color-brown)";
            explanationpane2symbol.src="./imgs/vector1.svg";
            if (explanationpane2.classList.contains("animation")) {
                explanationpane2.classList.remove("animation");
                void explanationpane2.offsetWidth;
                explanationpane2.classList.add("animation");
            }
            explanationpane2.classList.add("animation");
        }
        else if(dC.checked){
            explanationpane2text.textContent="Correct!";
            explanationpane2.style.backgroundColor="var(--color-darkslategray)";
            explanationpane2symbol.src="./imgs/group.svg";
            if (explanationpane2.classList.contains("animation")) {
                explanationpane2.classList.remove("animation");
                void explanationpane2.offsetWidth;
                explanationpane2.classList.add("animation");
            }
            explanationpane2.classList.add("animation");
        }
        else{
            explanationpane2text.textContent="Incorrect! The deformation of cable CF does not affect the deflection of point C.";
            explanationpane2.style.backgroundColor="var(--color-brown)";
            explanationpane2symbol.src="./imgs/vector1.svg";
            if (explanationpane2.classList.contains("animation")) {
                explanationpane2.classList.remove("animation");
                void explanationpane2.offsetWidth;
                explanationpane2.classList.add("animation");
            }
            explanationpane2.classList.add("animation");
        }
    }
});

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
var explanationpane1 = document.getElementsByClassName("answer-prompt2")[0];
var explanationpane2 = document.getElementsByClassName("answer-prompt3")[0];
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
        window.location.href = "./Quiz1.html"; /*Change to Quiz no 4*/
    }
    else if(deltaBGoverSin.checked && dC.checked){
        explanationpane1text.textContent="Correct!";
        explanationpane2text.textContent="Correct!";
        explanationpane1.style.backgroundColor="var(--color-darkslategray)";
        explanationpane1symbol.src="./imgs/group.svg";
        explanationpane2.style.backgroundColor="var(--color-darkslategray)";
        explanationpane2symbol.src="./imgs/group.svg";
        explanationpane1.style.visibility="visible";
        explanationpane2.style.visibility="visible";
        checkButtonText.innerText = "Proceed";
    }
    else{
        checkButtonText.innerText = "Try Again";
        if(deltaBG.checked){
            explanationpane1text.textContent="Incorrect! Cable BG is not oriented vertically.";
            explanationpane1.style.backgroundColor="var(--color-brown)";
            explanationpane1symbol.src="./imgs/vector1.svg";
            explanationpane1.style.visibility="visible";
        }
        else if(deltaBGoverSin.checked){
            explanationpane1text.textContent="Correct!";
            explanationpane1.style.backgroundColor="var(--color-darkslategray)";
            explanationpane1symbol.src="./imgs/group.svg";
            explanationpane1.style.visibility="visible";
        }
        else {
            explanationpane1text.textContent="Incorrect! Redo your analysis (you may go back to the discussion)";
            explanationpane1.style.backgroundColor="var(--color-brown)";
            explanationpane1symbol.src="./imgs/vector1.svg";
            explanationpane1.style.visibility="visible";
        }
        if(dBplusdC.checked){
            explanationpane2text.textContent="Incorrect! The deflections of points B and C do not lie along the same axis.";
            explanationpane2.style.backgroundColor="var(--color-brown)";
            explanationpane2symbol.src="./imgs/vector1.svg";
            explanationpane2.style.visibility="visible";
        }
        else if(dC.checked){
            explanationpane2text.textContent="Correct!";
            explanationpane2.style.backgroundColor="var(--color-darkslategray)";
            explanationpane2symbol.src="./imgs/group.svg";
            explanationpane2.style.visibility="visible";
        }
        else{
            explanationpane2text.textContent="Incorrect! The deformation of cable CF does not affect the deflection of point C.";
            explanationpane2.style.backgroundColor="var(--color-brown)";
            explanationpane2symbol.src="./imgs/vector1.svg";
            explanationpane2.style.visibility="visible";
        }
    }
});

var submit = document.getElementById("no3_tryagainbutton");
submit.addEventListener("click", function (e) {
    if(checkButtonText.innerText == "Proceed"){
        window.location.href = "./Quiz1.html"; /*Change to Quiz no 4*/
    }
    else if(deltaBGoverSin.checked && dC.checked){
        explanationpane1text.textContent="Correct!";
        explanationpane2text.textContent="Correct!";
        explanationpane1.style.backgroundColor="var(--color-darkslategray)";
        explanationpane1symbol.src="./imgs/group.svg";
        explanationpane2.style.backgroundColor="var(--color-darkslategray)";
        explanationpane2symbol.src="./imgs/group.svg";
        explanationpane1.style.visibility="visible";
        explanationpane2.style.visibility="visible";
        checkButtonText.innerText = "Proceed";
    }
    else{
        checkButtonText.innerText = "Try Again";
        if(deltaBG.checked){
            explanationpane1text.textContent="Incorrect! Cable BG is not oriented vertically.";
            explanationpane1.style.backgroundColor="var(--color-brown)";
            explanationpane1symbol.src="./imgs/vector1.svg";
            explanationpane1.style.visibility="visible";
        }
        else if(deltaBGoverSin.checked){
            explanationpane1text.textContent="Correct!";
            explanationpane1.style.backgroundColor="var(--color-darkslategray)";
            explanationpane1symbol.src="./imgs/group.svg";
            explanationpane1.style.visibility="visible";
        }
        else {
            explanationpane1text.textContent="Incorrect! Redo your analysis (you may go back to the discussion)";
            explanationpane1.style.backgroundColor="var(--color-brown)";
            explanationpane1symbol.src="./imgs/vector1.svg";
            explanationpane1.style.visibility="visible";
        }
        if(dBplusdC.checked){
            explanationpane2text.textContent="Incorrect! The deflections of points B and C do not lie along the same axis.";
            explanationpane2.style.backgroundColor="var(--color-brown)";
            explanationpane2symbol.src="./imgs/vector1.svg";
            explanationpane2.style.visibility="visible";
        }
        else if(dC.checked){
            explanationpane2text.textContent="Correct!";
            explanationpane2.style.backgroundColor="var(--color-darkslategray)";
            explanationpane2symbol.src="./imgs/group.svg";
            explanationpane2.style.visibility="visible";
        }
        else{
            explanationpane2text.textContent="Incorrect! The deformation of cable CF does not affect the deflection of point C.";
            explanationpane2.style.backgroundColor="var(--color-brown)";
            explanationpane2symbol.src="./imgs/vector1.svg";
            explanationpane2.style.visibility="visible";
        }
    }
});
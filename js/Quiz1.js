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

var force = document.getElementsByClassName("p-1kn5");
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

var checkButton = document.getElementById("no1_checkbutton");
var checkButtonText = document.getElementById("no1_checkbuttontext");
var PBG = document.getElementById("P_BG_input");
var PAD = document.getElementById("P_AD_input");
var PCF = document.getElementById("P_CF_input");
if (checkButton) {
    checkButton.addEventListener("click", function (e) {
        if(checkButtonText.innerText == "Proceed"){
            window.location.href = "./Quiz2.html";
        }
        else if(PBG.value == 6 && PAD.value == 0.4 && PCF.value == 0.6){
            checkButtonText.innerText = "Proceed";
            checkButton.style.backgroundColor = "green";
            PBG.style.backgroundColor = "green";
            PAD.style.backgroundColor = "green";
            PCF.style.backgroundColor = "green";
        }
        else{
            checkButtonText.innerText = "Try Again";
            if(PBG.value == 6){
                PBG.style.backgroundColor = "green";
            }
            else{
                PBG.style.backgroundColor = "red";
            }
            if(PAD.value == 0.4){
                PAD.style.backgroundColor = "green";
            }
            else{
                PAD.style.backgroundColor = "red";
            }
            if(PCF.value == 0.6){
                PCF.style.backgroundColor = "green";
            }
            else{
                PCF.style.backgroundColor = "red";
            }
        }
    });
}
if (checkButtonText) {
    checkButtonText.addEventListener("click", function (e) {
        if(checkButtonText.innerText == "Proceed"){
            window.location.href = "./Quiz2.html";
        }
        else if(PBG.value == 6 && PAD.value == 0.4 && PCF.value == 0.6){
            checkButtonText.innerText = "Proceed";
            checkButton.style.backgroundColor = "green";
            PBG.style.backgroundColor = "green";
            PAD.style.backgroundColor = "green";
            PCF.style.backgroundColor = "green";
        }
        else{
            checkButtonText.innerText = "Try Again";
            if(PBG.value == 6){
                PBG.style.backgroundColor = "green";
            }
            else{
                PBG.style.backgroundColor = "red";
            }
            if(PAD.value == 0.4){
                PAD.style.backgroundColor = "green";
            }
            else{
                PAD.style.backgroundColor = "red";
            }
            if(PCF.value == 0.6){
                PCF.style.backgroundColor = "green";
            }
            else{
                PCF.style.backgroundColor = "red";
            }
        }
    });
}
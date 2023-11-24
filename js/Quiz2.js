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

var rectangleButton = document.getElementById("no2_checkbutton");
var hintpanel = document.getElementsByClassName("answer-prompt4")[0];
if (rectangleButton) {
    rectangleButton.addEventListener("click", function (e) {
        if(window.getComputedStyle(hintpanel).visibility === "hidden"){
            hintpanel.style.visibility="visible";
        }
        else{
            window.location.href = "./Quiz3.html";
        }
    });
}

var checkText = document.getElementById("checkText");
if (checkText) {
    checkText.addEventListener("click", function (e) {
        if(window.getComputedStyle(hintpanel).visibility === "hidden"){
            hintpanel.style.visibility="visible";
        }
        else{
            window.location.href = "./Quiz3.html";
        }
    });
}
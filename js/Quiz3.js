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
var explanationpane1 = document.getElementsByClassName("answer-prompt2")[0];
var explanationpane2 = document.getElementsByClassName("answer-prompt3")[0];
var explanationpane1text = document.getElementById("explanationpane1text");
var explanationpane2text = document.getElementById("explanationpane2text");
var explanationpane2symbol = document.getElementById("explanationpane2symbol");
var rectangle16 = document.getElementById("rectangle16");
rectangle16.addEventListener("click", function (e) {
    if(window.getComputedStyle(explanationpane1).visibility === "hidden" || window.getComputedStyle(explanationpane2).visibility === "hidden"){
        explanationpane1.style.visibility="visible";
        explanationpane2.style.visibility="visible";
    }
    else{
        explanationpane1text.textContent="Incorrect! Redo your analysis (you may go back to the discussion)";
        explanationpane2text.textContent="Correct!";
        explanationpane2.style.backgroundColor="var(--color-darkslategray)";
        explanationpane2symbol.src="./imgs/group.svg";
    }
});

var submit = document.getElementById("no3_tryagainbutton");
submit.addEventListener("click", function (e) {
    if(window.getComputedStyle(explanationpane1).visibility === "hidden" || window.getComputedStyle(explanationpane2).visibility === "hidden"){
        explanationpane1.style.visibility="visible";
        explanationpane2.style.visibility="visible";
    }
    else{
        explanationpane1text.textContent="Incorrect! Redo your analysis (you may go back to the discussion)";
        explanationpane2text.textContent="Correct!";
        explanationpane2.style.backgroundColor="var(--color-darkslategray)";
        explanationpane2symbol.src="./imgs/group.svg";
    }
});
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
var checkButton = document.getElementById("no1_checkbutton");
if (checkButton) {
    checkButton.addEventListener("click", function (e) {
        window.location.href = "./Quiz2.html";
    });
}
var checkButtonText = document.getElementById("no1_checkbuttontext");
if (checkButtonText) {
    checkButtonText.addEventListener("click", function (e) {
        window.location.href = "./Quiz2.html";
    });
}
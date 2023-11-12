var introduction = document.getElementById("introduction");
if (introduction) {
  introduction.addEventListener("click", function (e) {
    window.location.href = "./introduction.html";
  });
}

var compoundBar = document.getElementById("compoundBar");
if (compoundBar) {
  compoundBar.addEventListener("click", function (e) {
    window.location.href = "./sampleproblemone.html";
  });
}

var hangingBar = document.getElementById("hangingBar");
if (hangingBar) {
  hangingBar.addEventListener("click", function (e) {
    window.location.href = "./sampleproblemtwo.html";
  });
}
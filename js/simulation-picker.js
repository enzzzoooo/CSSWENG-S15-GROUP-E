var compoundBar = document.getElementById("compoundBar");
if (compoundBar) {
  compoundBar.addEventListener("click", function (e) {
    window.location.href = "./extending-bar-sim.html";
  });
}

var hangingBar = document.getElementById("hangingBar");
if (hangingBar) {
  hangingBar.addEventListener("click", function (e) {
    window.location.href = "./hanging-bar-sim.html";
  });
}

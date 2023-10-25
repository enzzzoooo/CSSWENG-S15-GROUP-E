const hamburgerButton = document.getElementById('hamburgerButton');
const menuDropdownContainer = document.getElementById('menuDropdownContainer');

const simulationButton = document.getElementById('popupsimulation');
const lesseonsButton = document.getElementById('popuplessons');

// Show the menu dropdown container when the hamburger button is clicked
hamburgerButton.addEventListener('click', () => {
  menuDropdownContainer.style.display = "flex";
  menuDropdownContainer.style.zIndex = 100;
  menuDropdownContainer.style.backgroundColor = "rgba(113, 113, 113, 0.3)";
  menuDropdownContainer.style.alignItems = "flex-start";
  menuDropdownContainer.style.justifyContent = "flex-end";
  menuDropdownContainer.setAttribute("closable", "");
  
  const onClick = (event) => {
    if (event.target === menuDropdownContainer && menuDropdownContainer.hasAttribute("closable")) {
      menuDropdownContainer.style.display = 'none';
    }
  };
  menuDropdownContainer.addEventListener('click', onClick);
});

// Event handler for "Simulation"
simulationButton.addEventListener('click', () => {
  window.location.href = "hanging-bar-sim.html";
});

// Event handler for "Lessons"
lesseonsButton.addEventListener('click', () => {
  window.location.href = "home.html"; // should change to lessons
});
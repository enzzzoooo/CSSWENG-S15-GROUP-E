const hamburgerButton = document.getElementById('hamburgerButton');
const menuDropdownContainer = document.getElementById('menuDropdownContainer');

// Show the menu dropdown container when the hamburger button is clicked
hamburgerButton.addEventListener('click', () => {
  menuDropdownContainer.style.display = "flex";
  menuDropdownContainer.style.zIndex = 100;
  menuDropdownContainer.style.backgroundColor = "rgba(113, 113, 113, 0.3)";
  menuDropdownContainer.style.alignItems = "flex-start";
  menuDropdownContainer.style.justifyContent = "flex-end";
  menuDropdownContainer.setAttribute("clossable", "true")
});

// Hide the menu dropdown container when the user clicks outside of it
window.addEventListener('click', (event) => {
  if (event.target !== hamburgerButton && !menuDropdownContainer.contains(event.target)) {
    menuDropdownContainer.style.display = 'none';
  }
});

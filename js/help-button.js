const helpButton = document.getElementById('help');
const helpText = document.getElementById('helpText');


helpButton.addEventListener('mouseenter', () => {
  helpText.classList.add('show');
});

helpButton.addEventListener('mouseleave', () => {
  helpText.classList.remove('show');
});

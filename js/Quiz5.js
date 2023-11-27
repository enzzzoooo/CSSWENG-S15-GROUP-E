const checkButton = document.getElementById('checkButton');
let selectedAnswer;

const choiceElements = document.getElementsByClassName('question-choice-wrapper');
for (let i = 0; i < choiceElements.length; i++) {
  choiceElements[i].addEventListener('click', function() {
    selectedAnswer = this;
    if (this.classList.contains('selected')) {
      this.classList.remove('selected');
    } else {
      // Unselect the previously selected answer
      const previouslySelected = document.querySelector('.question-choice-wrapper.selected');
      if (previouslySelected) {
        previouslySelected.classList.remove('selected');
      }
      
      this.classList.add('selected');
    }
  });
}

checkButton.addEventListener('click', () => {
  if (checkButton.textContent == 'Proceed') {
    window.location.href = 'Quiz6.html';
  }

  console.log(selectedAnswer);
  const explanationWrapper = selectedAnswer.getElementsByClassName('question-choice-explanation-wrapper')[0];
  explanationWrapper.classList.add('buff');
  setTimeout(() => {
    explanationWrapper.classList.remove('buff');
    explanationWrapper.classList.add('show');
  }, 500);
  if (selectedAnswer.id === 'choice3' || selectedAnswer.id === 'choice4') {
    checkButton.textContent = 'Proceed';
  }
  
});






const checkButton = document.getElementById('checkButton');
let selectedAnswer;


// for placing randomv values for calculation
// might be better to put this in a separate js file and have it consisent throughout all questions
function populateValues() {
  const forceValueElement = document.getElementById('forceValue');
  const x1ValueElement = document.getElementById('x1Value');
  const x2ValueElement = document.getElementById('x2Value');
  const x3ValueElement = document.getElementById('x3Value');
  const x4ValueElement = document.getElementById('x4Value');
  const yValueElement = document.getElementById('yValue');
  const thetaValueElement = document.getElementById('thetaValue');
  const a1ValueElement = document.getElementById('a1Value');
  const a2ValueElement = document.getElementById('a2Value');
  const a3ValueElement = document.getElementById('a3Value');
  const e1ValueElement = document.getElementById('e1Value');
  const e2ValueElement = document.getElementById('e2Value');
  const e3ValueElement = document.getElementById('e3Value');

  forceValueElement.textContent = myData.forceP
  x1ValueElement.textContent = myData.x1
  x2ValueElement.textContent = myData.x2
  x3ValueElement.textContent = myData.x3
  x4ValueElement.textContent = myData.x4
  yValueElement.textContent = myData.y
  thetaValueElement.textContent = myData.angle
  a1ValueElement.textContent = myData.area1
  a2ValueElement.textContent = myData.area2
  a3ValueElement.textContent = myData.area3
  e1ValueElement.textContent = myData.modulus1
  e2ValueElement.textContent = myData.modulus2
  e3ValueElement.textContent = myData.modulus3
}

window.addEventListener('load', populateValues);

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
    window.location.href = './Quiz6.html';
  }

  const explanationWrapper = selectedAnswer.getElementsByClassName('question-choice-explanation-wrapper')[0];
  explanationWrapper.classList.add('buff');
  setTimeout(() => {
    explanationWrapper.classList.remove('buff');
    explanationWrapper.classList.add('show');
  }, 500);
  if (selectedAnswer.id === 'choice3' || selectedAnswer.id === 'choice4') {
    checkButton.style.backgroundColor = 'lightgreen';
    checkButton.textContent = 'Proceed';
  }

});






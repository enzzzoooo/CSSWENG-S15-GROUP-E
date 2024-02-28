const checkButton = document.getElementById('checkButton');
let expectedAnswer1 = 0;
let wrongCounter = 0;
let rightCounter = 0;

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

  expectedAnswer1 = (parseFloat(myData.quiz4_Dc) * 1000).toFixed(2);

}

window.addEventListener('load', populateValues);

// Prevent more the 2 decimal places
document.getElementById('question4-input1').addEventListener('input', function() {
  if (this.value.includes('.')) {
    const decimalPlaces = this.value.split('.')[1];
    if (decimalPlaces && decimalPlaces.length > 2) {
      this.value = this.value.slice(0, this.value.indexOf('.') + 3);
    }
  }
});


checkButton.addEventListener('click', () => {
  const hintElement = document.getElementById('quizHint');
  const correntElement = document.getElementById('correctResult');
  const expectedAnswer1Element = document.getElementById('expectedAnswer1');
  let answer1 = document.getElementById('question4-input1').value;


  if (checkButton.textContent == 'Proceed') {
    window.location.href = './Quiz5.html';
  }

  // Checking answer
  if (Math.abs(answer1 - expectedAnswer1) > 0.015) {
    wrongCounter++;
    if (wrongCounter == 5) {
      hintElement.classList.add('buff');
      setTimeout(() => {
        hintElement.classList.remove('buff');
        hintElement.classList.add('show');
      }, 500);
    }
    document.getElementById('question4-input1').style.backgroundColor = 'lightcoral';
  } else {
    correntElement.classList.add('show');
    expectedAnswer1Element.textContent = expectedAnswer1;
    hintElement.classList.remove('show');
    hintElement.classList.remove('buff');
    correntElement.classList.add('buff');
    setTimeout(() => {
      correntElement.classList.remove('buff');
      correntElement.classList.add('show');
    }, 500);

    document.getElementById('question4-input1').style.backgroundColor = 'lightgreen';

    checkButton.style.backgroundColor = 'lightgreen';
    checkButton.textContent = 'Proceed';

  }
});

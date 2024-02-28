// Names are kinda wack since rushed and didnt think too much about it. logic is also wack but wrosk.

const checkButton = document.getElementById('checkButton');


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


checkButton.addEventListener('click', () => {
  const explanationWrapper1 = document.getElementById('choice1')
  const explanationWrapper2 = document.getElementById('choice2')
  const explanationWrapper3 = document.getElementById('choice3')

  const explanationWrapper4 = document.querySelector('#choice4')
  const explanationWrapper5 = document.querySelector('#choice5')
  const explanationWrapper6 = document.querySelector('#choice6')

  let shownWrapper1;
  let shownWrapper2;

  input1 = document.querySelector('#question3-input1 input[type="radio"]:checked');
  input2 = document.querySelector('#question3-input2 input[type="radio"]:checked');

  if (checkButton.textContent == 'Proceed') {
    window.location.href = './Quiz4.html';
  }

  if (input1) {
    input1 = input1.value;
  } else {
    input1 = null;
  }

  if (input2) {
    input2 = input2.value;
  } else {
    input2 = null;
  }

  if (input1 == 'option1') {
    explanationWrapper2.classList.remove('show');
    explanationWrapper3.classList.remove('show');
    shownWrapper1 = explanationWrapper1;
  } else if (input1 == 'option2' || input1 == 'option3' || input1 == 'option5') {
    explanationWrapper1.classList.remove('show');
    explanationWrapper2.classList.remove('show');
    explanationWrapper3.classList.remove('show');
    shownWrapper1 = explanationWrapper2;
  } else if (input1 == 'option4') {
    explanationWrapper1.classList.remove('show');
    explanationWrapper2.classList.remove('show');
    shownWrapper1 = explanationWrapper3;
  }

  if (input2 == 'option7' || input2 == 'option9') {
    explanationWrapper4.classList.remove('show');
    explanationWrapper5.classList.remove('show');
    explanationWrapper6.classList.remove('show');
    shownWrapper2 = explanationWrapper4;
  } else if (input2 == 'option8') {
    explanationWrapper4.classList.remove('show');
    explanationWrapper6.classList.remove('show');
    shownWrapper2 = explanationWrapper5;
  } else if (input2 == 'option6') {
    explanationWrapper4.classList.remove('show');
    explanationWrapper5.classList.remove('show');
    shownWrapper2 = explanationWrapper6;
  }


  if (input1) {
    shownWrapper1.classList.add('buff');
  }
  if (input2) {
    shownWrapper2.classList.add('buff');
  }
  setTimeout(() => {
    if (input1) {
      shownWrapper1.classList.remove('buff');
      shownWrapper1.classList.add('show');
    }
    if (input2) {
      shownWrapper2.classList.remove('buff');
      shownWrapper2.classList.add('show');
    }
  }, 500);


  if (input1 == 'option4' && input2 == 'option6') {
    checkButton.style.backgroundColor = 'lightgreen';
    checkButton.textContent = 'Proceed';
  }



});

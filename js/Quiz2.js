const checkButton = document.getElementById('checkButton');
let expectedAnswer1 = 0;
let expectedAnswer2 = 0;
let expectedAnswer3 = 0;
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

  // Question 2 Specific
  const question1Input1 = document.getElementById('question1-input1');
  const question1Input2 = document.getElementById('question1-input2');
  const question1Input3 = document.getElementById('question1-input3');

  question1Input1.value = parseFloat(myData.quiz1_Pbg).toFixed(2);
  question1Input2.value = parseFloat(myData.quiz1_Pad).toFixed(2);
  question1Input3.value = parseFloat(myData.quiz1_Pcf).toFixed(2);

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


  expectedAnswer1 = (parseFloat(myData.quiz2_Dbg) * 1000).toFixed(2);
  expectedAnswer2 = (parseFloat(myData.quiz2_Dad) * 1000).toFixed(2);
  expectedAnswer3 = (parseFloat(myData.quiz2_Dcf) * 1000).toFixed(2);
}

window.addEventListener('load', populateValues);

// Prevent more the 2 decimal places
document.getElementById('question2-input1').addEventListener('input', function() {
  if (this.value.includes('.')) {
    const decimalPlaces = this.value.split('.')[1];
    if (decimalPlaces && decimalPlaces.length > 2) {
      this.value = this.value.slice(0, this.value.indexOf('.') + 3);
    }
  }
});

document.getElementById('question2-input2').addEventListener('input', function() {
  if (this.value.includes('.')) {
    const decimalPlaces = this.value.split('.')[1];
    if (decimalPlaces && decimalPlaces.length > 2) {
      this.value = this.value.slice(0, this.value.indexOf('.') + 3);
    }
  }
});


document.getElementById('question2-input3').addEventListener('input', function() {
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
  const expectedAnswer2Element = document.getElementById('expectedAnswer2');
  const expectedAnswer3Element = document.getElementById('expectedAnswer3');
  let answer1 = document.getElementById('question2-input1').value;
  let answer2 = document.getElementById('question2-input2').value;
  let answer3 = document.getElementById('question2-input3').value;

  let err1 = Math.abs(answer1 - expectedAnswer1);
  let err2 = Math.abs(answer2 - expectedAnswer2);
  let err3 = Math.abs(answer3 - expectedAnswer3);



  if (checkButton.textContent == 'Proceed') {
    window.location.href = './Quiz3.html';
  }

  // Checking answer
  if (err1 > 0.015 || err2 > 0.015 || err3 > 0.015) {
    wrongCounter++;
    if (err1 > 0.015) {
      document.getElementById('question2-input1').style.backgroundColor = 'lightcoral';
    } else {
      document.getElementById('question2-input1').style.backgroundColor = 'lightgreen';
    }
    if (err2 > 0.015) {
      document.getElementById('question2-input2').style.backgroundColor = 'lightcoral';
    } else {
      document.getElementById('question2-input2').style.backgroundColor = 'lightgreen';
    }
    if (err3 > 0.015) {
      document.getElementById('question2-input3').style.backgroundColor = 'lightcoral';
    } else {
      document.getElementById('question2-input3').style.backgroundColor = 'lightgreen';
    }
    if (wrongCounter == 5) {
      hintElement.classList.add('buff');
      setTimeout(() => {
        hintElement.classList.remove('buff');
        hintElement.classList.add('show');
      }, 500);
    }
  } else {
    correntElement.classList.add('show');
    expectedAnswer1Element.textContent = expectedAnswer1;
    expectedAnswer2Element.textContent = expectedAnswer2;
    expectedAnswer3Element.textContent = expectedAnswer3;
    hintElement.classList.remove('show');
    correntElement.classList.add('buff');
    setTimeout(() => {
      correntElement.classList.remove('buff');
      correntElement.classList.add('show');
    }, 500);


    document.getElementById('question2-input1').style.backgroundColor = 'lightgreen';
    document.getElementById('question2-input2').style.backgroundColor = 'lightgreen';
    document.getElementById('question2-input3').style.backgroundColor = 'lightgreen';

    checkButton.style.backgroundColor = 'lightgreen';
    checkButton.textContent = 'Proceed';

  }
});

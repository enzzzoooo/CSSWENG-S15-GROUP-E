const checkButton = document.getElementById('checkButton');
let expectedAngle = 10;


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

 
  forceValueElement.textContent = 'value';
  x1ValueElement.textContent = 'value';
  x2ValueElement.textContent = 'value';
  x3ValueElement.textContent = 'value';
  x4ValueElement.textContent = 'value';
  yValueElement.textContent = 'value';
  thetaValueElement.textContent = 'value';
  a1ValueElement.textContent = 'value';
  a2ValueElement.textContent = 'value';
  a3ValueElement.textContent = 'value';
  e1ValueElement.textContent = 'value';
  e2ValueElement.textContent = 'value';
  e3ValueElement.textContent = 'value';
}

// uncomment when ready to use
// window.addEventListener('load', populateValues); 






// calculate the angle, can remove deflectionF, and deflectionD and caculate value inside function instead.
function calculateAngle(deflectionF, deflectionD, x3, x4) {
  let numerator = Math.abs(deflectionF - deflectionD);
  let result = numerator / (1000 * (x3 + x4));
  let angle = Math.atan(result);
  
  return angle;
}

checkButton.addEventListener('click', () => {
  let answer = document.getElementById('question7-input1').value;
  answer = answer;
  if (answer != expectedAngle) {
    console.log('wrong'); 
    const hintElement = document.getElementById('quizHint');
    hintElement.style.display = 'flex';

  } else {
    console.log('correct');


  }
});
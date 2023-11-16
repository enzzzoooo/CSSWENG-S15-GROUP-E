
const rightButton = document.querySelector('.r');
const leftButton = document.querySelector('.l');
const slideImgBox = document.querySelector('.lessonImgBox');
const slideImg = document.querySelector('.lessonImg');
const slideTxt = document.querySelector('.lessonTxt');
const slideNumTxt = document.querySelector('.slideNum');
const slideImg2 = document.querySelector('.lessonImg2');
const slideTxt2 = document.querySelector('.lessonTxt2');
const lessons = new Map();
lessons.set("Hanging Bar", hangingBar);
lessons.set("Compound Bar", compoundBar);
lessons.set("Introduction and lesson objectives", introduction);

rightButton.addEventListener('click', () => {
    let slideNum = parseInt(slideNumTxt.innerHTML) + 1;
    let lessonTitle = document.querySelector('.page-title').innerHTML;
    let lessonMap = lessons.get(lessonTitle);
    
    if (slideNum <= lessonMap.length) {
      slideNumTxt.innerHTML = slideNum;
      changeSlide (slideNum)
      leftButton.style.opacity = 1;
    }

    if (slideNum == lessonMap.length)
      rightButton.style.opacity = .5;
  });

  leftButton.addEventListener('click', () => {
    let slideNum = parseInt(slideNumTxt.innerHTML) - 1;
    if (slideNum > 0) {
      slideNumTxt.innerHTML = slideNum;
      changeSlide (slideNum)
      rightButton.style.opacity = 1;
    }
    if (slideNum == 1)
      leftButton.style.opacity = .5;

    });

  // Added animation
  function changeSlide (number) {
    let lessonTitle = document.querySelector('.page-title').innerHTML;
    let lessonMap = lessons.get(lessonTitle);
    number--;
    lessonTitle = lessonTitle.toLowerCase().replace(/\s+/g, '-');
    slideImg.src = `./imgs/${lessonTitle}-lesson/${number+1}.png`

    // For animation
    slideTxt.classList.add('hide');
    setTimeout(function() {
      slideTxt.innerHTML = lessonMap[number]; 
      slideTxt.classList.remove('hide');
      MathJax.typeset();        
    }, 500) // adjust this depending on css transition duration

    showCanvasArrows();
  }
  


// Hanging Bar specific
function showCanvasArrows () {
  const leftArrow = document.querySelector('#imageLeft');
  const rightArrow = document.querySelector('#imageRight');  
  if (document.querySelector('.page-title').innerHTML == "Hanging Bar" && slideNumTxt.innerHTML == 4) {
    rightArrow.style.display = 'block';
    leftArrow.style.display = 'block';
    rightArrow.style.cursor = "pointer";
    leftArrow.style.cursor = "default";
    rightArrow.style.opacity = 1;
    leftArrow.style.opacity = 0;
    
    leftArrow.addEventListener('click', () => {
      slideImg.src = `./imgs/hanging-bar-lesson/4.png`
      leftArrow.style.opacity = 0;
      leftArrow.style.cursor = "default";
      rightArrow.style.opacity = 1;
      rightArrow.style.cursor = "pointer";
    });

    rightArrow.addEventListener('click', () => {
      slideImg.src = `./imgs/hanging-bar-lesson/4_2.png`
      rightArrow.style.opacity = 0;
      rightArrow.style.cursor = "default";
      leftArrow.style.opacity = 1;
      leftArrow.style.cursor = "pointer";
    });
  } else {
    leftArrow.style.display = 'none';
    rightArrow.style.display = 'none';
  }
}

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


rightButton.addEventListener('click', () => {
  let slideNum = parseInt(slideNumTxt.innerHTML) + 1;
  let lessonTitle = document.querySelector('.page-title').innerHTML;
  let lessonMap = lessons.get(lessonTitle);
  leftButton.style.cursor = "pointer";
  console.log("what")
  
  if (slideNum <= lessonMap.length) {
    slideNumTxt.innerHTML = slideNum;
    changeSlide(slideNum, 'right');
    leftButton.style.opacity = 1;
  }

  if (slideNum == lessonMap.length) {
    rightButton.style.opacity = .5;
    rightButton.style.cursor = "default";
  }
});

leftButton.addEventListener('click', () => {
  let slideNum = parseInt(slideNumTxt.innerHTML) - 1;
  rightButton.style.cursor = "pointer";
  if (slideNum > 0) {
    slideNumTxt.innerHTML = slideNum;
    changeSlide (slideNum, 'left')
    rightButton.style.opacity = 1;
  }
  if (slideNum == 1) {
    leftButton.style.opacity = .5;
    leftButton.style.cursor = "default";
  }
});

  

  // a2000mm.addEventListener('mouseout', () => {
  //   setTimeout(out, 1000)
  // })
function out () {
  popup.style.display = "none"
}

// moving through slides with arrow keys
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    let slideNum = parseInt(slideNumTxt.innerHTML) + 1;
    let lessonTitle = document.querySelector('.page-title').innerHTML;
    let lessonMap = lessons.get(lessonTitle);
    console.log("f")
    if (slideNum <= lessonMap.length) {
      slideNumTxt.innerHTML = slideNum;
      changeSlide(slideNum, 'right');
      leftButton.style.opacity = 1;
    }

    if (slideNum == lessonMap.length)
      rightButton.style.opacity = .5;
  }
  
  if (event.key === 'ArrowLeft') {
    let slideNum = parseInt(slideNumTxt.innerHTML) - 1;
    if (slideNum > 0) {
      slideNumTxt.innerHTML = slideNum;
      changeSlide(slideNum, 'left')
      rightButton.style.opacity = 1;
    }
    if (slideNum == 1)
      leftButton.style.opacity = .5;
  }
});


// Added animation
function changeSlide (number, direction) {
  let lessonTitle = document.querySelector('.page-title').innerHTML;
  let lessonMap = lessons.get(lessonTitle);

  let newImage = new Image(); // for fixing animation bug
  newImage.onload = function() {
    slideImg.src = this.src;
  }

  number--;
  lessonTitle = lessonTitle.toLowerCase().replace(/\s+/g, '-');
  if (direction == 'right') {
    // fixing animation bug
    if (slideImg.src.includes(`/imgs/hanging-bar-lesson/4(2)-4(1).gif`)) {
      newImage.src = `./imgs/${lessonTitle}-lesson/4(1)-5.gif`
    } else if (slideImg.src.includes(`/imgs/hanging-bar-lesson/4(1)-4(2).gif`)) {
      newImage.src = `./imgs/${lessonTitle}-lesson/4(2)-5.gif`
    } else {
      newImage.src = `./imgs/${lessonTitle}-lesson/${number}-${number+1}.gif`;
    }
  } else {
    // for fixing animation bug
    if (slideImg.src.includes(`/imgs/hanging-bar-lesson/4(2)-4(1).gif`)) {
      newImage.src = `./imgs/${lessonTitle}-lesson/4(1)-3.gif`
    } else if (slideImg.src.includes(`/imgs/hanging-bar-lesson/4(1)-4(2).gif`)) {
      newImage.src = `./imgs/${lessonTitle}-lesson/4(2)-3.gif`
    }else {
      newImage.src = `./imgs/${lessonTitle}-lesson/${number+2}-${number+1}.gif`;
    }
  }


  // For animation
  slideTxt.classList.add('hide');
  setTimeout(function() {
    slideTxt.innerHTML = lessonMap[number]; 
    slideTxt.classList.remove('hide');
    MathJax.typeset();        
  }, 500) // adjust this depending on css transition duration

  showCanvasArrows();

  // if (number+1 == 13 && lessonTitle == 'hanging-bar') {
  //   setTimeout(() => {
      
  //   }, 300);
  // }
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
    
    // for fixing animation bug
    let newImage = new Image(); 
    newImage.onload = function() {
      slideImg.src = this.src;
    }

    leftArrow.addEventListener('click', () => {
      newImage.src = `./imgs/hanging-bar-lesson/4(2)-4(1).gif`
      leftArrow.style.opacity = 0;
      leftArrow.style.cursor = "default";
      rightArrow.style.opacity = 1;
      rightArrow.style.cursor = "pointer";
    });

    rightArrow.addEventListener('click', () => {
      newImage.src = `./imgs/hanging-bar-lesson/4(1)-4(2).gif`
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
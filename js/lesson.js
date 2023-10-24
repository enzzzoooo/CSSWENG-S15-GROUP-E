
const rightButton = document.querySelector('.r');
const leftButton = document.querySelector('.l');
const slideImg = document.querySelector('.lessonImg');
const slideTxt = document.querySelector('.lessonTxt');
const slideNumTxt = document.querySelector('.slideNum')

const compoundBar = [
`First, let us consider a simple system of two steel bars AB and
BC (E = 200 GPa) that are connected to each other in series.
End A is fixed while end C is free to move. When the 10-kN
force at B is applied, how will the system respond? By how
much will end C move?`,
`Before you can analyze the axial deformations occurring in any
system, you must first determine the forces in its members.
Shown on the left is the free-body diagram of the system.
Summing forces along the horizontal, we obtain the reaction at
end A to be
𝑃𝐴 = 10 kN
Note that there is no reaction at C! (Note: add a pop-up/toggleable
explanation for this)
`,
`Next, we get the internal force in each bar by sectioning both
bars.
For section AB, we find that 𝑃𝐴𝐵 = 10 kN. This is a tensile force,
so bar AB must undergo elongation.
On the other hand, for section BC, there is no external force
acting on the system, so 𝑃𝐵𝐶 = 0. Therefore, bar BC will not
deform.
`,
`Since the bars are under uniaxial loading, we can use the axial
force-deformation equation we derived from Lecture 2-2.
𝛿𝐴𝐵 =
𝑃𝐿
𝐴𝐸
𝛿𝐴𝐵 =
(10 kN)(1000 mm)
(200 mm2)(200 GPa)
𝛿𝐴𝐵 = 0.25 mm (elongation)`,
`Factoring in this deformation, let’s analyze how the system will
change as a result of the applied load. `,
`The elongation of bar AB will cause bar BC to move to the right,
even if bar BC did not deform. From the figure, we can see that
the deflection of the free end, 𝑑𝐶 (the change in the initial and
final positions of end C) is equivalent to the deformation of bar
AB, 𝛿𝐴𝐵,
𝑑𝐶 = 𝛿𝐴�`,
`In this lecture, the product of our analysis is equations that
relate the deflection of a particular point in the system to the
axial deformations of the members of the system. We will apply
techniques from geometry in writing such equations.
To further understand this example, you may modify the system
by moving the point of application of the load or adding a
second load. You may also change the properties of the bars
(length, cross-sectional area, and material).
Alternatively, you may proceed to the next discussion.`
]

rightButton.addEventListener('click', () => {
    let slideNum = parseInt(slideNumTxt.innerHTML) + 1;
    if (slideNum <= compoundBar.length) {
      slideNumTxt.innerHTML = slideNum;
      changeSlide (slideNum)
      leftButton.style.opacity = 1;
    }
    if (slideNum == compoundBar.length)
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


  function changeSlide (number) {
    


    number--;
    slideImg.src = `compoundBar_${number}`
    slideTxt.innerHTML = compoundBar[number];
  }
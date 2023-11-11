
const rightButton = document.querySelector('.r');
const leftButton = document.querySelector('.l');
const slideImg = document.querySelector('.lessonImg');
const slideTxt = document.querySelector('.lessonTxt');
const slideNumTxt = document.querySelector('.slideNum');
const slideImg2 = document.querySelector('.lessonImg2');
const slideTxt2 = document.querySelector('.lessonTxt2');
const hangingBar = [
  `Next, let us consider a rigid bar ABC that is hinged at A and
  supported by a deformable cable at B (E = 200 GPa). When the
  5-kN downward force is applied at end C, what will be the
  deflection of end C?`,
  `Following the same procedure in the previous discussion, let us
  draw first the free-body diagram of the rigid bar. Summing
  moments about point A,
  𝑃𝐵 = 10 kN, T
  3
  The axial deformation of the cable can be computed as
  𝛿𝐵 =
  𝑃𝐿
  𝐴𝐸 =
  (10 kN)(2000 mm)
  (20 mm2)(200 GPa)
  𝛿𝐵 = 5 mm (elongation)`,
  `Therefore, when the 10-kN force is applied to the system, the
  cable will elongate by 5 mm. This means that bar ABC must
  move to “accommodate” this elongation. Take note that bar
  ABC is rigid; it cannot bend. But it is not fixed, so it can rotate
  about the hinge at A.`,
  `To analyze the rotation of bar ABC, we construct a “deformation
  diagram”. The deformation diagram is a superposition of the
  initial and final positions of the bar, indicating the deflection of
  the points in the bar. From this diagram, we will be able to
  relate the deformations and deflections. `,
  `As you can see, the deformation diagram forms two similar
  right triangles (ABB’ and ACC’). Thus, we can relate the
  deflections
  𝑑
  𝐵 and
  𝑑
  𝐶, which are side lengths of the triangles. 𝑑𝐵2 = 𝑑𝐶4`,
  `You should realize that the vertical deflection of
  B is equal to
  the deformation of the cable, 𝑑𝐵 =
  𝛿𝐵
  =
  5 mm
  Using the similar triangle relation, the deflection of
  C is
  𝑑
  𝐶
  =
  2
  𝑑
  𝐵
  = 10 mm
  (pop up explanation for small angle approximation and why the
  horizontal deflection of B/C is negligible
  )`,
  `If the cable is oriented at some angle with respect to the bar,
  how will the analysis change?`,
  `First, let us recompute the force in the cable. Considering the
  free
  -body diagram of ABC and summing moments about point
  A, the force in the cable is 2𝑃𝐵 sin 30°
  =
  4
  (
  5 kN
  )
  𝑃𝐵
  = 20 kN
  The corresponding axial deformation is (pop up explanation for
  length
  )
  𝛿𝐵
  =
  (20 kN
  )
  (
  2000 mm
  cos 30°
  )
  (20
  m
  m
  2
  )
  (200 GPa
  )
  𝛿𝐵
  =
  20
  √
  3
  3
  mm
  (elongation
  )`,
  `Next, we draw again the deformation diagram of rigid bar ABC.
  This time, the vertical deflection of B is not simply equal to the
  deformation of the cable, since the deformation should occur
  along the direction of the cable (not vertically).`,
  `To relate
  𝑑
  𝐵 and
  𝛿𝐵, we create another right triangle as shown,
  where
  sin 30°
  =
  𝛿𝐵𝑑𝐵
  Therefore,
  𝑑𝐵 =
  40√3
  3
  mm`,
  `Similar to the previous discussion, the vertical deflections 𝑑𝐵
  and 𝑑𝐶 can be related using similar triangle relations.
  𝑑𝐵
  2
  =
  𝑑𝐶
  4
  So,
  𝑑𝐶 =
  80√3
  3
  mm`,
  `To further understand this example, you may modify the system
  by moving the point of application of the load or changing
  the inclination of the cable. You may also change the
  properties of the cable (length, cross-sectional area, and
  material).
  If you have understood well the discussion, test your
  knowledge by answering the quiz`
]

const compoundBar = [ `First, let us consider a simple system of two steel bars AB and
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
Alternatively, you may proceed to the next discussion.`]
const lessons = new Map();

lessons.set("Hanging Bar", hangingBar);
lessons.set("Compound Bar", compoundBar);

rightButton.addEventListener('click', () => {
    let slideNum = parseInt(slideNumTxt.innerHTML) + 1;
    let lessonTitle = document.querySelector('.page-title').innerHTML;
    let lessonMap = lessons.get(lessonTitle);
    
    if (slideNum <= lessonMap.length) {
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

  // Added animation
  function changeSlide (number) {
    let lessonTitle = document.querySelector('.page-title').innerHTML;
    let lessonMap = lessons.get(lessonTitle);
    number--;
    slideImg.src = `${lessonTitle}_${number}`
    
    // For animation
    slideTxt.classList.add('hide');
    setTimeout(function() {
      slideTxt.innerHTML = lessonMap[number]; 
      slideTxt.classList.remove('hide');
    }, 500) // adjust this depending on css transition duration
  }

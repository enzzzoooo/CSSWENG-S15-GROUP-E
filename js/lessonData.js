const hangingBar = [
    `Next, let us consider a rigid bar <strong>ABC</strong> that is hinged at <strong>A</strong> and
    supported by a deformable cable at <strong>B</strong> \\((E=200 \\mathrm{~GPa})\\). <br><br>
    When the
    5-\\(\\mathrm{kN}\\) downward force is applied at end C, what will be the
    deflection of end C?`,
    `Following the same procedure in the previous discussion, let us
    draw first the free-body diagram of the rigid bar. Summing
    moments about point A,
    \\[P_B=10 \\mathrm{~kN},\\mathrm{~T}\\]`,
    `The axial deformation of the cable can be computed as \\[\\delta_B=\\frac{P L}{A E}=\\frac{(10 \\mathrm{~kN})(2000 \\mathrm{~mm})}{\\left(20 \\mathrm{~mm}^2\\right)(200 \\mathrm{~GPa})}\\]
    \\[\\delta_B=5 \\mathrm{~mm} \\text { (elongation) }\\]`,
    `Therefore, when the 10-\\(\\mathrm{kN}\\) force is applied to the system, the
    cable will elongate by \\(5\\mathrm{~mm}\\). This means that bar ABC must
    move to “accommodate” this elongation. Take note that bar
    ABC is rigid; it cannot bend. But it is not fixed, so it can rotate
    about the hinge at A.<br><br>
    (The next slide shows the intended deflection of the bar)`,
    `To analyze the rotation of bar ABC, we construct a “deformation 
    diagram”. The deformation diagram is a superposition of the
    initial and final positions of the bar, indicating the deflection of
    the points in the bar. From this diagram, we will be able to
    relate the deformations and deflections. `,
    `As you can see, the deformation diagram forms two similar
    right triangles (ABB' and ACC'). Thus, we can relate the
    deflections \\(d_B\\) and \\(d_C\\), which are side lengths of the triangles.
    \\[\\frac{d_B}{2}=\\frac{d_C}{4}\\]`,
    `You should realize that the vertical deflection of B is equal to
    the deformation of the cable,
    \\[d_B = \\delta_B = 5 \\mathrm{~mm}\\]
    Using the similar triangle relation, the deflection of
    C is 
    \\[d_C = 2d_B = 10 \\mathrm{~mm}\\]`,
    `If the cable is oriented at some angle with respect to the bar,
    how will the analysis change?`,
    `First, let us recompute the force in the cable. Considering the
    free-body diagram of ABC and summing moments about point
    A, the force in the cable is 
    \\[2P_B\\,\\sin30^{\\circ} = 4(5\\mathrm{~kN}) \\]
    \\[P_B = 20 \\mathrm{~kN}\\]
    The corresponding axial deformation is 
    \\[\\delta_B = \\frac{(20\\mathrm{~kN}) \\left( \\frac{2000  \\mathrm{~mm}}{\\cos 30^\\circ} \\right)}{(20  \\mathrm{~mm}^2)(200  \\mathrm{~GPa})}\\]
    \\[\\delta_B = \\frac{20\\sqrt{3}}{3}\\mathrm{~mm}\,\\text{(elongation)}\\]`,
    `Next, we draw again the deformation diagram of rigid bar ABC.
    This time, the vertical deflection of B is not simply equal to the
    deformation of the cable, since the deformation should occur
    along the direction of the cable (not vertically).`,
    `To relate \\(d_B\\) and \\(\\delta_B\\), we create another 
    right triangle as shown, where 
    \\[\\sin30^{\\circ}=\\frac{\\delta_B}{d_B}\\]
    Therefore,
    \\[d_B = \\frac{40\\sqrt{3}}{3}\\mathrm{~mm}\\]`,
    `Similar to the previous discussion, the vertical deflections \\(d_B\\)
    and \\(d_C\\) can be related using similar triangle relations.
    \\[\\frac{d_B}{2}=\\frac{d_C}{4}\\]
    So,
    \\[d_C=\\frac{80\\sqrt{3}}{3}\\mathrm{~mm}\\]`,
    `To further understand this example, you may modify the system
    by moving the point of application of the load or changing
    the inclination of the cable. You may also change the
    properties of the cable (length, cross-sectional area, and
    material).
    <div class="flex-center m05">
      <a class="flex-center" href="hanging-bar-sim.html">
        <img src="imgs/tryNow.png"><strong class="actionText pad">Try it now!</strong></a>
    </div>
    If you have understood well the discussion, test your
    knowledge by answering the quiz.
    <div class="flex-center m05">
      <a class="flex-center" href="lesson-picker.html">
        <img src="imgs/learnMore.png"><strong class="actionText pad">Test your knowledge!</strong></a>
    </div>`
  ]
  
  const compoundBar = [ `First, let us consider a simple system of two steel bars <strong>AB</strong> and
  <strong>BC</strong> \\((E=200 \\mathrm{~GPa})\\) that are connected to each other in series.
  End A is fixed while end C is free to move. <br><br>When the 10-\\(\\mathrm{kN}\\)
  force at B is applied, how will the system respond? By how
  much will end C move?`,
  `Before you can analyze the axial deformations occurring in any
  system, you must first determine the forces in its members.
  Shown on the left is the free-body diagram of the system.
  <br><br>Summing forces along the horizontal, we obtain the reaction at
  end A to be
  \\[P_A=10 \\mathrm{~kN}\\]
  Note that there is no reaction at C!
  `,
  `Next, we get the internal force in each bar by sectioning both
  bars. <br><br>
  For section AB, we find that \\(P_{AB} = 10 \\mathrm{~kN}\\). This is a tensile force,
  so bar AB must undergo elongation.<br><br>
  On the other hand, for section BC, there is no external force
  acting on the system, so \\(P_{BC} = 0\\). Therefore, bar BC will not
  deform.
  `,
  `Since the bars are under uniaxial loading, we can use the axial
  force-deformation equation we derived from Lecture 2-2.
  <div class=" halfBMargin">\\[\\delta_{A B}=\\frac{P L}{A E}\\]</div>
  \\[\\delta_{A B}=\\frac{(10 \\mathrm{~kN})(1000 \\mathrm{~mm})}{\\left(200 \\mathrm{~mm}^2\\right)(200 \\mathrm{~GPa})}\\]
  \\[\\delta_{A B}=0.25 \\mathrm{~mm} \\text { (elongation) }\\]`,
  `Factoring in this deformation, let's analyze how the system will
  change as a result of the applied load. `,
  `The elongation of bar AB will cause bar BC to move to the right,
  even if bar BC did not deform. From the figure, we can see that
  the deflection of the free end, \\(d_C\\) (the change in the initial and
  final positions of end C) is equivalent to the deformation of bar
  AB, \\(\\delta_{AB}\\),
  \\[d_C = \\delta_{AB}\\]`,
  `In this lecture, the product of our analysis is equations that
  relate the deflection of a particular point in the system to the
  axial deformations of the members of the system. We will apply
  techniques from geometry in writing such equations.`,
  `To further understand this example, you may modify the system
  by moving the point of application of the load or adding a
  second load. You may also change the properties of the bars
  (length, cross-sectional area, and material).
  <div class="flex-center m05">
    <a class="flex-center" href="extending-bar-sim.html">
      <img src="imgs/tryNow.png"><strong class="actionText pad">Try it now!</strong></a>
  </div>
  Alternatively, you may proceed to the next discussion.
  <div class="flex-center m05">
    <a class="flex-center" href="lesson-picker.html">
      <img src="imgs/learnMore.png"><strong class="actionText pad">Learn more!</strong></a>
  </div>
  `]

  const introduction = [`In the previous lesson, we have determined the relationship between stress and strain. Under linear
  elastic behavior, materials follow Hooke’s law, which in its simplest form is written as σ = Eε. Based
  on Hooke’s law, we have derived an equation that relates the deformation and the normal force in an
  axially loaded bar. When such bars in a particular structure deform axially, this results to a change in
  the positions of both rigid and deformable members in that structure. In this lesson, we will be
  analyzing how the axial deformations relate to the deflections of certain points in a structure,
  applying geometric principles.`,`
  At the <strong>end</strong> of this lesson, <strong>you</strong> should be able to: <br>
1. Differentiate deformation and deflection; <br>
2. Draw deformation diagrams; and <br>
3. Write geometric equations that relate the axial deformations of members to the deflections of
a particular point in a structure.`]
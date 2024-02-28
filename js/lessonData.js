const hangingBar = [
    `Next, let us consider a rigid bar <strong>ABC</strong> that is hinged at <strong>A</strong> and
    supported by a deformable cable at <strong>B</strong> \\((E=200 \\mathrm{~GPa})\\). <br><br>
    When the
    \\(5-\\mathrm{kN}\\) downward force is applied at end C, what will be the
    deflection of end C?
    <div class="flex-center m05 m10">
    <a class="flex-center" href="./hanging-bar-sim.html">
      <img src="imgs/tryNow.png"><strong class="actionText pad">Skip to the Simulation!</strong></a>
  </div>
    `,
    `Following the same procedure in the previous discussion, let us
    draw first the free-body diagram of the rigid bar. Summing
    moments about point A,
    \\[P_B=10 \\mathrm{~kN},\\mathrm{~T}\\]`,
    `The axial deformation of the cable can be computed as \\[\\delta_B=\\frac{P L}{A E}=\\frac{(10 \\mathrm{~kN})(2000 \\mathrm{~mm})}{\\left(20 \\mathrm{~mm}^2\\right)(200 \\mathrm{~GPa})}\\]
    \\[\\delta_B=5 \\mathrm{~mm} \\text { (elongation) }\\]`,
    `Therefore, when the \\(10-\\mathrm{kN}\\) force is applied to the system, the
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
    <div class="needExplain">\\[d_B = \\delta_B = 5 \\mathrm{~mm}\\]
    Using the similar triangle relation, the deflection of
    C is
    \\[d_C = 2d_B = 10 \\mathrm{~mm}\\]
    <div class="explanation-popup-wrapper">
        <div class="sim-error-popup">
          <div class="popup-title-wrapper">
            <div class="popup-title">Explanation</div>
          </div>
          <div class="popup-text-wrapper">
            <div class="popup-text">
The small angle approximation simplifies trigonometric calculations by assuming that the angle is small enough for the sine and tangent to be approximately equal to the angle in radians. In certain structural or mechanical contexts, the negligible horizontal deflection of points B and C is justified when the small angles and vertical loads make horizontal deflections insignificantly small compared to vertical ones.
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
    `If the cable is oriented at some angle with respect to the bar,
    how will the analysis change?`,
    `First, let us recompute the force in the cable. Considering the
    free-body diagram of ABC and summing moments about point
    A, the force in the cable is
    \\[2P_B\\,\\sin30^{\\circ} = 4(5\\mathrm{~kN}) \\]
    \\[P_B = 20 \\mathrm{~kN}\\]
    The corresponding axial deformation is
    <div class="needExplain halfBMargin">\\[\\delta_B = \\frac{(20\\mathrm{~kN}) \\left( \\frac{2000  \\mathrm{~mm}}{\\cos 30^\\circ} \\right)}{(20  \\mathrm{~mm}^2)(200  \\mathrm{~GPa})}\\]
    <div class="explanation-popup-wrapper">
        <div class="sim-error-popup">
          <div class="popup-title-wrapper">
            <div class="popup-title">Computation for Length</div>
          </div>
          <div class="popup-text-wrapper">
            <div class="popup-text">
              <img style="height:100%; width:100%" src="imgs/Group 80.png">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="halfBMargin">\\[\\delta_B = \\frac{20\\sqrt{3}}{3}\\mathrm{~mm}\,\\text{(elongation)}\\]
    </div>
    `,
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
      <a class="flex-center" href="./hanging-bar-sim.html">
        <img src="imgs/tryNow.png"><strong class="actionText pad">Try it now!</strong></a>
    </div>
    If you have understood well the discussion, test your
    knowledge by answering the quiz.
    <div class="flex-center m05">
      <a class="flex-center" href="./Quiz1.html">
        <img src="imgs/learnMore.png"><strong class="actionText pad">Test your knowledge!</strong></a>
    </div>`
  ]

  const compoundBar = [ `First, let us consider a simple system of two steel bars <strong>AB</strong> and
  <strong>BC</strong> \\((E=200 \\mathrm{~GPa})\\) that are connected to each other in series.
  End A is fixed while end C is free to move. <br><br>When the \\(10-\\mathrm{kN}\\)
  force at B is applied, how will the system respond? By how
  much will end C move? 
  <div class="flex-center m05 m10">
    <a class="flex-center" href="./extending-bar-sim.html">
      <img src="imgs/tryNow.png"><strong class="actionText pad">Skip to the Simulation!</strong></a>
  </div>`,
  `Before you can analyze the axial deformations occurring in any
  system, you must first determine the forces in its members.
  Shown on the left is the free-body diagram of the system.
  <br><br>Summing forces along the horizontal, we obtain the reaction at
  end A to be
  \\[P_A=10 \\mathrm{~kN}\\]
  <span class="needExplain pad">
  Note that there is no reaction at C!
  <div class="explanation-popup-wrapper">
        <div class="sim-error-popup">
          <div class="popup-title-wrapper">
            <div class="popup-title">Explanation</div>
          </div>
          <div class="popup-text-wrapper">
            <div class="popup-text">
            The absence of a reaction at point C in the free-body diagram is due to force equilibrium along the horizontal direction. Summing forces horizontally indicates that the external horizontal forces and the horizontal component of any support reactions at C balance each other out. Consequently, the horizontal reaction at C is determined to be zero, simplifying the analysis of axial deformations by clarifying the force distribution within the structure.
            </div>
          </div>
        </div>
      </div>
    </span>
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
    <a class="flex-center" href="./extending-bar-sim.html">
      <img src="imgs/tryNow.png"><strong class="actionText pad">Try it now!</strong></a>
  </div>
  Alternatively, you may proceed to the next discussion.
  <div class="flex-center m05">
    <a class="flex-center" href="./lesson-picker.html">
      <img src="imgs/learnMore.png"><strong class="actionText pad">Learn more!</strong></a>
  </div>
  `]

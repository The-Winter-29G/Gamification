/* POINTS CONTAINER — ALL ORDINARY PAGES.
 * Add to the ONE points-container question on this page.
 * Do not separately set pointsText.innerText; the header owns the text.
 * Keep DOM IDs consistent: pointsContainer, pointsText, droppy.
 */
Qualtrics.SurveyEngine.addOnload(function () {
    const container = document.getElementById("pointsContainer");
    if (container && Qualtrics.SurveyEngine.getJSEmbeddedData("arePointsVisible") !== "true") {
        container.style.display = "none";
    }
});
Qualtrics.SurveyEngine.addOnReady(function () {
    if (window.DroppyPoints) window.DroppyPoints.initializeCounter(false);
});

/* SCORED KNOWLEDGE CHECK — section 11
 * CUSTOMIZE CORRECT_VALUE: the ACTUAL HTML input value, NOT necessarily
 * the displayed option position or "Option A/B/C/D". Inspect it in Preview.
 * Correct selection: +3; any other selection: +1 (same as original).
 * Awards on the FIRST click only. Later changes do not revise the score.
 */
Qualtrics.SurveyEngine.addOnReady(function () {
    const FLAG = "Q_numBasins"; // Declare __js_Q_numBasins in Survey Flow.
    const CORRECT_VALUE = 2; // CUSTOMIZE after verifying input.value.
    const CORRECT_POINTS = 3; // CUSTOMIZE.
    const OTHER_POINTS = 1;   // CUSTOMIZE.

    this.questionclick = function (event, element) {
        if (!element || element.type !== "radio") return;
        const selected = parseInt(element.value, 10);
        const amount = selected === CORRECT_VALUE ? CORRECT_POINTS : OTHER_POINTS;
        window.DroppyPoints.awardOnce({flag: FLAG, amount: amount});
    };
});

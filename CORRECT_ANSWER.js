/* SCORED KNOWLEDGE CHECK — EXAMPLE
 * CUSTOMIZE CORRECT_VALUE: the ACTUAL HTML input value, NOT necessarily
 * the displayed option position or "Option A/B/C/D". Inspect it in Preview.
 * Correct selection: +3; any other selection: +1 (same as original).
 * Awards on the FIRST click only. Later changes do not revise the score.
 */
Qualtrics.SurveyEngine.addOnReady(function () {
    const FLAG = "REPLACE_WITH_UNIQUE_FLAG"; // Declare __js_REPLACE_WITH_UNIQUE_FLAG in Survey Flow.
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

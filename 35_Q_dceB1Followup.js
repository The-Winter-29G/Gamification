/* RADIO CHOICE — section 35
 * CUSTOMIZE: FLAG must be unique across the survey; FIELD sets points per response.
 * This awards on the FIRST radio click, not when the respondent submits the page.
 * Add the standard points-container code too ONLY if this same question owns that container.
 */
Qualtrics.SurveyEngine.addOnReady(function () {
    const FLAG = "Q_dceB1Followup"; // CUSTOMIZE; declare __js_Q_dceB1Followup in Survey Flow.
    const FIELD = "MultipleChoicePoints"; // CUSTOMIZE if using another reward field.

    this.questionclick = function (event, element) {
        if (!element || element.type !== "radio") return;
        window.DroppyPoints.awardOnce({flag: FLAG, field: FIELD});
    };
});

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

/* RADIO CHOICE — section 7
 * CUSTOMIZE: FLAG must be unique across the survey; FIELD sets points per response.
 * This awards on the FIRST radio click, not when the respondent submits the page.
 * Add the standard points-container code too ONLY if this same question owns that container.
 */
Qualtrics.SurveyEngine.addOnReady(function () {
    const FLAG = "Q_waterDays"; // CUSTOMIZE; declare __js_Q_waterDays in Survey Flow.
    const FIELD = "MultipleChoicePoints"; // CUSTOMIZE if using another reward field.

    this.questionclick = function (event, element) {
        if (!element || element.type !== "radio") return;
        window.DroppyPoints.awardOnce({flag: FLAG, field: FIELD});
    };
});

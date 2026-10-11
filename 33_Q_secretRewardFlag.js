/* AUTOMATIC SECRET REWARD — original section 33.
 * Awards once upon displaying this page; no explicit interaction required.
 * The points-container is initialized here as this question also owns it.
 * CUSTOMIZE flag, amount fallback and Survey Flow registration.
 */
Qualtrics.SurveyEngine.addOnload(function () {
    const counter = document.getElementById("pointsContainer");
    if (counter && Qualtrics.SurveyEngine.getJSEmbeddedData("arePointsVisible") !== "true") {
        counter.style.display = "none";
    }
});
Qualtrics.SurveyEngine.addOnReady(function () {
    if (window.DroppyPoints) window.DroppyPoints.initializeCounter(false);
    window.DroppyPoints.awardOnce({
        flag: "Q_secretRewardFlag", // Declare __js_Q_secretRewardFlag in Survey Flow.
        field: "ConditionalPoints",
        fallback: 5
    });
});

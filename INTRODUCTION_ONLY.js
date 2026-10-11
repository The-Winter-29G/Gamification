/* POINTS CONTAINER — INTRODUCTION PAGE ONLY.
 * Qualtrics question JavaScript editor: paste WITHOUT <script> tags.
 * Change the mascot graphic in the question HTML/CSS (see HTML_AND_IMAGES.md).
 * This is the ONLY container that calls initializeCounter(true).
 */
Qualtrics.SurveyEngine.addOnload(function () {
    const container = document.getElementById("pointsContainer");
    if (container && Qualtrics.SurveyEngine.getJSEmbeddedData("arePointsVisible") !== "true") {
        container.style.display = "none";
    }
});
Qualtrics.SurveyEngine.addOnReady(function () {
    if (window.DroppyPoints) window.DroppyPoints.initializeCounter(true);
});

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

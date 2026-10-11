/* AUTOMATIC / CONDITIONAL REWARD — EXAMPLE
 * This awards ONE interaction as soon as the participant sees this page.
 * No answer, click, or completed page is required (preserves original behavior).
 * CUSTOMIZE flag, points field and fallback to fit your study protocol.
 */
Qualtrics.SurveyEngine.addOnReady(function () {
    window.DroppyPoints.awardOnce({
        flag: "REPLACE_WITH_UNIQUE_FLAG", // Declare __js_REPLACE_WITH_UNIQUE_FLAG in Survey Flow.
        field: "ConditionalPoints",
        fallback: 0 // Only used if ConditionalPoints isn't a parseable number.
    });
});

/* AUTOMATIC / CONDITIONAL REWARD — section 24
 * This awards ONE interaction as soon as the participant sees this page.
 * No answer, click, or completed page is required (preserves original behavior).
 * CUSTOMIZE flag, points field and fallback to fit your study protocol.
 */
Qualtrics.SurveyEngine.addOnReady(function () {
    window.DroppyPoints.awardOnce({
        flag: "Seen_Conditional_4", // Declare __js_Seen_Conditional_4 in Survey Flow.
        field: "ConditionalPoints",
        fallback: 1 // Only used if ConditionalPoints isn't a parseable number.
    });
});

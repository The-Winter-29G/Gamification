/* CRITICAL REVIEW: This flag DUPLICATES another original question.
 * Current flag is preserved to avoid silently changing your study's scoring.
 * If this is a SEPARATE rewarded question, replace its flag with a UNIQUE
 * name and declare __js_<new_flag> in Survey Flow before deploying.
 */
/* RADIO CHOICE — section 20
 * CUSTOMIZE: FLAG must be unique across the survey; FIELD sets points per response.
 * This awards on the FIRST radio click, not when the respondent submits the page.
 * Add the standard points-container code too ONLY if this same question owns that container.
 */
Qualtrics.SurveyEngine.addOnReady(function () {
    const FLAG = "Q_knowledgeTest2_prompt"; // CUSTOMIZE; declare __js_Q_knowledgeTest2_prompt in Survey Flow.
    const FIELD = "MultipleChoicePoints"; // CUSTOMIZE if using another reward field.

    this.questionclick = function (event, element) {
        if (!element || element.type !== "radio") return;
        window.DroppyPoints.awardOnce({flag: FLAG, field: FIELD});
    };
});

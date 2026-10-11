/* CHECKBOX / MULTIPLE ANSWER — EXAMPLE
 * Award ONCE when the respondent first selects at least one checkbox.
 * An interaction is counted even if the participant later unchecks it.
 * CUSTOMIZE: unique flag and points field.
 */
Qualtrics.SurveyEngine.addOnReady(function () {
    const FLAG = "REPLACE_WITH_UNIQUE_FLAG"; // Declare __js_REPLACE_WITH_UNIQUE_FLAG in Survey Flow.
    const FIELD = "MultipleChoicePoints";
    const question = document.getElementById(this.questionId);
    if (!question) return;

    question.addEventListener("change", function (event) {
        if (!event.target || event.target.type !== "checkbox") return;
        const anyChecked = Array.from(
            question.querySelectorAll('input[type="checkbox"]')
        ).some(function (checkbox) { return checkbox.checked; });
        if (anyChecked) window.DroppyPoints.awardOnce({flag: FLAG, field: FIELD});
    });
});

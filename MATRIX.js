/* RADIO MATRIX — EXAMPLE
 * Awards for the FIRST selected matrix radio, not full matrix completion.
 * CUSTOMIZE: unique flag and MatrixPoints (or another reward field).
 */
Qualtrics.SurveyEngine.addOnReady(function () {
    const FLAG = "REPLACE_WITH_UNIQUE_FLAG"; // Declare __js_REPLACE_WITH_UNIQUE_FLAG in Survey Flow.
    const question = document.getElementById(this.questionId);
    if (!question) return;

    question.addEventListener("click", function (event) {
        if (event.target && event.target.type === "radio") {
            window.DroppyPoints.awardOnce({flag: FLAG, field: "MatrixPoints"});
        }
    });
});

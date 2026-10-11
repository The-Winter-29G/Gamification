/* RADIO MATRIX — section 47
 * Awards for the FIRST selected matrix radio, not full matrix completion.
 * CUSTOMIZE: unique flag and MatrixPoints (or another reward field).
 */
Qualtrics.SurveyEngine.addOnReady(function () {
    const FLAG = "Q_warmglow"; // Declare __js_Q_warmglow in Survey Flow.
    const question = document.getElementById(this.questionId);
    if (!question) return;

    question.addEventListener("click", function (event) {
        if (event.target && event.target.type === "radio") {
            window.DroppyPoints.awardOnce({flag: FLAG, field: "MatrixPoints"});
        }
    });
});

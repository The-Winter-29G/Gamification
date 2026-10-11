/* LOOP & MERGE DCE REWARD — EXAMPLE
 * Each iteration is a DISTINCT first-response reward.
 * CUSTOMIZE BASE_FLAG and declare __js_REPLACE_WITH_BASE_FLAG_1 ... __js_REPLACE_WITH_BASE_FLAG_N in Survey Flow.
 * Loop number comes from Qualtrics piped text, not a JavaScript variable.
 * This awards on the first MATRIX radio selected, not full matrix completion.
 */
Qualtrics.SurveyEngine.addOnReady(function () {
    const BASE_FLAG = "REPLACE_WITH_BASE_FLAG";
    const loopNumber = "${lm://CurrentLoopNumber}";
    const flag = BASE_FLAG + "_" + loopNumber;
    const question = document.getElementById(this.questionId);
    if (!question) return;
    question.addEventListener("click", function (event) {
        if (event.target && event.target.type === "radio") {
            window.DroppyPoints.awardOnce({flag: flag, field: "MultipleChoicePoints"});
        }
    });
});

/* DCE LOOP HEADER COLORS — original EXAMPLE.
 * CUSTOMIZE: hex colors and IDs (#sqHeader, #awsHeader).
 * This runs NO POINTS AWARD by itself.
 * Must be used within a Qualtrics Loop & Merge block.
 */
Qualtrics.SurveyEngine.addOnload(function () {
    const loopNumber = parseInt("${lm://CurrentLoopNumber}", 10);
    const colors = {
        1: "#2196F3", 2: "#4CAF50", 3: "#FF9800",
        4: "#9C27B0", 5: "#F44336", 6: "#009688",
        7: "#3F51B5", 8: "#795548", 9: "#607D8B"
    };
    const color = colors[loopNumber] || "#333";
    ["sqHeader", "awsHeader"].forEach(function (id) {
        const element = document.getElementById(id);
        if (element) element.style.backgroundColor = color;
    });
});

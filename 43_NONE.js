/* DCE LOOP HEADER COLORS — original 43.
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

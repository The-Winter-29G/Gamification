/* TIMED VIDEO / INSTRUCTION PAGE — Q_dceInstruction_vid_end
 * CUSTOMIZE: unlock and award times based on the ACTUAL video length.
 * IMPORTANT: This rewards time spent on page, NOT verified video completion.
 * Changing tabs/pausing the video does not suspend these timers.
 * Using time-based rewards may affect your research's engagement measures.
 */
(function () {
    const SHOW_NEXT_AFTER_MS = 90000; // CUSTOMIZE: 90 seconds.
    const AWARD_AFTER_MS = 85000;     // CUSTOMIZE: 85 seconds.
    let showNextTimer = null;
    let awardTimer = null;

    Qualtrics.SurveyEngine.addOnReady(function () {
        const question = this;
        const FLAG = "Q_dceInstruction_vid_end";
        // Declare __js_Q_dceInstruction_vid_end in Survey Flow.
        question.hideNextButton();

        showNextTimer = setTimeout(function () {
            question.showNextButton();
        }, SHOW_NEXT_AFTER_MS);

        // An already-earned flag will suppress the award through awardOnce().
        awardTimer = setTimeout(function () {
            window.DroppyPoints.awardOnce({
                flag: FLAG, field: "Mp4VideoEndPoints", fallback: 6
            });
        }, AWARD_AFTER_MS);
    });

    Qualtrics.SurveyEngine.addOnUnload(function () {
        if (showNextTimer !== null) clearTimeout(showNextTimer);
        if (awardTimer !== null) clearTimeout(awardTimer);
    });
})();

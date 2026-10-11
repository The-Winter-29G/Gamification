/* SINGLE-TERM DEFINITION POPUP — acre-feet.
 * CUSTOMIZE: the trigger term, definition text, unique flag and points field.
 * Required HTML IDs: #popup, #popup-content; trigger element .popup-link.
 * This retains global showPopup()/hidePopup() for legacy inline onclick handlers.
 * Avoid putting TWO different popup scripts on the SAME page; they would overwrite
 * the same global showPopup function. A single popup controller should own the page.
 */
Qualtrics.SurveyEngine.addOnReady(function () {
    const TERM = "acre-feet";
    const FLAG = "Q_acreFeet_def"; // Declare __js_Q_acreFeet_def in Survey Flow.
    const DEFINITION = "Acre-Feet - the amount of water required in order to cover an acre of land (roughly the size of a football field) in water 1-foot deep.";

    window.showPopup = function (term) {
        const popup = document.getElementById("popup");
        const content = document.getElementById("popup-content");
        if (!popup || !content) return;
        popup.style.display = "block";
        content.innerText = term === TERM ? DEFINITION : "Definition not found.";
        if (term === TERM) {
            window.DroppyPoints.awardOnce({flag: FLAG, field: "PopupPoints"});
        }
    };
    window.hidePopup = function () {
        const popup = document.getElementById("popup");
        if (popup) popup.style.display = "none";
    };

    const closeButton = document.querySelector("#popup button");
    if (closeButton) closeButton.addEventListener("click", window.hidePopup);
    document.querySelectorAll(".popup-link").forEach(function (element) {
        element.style.cursor = "pointer";
        element.addEventListener("click", function (event) {
            event.preventDefault();
            const term = element.getAttribute("data-term") || element.textContent.trim();
            window.showPopup(term);
            element.classList.add("clicked-term");
        });
    });
});

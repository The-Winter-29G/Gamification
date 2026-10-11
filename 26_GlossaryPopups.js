/* POINTS CONTAINER — ALL ORDINARY PAGES.
 * Add to the ONE points-container question on this page.
 * Do not separately set pointsText.innerText; the header owns the text.
 * Keep DOM IDs consistent: pointsContainer, pointsText, droppy.
 */
Qualtrics.SurveyEngine.addOnload(function () {
    const container = document.getElementById("pointsContainer");
    if (container && Qualtrics.SurveyEngine.getJSEmbeddedData("arePointsVisible") !== "true") {
        container.style.display = "none";
    }
});
Qualtrics.SurveyEngine.addOnReady(function () {
    if (window.DroppyPoints) window.DroppyPoints.initializeCounter(false);
});

/* MULTIPLE DEFINITION POPUPS — original section 26.
 * CUSTOMIZE: glossary text, per-term award flags and PopupPoints.
 * Each term has its OWN flag, so different definitions award separately.
 * Required: .popup-link, #popup, #popup-content, optional #popup button.
 * Uses data-term on triggers when available (recommended), otherwise visible text.
 * Preserve all original glossary definitions/flags in the object below.
 * Make sure EVERY flag is declared with __js_ prefix in Survey Flow.
 */
Qualtrics.SurveyEngine.addOnReady(function () {
    const glossary = {
        "Agricultural Water": {definition: "Agricultural Water - Water used for agricultural irrigation; arrives from both surface and groundwater sources in the Treasure Valley.", flag: "Q_agWater_def"},
        "Canal": {definition: "Canal - A gravel ditch that transports water across a landscape at a very low angle for the purposes of irrigation.", flag: "Q_canal_def"},
        "Domestic Water": {definition: "Domestic Water - Water used for indoor and outdoor household purposes; this includes residential lawn irrigation.", flag: "Q_domesticWater_def"},
        "Drain Flows": {definition: "Drain Flows - Also called return flows. Irrigation water that flows back into the Boise River after being used by one or more agricultural water users (farmers).", flag: "Q_drainFlows_def"},
        "Evaporation": {definition: "Evaporation - The process by which liquid turns into a gas and rises into the atmosphere as it is heated.", flag: "Q_evap_def"},
        "Evapotranspiration": {definition: "Evapotranspiration - Transfer of water to the atmosphere via evaporation and transpiration.", flag: "Q_evapotrans_def"},
        "Flood Irrigation": {definition: "Flood Irrigation - A traditional method that soaks farm fields using gravity-fed canals and laterals.", flag: "Q_floodIrrigation_def"},
        "Incidental Recharge": {definition: "Incidental Recharge - Unintentional groundwater recharge from seeping irrigation water.", flag: "Q_incidentalRecharge_def"},
        "Industrial Water": {definition: "Industrial Water - Water used for cooling and cleaning in industrial production.", flag: "Q_industWater_def"},
        "Lateral": {definition: "Lateral - A smaller canal branch that brings water directly to fields.", flag: "Q_lateral_def"},
        "Municipal Water": {definition: "Municipal Water - Utility-supplied water for residential and industrial use.", flag: "Q_municipalWater_def"},
        "Pressurized Irrigation": {definition: "Pressurized Irrigation - Uses pumps to deliver water through sprinklers or drip lines.", flag: "Q_pressurizedIrrigation_def"},
        "Run Off": {definition: "Run Off - Excess water that flows off fields into drains, potentially carrying pollutants.", flag: "Q_runOff_def"},
        "Seepage": {definition: "Seepage - Water that slowly infiltrates through the soil into the groundwater.", flag: "Q_seepage_def"},
        "Siphon": {definition: "Siphon - A tube that moves water over an obstacle using suction and gravity.", flag: "Q_siphon_def"},
        "Transpiration": {definition: "Transpiration - Plants releasing water vapor through their leaves.", flag: "Q_transpiration_def"},
        "Water Right": {definition: "Water Right - Legal authorization to use water for a specific beneficial use.", flag: "Q_waterRight_def"},
    };
    window.showPopup = function (term) {
        const popup = document.getElementById("popup");
        const content = document.getElementById("popup-content");
        if (!popup || !content) return;

        const entry = glossary[term];
        popup.style.display = "block";
        content.innerText = entry ? entry.definition : "Definition not found.";
        if (entry) {
            window.DroppyPoints.awardOnce({flag: entry.flag, field: "PopupPoints"});
        }
    };

    window.hidePopup = function () {
        const popup = document.getElementById("popup");
        if (popup) popup.style.display = "none";
    };

    const close = document.querySelector("#popup button");
    if (close) close.addEventListener("click", window.hidePopup);
    document.querySelectorAll(".popup-link").forEach(function (link) {
        link.style.cursor = "pointer";
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const term = link.getAttribute("data-term") || link.textContent.trim();
            window.showPopup(term);
            link.classList.add("clicked-term");
        });
    });
});

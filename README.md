# DROPPY — standardized Qualtrics survey points system

**Scope:** One complete working-display header, two counter scripts, reusable question templates, and exact replacements for all 52 numbered code sections supplied in the conversation, plus `Q_letsEarnSomePoints` (first reward).

**Do not replace the existing scripts in a live survey without testing a duplicate/copy first.** These snippets are statically reviewed and syntax-checked, but not verified against your particular Qualtrics DOM, Survey Flow, theme, or respondent data.

## Folder guide

- `00_header/DROPPY_HEADER_COMPLETE.html`: entire header (display code + **NEW shared scoring engine**). Paste as HTML/source into **Look & Feel → Header**.
- `01_points_containers/INTRODUCTION_ONLY.js`: ONE intro-page points-container question, the only one that calls `initializeCounter(true)`.
- `01_points_containers/ORDINARY_PAGES.js`: points-container question used on every other page, UNLESS a numbered question replacement includes its own counter initialization.
- `02_question_templates/`: copy-and-customize example for new surveys.
- `03_question_replacements/`: individually numbered complete replacement scripts for #1–#52, plus first reward. Paste **without `<script>` tags** into each relevant Qualtrics question's JavaScript editor.
- `04_reference/SECTION_MAP.csv`: map from the original section to new file and identified caveats.
- `04_reference/SURVEY_FLOW_FIELDS.md`: prerequisites and persistence.
- `04_reference/HTML_AND_IMAGES.md`: graphics and HTML contracts.
- `04_reference/TEST_PLAN.md`: test cases and changes to verify.

## Installation order

1. **Duplicate the survey** and keep an unmodified baseline.
2. Define or verify all required Survey Flow fields. The current `getJSEmbeddedData`/`setJSEmbeddedData` API uses the `__js_` prefix **in Survey Flow only**, not in the JS calls. Do not accidentally reset accumulated fields halfway through the survey. See `SURVEY_FLOW_FIELDS.md`.
3. Paste `DROPPY_HEADER_COMPLETE.html` into the survey header. This preserves the already-working welcome/display/animation behavior, adds `window.DroppyPoints.awardOnce(...)`, and eliminates legacy bonus calls. It does **not** include mascot images or animation CSS.
4. On the first points-container question, paste `INTRODUCTION_ONLY.js`.
5. Add `ORDINARY_PAGES.js` to each ordinary points-container question, except where the chosen numbered replacement itself contains this counter code (see `counter_in_same_question` in `SECTION_MAP.csv`). **Only one ordinary counter initializer per page.**
6. Replace the question JavaScript using the files in `03_question_replacements`. Remove redundant older calls to `updatePointsDisplay()` and **all** calls to `checkAndAwardBonus()` (unused program feature).
7. Validate every case in `TEST_PLAN.md` before deployment.

## How to customize the points

Use a standard radio snippet in a new question:

```js
Qualtrics.SurveyEngine.addOnReady(function () {
    const FLAG = "Q_myUniqueQuestion"; // Declare __js_Q_myUniqueQuestion in Survey Flow.
    this.questionclick = function (event, element) {
        if (!element || element.type !== "radio") return;
        window.DroppyPoints.awardOnce({
            flag: FLAG,
            field: "MultipleChoicePoints" // Or use amount: 5 for a fixed reward.
        });
    };
});
```

`awardOnce()` checks the flag, updates `SurveyPoints`, adds 1 to `InteractionScore`, sets the anti-reaward flag, updates Droppy's counter, and plays the +points animation. It returns `true` if awarded and `false` if already awarded.

**The current protocol is first interaction, not validated completion.** For example: one matrix radio rewards the entire matrix immediately; checkboxes reward after the first selection; knowledge checks reward the first answer, even if the participant changes it later. These behaviors are preserved to avoid an unannounced change to the research instrument.

## Issues requiring study-owner review

1. **Duplicate flags (#9/#10, #19/#20):** `Q_knowledgeTest1_prompt` and `Q_knowledgeTest2_prompt` each appear twice. The replacement files preserve those names and include critical warnings. If pairs are distinct questions, give the second question a new unique flag and declare its JS embedded-data field. If they are alternate copies intentionally sharing a reward, retain the same flag.
2. **Loop & Merge (#34/#37/#40):** `Q_dceB1_<loop>`, `Q_dceB2_<loop>`, and `Q_dceB3_<loop>` must be declared separately (e.g., `__js_Q_dceB1_1` ... `_9`). A B4 **color-only** script exists at #43, but no B4 choice-award script was supplied; do not invent one without confirming the survey design.
3. **Question scoring (#11/#12/#21/#22):** Correct values 2, 4, 3, 2 were retained, but the values in `element.value` may differ from visible answer order. Verify the actual Qualtrics HTML recode/choice values.
4. **Video (#29):** The reward occurs 85 seconds after page-ready, not after verified video completion; the Next button appears at 90 seconds. Test tab switches, autoplay restrictions, and respondent navigation.
5. **Automatic rewards (#23/#24/#33):** These award on page appearance and increment `InteractionScore`, even without explicit clicking. Check whether that is the intentional operational definition of an interaction.
6. **Custom slider (#14/#17):** The replacement uses Pointer Events (mouse/touch/pen) and image availability probe. This is an intentional improvement, but test against your HTML and browser(s), particularly mobile Safari. The probe does **not** set the actual image URL in HTML/CSS.
7. **Original conditional/script fields:** Older `getEmbeddedData` / `setEmbeddedData` have been replaced with the JS Embedded Data APIs. Confirm all flags are registered or a respondent could earn points again after returning to a previous page.
8. **DOM selector consistency:** The header assumes exactly one each of `#pointsContainer`, `#pointsText`, `#droppy`, `#plusPointsContainer`, and `#plusPoints` per page. Duplicate HTML IDs can cause updates to the wrong container.
9. **Shared term popup globals:** `showPopup` and `hidePopup` exist for compatibility with existing HTML `onclick` calls. Only one popup controller should be active per page.
10. **Core data integrity:** Qualtrics custom client-side scoring is suitable for gamified display and survey instrumentation but not tamper-proof. Test persisted exported embedded-data values, especially if the study uses these fields for analysis.

## Qualtrics code placement

- Survey **Header** accepts `<script>...</script>` and any accompanying HTML/CSS.
- Question JavaScript editor expects *JavaScript only* (do not paste `<script>` tags).
- Qualtrics executes `addOnload` when the page loads, `addOnReady` after fully displayed, and `addOnUnload` as it leaves.
- Qualtrics JavaScript customizations can behave differently in Simple Layout or with transitions. Always preview in the target layout.

Official documentation: https://www.qualtrics.com/support/survey-platform/survey-module/question-options/add-javascript/

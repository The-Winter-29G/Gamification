# Qualtrics Preview & data-integrity verification

Run these in a **duplicated** survey using actual treatment routing and mobile/desktop layouts. Confirm both visual behavior and the exported respondent embedded-data fields.

1. New response: intro shows "Welcome to the survey!" for ~4 seconds, then current points. No early "0 points" flashing from competing scripts.
2. Question #00 awards initial radio once. Total increases by configured `MultipleChoicePoints` and interaction by one. Repeated click, changing radio answer, Back/Next navigation must not award again.
3. Standard pages show correct accumulated total. Hidden-points treatment (`arePointsVisible=false`) has no visible counter or floating +X; scoring still proceeds by design.
4. Questions #2/#50 (checkbox): first checked box awards once; clearing and rechecking does not re-award.
5. Matrix questions #5/#27/#46/#47: one radio selection awards once; finishing the matrix alone does NOT add another award. Ensure this is the desired metric.
6. Correct-answer #11/#12/#21/#22: confirm actual HTML `element.value` matches expected correct code (2,4,3,2), test both correct and incorrect responses, and later changing answers.
7. Sliders #14/#17: keyboard/native input, mouse, touch, rapid drags, and navigation away. Verify custom handle graphic loaded and fallback is sensible.
8. Popup #16: opening "acre-feet" awards once; reopening does not award. Popup #26: different terms each award independently and the exact correct definition is shown.
9. Conditional #23/#24: triggers on reaching the page, one time only, while `InteractionScore` increments one each. Verify branching treatment logic.
10. Video #29: Next hidden initially, shows after 90 seconds, points awarded after 85 seconds; leaving before 85 seconds does not award. Do NOT describe this as evidence of video completion.
11. Secret reward #33: one automatic award only. `Q_secretRewardFlag` persists after navigation.
12. Loop #34/#37/#40: correct colors, one award per loop iteration per base flag. Test Back/Next across iterations; verify all `__js_Q_dceB*_<loop>` flags declared.
13. Duplicate flags #9/#10 and #19/#20: decide whether same award intentional; fix flags if separate questions.
14. Inspect survey export: `SurveyPoints`, `InteractionScore` and each corresponding flag are persisted and accurate. Pay attention to whether exported column names include `__js_`.
15. Browser DevTools Console: no JavaScript errors, including when `pointsText`, popup elements, and optional graphics are absent.
16. Preview on your actual survey theme and target mobile browser(s); custom Qualtrics question DOM may differ in Simple Layout.

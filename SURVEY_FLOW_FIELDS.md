# JS Embedded Data fields — Survey Flow checklist

## REQUIRED common fields

Declare these fields **before the first question using them**. Keep them initialized only once, before any award. `__js_` belongs in Survey Flow; omit it from `getJSEmbeddedData` and `setJSEmbeddedData` arguments.

| Survey Flow name | Suggested initial value | Use |
|---|---|---|
| `__js_SurveyPoints` | `0` | Total awarded points |
| `__js_InteractionScore` | `0` | Count of rewarded interactions |
| `__js_arePointsVisible` | `true` (or treatment-specific) | Controls visible counter, not awarding |
| `__js_MultipleChoicePoints` | study-specific integer | Radio/checkbox/loop rewards |
| `__js_MatrixPoints` | study-specific integer | Matrix rewards |
| `__js_ImageSliderPoints` | study-specific integer | Custom slider rewards |
| `__js_PopupPoints` | study-specific integer | Definition rewards |
| `__js_ConditionalPoints` | study-specific integer | Automatic/conditional rewards |
| `__js_Mp4VideoEndPoints` | study-specific integer | Video-page timed reward |

Unused point fields may be omitted if no associated question runs. Set values to match the published/experimental protocol.

## FIRST-INTERACTION FLAGS (initialize blank or `false`)

Every one of these must be declared **before** it can be used. If two separate questions share a flag, they share one award. The duplicated flags in sections #9/#10 and #19/#20 are NOT renamed automatically.

- `__js_Q_ANA_check`
- `__js_Q_SpanHisLat`
- `__js_Q_acreFeet_def`
- `__js_Q_agToUrbanExpectations`
- `__js_Q_agWater_def`
- `__js_Q_agreeDisagree`
- `__js_Q_canal_def`
- `__js_Q_combineBill`
- `__js_Q_dceB1Followup`
- `__js_Q_dceB1_1`
- `__js_Q_dceB1_2`
- `__js_Q_dceB1_3`
- `__js_Q_dceB1_4`
- `__js_Q_dceB1_5`
- `__js_Q_dceB1_6`
- `__js_Q_dceB1_7`
- `__js_Q_dceB1_8`
- `__js_Q_dceB1_9`
- `__js_Q_dceB2Followup`
- `__js_Q_dceB2_1`
- `__js_Q_dceB2_2`
- `__js_Q_dceB2_3`
- `__js_Q_dceB2_4`
- `__js_Q_dceB2_5`
- `__js_Q_dceB2_6`
- `__js_Q_dceB2_7`
- `__js_Q_dceB2_8`
- `__js_Q_dceB2_9`
- `__js_Q_dceB3Followup`
- `__js_Q_dceB3_1`
- `__js_Q_dceB3_2`
- `__js_Q_dceB3_3`
- `__js_Q_dceB3_4`
- `__js_Q_dceB3_5`
- `__js_Q_dceB3_6`
- `__js_Q_dceB3_7`
- `__js_Q_dceB3_8`
- `__js_Q_dceB3_9`
- `__js_Q_dceB4Followup`
- `__js_Q_dceCheckCompare`
- `__js_Q_dceCheckFee`
- `__js_Q_dceCheckRestrictions`
- `__js_Q_dceInstruction_vid_end`
- `__js_Q_deepestWells`
- `__js_Q_defPrompt`
- `__js_Q_domesticExemption`
- `__js_Q_domesticWater_def`
- `__js_Q_drainFlows_def`
- `__js_Q_drinkWaterOrigin`
- `__js_Q_edu`
- `__js_Q_evap_def`
- `__js_Q_evapotrans_def`
- `__js_Q_floodIrrigation_def`
- `__js_Q_homeChar`
- `__js_Q_howFamiliar`
- `__js_Q_incidentalRecharge_def`
- `__js_Q_income`
- `__js_Q_industWater_def`
- `__js_Q_knowMore1`
- `__js_Q_knowMore2`
- `__js_Q_knowledgeTest1_prompt`
- `__js_Q_knowledgeTest2_prompt`
- `__js_Q_lateral_def`
- `__js_Q_letsEarnSomePoints`
- `__js_Q_municipalWater_def`
- `__js_Q_numBasins`
- `__js_Q_policyMakerExtent`
- `__js_Q_pressurizedIrrigation_def`
- `__js_Q_protest1`
- `__js_Q_protest2`
- `__js_Q_protest3`
- `__js_Q_protest4`
- `__js_Q_race`
- `__js_Q_runOff_def`
- `__js_Q_secretRewardFlag`
- `__js_Q_seepage_def`
- `__js_Q_siphon_def`
- `__js_Q_slider1`
- `__js_Q_slider2`
- `__js_Q_supportFee`
- `__js_Q_timeInTV`
- `__js_Q_transpiration_def`
- `__js_Q_usetype`
- `__js_Q_warmglow`
- `__js_Q_waterBill`
- `__js_Q_waterDays`
- `__js_Q_waterRight_def`
- `__js_Q_waterSource`
- `__js_Seen_Conditional_3`
- `__js_Seen_Conditional_4`

## Special notes

- Only add flags for loop iterations that can actually occur; the example includes loops 1–9 because the original color map has nine entries, not because the survey's loop count is confirmed.
- Avoid resetting `__js_SurveyPoints`, `__js_InteractionScore`, or award flags later in Survey Flow.
- If the same page has multiple rewarded questions, give each a different flag unless sharing the award is intentional.
- If correct-answer values, rewards, branching, or loop order are randomized, confirm the IDs and fields still refer to what you expect.
- Current Qualtrics `getJSEmbeddedData`/`setJSEmbeddedData` handling and `__js_` conventions should be tested in your installed survey layout.

/* CUSTOM BEFORE/AFTER IMAGE SLIDER — EXAMPLE
 * Required HTML selectors INSIDE this question:
 *   .slider-track, .before-container, .slider-line, .slider-handle (optional)
 * CUSTOMIZE: unique award flag, graphic URL, CSS selector names, points field.
 * IMAGE NOTE: IMAGE_URL below ONLY tests if the handle image is available.
 * To change the actual picture, ALSO change <img src> or background-image
 * in the slider's HTML/CSS. See HTML_AND_IMAGES.md.
 * Awarded on the first actual slider input or drag (not simply page load).
 */
(function () {
    let dragging = false;
    let attached = false;
    let sliderElement = null;
    let onPointerMove = null;
    let onPointerUp = null;

    Qualtrics.SurveyEngine.addOnReady(function () {
        const FLAG = "REPLACE_WITH_UNIQUE_FLAG"; // Declare __js_REPLACE_WITH_UNIQUE_FLAG in Survey Flow.
        const IMAGE_URL = "https://boisestate.az1.qualtrics.com/WRQualtricsControlPanel/Graphic.php?IM=IM_bBjeY4AQ7aeZ0cC";
        // CUSTOMIZE: replace IMAGE_URL with your own Qualtrics Library image URL.
        const question = document.getElementById(this.questionId);
        if (!question) return;

        const slider = question.querySelector(".slider-track");
        const before = question.querySelector(".before-container");
        const line = question.querySelector(".slider-line");
        const handle = question.querySelector(".slider-handle");
        if (!slider || !before || !line) return;
        sliderElement = slider;

        if (handle && IMAGE_URL) {
            const probe = new Image();
            probe.onerror = function () { handle.classList.add("no-image"); };
            probe.src = IMAGE_URL;
        }

        function updateSlider(value) {
            const percentage = Math.max(0, Math.min(100, Number(value) || 0));
            before.style.width = percentage + "%";
            line.style.left = percentage + "%";
            if (handle) handle.style.left = "50%";
        }

        function award() {
            window.DroppyPoints.awardOnce({flag: FLAG, field: "ImageSliderPoints"});
        }

        function readPointerPosition(event) {
            const rect = slider.getBoundingClientRect();
            if (rect.width === 0) return null;
            const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
            return 100 * x / rect.width;
        }

        function movePointer(event) {
            if (!dragging) return;
            const next = readPointerPosition(event);
            if (next === null) return;
            slider.value = next;
            updateSlider(next);
            if (event.cancelable) event.preventDefault();
        }

        slider.addEventListener("input", function () {
            updateSlider(slider.value);
            award();
        });

        // Pointer events support mouse, touchscreen and pen without global touch handlers.
        // If this custom slider intentionally uses another interaction library,
        // test before replacing its existing drag handlers.
        slider.addEventListener("pointerdown", function (event) {
            dragging = true;
            award();
            movePointer(event);
            if (event.cancelable) event.preventDefault();
        });
        onPointerMove = movePointer;
        onPointerUp = function () { dragging = false; };
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("pointercancel", onPointerUp);
        attached = true;
        updateSlider(slider.value);
    });

    Qualtrics.SurveyEngine.addOnUnload(function () {
        if (attached) {
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("pointercancel", onPointerUp);
        }
        dragging = false;
        sliderElement = null;
    });
})();

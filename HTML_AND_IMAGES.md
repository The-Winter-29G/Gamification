# HTML elements, image replacement and CSS animation contract

## This kit does NOT contain your existing Droppy mascot image or current CSS

**KEEP your existing points-container HTML and CSS until the migrated JavaScript has passed preview testing.** Only replace graphic URLs in the markup or CSS where the asset is defined. The JavaScript header does not render an image by itself.

Expected unique elements per page:

```html
<!-- OPTIONAL TEMPLATE ONLY: adapt your current working HTML/CSS rather than doubling it. -->
<div id="pointsContainer">
  <!-- REPLACE `YOUR_QUALTRICS_LIBRARY_IMAGE_URL` with your own approved asset. -->
  <img id="droppy" src="YOUR_QUALTRICS_LIBRARY_IMAGE_URL"
       alt="Survey mascot" width="90" height="90">
  <span id="pointsText">Welcome to the survey!</span>
</div>
<div id="plusPointsContainer" style="display:none" aria-live="polite">
  <span id="plusPoints"></span>
</div>
```

`#droppy` must exist for mascot animation, but the intro welcome no longer depends on it.

The header uses **existing CSS keyframes** named `droppyDance`, `pointsAppear`, and `pointsDisappear`. If you rename these in your CSS, also change the corresponding strings in the header. It uses an inline `top:100px` for floating points. A copyable CSS starter is below; customize spacing, typefaces, color, accessibility, and reduce-motion preferences.

```css
/* OPTIONAL STARTER CSS — not a copy of your original survey styling. */
#pointsContainer { display:flex; align-items:center; gap:12px; }
#droppy { width:90px; height:auto; }
#plusPointsContainer { position:fixed; z-index:1000; top:100px; right:24px; pointer-events:none; }
@keyframes droppyDance { 0%, 100% { transform:translateY(0); } 40% { transform:translateY(-8px); } }
@keyframes pointsAppear { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
@keyframes pointsDisappear { from { opacity:1; } to { opacity:0; } }
@media (prefers-reduced-motion: reduce) { #droppy, #plusPointsContainer { animation:none !important; } }
```

## Custom slider image (#14 / #17)

- Original script tests a Boise State-hosted image URL `Graphic.php?IM=IM_bBjeY4AQ7aeZ0cC` for the slider-handle fallback. The standardized script explicitly labels it `IMAGE_URL`.
- **Replace the handle's actual `<img src="...">` or CSS `background-image:url(...)` as well.** `new Image().src = IMAGE_URL` only tests availability; it DOES NOT change the image on the slider.
- The custom slider depends on `.slider-track`, `.before-container`, `.slider-line` and optionally `.slider-handle`, scoped inside the question. Your markup must match.
- If you use a third-party before/after slider widget with its own event handling, test pointer interactions before adoption.

## Definition popup markup (#16 / #26)

```html
<a href="#" class="popup-link" data-term="Canal">Canal</a>
<div id="popup" style="display:none" role="dialog" aria-modal="true">
  <div id="popup-content"></div>
  <button type="button">Close</button>
</div>
```

For a new project, adapt the popup for keyboard focus management and accessible labeling; the sample preserves your existing DOM contract and does not implement a full accessible modal.

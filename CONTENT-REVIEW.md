# Content and asset review

Status: working review version. Proposed states and answers are not designer-approved.

Source: `Fabiani Luggage QC.pdf`, one 1440 x 8051.64 artboard. The full board and eight readable strips were rendered and inspected. No reference course, original asset pack or additional state copy was supplied.

## Content decisions

- [ ] Approve Medium Case, Large Case and Multiple-Case Travel guidance in `src/content/course.ts` (`cases`, `source: authored-review`). These are qualitative proposals with no invented specifications or precise trip durations. Confirmed, labelled case images have now been supplied for all four tabs.
- [ ] Approve conversation exchanges 2-4 (`conversation`, `source: authored-review`). Exchange 1 preserves the supplied wording. Step 4 includes a dimensions/capacity/airline check.
- [ ] Confirm assessment question 1 answer C (`answerSource: inferred-review`). The question and four options are supplied; all feedback is proposed and retains the airline/dimension caveat.
- [ ] Approve assessment questions 2-3, their options, answers and all explanatory feedback (`source`, `answerSource` and `feedbackSource: authored-review`).
- [ ] Approve the explicit Ask / Connect / Recommend labels assigned to the board's three explanation rows. These labels are inferred from the supplied framework heading.
- [ ] Approve interface wording and image descriptions. `authoringMetadata` marks accessibility labels, alt text, progress, assessment controls, results, answer review and no-JavaScript notices as authored additions.
- [ ] Approve the requested first-build assessment defaults: one response per question, submitted answers locked, Previous/Next available, full retry, completion after all three submissions, and a score without a pass/fail threshold.
- [x] “Return to People Connect” is displayed as non-interactive closing text, as requested. No destination is required.

The remaining instructional copy is transcribed from the PDF. Whitespace, corrupt PDF punctuation and duplicated full stops were normalised. The PDF contains duplicated assessment text objects; the course presents one assessment. All six feature / functional benefit / Customer connection relationships and the full trip-duration warning are retained. The board's `1-3 day` cabin guidance remains indicative.

## Asset review

| Local asset | Source and treatment | Replacement requested |
| --- | --- | --- |
| `hero.webp` | Rendered only the black-and-gold branding artwork at 2x; no course layout baked in | Original artwork for future revisions |
| `wordmark.webp` | Cropped the supplied navigation wordmark at 3x, preserving its dark background | Original transparent/vector wordmark |
| `lifestyle.webp` | Embedded photo, PDF xref 253; optimised WebP | Original high-resolution image when available |
| `small.png`, `medium.png`, `large.png`, `multiple case.png` | Confirmed, labelled product images supplied after the first review and mapped to their matching tabs | None |
| `case-outdoors.webp`, `case-detail.webp` | Embedded photos xrefs 256 and 257, retained for the Sell It Like This section | Original high-resolution images when available |
| `pattern background.svg` | Original Illustrator SVG supplied after the first review; sized to cover each patterned section and displayed with 30% transparency | None |
| `journey.webp`, `wardrobe.webp`, `luggage.webp`, `benefit.webp` | Rendered the four supplied flow icons at 2x | Original icons if available |
| `customer-avatar.webp`, `employee-avatar.webp` | High-resolution crops of the original Customer and Store Employee vector artwork in the PDF | Original vector icons if available |

Each product tab now uses its supplied, explicitly labelled image. No external or generated product images were used.

No original webfonts were supplied. The PDF lists Arial Nova and Source Sans Variable subsets; the course uses local Arial Nova when installed, then Arial / Helvetica / sans-serif. Supply licensed webfont files if exact typography is required.

## Behaviour and visual adaptations

- Navigation and body sections both place Product Range before Product Basics. Conversation maps to How to Sell. The secondary reading-status row and Assessment link have been removed.
- White/patterned bands, dark panels, the exact `#A39362` gold accent, supplied imagery and speech bubbles follow the board. The supplied SVG pattern covers its sections at 30% transparency. Functional-benefit text remains dark on gold for readable contrast, and the lifestyle quotation is HTML over a translucent white strip.
- Mobile navigation collapses into an accessible burger menu, product tabs use two columns on tablets and one on small screens, benefit rows become labelled groups, and assessment columns stack. Product and carousel controls use the requested black-to-gold gradients. Conversation reserves the tallest exchange height at the current width to keep its controls stable.
- Progress is course-specific local storage, with invalid/unavailable storage recovery. A fresh deep link is honoured; a reload resumes the last read section. Reading position is not evidence of learning.
- The closing People Connect text is not a link, and local completion does not report to People Connect or an LMS. No LMS integration, SCORM, xAPI, authentication, analytics or backend is present.
- No conventions were borrowed from a reference course because none was supplied. No kit/starter was used. Nothing has been published or deployed.

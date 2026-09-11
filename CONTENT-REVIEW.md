# Content and asset review

Status: working review version. Proposed states and answers are not designer-approved.

Source: `Fabiani Luggage QC.pdf`, one 1440 x 8051.64 artboard. The full board and eight readable strips were rendered and inspected. No reference course, original asset pack or additional state copy was supplied.

## Content decisions

- [ ] Approve Medium Case, Large Case and Multiple-Case Travel guidance in `src/content/course.ts` (`cases`, `source: authored-review`). These are qualitative proposals with no invented specifications or precise trip durations.
- [ ] Approve conversation exchanges 2-4 (`conversation`, `source: authored-review`). Exchange 1 preserves the supplied wording. Step 4 includes a dimensions/capacity/airline check.
- [ ] Confirm assessment question 1 answer C (`answerSource: inferred-review`). The question and four options are supplied; all feedback is proposed and retains the airline/dimension caveat.
- [ ] Approve assessment questions 2-3, their options, answers and all explanatory feedback (`source`, `answerSource` and `feedbackSource: authored-review`).
- [ ] Approve the explicit Ask / Connect / Recommend labels assigned to the board's three explanation rows. These labels are inferred from the supplied framework heading.
- [ ] Approve interface wording and image descriptions. `authoringMetadata` marks accessibility labels, alt text, range-photo captions, section numbers, progress, assessment controls, results, answer review and no-JavaScript notices as authored additions.
- [ ] Approve the requested first-build assessment defaults: one response per question, submitted answers locked, Previous/Next available, full retry, completion after all three submissions, and a score without a pass/fail threshold.
- [ ] Supply the course-specific People Connect URL in `src/config.ts` (`peopleConnectUrl`). The action is currently omitted.

The remaining instructional copy is transcribed from the PDF. Whitespace, corrupt PDF punctuation and duplicated full stops were normalised. The PDF contains duplicated assessment text objects; the course presents one assessment. All six feature / functional benefit / Customer connection relationships and the full trip-duration warning are retained. The board's `1-3 day` cabin guidance remains indicative.

## Asset review

| Local asset | Source and treatment | Replacement requested |
| --- | --- | --- |
| `hero.webp` | Rendered only the black-and-gold branding artwork at 2x; no course layout baked in | Original artwork for future revisions |
| `wordmark.webp` | Cropped the supplied navigation wordmark at 3x, preserving its dark background | Original transparent/vector wordmark |
| `lifestyle.webp` | Embedded photo, PDF xref 253; optimised WebP | Original high-resolution image when available |
| `cabin-case.webp` | Embedded image xref 255 with its alpha mask; no size substitution | Confirm this image's product identity |
| `case-outdoors.webp`, `case-detail.webp` | Embedded photos xrefs 256 and 257 | Confirmed photographs for medium, large and multiple-case panels |
| `pattern.webp` | Rendered a clean patterned strip from the board, repeated at low opacity | Seamless pattern tile |
| `journey.webp`, `wardrobe.webp`, `luggage.webp`, `benefit.webp` | Rendered the four supplied flow icons at 2x | Original icons if available |

The unconfirmed product panels use explicitly captioned range/detail photographs. They do not represent those photographs as confirmed different sizes or as a multiple-case set. No external or generated product images were used.

No original webfonts were supplied. The PDF lists Arial Nova and Source Sans Variable subsets; the course uses local Arial Nova when installed, then Arial / Helvetica / sans-serif. Supply licensed webfont files if exact typography is required.

## Behaviour and visual adaptations

- Navigation follows the requested label order; body sections follow the board order. Product Range appears before Product Basics in the body. Conversation maps to How to Sell; Assessment has a separate link in the reading-status row.
- White/patterned bands, dark panels, gold accents, supplied imagery and speech bubbles follow the board. Gold text is darker on light backgrounds, and functional-benefit text is dark on gold for readable contrast. The lifestyle quotation is HTML over a translucent white strip.
- Mobile navigation wraps, tabs become a two-column selector, benefit rows become labelled groups, and assessment columns stack. Flat selected controls replace the board's metallic gradients. Conversation reserves the tallest exchange height at the current width to keep its controls stable.
- Progress is course-specific local storage, with invalid/unavailable storage recovery. A fresh deep link is honoured; a reload resumes the last read section. Reading position is not evidence of learning.
- Local completion does not report to People Connect or an LMS. No LMS integration, SCORM, xAPI, authentication, analytics or backend is present.
- No conventions were borrowed from a reference course because none was supplied. No kit/starter was used. Nothing has been published or deployed.

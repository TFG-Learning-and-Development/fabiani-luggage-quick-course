# Content and asset review

Status: instructional copy aligned to the supplied designer PDF and Word storyboard.

Sources:

- `Fabiani Luggage QC.pdf`: visual design, section sequence and copy shown on the single tall artboard.
- `Laggage SB - v1.docx`: approved copy for the full product range, conversation and assessment states that are not shown on the PDF artboard.

## Content decisions

- Small / Cabin Case copy comes from the PDF and storyboard. Medium Case, Large Case and Multiple-Case Travel copy is transcribed from the storyboard.
- The complete storyboard conversation contains seven dialogue turns. They are presented across the four carousel states required by the PDF design.
- The storyboard supplies four assessment scenarios, options and correct/incorrect feedback. The course therefore uses four questions, superseding the PDF mockup's `Question 1 of 3` placeholder.
- Each incorrect option uses that scenario's supplied incorrect feedback; the correct option uses its supplied correct feedback.
- Ask, Connect and Recommend labels and explanations are supplied in the storyboard.
- Interface-only wording such as navigation accessibility labels, assessment controls, results, answer review and no-JavaScript notices is authored for the working interaction and is not instructional copy.
- `Return to People Connect` remains non-interactive closing text, as requested.

## Asset review

| Local asset | Source and treatment | Replacement requested |
| --- | --- | --- |
| `hero.webp` | Rendered only the black-and-gold branding artwork at 2x; no course layout baked in | Original artwork for future revisions |
| `wordmark.webp` | Cropped from the supplied navigation wordmark at 3x | Original transparent/vector wordmark |
| `lifestyle.webp` | Embedded PDF photo, optimised as WebP | Original high-resolution image when available |
| `small.png`, `medium.png`, `large.png`, `multiple case.png` | Supplied product images mapped to their matching tabs | None |
| `case-outdoors.webp`, `case-detail.webp` | Embedded PDF photos retained for Sell It Like This | Original high-resolution images when available |
| `pattern background.svg` | Supplied Illustrator SVG, set to cover patterned sections at 30% transparency | None |
| `journey.webp`, `wardrobe.webp`, `luggage.webp`, `benefit.webp` | Rendered from the four supplied flow icons | Original icons if available |
| `customer-avatar.webp`, `employee-avatar.webp` | High-resolution crops of the original PDF vector artwork | Original vector icons if available |

No external or generated product images are used. No original webfonts were supplied; the course uses locally installed Arial Nova when available, then Arial, Helvetica and sans-serif.

## Behaviour and visual adaptations

- Navigation and body sections place Product Range before Product Basics. Conversation maps to How to Sell. The secondary reading-status row and Assessment link are removed.
- White and patterned bands, dark panels, the exact `#A39362` gold, supplied imagery and speech bubbles follow the board. The supplied pattern covers its sections at 30% transparency.
- Mobile navigation collapses into an accessible burger menu. Product tabs use two columns on tablets and one on small screens; benefit and assessment layouts stack.
- Course-specific local storage preserves assessment and reading state. The version was advanced when the assessment changed from three to four questions, so incompatible saved attempts reset cleanly.
- The SCORM 1.2 wrapper initializes the LMS, records location/session time and marks the SCO complete on launch. Local assessment completion and score remain separate.
- No xAPI, authentication, analytics or backend is present. Nothing has been deployed.

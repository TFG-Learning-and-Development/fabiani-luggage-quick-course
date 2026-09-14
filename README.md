# Fabiani Luggage quick course

Standalone Astro static course built from the supplied designer board. This is a working review version; see [CONTENT-REVIEW.md](CONTENT-REVIEW.md) for proposed content and missing assets.

## Run locally

The local production preview for this handover is at **http://127.0.0.1:4323**. The development server is at **http://127.0.0.1:4322**. Both are local only.

```powershell
npm.cmd ci
npm.cmd run dev -- --port 4324
```

Open the URL printed by Astro; it selects another port if necessary. On shells where `npm` works directly, `.cmd` can be omitted. Node 26.4.0 was used for this build. Dependencies are pinned by `package-lock.json`.

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run preview -- --port 4323
```

Astro builds into `dist/`. The post-build step adds the SCORM runtime and `imsmanifest.xml`; there is no runtime server dependency in the generated course. Serve `dist/` over HTTP to review it. For a background preview, append `--background`; manage it with `npx.cmd astro preview status` and `npx.cmd astro preview stop`.

## SCORM package

`npm.cmd run build` produces a SCORM 1.2-compatible course in `dist/`. ZIP the contents of `dist/` so `imsmanifest.xml` sits at the root of the archive, then upload that ZIP to the LMS. The wrapper follows the other quick courses: it initializes the LMS API, saves the current location and session time, and marks the course complete when it launches.

## Project layout

- `src/content/course.ts`: supplied copy, proposed missing states, questions, feedback and provenance metadata.
- `src/config.ts`: local storage key/version, navigation mapping and base-aware asset paths.
- `src/components/`: navigation, product tabs, feature relationships, selling framework, conversation and assessment.
- `src/scripts/`: small TypeScript controllers and validated local persistence.
- `src/styles/course.css`: central visual tokens and responsive styles.
- `public/images/`: supplied artwork and optimised local images extracted from the PDF.
- `tests/course.spec.ts`: browser interaction, persistence, accessibility and responsive checks.
- `scripts/build-scorm.mjs`: post-build SCORM 1.2 runtime and manifest generation.
- `scripts/inspect-pdf.py`, `scripts/extract-assets.py`: reproducible PDF inspection and extraction (optional Python tools; require PyMuPDF and Pillow). Run with the source PDF path as the first argument. Generated `design-reference/` evidence is local and excluded from source control.

## Configuration

“Return to People Connect” is deliberately displayed as non-interactive closing text. The default base is `/`. To build under a subpath:

```powershell
$env:COURSE_BASE_PATH = '/fabiani-luggage-quick-course/'
npm.cmd run build
npm.cmd run preview -- --port 4324
```

Remove that environment variable before rebuilding for `/`: `Remove-Item Env:COURSE_BASE_PATH`. All local asset URLs include the configured base. Navigation uses same-page anchors.

Progress uses `fabiani-luggage:progress:v2` in the same browser/device. Responses, submitted feedback, current question and reading section persist. Local completion means all four storyboard questions were submitted, regardless of score. A fresh attempt clears all four responses. This local assessment state is separate from the SCORM wrapper's launch completion signal.

Without JavaScript, all product panels, conversation exchanges, questions and expandable answer discussions remain available. Scoring and persistence need JavaScript.

## Browser verification

Handover result: production build passed; Astro check returned 0 errors, 0 warnings and 0 hints; all Playwright tests passed. The full designer board and course screenshots were visually inspected. The base-path browser check also passed. Real screen-reader sessions and Safari/Firefox testing were not performed.

Start a preview, then run:

```powershell
npx.cmd playwright install chromium
$env:COURSE_TEST_URL = 'http://127.0.0.1:4323'
npm.cmd test
```

An existing Chromium binary can be used by setting `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to its path. This handover was tested with the installed Chromium browser using that override. Screenshots and failure traces go to `test-results/`.

The checks cover all 16 assessment choices and supplied feedback, scores 0-4, out-of-order submission, answer locking, results, question review, retry, refresh, corrupted and blocked storage, all product/conversation states, keyboard controls, reduced motion, no-JavaScript content and local image loading. Responsive screenshots use 1440, 768, 390 and 320 pixel widths. Axe checks target WCAG A/AA rules at desktop/mobile and the submitted assessment state; they are not a substitute for a full assistive-technology audit.

The subpath build was also browser-verified. Reproduce it with `npm.cmd exec astro build -- --base /fabiani-luggage-quick-course/ --outDir ./dist-base`, then `node scripts/verify-base.mjs`. That script starts a temporary local static test server and closes it when finished.

No visual reference course was supplied, and no kit/starter conventions were copied. See the review checklist for responsive adaptations, font fallback and outstanding approvals. Nothing has been deployed.

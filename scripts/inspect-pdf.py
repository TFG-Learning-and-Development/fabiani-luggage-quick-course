"""Extract source evidence and render the complete designer board for review."""
from pathlib import Path
import json
import sys
import fitz

source = Path(sys.argv[1])
out = Path('design-reference')
out.mkdir(exist_ok=True)
doc = fitz.open(source)
page = doc[0]
(out / 'board-text.txt').write_text(page.get_text(), encoding='utf-8')
page.get_pixmap(matrix=fitz.Matrix(0.5, 0.5)).save(out / 'board-full.png')
for index, top in enumerate(range(0, int(page.rect.height), 1100)):
    page.get_pixmap(matrix=fitz.Matrix(1, 1), clip=fitz.Rect(0, top, page.rect.width, min(top + 1100, page.rect.height))).save(out / f'board-{index + 1:02}.png')
assets = []
seen = set()
for entry in page.get_images(full=True):
    xref, mask = entry[:2]
    if xref in seen:
        continue
    seen.add(xref)
    pix = fitz.Pixmap(doc, xref)
    if mask:
        pix = fitz.Pixmap(pix, fitz.Pixmap(doc, mask))
    pix.save(out / f'image-{xref}.png')
    assets.append({'xref': xref, 'width': pix.width, 'height': pix.height, 'positions': [list(r) for r in page.get_image_rects(xref)]})
(out / 'assets.json').write_text(json.dumps(assets, indent=2), encoding='utf-8')
print(json.dumps(assets, indent=2))

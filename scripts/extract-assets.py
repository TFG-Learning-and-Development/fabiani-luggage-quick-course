"""Prepare local web assets from the supplied PDF; no replacement branding."""
from pathlib import Path
import sys
import fitz
from PIL import Image

doc = fitz.open(sys.argv[1])
page = doc[0]
out = Path('public/images')
out.mkdir(parents=True, exist_ok=True)

def render(name, rect, scale=2):
    pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), clip=fitz.Rect(rect))
    img = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
    img.save(out / f'{name}.webp', quality=92)

render('hero', (79, 136, 1361, 633))
render('wordmark', (98, 54, 338, 92), 3)
render('pattern', (10, 4940, 1430, 5050), 1)
for name, rect in [('journey', (288, 1447, 426, 1585)), ('wardrobe', (517, 1447, 655, 1585)), ('luggage', (762, 1447, 900, 1585)), ('benefit', (1008, 1447, 1146, 1585))]:
    render(name, rect)
render('customer-avatar', (194, 1677, 282, 1765), 3)
render('employee-avatar', (162.5, 6532.5, 265.5, 6635.5), 3)
for name, xref, smask, width in [('lifestyle', 253, 0, 1200), ('cabin-case', 255, 254, 608), ('case-outdoors', 256, 0, 900), ('case-detail', 257, 0, 900)]:
    pix = fitz.Pixmap(doc, xref)
    if smask:
        pix = fitz.Pixmap(pix, fitz.Pixmap(doc, smask))
    img = Image.frombytes('RGBA' if pix.alpha else 'RGB', (pix.width, pix.height), pix.samples)
    img.thumbnail((width, width * 2), Image.Resampling.LANCZOS)
    img.save(out / f'{name}.webp', quality=88)
print('Extracted web assets:', ', '.join(p.name for p in out.iterdir()))

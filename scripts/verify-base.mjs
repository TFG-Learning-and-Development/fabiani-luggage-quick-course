import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

const root = resolve('dist-base');
const prefix = '/fabiani-luggage-quick-course/';
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp' };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (!pathname.startsWith(prefix)) throw new Error('Outside test base');
    const file = resolve(root, pathname.slice(prefix.length) || 'index.html');
    if (!file.startsWith(root + sep)) throw new Error('Outside test output');
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
    response.end(body);
  } catch { response.writeHead(404); response.end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
let browser;
try {
  browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(response.url()); });
  await page.goto(`http://127.0.0.1:${server.address().port}${prefix}`);
  await page.locator('[data-assessment][data-enhanced]').waitFor();
  await page.locator('img').evaluateAll(async images => {
    await Promise.all(images.map(async image => { image.loading = 'eager'; await image.decode(); }));
  });
  assert(await page.locator('img').evaluateAll(images => images.every(image => new URL(image.src).pathname.startsWith('/fabiani-luggage-quick-course/'))));
  await page.getByRole('link', { name: 'Product Range', exact: true }).click();
  assert.equal(new URL(page.url()).hash, '#product-range');
  await page.getByRole('tab', { name: 'Medium Case', exact: true }).click();
  assert.equal(await page.getByRole('tabpanel').count(), 1);
  await page.locator('[data-question="0"] .answer-option').nth(2).click();
  await page.getByRole('button', { name: 'Check answer', exact: true }).click();
  assert.match(await page.locator('[data-feedback="0"]').innerText(), /Correct/);
  await page.reload();
  assert(await page.locator('[data-question="0"] input').nth(2).isChecked());
  assert.deepEqual(errors, []);
  console.log('Base-path verification passed: HTML, images, CSS, JS, anchors, tabs, assessment and reload.');
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}

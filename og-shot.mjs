import puppeteer from 'puppeteer-core';
import { execSync } from 'node:child_process';

const bin = execSync(
	'ls ~/.cache/puppeteer/chrome-headless-shell/linux-155.0.8059.39/chrome-headless-shell-linux64/chrome-headless-shell',
).toString().trim();
const browser = await puppeteer.launch({ executablePath: bin, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });
await page.goto('file:///tmp/og-card.html', { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 200));
await page.screenshot({ path: 'public/og.png' });
await browser.close();
console.log('og.png written');

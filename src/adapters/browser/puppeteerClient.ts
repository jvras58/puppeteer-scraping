import puppeteer, { type Browser } from 'puppeteer';
import { PUPPETEER_OPTIONS } from '../../shared/config.js';

export async function startBrowser(): Promise<Browser> {
  return puppeteer.launch(PUPPETEER_OPTIONS);
}

export async function closeBrowser(browser: Browser | undefined): Promise<void> {
  if (browser) await browser.close();
}
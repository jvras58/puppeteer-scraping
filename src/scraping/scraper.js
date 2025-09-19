import { URLS, SELECTORS } from '../config/config.js';

export async function performGoogleSearch(page, query) {
await page.goto(URLS.google);
await page.waitForSelector(SELECTORS.searchInput);

await page.type(SELECTORS.searchInput, query);
await page.keyboard.press('Enter');

await page.waitForSelector(SELECTORS.searchResults);
}

import type { Page } from 'puppeteer';
import { URLS, SELECTORS } from '../config/config.js';

export async function accessSigaaLoginPage(page: Page): Promise<void> {
  await page.goto(URLS.sigaa);
  await page.waitForSelector(SELECTORS.loginForm);
}

export async function loginToSigaa(page: Page, username: string, password: string): Promise<void> {
  await page.type(SELECTORS.userInput, username);
  await page.type(SELECTORS.passwordInput, password);
  
  await page.click(SELECTORS.loginButton);
  
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
  
  // Aguarda um pouco mais para garantir que a página inicial carregou
//   await page.waitForSelector(SELECTORS.dashboardHome);
}

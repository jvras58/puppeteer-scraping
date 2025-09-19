import { URLS, SELECTORS } from '../config/config.js';

export async function accessSigaaLoginPage(page) {
  await page.goto(URLS.sigaa);
  await page.waitForSelector(SELECTORS.loginForm);
}

export async function loginToSigaa(page, username, password) {
  await page.type(SELECTORS.userInput, username);
  await page.type(SELECTORS.passwordInput, password);
  
  await page.click(SELECTORS.loginButton);
  
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
  
  // Aguarda um pouco mais para garantir que a página inicial carregou
//   await page.waitForSelector(SELECTORS.dashboardHome);
}

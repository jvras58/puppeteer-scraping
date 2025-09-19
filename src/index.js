import { startBrowser, closeBrowser } from './config/browser.js';
import { accessSigaaLoginPage, loginToSigaa } from './scraping/scraper.js';
import { saveScreenshot } from './utils/fileManager.js';
import { logInfo, logError } from './utils/logger.js';

(async () => {
let browser;

try {
    browser = await startBrowser();
    const page = await browser.newPage();
    
    logInfo('Navegador iniciado.');
    
    await accessSigaaLoginPage(page);
    logInfo('Página de login do SIGAA acessada.');

    await saveScreenshot(page, 'sigaa_login_inicial.png');
    logInfo('Captura de tela da página de login salva como sigaa_login_inicial.png');

    const username = 'SEU_USUARIO';
    const password = 'SUA_SENHA';

    await loginToSigaa(page, username, password);
    logInfo('Login realizado com sucesso.');

    await saveScreenshot(page, 'sigaa_tela_inicial.png');
    logInfo('Captura de tela da tela inicial após login salva como sigaa_tela_inicial.png');

} catch (error) {
    logError(error);
} finally {
    await closeBrowser(browser);
    logInfo('Navegador fechado.');
}
})();
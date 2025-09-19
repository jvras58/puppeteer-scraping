import { startBrowser, closeBrowser } from './config/browser.js';
import { performGoogleSearch } from './scraping/scraper.js';
import { saveScreenshot } from './utils/fileManager.js';
import { logInfo, logError } from './utils/logger.js';

(async () => {
let browser;

try {
    browser = await startBrowser();
    const page = await browser.newPage();
    
    logInfo('Navegador iniciado.');
    
    await performGoogleSearch(page, 'ping');
    logInfo('Pesquisa realizada no Google.');

    await saveScreenshot(page, 'google_search.png');
    logInfo('Captura de tela salva com sucesso.');
} catch (error) {
    logError(error);
} finally {
    await closeBrowser(browser);
    logInfo('Navegador fechado.');
}
})();

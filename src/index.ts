import type { Browser } from 'puppeteer';
import { startBrowser, closeBrowser } from './adapters/browser/puppeteerClient.js';
import { SigaaPage } from './adapters/browser/pageObjects/sigaa.page.js';
import { saveScreenshot } from './shared/fileManager.js';
import { logInfo, logError } from './shared/logger.js';

(async (): Promise<void> => {
let browser: Browser | undefined;

try {
    browser = await startBrowser();
    const page = await browser.newPage();
    const sigaaPage = new SigaaPage(page);
    
    logInfo('Navegador iniciado.');
    
    await sigaaPage.accessLoginPage();
    logInfo('Página de login do SIGAA acessada.');

    await saveScreenshot(page, 'sigaa_login_inicial.png');
    logInfo('Captura de tela da página de login salva como sigaa_login_inicial.png');

    const username = 'SEU_USUARIO';
    const password = 'SUA_SENHA';

    await sigaaPage.login(username, password);
    logInfo('Login realizado com sucesso.');

    await saveScreenshot(page, 'sigaa_tela_inicial.png');
    logInfo('Captura de tela da tela inicial após login salva como sigaa_tela_inicial.png');

    // Capturar disciplinas do semestre vigente
    const disciplinasInfo = await sigaaPage.capturarDisciplinasSemestreVigente();
    
    if (disciplinasInfo) {
        logInfo(`✅ Captura de disciplinas concluída para o semestre ${disciplinasInfo.periodo}`);
        await saveScreenshot(page, 'sigaa_disciplinas_capturadas.png');
        logInfo('Captura de tela das disciplinas salva como sigaa_disciplinas_capturadas.png');
    } else {
        logInfo('❌ Não foi possível capturar as disciplinas do semestre vigente');
    }

} catch (error) {
    logError(error as Error);
} finally {
    await closeBrowser(browser);
    logInfo('Navegador fechado.');
}
})();
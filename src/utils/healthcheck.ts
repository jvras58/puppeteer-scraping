import { startBrowser, closeBrowser } from '../config/browser.js';
import { logInfo, logError } from './logger.js';

/**
 * Executa um healthcheck simples: lança browser headless, cria página e fecha.
 * @returns {Promise<boolean>} True se sucesso, false se falha.
 */
export async function runHealthcheck(): Promise<boolean> {
  let browser;
  try {
    logInfo('Iniciando healthcheck do ambiente...');

    browser = await startBrowser();
    const page = await browser.newPage();
    await page.goto('about:blank');
    
    logInfo('Página carregada com sucesso. Testando navegação...');
    
    await page.goto('https://www.google.com', { waitUntil: 'networkidle0', timeout: 10000 });
    
    await closeBrowser(browser);

    logInfo('Healthcheck concluído: Browser lançado e fechado com sucesso. Ambiente OK.');
    return true;
  } catch (error) {
    logError(error as Error);
    logInfo('Healthcheck falhou: Verifique Node, Docker e permissões de Chromium.');
    

    if (browser) {
      try {
        await closeBrowser(browser);
      } catch (closeError) {
        logError(new Error('Erro ao fechar browser: ' + (closeError as Error).message));
      }
    }
    
    return false;
  }
}

// Executa se chamado diretamente (para CLI)
if (process.argv[1] === import.meta.filename) {
  runHealthcheck().then((success) => process.exit(success ? 0 : 1));
}
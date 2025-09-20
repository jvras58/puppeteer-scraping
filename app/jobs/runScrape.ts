import { PuppeteerClient } from '../../src/adapters/browser/puppeteerClient.js';
import { SigaaPage } from '../../src/adapters/browser/pageObjects/sigaa.page.js';
import { saveScreenshot } from '../../src/shared/fileManager.js';
import { logInfo, logError } from '../../src/shared/logger.js';
import { metrics } from '../../src/shared/metrics.js';

/**
 * Job principal de scrape: orquestra browser e fluxo.
 */
async function runScrape(): Promise<void> {
  const client = new PuppeteerClient(); // Injeção do adapter
  let browser;
  try {
    browser = await client.start();
    const page = await client.createPage(browser);
    const sigaaPage = new SigaaPage(page);

    // Fluxo migrado de index.ts
    logInfo('Acessando página de login do SIGAA...');
    await sigaaPage.accessLoginPage();
    await saveScreenshot(page, 'sigaa_login_inicial.png');
    logInfo('Página de login do SIGAA acessada.');

    const username = process.env.SIGAA_USERNAME || 'SEU_USUARIO'; // De .env
    const password = process.env.SIGAA_PASSWORD || 'SUA_SENHA';
    
    logInfo('Realizando login...');
    await sigaaPage.login(username, password);
    await saveScreenshot(page, 'sigaa_tela_inicial.png');
    logInfo('Login realizado com sucesso.');

    // Capturar disciplinas do semestre vigente
    logInfo('Capturando disciplinas do semestre vigente...');
    const disciplinasInfo = await sigaaPage.capturarDisciplinasSemestreVigente();
    
    if (disciplinasInfo) {
      logInfo(`✅ Captura de disciplinas concluída para o semestre ${disciplinasInfo.periodo}`);
      logInfo(`Disciplinas capturadas: ${disciplinasInfo.disciplinas.length}`);
      await saveScreenshot(page, 'sigaa_disciplinas_capturadas.png');
      logInfo('Captura de tela das disciplinas salva como sigaa_disciplinas_capturadas.png');
      // TODO: Persistir via StoragePort na Etapa 6
    } else {
      logInfo('❌ Não foi possível capturar as disciplinas do semestre vigente');
    }

    metrics.increment('scrape_success');
  } catch (error) {
    logError(error as Error);
    metrics.increment('scrape_errors');
  } finally {
    if (browser) await client.close(browser);
    logInfo(`Métricas finais: Sucessos=${metrics.get('scrape_success')}, Erros=${metrics.get('scrape_errors')}`);
  }
}

// Executa se chamado diretamente
runScrape().catch((err) => {
  logError(err);
  process.exit(1);
});
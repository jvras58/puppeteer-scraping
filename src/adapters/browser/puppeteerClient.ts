import puppeteer, { Browser, Page, LaunchOptions } from 'puppeteer';
// Opcional: import puppeteerExtra from 'puppeteer-extra'; import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { BrowserPort } from '../../core/ports/BrowserPort.js'; // Ajuste path relativo
import { saveScreenshot } from '../../shared/fileManager.js'; // Reutiliza existente
import { logInfo, logError } from '../../shared/logger.js';
import { metrics } from '../../shared/metrics.js'; // Usa o stub de métricas

/**
 * Adapter concreto para Puppeteer, implementando BrowserPort.
 * Gerencia lifecycle com hooks para errors e métricas.
 */
export class PuppeteerClient implements BrowserPort {
  private readonly options: LaunchOptions;

  constructor(options?: Partial<LaunchOptions>) {
    this.options = {
      headless: process.env.HEADLESS === 'true', // De .env
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'], // Seguro para Docker
      timeout: 30000, // Global timeout
      ...options,
    };
    // Opcional: Ative stealth se instalado
    // puppeteerExtra.use(StealthPlugin());
  }

  /**
   * Inicializa browser com opções padronizadas.
   * @returns Browser instance.
   */
  async start(): Promise<Browser> {
    logInfo('Iniciando browser com Puppeteer...');
    const startTime = Date.now();
    try {
      // Use puppeteerExtra.launch se stealth ativo; senão puppeteer.launch
      const browser = await puppeteer.launch(this.options);
      metrics.increment('browser_starts');
      logInfo(`Browser iniciado em ${Date.now() - startTime}ms.`);
      return browser;
    } catch (error) {
      metrics.increment('browser_errors');
      throw new Error(`Falha ao iniciar browser: ${(error as Error).message}`);
    }
  }

  /**
   * Cria página com interceptors e hooks.
   * @param browser Browser instance.
   * @returns Page configurada.
   */
  async createPage(browser: Browser): Promise<Page> {
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000); // Aumenta para navegações lentas

    // Hook: Screenshot e log on error
    page.on('error', async (err) => {
      logError(err);
      await this.handleError(page, err);
    });
    page.on('pageerror', async (err) => {
      logError(err);
      await this.handleError(page, err);
    });

    // Interceptor básico: abortar imagens para velocidade (opcional)
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.resourceType() === 'image') req.abort();
      else req.continue();
    });

    return page;
  }

  /**
   * Fecha browser e emite métricas.
   * @param browser Browser instance.
   */
  async close(browser: Browser): Promise<void> {
    logInfo('Fechando browser...');
    await browser.close();
    metrics.increment('browser_closes');
  }

  /**
   * Handler de errors: screenshot e métrica.
   * @param page Page onde ocorreu o error.
   * @param error Error ocorrido.
   */
  private async handleError(page: Page, error: Error): Promise<void> {
    metrics.increment('page_errors');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `error_screenshot_${timestamp}.png`;
    await saveScreenshot(page, filename); // Reutiliza fileManager
    logError(new Error(`Screenshot de erro salvo: ${filename}. Erro: ${error.message}`));
  }
}

// Mantém compatibilidade com código existente (depreciado)
export async function startBrowser(): Promise<Browser> {
  const client = new PuppeteerClient();
  return client.start();
}

export async function closeBrowser(browser: Browser | undefined): Promise<void> {
  if (browser) {
    const client = new PuppeteerClient();
    await client.close(browser);
  }
}
import type { Page, Browser } from 'puppeteer';

/**
 * Port para operações de browser. Implementações concretas em adapters.
 */
export interface BrowserPort {
  /**
   * Inicializa e retorna um browser instance.
   */
  start(): Promise<Browser>;

  /**
   * Cria uma nova página no browser.
   * @param browser Browser instance.
   */
  createPage(browser: Browser): Promise<Page>;

  /**
   * Fecha o browser graceful.
   * @param browser Browser instance.
   */
  close(browser: Browser): Promise<void>;
}
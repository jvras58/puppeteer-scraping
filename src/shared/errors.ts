/**
 * Erro base para o app.
 */
export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Erro específico de scraping falhado.
 */
export class ScrapeError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = 'ScrapeError';
  }
}
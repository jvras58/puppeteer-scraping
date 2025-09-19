export const PUPPETEER_OPTIONS = {
    headless: true, // Defina como false para ver o navegador em ação (útil para depuração)
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
  
  export const URLS = {
    google: 'https://www.google.com',
  };
  
  export const SELECTORS = {
    searchInput: '#APjFqb',
    searchResults: '#search',
  };
  
  export const PATHS = {
    screenshots: 'screenshots',
  };
  
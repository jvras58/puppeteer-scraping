export const PUPPETEER_OPTIONS = {
    headless: true, // Defina como false para ver o navegador em ação (útil para depuração)
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
  
  export const URLS = {
    sigaa: 'https://sigaa.ufpe.br/sigaa/verTelaLogin.do',
  };
  
  export const SELECTORS = {
    
    // SIGAA Login Page
    loginForm: 'form[name="loginForm"]',
    userInput: 'input[name="user.login"]',
    passwordInput: 'input[name="user.senha"]',
    loginButton: 'input[type="submit"][value="Entrar"]',

    // SIGAA Dashboard Home
    // dashboardHome: '#home',

  };
  
  export const PATHS = {
    screenshots: 'screenshots',
  };
import type {  LaunchOptions } from 'puppeteer';

export const PUPPETEER_OPTIONS:  LaunchOptions = {
    headless: true, // Defina como false para ver o navegador em ação (útil para depuração)
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
  
  export const URLS = {
    sigaa: 'https://sigaa.ufpe.br/sigaa/verTelaLogin.do',
  } as const;
  
  export const SELECTORS = {
    
    // SIGAA Login Page
    loginForm: 'form[name="loginForm"]',
    userInput: 'input[name="user.login"]',
    passwordInput: 'input[name="user.senha"]',
    loginButton: 'input[type="submit"][value="Entrar"]',

    // SIGAA Dashboard Home
    // dashboardHome: '#home',

    // SIGAA Disciplinas do Semestre
    disciplinasTable: 'table:has(thead tr th:contains("Componente Curricular"))',
    semestreAtual: 'td[colspan="5"][style*="background: #C8D5EC"]',
    linhaDisciplina: 'tr.odd, tr:not(.odd):has(td.descricao)',
    nomeDisciplina: 'td.descricao a',
    localDisciplina: 'td.info:nth-of-type(2)',
    horarioDisciplina: 'td.info:nth-of-type(3)',

  } as const;
  
  export const PATHS = {
    screenshots: 'screenshots',
  } as const;
import type { Page } from 'puppeteer';
import { URLS, SELECTORS } from '../config/config.js';
import type { Disciplina, SemestreInfo } from '../types/disciplina.js';
import { logInfo } from '../utils/logger.js';

export async function accessSigaaLoginPage(page: Page): Promise<void> {
  await page.goto(URLS.sigaa);
  await page.waitForSelector(SELECTORS.loginForm);
}

export async function loginToSigaa(page: Page, username: string, password: string): Promise<void> {
  await page.type(SELECTORS.userInput, username);
  await page.type(SELECTORS.passwordInput, password);
  
  await page.click(SELECTORS.loginButton);
  
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
}

export async function capturarDisciplinasSemestreVigente(page: Page): Promise<SemestreInfo | null> {
  try {
    // Aguarda a tabela de disciplinas estar presente
    await page.waitForSelector('table', { timeout: 10000 });
    
    // Captura o semestre atual
    const semestreAtual = await page.evaluate(() => {
      const elementos = Array.from(document.querySelectorAll('td[colspan="5"]'));
      const semestreElement = elementos.find(el => 
        el.getAttribute('style')?.includes('background: #C8D5EC') && 
        el.textContent?.trim().match(/^\d{4}\.\d$/)
      );
      return semestreElement?.textContent?.trim() || null;
    });

    if (!semestreAtual) {
      logInfo('Semestre atual não encontrado');
      return null;
    }

    logInfo(`📅 Semestre encontrado: ${semestreAtual}`);

    // Captura as disciplinas
    const disciplinas = await page.evaluate(() => {
      const disciplinasData: Disciplina[] = [];
      
      // Busca a tabela que contém "Componente Curricular" no cabeçalho
      const tabelas = Array.from(document.querySelectorAll('table'));
      const tabelaDisciplinas = tabelas.find(tabela => {
        const headers = tabela.querySelectorAll('th');
        return Array.from(headers).some(th => th.textContent?.includes('Componente Curricular'));
      });
      
      if (!tabelaDisciplinas) {
        return disciplinasData;
      }

      // Encontra todas as linhas de disciplinas (que têm td.descricao)
      const linhasDisciplinas = tabelaDisciplinas.querySelectorAll('tr:has(td.descricao)');
      
      linhasDisciplinas.forEach(linha => {
        const nomeDisciplinaElement = linha.querySelector('td.descricao a');
        
        // No HTML, a ordem é: td.descricao, td.info (local), td.info (horário)
        const tdsInfo = linha.querySelectorAll('td.info');
        const localElement = tdsInfo[0]; // Primeiro td.info é o local
        const horarioElement = tdsInfo[1]; // Segundo td.info é o horário
        
        if (nomeDisciplinaElement) {
          const nomeCompleto = nomeDisciplinaElement.textContent?.trim() || '';
          const local = localElement?.textContent?.trim() || 'Não informado';
          const horario = horarioElement?.textContent?.trim() || 'Não informado';
          
          // Extrair código da disciplina se presente (ex: "IF754 - COMPUTACAO MUSICAL...")
          const match = nomeCompleto.match(/^([A-Z]{2}\d+)\s*-\s*(.+)$/);
          const codigo = match ? match[1] : undefined;
          const nome = match ? match[2] : nomeCompleto;
          
          disciplinasData.push({
            nome,
            codigo,
            local,
            horario,
            semestre: '' // Será preenchido depois
          });
        }
      });
      
      return disciplinasData;
    });

    // Adiciona o semestre às disciplinas
    const disciplinasComSemestre = disciplinas.map(disciplina => ({
      ...disciplina,
      semestre: semestreAtual
    }));

    // Log das disciplinas capturadas
    logInfo(`📚 Total de disciplinas encontradas: ${disciplinasComSemestre.length}`);
    logInfo('--- DISCIPLINAS DO SEMESTRE VIGENTE ---');
    
    disciplinasComSemestre.forEach((disciplina, index) => {
      logInfo(`\n${index + 1}. ${disciplina.codigo ? `[${disciplina.codigo}]` : ''} ${disciplina.nome}`);
      logInfo(`   📍 Local: ${disciplina.local}`);
      logInfo(`   🕐 Horário: ${disciplina.horario}`);
    });
    
    logInfo('\n--- FIM DA LISTA DE DISCIPLINAS ---');

    return {
      periodo: semestreAtual,
      disciplinas: disciplinasComSemestre
    };

  } catch (error) {
    console.error('Erro ao capturar disciplinas do semestre vigente:', error);
    return null;
  }
}

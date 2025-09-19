/**
 * Entidade representando uma disciplina extraída do SIGAA.
 */
export interface Disciplina {
  nome: string;
  codigo?: string;
  local: string;
  horario: string;
  semestre: string;
}

/**
 * Info agregada de um semestre com disciplinas.
 */
export interface SemestreInfo {
  periodo: string;
  disciplinas: Disciplina[];
}
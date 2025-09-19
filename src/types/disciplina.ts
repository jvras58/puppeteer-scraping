export interface Disciplina {
  nome: string;
  codigo?: string;
  local: string;
  horario: string;
  semestre: string;
}

export interface SemestreInfo {
  periodo: string;
  disciplinas: Disciplina[];
}
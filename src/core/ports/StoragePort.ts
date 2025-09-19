import type { Disciplina } from '../entities/disciplina'; // Ajuste path após mover

/**
 * Port para operações de persistência. Suporta múltiplos backends.
 */
export interface StoragePort {
  /**
   * Salva disciplinas extraídas.
   * @param data Array de entidades Disciplina.
   */
  saveDisciplinas(data: Disciplina[]): Promise<void>;
}
/**
 * Métricas básicas para monitoramento.
 */
export class Metrics {
  private counters: Map<string, number> = new Map();

  increment(key: string): void {
    this.counters.set(key, (this.counters.get(key) || 0) + 1);
  }

  get(key: string): number {
    return this.counters.get(key) || 0;
  }
}

export const metrics = new Metrics();
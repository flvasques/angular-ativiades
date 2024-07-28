import { AtividadeStatus } from '../_enum/atividade-status';

export interface Atividade {
  id: number,
  nome: string,
  inicio: null|Date,
  fim: null|Date,
  tempo: number,
  status: AtividadeStatus
}

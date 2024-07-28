import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Atividade } from '../_models/Atividade';

@Injectable({
  providedIn: 'root'
})
export class AtiviadesService {

  private atividadesSubject: BehaviorSubject<Atividade[]> = new BehaviorSubject<Atividade[]>([]);
  public atividades: Observable<Atividade[]> = new BehaviorSubject<Atividade[]>([]).asObservable();

  constructor() {
    this.carregarAtividade();
  }

  public salvarAtiviades(atividades: Atividade[]): boolean {
    const atividadesStr: string = JSON.stringify(atividades);
    localStorage.setItem('vetorAtividades', atividadesStr);
    return true;
  }


  private carregarAtividade(): void {
    const atividadesStr: string | null = localStorage.getItem('vetorAtividades');
    let vetorAtividades: any = [];
    let vetor: Atividade[] = [];
    if(atividadesStr != null) {
      vetorAtividades = JSON.parse(atividadesStr);
    }

    vetorAtividades.forEach((item: any) => {
      const atv: Atividade = {
        id: item.id,
        nome: item.nome,
        inicio: new Date(item.inicio),
        fim: (item.fim? new Date(item.fim): null),
        tempo: item.tempo,
        status: item.status
      }
      vetor.push(atv);
    });

    this.atividadesSubject = new BehaviorSubject<Atividade[]>(vetor);
    this.atividades = this.atividadesSubject.asObservable();
  }
}

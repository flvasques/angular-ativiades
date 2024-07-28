import { FormsModule } from '@angular/forms';
import { AtividadeStatus } from '../_enum/atividade-status';
import { Atividade } from '../_models/Atividade';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AtiviadesService } from '../_sevices/ativiades.service';


@Component({
  selector: 'app-quadro-atividades',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './quadro-atividades.component.html',
  styleUrl: './quadro-atividades.component.scss'
})
export class QuadroAtividadesComponent implements OnInit, OnDestroy {
  public atividades: Atividade[] = [];
  public nomeAtividade: string = '';
  private internval: any = null;
  @HostListener('window:beforeunload', [ '$event' ])
  unloadHandler(event: Event) {
    this.ativiadesService.salvarAtiviades(this.atividades);
  }

  constructor(private ativiadesService: AtiviadesService){}

  ngOnInit(): void  {
    this.ativiadesService.atividades.subscribe((data) => {
      this.atividades = data;
      this.internval = setInterval(() => this.incrementartempos(), 1000);
    });

  }

  ngOnDestroy(): void {
    clearInterval(this.internval);
    this.ativiadesService.salvarAtiviades(this.atividades);

  }

  public addAtividade(): void {

    if(this.nomeAtividade.length > 2 ) {
      const atividade: null | Atividade = this.atividades.find(x => x.status == AtividadeStatus.Andamento) ?? null;
      if(atividade) {
        atividade.status = AtividadeStatus.Pausa;
      }

      let atv: Atividade = {
        id: this.atividades.length,
        nome: this.nomeAtividade,
        inicio: new Date(),
        fim: null,
        tempo: 0,
        status: AtividadeStatus.Andamento
      };

      this.atividades.push(atv);
      this.nomeAtividade = '';
    }
  }

  public apagar(index: number): void {
    this.atividades.splice(index, 1);
  }

  public statusAndamento(status: AtividadeStatus): boolean {
    return status == AtividadeStatus.Andamento;
  }

  public statusPausa(status: AtividadeStatus): boolean {
    return status == AtividadeStatus.Pausa;
  }

  public statusFinalizada(status: AtividadeStatus): boolean {
    return status == AtividadeStatus.Finalizada;
  }

  public pausar(index: number): void {
    this.atividades[index].status = AtividadeStatus.Pausa;
  }

  public iniciar(index: number, id: number): void {
    const atividade: null | Atividade = this.atividades.find(x => x.status == AtividadeStatus.Andamento) ?? null;
    if(atividade) {
      atividade.status = AtividadeStatus.Pausa;
    }
    this.atividades[index].status = AtividadeStatus.Andamento;
  }

  public encerrar(index: number): void {
    this.atividades[index].status = AtividadeStatus.Finalizada;
    this.atividades[index].fim = new Date();
  }

  public formatarTempo(tempo: number): string {
    let minutos: string|number = Math.floor(tempo / 60);
    let segundos: string|number = tempo % 60;
    let horas: string|number = Math.floor(minutos / 60);
    horas = horas < 10 ? `0${horas}` : horas;
    minutos = minutos < 10 ? `0${minutos}` : minutos;
    segundos = segundos < 10 ? `0${segundos}` : segundos;

    return `${horas} : ${minutos} : ${segundos}`;
  }

  private incrementartempos(): void {
    this.atividades.forEach( (item) => {
      if(item.status == AtividadeStatus.Andamento) {
        item.tempo++;
      }
    });
  }
}



import { Component } from '@angular/core';

@Component({
  selector: 'app-informacoes-dengue',
  templateUrl: './informacoes-dengue.page.html',
  styleUrls: ['./informacoes-dengue.page.scss'],
})
export class InformacoesDenguePage {
  mostrarPrevencao: boolean = false;
  mostrarTratamento: boolean = false;
  mostrarSintomas: boolean = false;

  togglePrevencao() {
    this.mostrarPrevencao = !this.mostrarPrevencao;
  }

  toggleTratamento() {
    this.mostrarTratamento = !this.mostrarTratamento;
  }

  toggleSintomas() {
    this.mostrarSintomas = !this.mostrarSintomas;
  }
}

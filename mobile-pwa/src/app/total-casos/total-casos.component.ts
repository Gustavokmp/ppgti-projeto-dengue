import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-casos',
  templateUrl: './total-casos.component.html',
  styleUrls: ['./total-casos.component.scss'],
})
export class TotalCasosComponent {
  nome: string = 'Paraíba'; 
  @Input() total_cases: number;
  loading: boolean = true;
  error: string;

  constructor() {}

}

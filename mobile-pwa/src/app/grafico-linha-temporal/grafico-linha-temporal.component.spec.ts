import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GraficoLinhaTemporalComponent } from './grafico-linha-temporal.component';

describe('GraficoLinhaTemporalComponent', () => {
  let component: GraficoLinhaTemporalComponent;
  let fixture: ComponentFixture<GraficoLinhaTemporalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoLinhaTemporalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GraficoLinhaTemporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformacoesDenguePage } from './informacoes-dengue.page';

describe('InformacoesDenguePage', () => {
  let component: InformacoesDenguePage;
  let fixture: ComponentFixture<InformacoesDenguePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacoesDenguePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

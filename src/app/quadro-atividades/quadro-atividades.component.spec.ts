import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadroAtividadesComponent } from './quadro-atividades.component';

describe('QuadroAtividadesComponent', () => {
  let component: QuadroAtividadesComponent;
  let fixture: ComponentFixture<QuadroAtividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadroAtividadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuadroAtividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

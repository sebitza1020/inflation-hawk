import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceAlertDialog } from './price-alert-dialog';

describe('PriceAlertDialog', () => {
  let component: PriceAlertDialog;
  let fixture: ComponentFixture<PriceAlertDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceAlertDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceAlertDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

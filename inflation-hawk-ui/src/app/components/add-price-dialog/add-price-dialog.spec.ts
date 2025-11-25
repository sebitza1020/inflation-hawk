import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriceDialog } from './add-price-dialog';

describe('AddPriceDialog', () => {
  let component: AddPriceDialog;
  let fixture: ComponentFixture<AddPriceDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPriceDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPriceDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

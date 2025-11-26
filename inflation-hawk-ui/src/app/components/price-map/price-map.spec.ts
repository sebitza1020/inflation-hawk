import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceMap } from './price-map';

describe('PriceMap', () => {
  let component: PriceMap;
  let fixture: ComponentFixture<PriceMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

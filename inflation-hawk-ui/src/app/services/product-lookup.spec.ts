import { TestBed } from '@angular/core/testing';

import { ProductLookup } from './product-lookup';

describe('ProductLookup', () => {
  let service: ProductLookup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductLookup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

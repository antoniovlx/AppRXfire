import { TestBed } from '@angular/core/testing';

import { SoflamadoService } from './soflamado.service';

describe('SoflamadoService', () => {
  let service: SoflamadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoflamadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

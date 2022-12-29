/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehicleService } from './vehicle.service';

describe('Service: Make', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleService],
    });
  });

  it('should ...', inject([VehicleService], (service: VehicleService) => {
    expect(service).toBeTruthy();
  }));
});

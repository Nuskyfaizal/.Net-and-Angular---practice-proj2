import { Version } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Vehicle } from '../Models/vehicle';
import { AlertifyService } from '../_services/alertify.service';
import { VehicleService } from '../_services/vehicle.service';

@Injectable({
  providedIn: 'root',
})
export class VehicleDetailResolver {
  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Vehicle> {
    return this.vehicleService.getVehicle(+route.params['id']).pipe(
      catchError((error) => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/vehicle']);
        return of(null);
      })
    );
  }
}

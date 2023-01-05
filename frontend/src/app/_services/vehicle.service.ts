import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { KeyValuePair, SaveVehicle, Vehicle } from '../Models/vehicle';
import { Observable } from 'rxjs';

@Injectable()
export class VehicleService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMakes() {
    return this.http.get(this.baseUrl + 'makes').pipe(
      // map((response) => JSON.stringify(response)),
      catchError((error) => error)
    );
  }

  getFeatures() {
    return this.http
      .get(this.baseUrl + 'feature')
      .pipe(catchError((error) => error));
  }

  createVehicle(vehicle: SaveVehicle) {
    return this.http.post(this.baseUrl + 'vehicles', vehicle).pipe(
      // map((res) => JSON.stringify(res)),
      catchError((error) => error)
    );
  }

  getVehicle(id) {
    return this.http.get(this.baseUrl + 'vehicles/' + id);
  }

  updateVehicle(vehicle: SaveVehicle) {
    return this.http
      .put(this.baseUrl + 'vehicles/' + vehicle.id, vehicle)
      .pipe(catchError((error) => error));
  }

  deleteVehicle(id) {
    return this.http
      .delete(this.baseUrl + 'vehicles/' + id)
      .pipe(catchError((error) => error));
  }

  getVehicles() {
    return this.http.get<Vehicle[]>(this.baseUrl + 'vehicles').pipe(
      map((res) => {
        JSON.stringify(res);
      }),
      catchError((error) => error)
    );
  }
}

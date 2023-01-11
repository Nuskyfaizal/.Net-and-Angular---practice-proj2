import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class PhotoService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  upload(vehicleId, photo) {
    var formData = new FormData();
    formData.append('file', photo);
    return this.http
      .post(`${this.baseUrl}vehicles/${vehicleId}/photos`, formData)
      .pipe(catchError((error) => error));
  }

  getPhotos(vehicleId) {
    return this.http
      .get(`${this.baseUrl}vehicles/${vehicleId}/photos`)
      .pipe(catchError((error) => error));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class FeatureService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFeatures() {
    return this.http
      .get(this.baseUrl + 'feature')
      .pipe(catchError((error) => error));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MakeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMakes() {
    return this.http
      .get(this.baseUrl + 'makes')
      .pipe(catchError((error) => error));
  }
}

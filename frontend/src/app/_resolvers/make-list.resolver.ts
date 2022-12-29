import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MakeService } from '../_services/make.service';

@Injectable({
  providedIn: 'root',
})
export class MakeListResolver {
  constructor(private makeService: MakeService, private router: Router) {}

  resolve() {
    return this.makeService.getMakes().pipe(
      catchError((error) => {
        console.log(error + 'Problem retrieving data');
        return of(null);
      })
    );
  }
}

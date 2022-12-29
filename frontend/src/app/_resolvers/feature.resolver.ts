import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FeatureService } from '../_services/feature.service';
import { MakeService } from '../_services/make.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureResolver {
  constructor(private featureService: FeatureService, private router: Router) {}

  resolve() {
    return this.featureService.getFeatures().pipe(
      catchError((error) => {
        console.log(error + 'Problem retrieving data');
        return of(null);
      })
    );
  }
}

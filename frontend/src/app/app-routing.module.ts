import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { FeatureResolver } from './_resolvers/feature.resolver';
import { MakeListResolver } from './_resolvers/make-list.resolver';

const routes: Routes = [
  {
    path: 'vehicle/new',
    component: VehicleFormComponent,
    resolve: { makes: MakeListResolver, feature: FeatureResolver },
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

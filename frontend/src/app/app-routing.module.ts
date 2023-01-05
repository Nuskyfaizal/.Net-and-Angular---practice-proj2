import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { FeatureResolver } from './_resolvers/feature.resolver';
import { MakeListResolver } from './_resolvers/make-list.resolver';
import { VehicleDetailResolver } from './_resolvers/vehicle-detail.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: 'home', component: NavMenuComponent },
  {
    path: 'vehicles/new',
    component: VehicleFormComponent,
    //resolve: { makes: MakeListResolver, feature: FeatureResolver },
  },
  {
    path: 'vehicles/:id',
    component: VehicleFormComponent,
    //resolve: { vehicle: VehicleDetailResolver },
  },
  { path: 'vehicles', component: VehicleListComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

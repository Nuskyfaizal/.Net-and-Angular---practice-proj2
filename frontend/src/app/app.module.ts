import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleService } from './_services/vehicle.service';
import { HttpClientModule } from '@angular/common/http';
import { MakeListResolver } from './_resolvers/make-list.resolver';
import { FeatureResolver } from './_resolvers/feature.resolver';
import { AlertifyService } from './_services/alertify.service';
import { VehicleDetailResolver } from './_resolvers/vehicle-detail.resolver';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PaginationComponent } from './shared/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent,
    VehicleListComponent,
    NavMenuComponent,
    PaginationComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    VehicleService,
    MakeListResolver,
    FeatureResolver,
    VehicleDetailResolver,
    AlertifyService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

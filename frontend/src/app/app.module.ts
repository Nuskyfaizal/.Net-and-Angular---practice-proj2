import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleService } from './_services/vehicle.service';
import { HttpClientModule } from '@angular/common/http';
import { MakeListResolver } from './_resolvers/make-list.resolver';
import { FeatureResolver } from './_resolvers/feature.resolver';

@NgModule({
  declarations: [AppComponent, VehicleFormComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [VehicleService, MakeListResolver, FeatureResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}

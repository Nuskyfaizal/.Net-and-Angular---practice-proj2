import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, forkJoin, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as _ from 'underscore';
import { KeyValuePair, SaveVehicle, Vehicle } from '../Models/vehicle';
import { AlertifyService } from '../_services/alertify.service';
import { VehicleService } from '../_services/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css'],
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: KeyValuePair[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: '',
    },
  };
  features: KeyValuePair[];

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private alertify: AlertifyService,
    private router: Router
  ) {
    this.route.params.subscribe((p) => {
      this.vehicle.id = +p['id'] || 0;
    });
  }

  ngOnInit() {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
    ];

    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));

    forkJoin(sources).subscribe(
      (data: any) => {
        console.log(data);
        this.makes = data[0];
        this.features = data[1];

        if (this.vehicle.id) {
          this.setVehicle(data[2]);
          this.populateModels();
        }
      },
      (error) => {
        if (error.status == 404) this.router.navigate(['/vehicle']);
      }
    );
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    var selectedMake = this.makes.find((m) => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    var result$ = this.vehicle.id
      ? this.vehicleService.updateVehicle(this.vehicle)
      : this.vehicleService.createVehicle(this.vehicle);
    result$.subscribe((vehicle: Vehicle) => {
      this.alertify.success('Successfully Updated Vehicle');
      this.router.navigate(['/vehicles/', vehicle.id]);
    });
  }

  delete() {
    this.alertify.confirm('Are you sure', () => {
      this.vehicleService.deleteVehicle(this.vehicle.id).subscribe(
        (res) => {
          this.alertify.success('Vehicle Deleted Successfully');
          this.router.navigate(['/vehicle/new']);
        },
        (error) => {
          this.alertify.error('Failed to delete');
        }
      );
    });
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v['id'];
    this.vehicle.makeId = v['make']['id'];
    this.vehicle.modelId = v['model']['id'];
    this.vehicle.isRegistered = v['isRegistered'];
    this.vehicle.contact = v['contact'];
    this.vehicle.features = _.pluck(v['features'], 'id');
  }
}

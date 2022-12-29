import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css'],
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models;
  vehicle: any = {};
  features: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.getMakes();

    this.getFeatures();
  }

  getMakes() {
    this.route.data.subscribe((res) => {
      this.makes = res['makes'];
    });
  }

  getFeatures() {
    this.route.data.subscribe((res) => {
      this.features = res['feature'];
    });
  }

  onMakeChange() {
    var selectedMake = this.makes.find((m) => m.id == this.vehicle.make);
    this.models = selectedMake ? selectedMake.models : [];
  }
}

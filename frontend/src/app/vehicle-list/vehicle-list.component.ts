import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../Models/vehicle';
import { VehicleService } from '../_services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles() {
    this.vehicleService.getVehicles().subscribe((res: Vehicle[]) => {
      this.vehicles = res;
    });
  }
}

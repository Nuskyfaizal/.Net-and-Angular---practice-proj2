import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { KeyValuePair, Vehicle } from '../Models/vehicle';
import { VehicleService } from '../_services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  makes: KeyValuePair[];
  query: any = {};
  columns = [
    { title: 'Id' },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    {},
  ];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.populateVehicles();
    this.getMakes();
  }

  getMakes() {
    this.vehicleService.getMakes().subscribe((res: KeyValuePair[]) => {
      this.makes = res;
    });
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query).subscribe((res: Vehicle[]) => {
      this.vehicles = res;
    });
  }

  onFilterChange() {
    /***Filtering from the server */
    this.populateVehicles();

    /***filtering in client */
    // var vehicles = this.allVehicles;

    // if (this.filter.makeId)
    //   vehicles = vehicles.filter((v) => v.make.id == this.filter.makeId);

    // if (this.filter.modelId)
    //   vehicles = vehicles.filter((v) => v.model.id == this.filter.modelId);

    // this.vehicles = vehicles;
  }

  resetFilter() {
    this.query = {};
    this.onFilterChange();
  }

  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }

    this.populateVehicles();
  }
}

import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { VehicleService } from '../_services/vehicle.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css'],
})
export class ViewVehicleComponent implements OnInit {
  vehicle: any;
  vehicleId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertify: AlertifyService,
    private vehicleService: VehicleService
  ) {
    route.params.subscribe((p) => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    });
  }

  ngOnInit(): void {
    this.vehicleService.getVehicle(this.vehicleId).subscribe(
      (v) => {
        this.vehicle = v;
      },
      (err) => {
        if (err.status == 404) {
          this.router.navigate(['/vehicles']);
          return;
        }
      }
    );
  }

  delete() {
    this.alertify.confirm('Are you sure', () => {
      this.vehicleService.deleteVehicle(this.vehicle.id).subscribe(
        (res) => {
          this.alertify.success('Vehicle Deleted Successfully');
          this.router.navigate(['/vehicles']);
        },
        (error) => {
          this.alertify.error('Failed to delete');
        }
      );
    });
  }
}

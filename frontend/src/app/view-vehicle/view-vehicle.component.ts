import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { PhotoService } from '../_services/photo.service';
import { VehicleService } from '../_services/vehicle.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css'],
})
export class ViewVehicleComponent implements OnInit {
  vehicle: any;
  vehicleId: number;
  @ViewChild('fileInput') fileInput: ElementRef;
  photos: any[];
  visible = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertify: AlertifyService,
    private vehicleService: VehicleService,
    private photoService: PhotoService
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
    this.photoService.getPhotos(this.vehicleId).subscribe((photos: any[]) => {
      console.log(photos);
      this.photos = photos;
    });

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

  uploadPhoto() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    this.photoService
      .upload(this.vehicleId, nativeElement.files[0])
      .subscribe((photo) => {
        this.photos.push(photo);
      });
  }

  onClick() {
    this.visible = !this.visible;
  }
}

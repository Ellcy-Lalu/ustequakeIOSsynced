import { environment } from './../../../environments/environment';
import Swal from 'sweetalert2';
import { UserService } from './../../service/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-send-location',
  templateUrl: './send-location.component.html',
  styleUrls: ['./send-location.component.css']
})
export class SendLocationComponent implements OnInit {

  lat!:number;
  lng!:number;
  isSengindLocation:boolean = false;

  constructor(private userService:UserService)
  {
    if (navigator)
    {
      navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;

      });
    }
   }

  ngOnInit(): void {
  }

  sendMyLocation()
  {
    this.isSengindLocation = true;
    this.userService.sendMyLocation(this.lat, this.lng).then(result => {
      Swal.fire(
        'Done!',
        'Your location was sent!',
        'success'
      );
      this.isSengindLocation = false;
    });
  }

  sendSafeStatus()
  {
    this.userService.setSafeStatus().then(result => {
      Swal.fire(
        'Done!',
        'Your safe status was sent!',
        'success'
      );
    });
  }

  sendUnsafeStatus()
  {
    this.userService.setUnsafeStatus().then(result => {
      Swal.fire(
        'Done!',
        'Your unsafe status was sent!',
        'success'
      );
    });
  }

}

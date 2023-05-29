import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offline-feature',
  templateUrl: './offline-feature.component.html',
  styleUrls: ['./offline-feature.component.css']
})
export class OfflineFeatureComponent implements OnInit {

  public loading = true;
  public error:string = '';
  public submitted = false;

  public isnewAccount:boolean = false;
  public userData:any;
  public protocols:any;
  public description = '';
  public thumbnail = '';

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getProtocols().subscribe(data => {
      
      setTimeout(() => {
        this.protocols = data;
        this.loading = false;
      }, 500);
    });
  }

  viewDescription(data:any)
  {
    this.description = data.description;
    this.thumbnail = data.thumbnail;
  }

}

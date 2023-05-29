import { UserService } from './../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public loading = true;
  public error:string = '';
  public submitted = false;

  public isnewAccount:boolean = false;
  public userData:any;
  public protocols:any;
  public description = '';
  public thumbnail = '';

  public currentMap:any = null;
  enableZoom: boolean = true;

  constructor(private activatedRoute:ActivatedRoute, private userService:UserService)
  {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .subscribe(params =>{
      if(params.newAccount)
      {
        let user = localStorage.getItem('eQuakeuserData');
        this.userData = user ? JSON.parse(user) : null;
        // console.log(this.userData)
        this.isnewAccount = true;
      }
    });

    this.userService.getProtocols().subscribe(data => {
      
      setTimeout(() => {
        this.protocols = data;
        this.loading = false;
      }, 500);
    });

    this.userService.getCurrentMap().subscribe((map:any) => {
      if(map.payload.exists)
      {
        this.currentMap = map.payload.data().mapFile;
      }
    });

  }

  viewDescription(data:any)
  {
    this.description = data.description;
    this.thumbnail = data.thumbnail;
  }

}

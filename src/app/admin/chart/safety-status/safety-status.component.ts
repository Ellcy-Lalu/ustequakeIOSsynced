import { AdminService } from './../../../service/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-safety-status',
  templateUrl: './safety-status.component.html',
  styleUrls: ['./safety-status.component.css']
})
export class SafetyStatusComponent implements OnInit {

  userSatus:any;
  isLoadingUserStatus:boolean = true;

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getUserStatus().subscribe(data => {
      this.userSatus = data;
    });
  }

}

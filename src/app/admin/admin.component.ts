import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public users:any;
  public activeUsers:any = 0;
  public connectedUsers:any = 0;
  public feedbackCount = 0;
  public drillLogsCount = 0;

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(data => {
     this.activeUsers = 0;
     this.connectedUsers = 0;

     data.forEach(row => {
      
      let user:any = row.payload.doc.data();
      if(user.isActive)
      {
        this.activeUsers = this.activeUsers + 1;
      }

      if(user.role == 'user')
      {
        this.connectedUsers = this.connectedUsers + 1;
      }

     });

    });

    this.adminService.getFeedbackCount().subscribe(result => {
      this.feedbackCount = result.size;
    });

    this.adminService.getDrillLogsCount().subscribe(result => {
      this.drillLogsCount = result.size;
    });

  }

}

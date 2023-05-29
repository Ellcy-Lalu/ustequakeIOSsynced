import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit {
  
  public userData:any;
  public feedbackCount=0;
  
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    let user = localStorage.getItem('eQuakeuserData');
    
    this.userData = user ? JSON.parse(user) : null;

    this.adminService.unSeenFeedbacks().subscribe((data) => {
      this.feedbackCount = data.length;
    });

  }

}

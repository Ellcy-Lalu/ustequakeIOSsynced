import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  public userFeedbacks:any;
  public isLoadingUserFeedback = true;
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getUserFeedbacks().subscribe((data) => {
      this.userFeedbacks = data;
      this.isLoadingUserFeedback = false;
    });
  }

  ngAfterViewInit()
  {
    setTimeout(() => {
      this.adminService.setFeedbackToSeen();
    }, 5000);
  }

  public mapToArray(value:any)
  {
    return Array.from(Array(value)).map((x, i) => i );
  }

  public deleteFeedback(id:any)
  {
    Swal.fire({
      title: 'Are you sure you want to delete this feedback?',
      /* showDenyButton: true, */
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      confirmButtonText: 'Delete',
      /* denyButtonText: `Cancel`, */
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteFeedback(id);
        Swal.fire('Feedback was now removed.', '', 'success')
      }
    });
  }

}

import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.css']
})
export class UserRatingComponent implements OnInit {

  public loading = true;
  public myFeedbacks:any;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('eQuakeuserData')!);
    this.userService.getFeedback(user.uid).subscribe(data => {
      this.myFeedbacks = data;
      this.loading = false;
    });
  }

  progressClass(rate:any)
  {
    let score = Math.round((rate/10) * 100);
    if(score<=30)
    {
      return 'bg-danger';
    
    }else if(score>=30 && score<70)
    {
      return 'bg-warning';
    
    }else if(score>=70 && score<80)
    {
      return 'bg-primary';

    }else if(score>=80 && score<=100)
    {
      return 'bg-success';
    }

    return '';

  }

  public deleteRating(data:any)
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
        this.userService.deleteFeedback(data);
        Swal.fire('Feedback was now removed.', '', 'success')
      }
    });
  }

}

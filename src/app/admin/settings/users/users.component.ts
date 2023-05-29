import { map } from 'rxjs/operators';
import { AdminService } from './../../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  isLoadingUsers:boolean = true;
  accountUsers:any = [];
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    // console.log('load users')
    this.adminService.getUsers().subscribe((users) => {
      this.accountUsers = users;
      this.isLoadingUsers = false;
    })
  }

  userIcon(firstname:string, lastname:string)
  {
    return (firstname.charAt(0)+lastname.charAt(0)).toUpperCase();
  }

  deactivateUser(id:any, email:string, password:string)
  {
    Swal.fire({
      title: 'Are you sure you want to archive',
      html: `User <b>${email}</b> could no longer access the app.`,
      /* showDenyButton: true, */
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      confirmButtonText: 'Archive',
      /* denyButtonText: `Cancel`, */
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deactivateUserAccount(id, email, password);
        Swal.fire('Successfully archived.', '', 'success')
      }
    });
  }

  activateUser(id:any, email:string, password:string)
  {
    Swal.fire({
      title: 'Activate user?',
      html: `User <b>${email}</b> gain access on the app.`,
      /* showDenyButton: true, */
      showCancelButton: true,
      confirmButtonColor: '#00bc8c',
      confirmButtonText: 'Activate',
      /* denyButtonText: `Cancel`, */
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.activateUserAccount(id, email, password);
        Swal.fire('Successfully activated.', '', 'success')
      }
    });
  }

}

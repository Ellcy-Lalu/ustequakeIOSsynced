import { AdminService } from './../../../service/admin.service';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archived-users',
  templateUrl: './archived-users.component.html',
  styleUrls: ['./archived-users.component.css']
})
export class ArchivedUsersComponent implements OnInit {
  isLoading:boolean = true;
  archivedUsers:any;
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getArchivedUsers().subscribe(response => {
      this.archivedUsers = response;
      this.isLoading = false;
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

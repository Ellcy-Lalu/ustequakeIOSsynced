import { AdminService } from './../../../service/admin.service';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-invites',
  templateUrl: './account-invites.component.html',
  styleUrls: ['./account-invites.component.css']
})
export class AccountInvitesComponent implements OnInit {
  isLoading:boolean = true;
  accountInvites:any;
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getAccountInvites().subscribe((data:any) =>{
      this.accountInvites = data;
      this.isLoading = false;
    });
  }

  deleteInvite(data:any)
  {
    Swal.fire({
      title: 'Are you sure you want to remove invite this?',
      /* showDenyButton: true, */
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      confirmButtonText: 'Remove',
      /* denyButtonText: `Cancel`, */
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteAccountInvite(data);
        Swal.fire('Account invite was now removed.', '', 'success')
      }
    });
  }

}

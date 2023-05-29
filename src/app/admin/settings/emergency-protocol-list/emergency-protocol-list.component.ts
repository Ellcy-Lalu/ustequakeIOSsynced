import Swal from 'sweetalert2';
import { AdminService } from './../../../service/admin.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-emergency-protocol-list',
  templateUrl: './emergency-protocol-list.component.html',
  styleUrls: ['./emergency-protocol-list.component.css']
})
export class EmergencyProtocolListComponent implements OnInit {

  public loading = true;
  public error:string = '';
  public submitted = false;
  public isCollaped:boolean = false;

  public protocols:any;
  
  constructor(private router:Router, private _formBuilder:FormBuilder, private adminService:AdminService, private storage:AngularFireStorage) { }

  ngOnInit(): void {
    this.adminService.getProtocols().subscribe((result) => {
      // console.log(result)
      setTimeout(() => {
        this.protocols = result;
        this.loading = false;
      }, 500);
      
    });

  }

  public deleteProtocol(data:any, i:number)
  {
    Swal.fire({
      title: 'Are you sure you want to delete this?',
      /* showDenyButton: true, */
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      confirmButtonText: 'Delete',
      /* denyButtonText: `Cancel`, */
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteProtocol(data);
        Swal.fire('It was now removed.', '', 'success')
      }
    });
  }

}

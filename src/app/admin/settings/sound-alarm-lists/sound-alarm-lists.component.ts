import { AdminService } from './../../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sound-alarm-lists',
  templateUrl: './sound-alarm-lists.component.html',
  styleUrls: ['./sound-alarm-lists.component.css']
})
export class SoundAlarmListsComponent implements OnInit {

  isLoadingFiles:boolean = true;
  audioFiles:any = [];
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getAudioFiles().subscribe((files) => {
      this.audioFiles = files;
      this.isLoadingFiles = false;
    });

  }

  delete(data:any)
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
        this.adminService.deleteAudioFile(data);
        Swal.fire('Audio was now removed.', '', 'success');
      }
    });
    
  }

  setActive(data:any)
  {
    this.adminService.setAudioActive(data);
    Swal.fire('Audio was set to active.', '', 'success');
  }

}

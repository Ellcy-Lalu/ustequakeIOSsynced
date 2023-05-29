import Swal  from 'sweetalert2';
import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emergency-button',
  templateUrl: './emergency-button.component.html',
  styleUrls: ['./emergency-button.component.css']
})
export class EmergencyButtonComponent implements OnInit {

  userSatus:any;
  isLoadingUserStatus:boolean = true;
  smsMessageTemplate:string = '';
  isDrill:boolean = false;
  isLoadingSettingDrill:boolean = false;

  stakeHolders:any;
  lcmcUsers:any;

  isSendingToStakeHolder:boolean = false;
  isSendingToLCMC:boolean = false;
  
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getUserStatus().subscribe(data => {
      this.userSatus = data;
    });

    this.adminService.getSMsTemplate().subscribe((data:any) => {
      this.smsMessageTemplate = data.message;
    });

    this.adminService.getTriggeredDrill().subscribe((data:any) => {
      this.isDrill = data.payload.data().isActive;
    });

    this.adminService.getStakeHolderUsers().subscribe(data => {
      this.stakeHolders = data;
    });

    this.adminService.getLCMCUsers().subscribe(data => {
      this.lcmcUsers = data;
    });

  }

  saveSMSTemplate()
  {
    this.adminService.setSMSTemplate(this.smsMessageTemplate).then(() => {
      Swal.fire(
        'Done!',
        'SMS template was saved.',
        'success'
      )
    });
  }

  triggerDrill()
  {
    this.isLoadingSettingDrill = true;
    this.isDrill = !this.isDrill;
    this.adminService.setTriggerDrill(this.isDrill).then(() => {
      this.adminService.setSoundAlarm(this.isDrill);
      
      if(this.isDrill)
      {
        this.adminService.drillLogs();
      }

      this.isLoadingSettingDrill = false;
      Swal.fire(
        'Done',
        (this.isDrill ? 'Drill was started': 'Drill was stoped'),
        'success'
      );
    });
  }

  public async sendToStakehoder()
  {
    this.isSendingToStakeHolder = true;
    await this.stakeHolders.forEach((row:any) => {
      this.adminService.sendSMS(row.phone, this.smsMessageTemplate);
    });
    
    setTimeout(() => {
      this.isSendingToStakeHolder = false;
    }, 700);
  }

  public async sendToLCMC()
  {
    this.isSendingToLCMC = true;
    await this.lcmcUsers.forEach((row:any) => {
      this.adminService.sendSMS(row.phone, this.smsMessageTemplate);
    });

    setTimeout(() => {
      this.isSendingToLCMC = false;
    }, 700);
  }

}

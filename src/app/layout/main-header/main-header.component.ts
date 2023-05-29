import { UserService } from './../../service/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  public userData:any;

  audio:any;
  @ViewChild('audioOption') audioPlayerRef!: ElementRef;
  
  constructor(private router:Router, private authService:AuthenticationService, private userService:UserService) { }

  ngOnInit(): void {
    let user = localStorage.getItem('eQuakeuserData');
    
    this.userData = user ? JSON.parse(user) : null;

    if(this.userData?.role !== "admin")
    {
      this.userService.getActiveSoundAlarm().subscribe(alarm => {

        this.audio = alarm;

        if(this.audio[0].payload.doc.data().isPlay == true)
        {
          setTimeout(() => {
            this.audioPlayerRef.nativeElement.play();
          }, 1500);
        }
        
      });

      /* setTimeout(() => {
        this.audioPlayerRef.nativeElement.play();
      }, 1000); */
    }

  }

  logout()
  {
    // console.log('logout')
    this.authService.signOut().then(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['/auth/login']);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  public isLayout = true;
  title = 'USTeQuake';

  constructor(private activatedRoute:ActivatedRoute, private router:Router)
  {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        let tmp = e.url.split("?");
        e.url = tmp[0];
        if(e.url == "/home" || e.url == "/auth/login" || e.url == "/auth/register" || e.url == "/auth/forgot-password" || e.url == "/auth/new-password"  || e.url == "/404" || e.url == "/offline/features")
        {
          this.isLayout = false;
        }else{
          this.isLayout = true;
        }

        let user = localStorage.getItem('eQuakeuserData');
        let userData = user ? JSON.parse(user) : null;
        if(e.url == "/" && userData == null)
        {
          this.isLayout = false;
        }
      }
    });
  }

  ngOnInit(): void {
  }

}

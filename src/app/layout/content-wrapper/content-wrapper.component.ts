import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.css']
})
export class ContentWrapperComponent implements OnInit {

  public contentHeader:string = "";

  constructor(private router:Router, private route:ActivatedRoute)
  {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        e.url = e.url.split("?")[0];
        let segment=  e.url.split('/');
        let header = (segment.pop())?.replace(/-/g, " ");
        this.route.queryParams.subscribe(params => {
      
          if(typeof params['header'] != 'undefined')
          {
            this.contentHeader = params['header'];
          }else{
            this.contentHeader = header ? header : "";
          }
        });
        
      }
    });
  }

  ngOnInit(): void {
    
  }

}

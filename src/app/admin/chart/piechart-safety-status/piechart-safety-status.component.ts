import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-piechart-safety-status',
  templateUrl: './piechart-safety-status.component.html',
  styleUrls: ['./piechart-safety-status.component.css']
})
export class PiechartSafetyStatusComponent implements OnInit, AfterViewInit {

  public chartData:any = [];

  colorScheme = {
    domain: ['#28a745', '#eb4034', '#877d7c'],
  };
  
  containerWidth = 0;
  private resizeListener!: () => void;
  
  @ViewChild('container') container!: ElementRef;
  constructor(private cdr: ChangeDetectorRef, private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(data => {
      let safe = 0;
      let unsafe = 0;
      let notConnected = 0;

      data.forEach(row => {
        let user:any = row.payload.doc.data();

        if(user.role == 'user')
        {
          if(user.isSafe)
          {
            safe++;
          }else{
            unsafe++;
          }
        }else{
          notConnected++
        }

      });

      this.chartData = [
        {
          name: 'SAFE',
          value: safe,
        },
        {
          name: 'UNSAFE',
          value: unsafe,
        },
        {
          name: 'NOT CONNECTED',
          value: notConnected,
        },
      ];

    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.containerWidth = this.container.nativeElement.offsetWidth;
      this.resizeListener = this.onResize.bind(this);
      window.addEventListener('resize', this.resizeListener);
      this.cdr.detectChanges(); // force a change detection cycle
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  private onResize(): void {
    this.containerWidth = this.container.nativeElement.offsetWidth;
    this.cdr.detectChanges(); // force a change detection cycle
  }

}

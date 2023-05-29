import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.css']
})
export class UserChartComponent implements OnInit, AfterViewInit  {

  @ViewChild('chartContainer', {static: true}) chartContainer!:ElementRef

  resizeSubscription!:Subscription;

  public single:any = [];

  view:any = [0, 400];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'User Types';
  yAxisLabel: string = 'Number of Users';
  timeline: boolean = true;
  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#edaf82', '#c94da6', '#BDBDBD', '#c94d62'],
    textColor: '#fff'
  };

  containerWidth = 0;

  private resizeListener!: () => void;

  constructor(private cdr: ChangeDetectorRef, private adminService:AdminService) {
    // Object.assign(this, { this.single })
  }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(data => {
      let student = 0;
      let lcmc = 0;
      let instructor = 0;
      let faculty = 0;
      let staff = 0;
      let admin = 0;
      
      data.forEach(row =>{
        let user:any = row.payload.doc.data();
        if(user?.registerAs == 'Student')
        {
          student++;
        }

        if(user?.registerAs == 'LCMC')
        {
          lcmc++;
        }

        if(user?.registerAs == 'Instructor')
        {
          instructor++;
        }

        if(user?.registerAs == 'Faculty')
        {
          faculty++;
        }

        if(user?.registerAs == 'Staff')
        {
          staff++;
        }

        if(user?.role == 'admin')
        {
          admin++;
        }

      });

      this.single = [
        {
          "name": "Admin",
          "value": admin
        },
        {
          "name": "LCMC",
          "value": lcmc
        },
        {
          "name": "Student",
          "value": student
        },
        {
          "name": "Instructor",
          "value": instructor
        },
        {
          "name": "Faculty",
          "value": faculty
        },
        {
          "name": "Staff",
          "value": staff
        }
      ];

    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.containerWidth = this.chartContainer.nativeElement.offsetWidth;
      this.resizeListener = this.onResize.bind(this);
      window.addEventListener('resize', this.resizeListener);

      this.cdr.detectChanges(); // force a change detection cycle
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  private onResize(): void {
    this.containerWidth = this.chartContainer.nativeElement.offsetWidth;
    this.cdr.detectChanges(); // force a change detection cycle
  }

}

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-evaluation-chart',
  templateUrl: './evaluation-chart.component.html',
  styleUrls: ['./evaluation-chart.component.css']
})
export class EvaluationChartComponent implements OnInit, AfterViewInit {
  
  @ViewChild('chartContainer', {static: true}) chartContainer!:ElementRef
  
  chartData:any = [];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  xAxis = 'Evaluation';
  yAxis = 'Rating Score';

  containerWidth = 0;

  private resizeListener!: () => void;

  constructor(private cdr: ChangeDetectorRef, private adminService:AdminService) {
    // Object.assign(this, { this.single })
  }

  ngOnInit(): void {

    this.adminService.getEvaluations().subscribe(data => {
      this.chartData = [];
      data.forEach(row => {
        // console.log(row.payload.doc.data())
        let e:any = row.payload.doc.data();

        let ge = 0;
        let dc = 0;

        e.generalEvaluation.forEach( (g: { score: number; }) => {
          ge = ge + g.score;
        });

        e.disasterControl.forEach( (d: { score: number; }) => {
          dc = dc + d.score;
        });

        this.chartData.push(
          {
            name: e?.evaluation.title,
            series: [
              {
                name: 'General Rating',
                value: ge,
              },
              {
                name: 'Disaster Control Rating',
                value: dc,
              },
              {
                name: 'Total Rating',
                value: (e?.total.oneTotal + e?.total.twoTotal + e?.total.threeTotal + e?.total.fourTotal + e?.total.fiveTotal),
              }
            ],
          }
        )

      });

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

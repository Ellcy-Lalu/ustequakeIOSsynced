import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.css']
})
export class ViewFeedbackComponent implements OnInit {
  evaluation = {
    title: "",
    place: "",
    totalParticipants: "",
    agencyName:"",
    dcgName:"",
    duration:"",
    agencyRepresented:"",
    agencyRepDesignation:"",
    agencyRepContact:"",
    agencyRepEmail:"",
    recommendations:""
  }
  generalEvaluation:any;
  disasterControl:any;
  oneTotal = 0;
  twoTotal = 0;
  threeTotal = 0;
  fourTotal = 0;
  fiveTotal = 0;
  grandTotal = 0;

  isLoadingRecord:boolean = true;
  segmentParams:any;

  constructor(private userService:UserService, private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.segmentParams = id;
      this.userService.viewEvaluation(id).subscribe(result => {
        
        const data:any = result.payload.data();
        this.evaluation = data.evaluation;
        this.generalEvaluation = data.generalEvaluation;
        this.disasterControl = data.disasterControl;
        this.oneTotal = data.total.oneTotal;
        this.twoTotal = data.total.twoTotal;
        this.threeTotal = data.total.threeTotal;
        this.fourTotal = data.total.fourTotal;
        this.fiveTotal = data.total.fiveTotal;
        this.grandTotal = data.total.grandTotal;

        this.isLoadingRecord = false;
      });
    });
    
  }

  calculate()
  {
    this.oneTotal = 0;
    this.twoTotal = 0;
    this.threeTotal = 0;
    this.fourTotal = 0;
    this.fiveTotal = 0;
    
    let generalEvaluationScore = 0;
    this.generalEvaluation.forEach((row: { score: number; }) => {
      generalEvaluationScore = row.score + generalEvaluationScore;
      if(row.score == 1)
      {
        this.oneTotal = this.oneTotal + row.score;
      }
      
      if(row.score == 2)
      {
        this.twoTotal = this.twoTotal + row.score;
      }

      if(row.score == 3)
      {
        this.threeTotal = this.threeTotal + row.score;
      }

      if(row.score == 4)
      {
        this.fourTotal = this.fourTotal + row.score;
      }

      if(row.score == 5)
      {
        this.fiveTotal = this.fiveTotal + row.score;
      }
    });

    let disasterControlScore = 0;
    this.disasterControl.forEach((row: { score: number; }) => {
      disasterControlScore = row.score + disasterControlScore;
      if(row.score == 1)
      {
        this.oneTotal = this.oneTotal + row.score;
      }
      
      if(row.score == 2)
      {
        this.twoTotal = this.twoTotal + row.score;
      }

      if(row.score == 3)
      {
        this.threeTotal = this.threeTotal + row.score;
      }

      if(row.score == 4)
      {
        this.fourTotal = this.fourTotal + row.score;
      }

      if(row.score == 5)
      {
        this.fiveTotal = this.fiveTotal + row.score;
      }
    });
    this.grandTotal = generalEvaluationScore+disasterControlScore;
  }

}

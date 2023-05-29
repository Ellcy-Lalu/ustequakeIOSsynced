import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-edit-feedback',
  templateUrl: './edit-feedback.component.html',
  styleUrls: ['./edit-feedback.component.css']
})
export class EditFeedbackComponent implements OnInit {
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

  isLoading:boolean = false;
  isLoadingRecord:boolean = true;
  segmentParams:any;

  constructor(private userService:UserService, private activateRoute:ActivatedRoute, private router:Router) { }

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

  isValid():boolean
  {
    if(
      this.evaluation.title != "" &&
      this.evaluation.place != "" &&
      this.evaluation.totalParticipants != "" &&
      this.evaluation.agencyName != "" &&
      this.evaluation.dcgName != "" &&
      this.evaluation.agencyRepresented != "" &&
      this.evaluation.agencyRepDesignation != "" &&
      this.evaluation.agencyRepContact != "" &&
      this.evaluation.agencyRepEmail != ""
    ){
      return false;
    }else{
      return true;
    }
  }

  submit()
  {
    this.isLoading = true;
    
    const user = JSON.parse(localStorage.getItem('eQuakeuserData')!);
    let data = {
      evaluation: this.evaluation,
      generalEvaluation: this.generalEvaluation,
      disasterControl: this.disasterControl,
      total: {
        grandTotal: this.grandTotal,
        oneTotal: this.oneTotal,
        twoTotal: this.twoTotal,
        threeTotal: this.threeTotal,
        fourTotal: this.fourTotal,
        fiveTotal: this.fiveTotal
      },
      updateddAt: new Date(),
    };

    this.userService.updateEvaluation(this.segmentParams, data).then(result => {
      this.isLoading = false;
      Swal.fire(
        'Done!',
        'Evaluation was successfully updated.',
        'success'
      );

      /* redirect */
      this.router.navigateByUrl("/admin/reports/evaluation/"+this.segmentParams+"?header="+this.evaluation.title);
      
    });

  }

}

import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import Swal  from 'sweetalert2';


@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  newEvaluation:boolean = false;
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

  evaluations:any;

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.generalEvaluation = [
      {label: "1. The alarm system used loud enough to be heard by all drill participants.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "2. The drill participants executed the “duck, cover, and hold” technique during the Alarm Phase or while the alarm system is being sounded.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "3. The drill participants waited for the alarm system to stop before evacuating.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "4. The drill participants executed the “buddy-buddy” system during the evacuation phase.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "5. The drill participants walked faster than normal during the evacuation phase.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "6. The drill participants followed their evacuation routes to the evacuation area/s.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "7. The drill participants covered their heads while vacating the building.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "8. The participants checked for any sustained injury in the evacuation/assembly area/s.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "9. A headcount was conducted while in the evacuation area.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "10. The participants stayed in the evacuation area until the drill was terminated.", scoreCb:[1,2,3,4,5], score:0, comment:""},
    ];

    this.disasterControl = [
      {label: "11. The Incident Commander established clear leadership during the drill.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "12. The First Aid/Medical Team immediately addressed all medical needs of the injured victims and casualties.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "13. The Search and Rescue Team was efficiently organized in responding to the incident.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "14. The Fire Safety/Brigade Team demonstrated proper fire suppression.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "15. The Evacuation Team properly executed the evacuation procedures.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "16. The Site Security Team adequately secured the perimeter for the drill area.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "17. The Maintenance Team observed protocols in ensuring the building safety before re-entering.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "18. The Communication utilized the equipment properly during the coordination and execution of response operations.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "19. The Transportation team ensured the availability of vehicles.", scoreCb:[1,2,3,4,5], score:0, comment:""},
    ];

    this.adminService.getEvaluations().subscribe(result => {
      this.evaluations = result;
      this.isLoadingRecord = false;
    });
  }

  toggleForm()
  {
    this.newEvaluation = !this.newEvaluation;
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
      uid: user.uid,
      evaluator: {name:user.firstname+" "+user.lastname, email: user.email},
      createdAt: new Date(),
      updateddAt: new Date(),
    };

    this.adminService.createEvaluation(data).then(result => {
      // console.log(result);
      if(result.id)
      {
        Swal.fire(
          'Done!',
          'New evaluation was submitted.',
          'success'
        );
      }
      this.isLoading = false;
      this.newEvaluation = false;
    });

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

  resetForm()
  {
    this.evaluation = {
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

    this.oneTotal = 0;
    this.twoTotal = 0;
    this.threeTotal = 0;
    this.fourTotal = 0;
    this.fiveTotal = 0;
    this.grandTotal = 0;

    this.generalEvaluation = [
      {label: "1. The alarm system used loud enough to be heard by all drill participants.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "2. The drill participants executed the “duck, cover, and hold” technique during the Alarm Phase or while the alarm system is being sounded.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "3. The drill participants waited for the alarm system to stop before evacuating.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "4. The drill participants executed the “buddy-buddy” system during the evacuation phase.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "5. The drill participants walked faster than normal during the evacuation phase.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "6. The drill participants followed their evacuation routes to the evacuation area/s.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "7. The drill participants covered their heads while vacating the building.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "8. The participants checked for any sustained injury in the evacuation/assembly area/s.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "9. A headcount was conducted while in the evacuation area.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "10. The participants stayed in the evacuation area until the drill was terminated.", scoreCb:[1,2,3,4,5], score:0, comment:""},
    ];

    this.disasterControl = [
      {label: "11. The Incident Commander established clear leadership during the drill.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "12. The First Aid/Medical Team immediately addressed all medical needs of the injured victims and casualties.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "13. The Search and Rescue Team was efficiently organized in responding to the incident.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "14. The Fire Safety/Brigade Team demonstrated proper fire suppression.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "15. The Evacuation Team properly executed the evacuation procedures.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "16. The Site Security Team adequately secured the perimeter for the drill area.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "17. The Maintenance Team observed protocols in ensuring the building safety before re-entering.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "18. The Communication utilized the equipment properly during the coordination and execution of response operations.", scoreCb:[1,2,3,4,5], score:0, comment:""},
      {label: "19. The Transportation team ensured the availability of vehicles.", scoreCb:[1,2,3,4,5], score:0, comment:""},
    ];

  }

}

import Swal from 'sweetalert2';
import { UserService } from './../../service/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-feedback',
  templateUrl: './send-feedback.component.html',
  styleUrls: ['./send-feedback.component.css']
})
export class SendFeedbackComponent implements OnInit {

  feedbackFrm:FormGroup;
  public loading = false;
  public error:string = '';
  public submitted = false;

  constructor(private _formBuilder:FormBuilder, private userService:UserService)
  {
    const user = JSON.parse(localStorage.getItem('eQuakeuserData')!);

    this.feedbackFrm = this._formBuilder.group({
      rate: [null, [Validators.required]],
      feedback: [null, [Validators.required]],
      suggestion: [null, [Validators.required]],
      userId: [user.uid], 
      user: [{email: user.email, firstname: user.firstname, lastname:user.lastname}],
      seen: [false],
      createdAt: [new Date()]
    });
  }

  ngOnInit(): void {
  }

  get f() {
    return this.feedbackFrm.controls;
  }

  public onSubmit()
  {
    const user = JSON.parse(localStorage.getItem('eQuakeuserData')!);

    this.loading = true;
    this.submitted = true;

    if(this.feedbackFrm.invalid)
    {
      this.loading = false;
      return;
    }

    this.userService.setFeedback(this.feedbackFrm.value).then(() => {
      this.loading = false;
      this.submitted = false;
      this.feedbackFrm.reset({
        rate: null,
        feedback: null,
        suggestion: null,
        userId: user.uid, 
        user: {email: user.email, firstname: user.firstname, lastname:user.lastname},
        seen: false,
        createdAt: new Date()
      });

      Swal.fire('Sent', 'Your feedback was sent', 'success');

    });

  }

}

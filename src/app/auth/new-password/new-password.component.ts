import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  isShowNewPassword:boolean = false;
  isShowConfirmNewPassword:boolean = false;

  userId:any = '';
  
  public newPassGroup!: FormGroup;
  public loading = false;
  public error:string = '';
  public submitted = false;

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private _formBuilder:FormBuilder, private authService:AuthenticationService)
  {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params.account)
      {
        this.userId = params.account;
      }else{
        this.router.navigateByUrl('/auth/login');
      }
    });
  }

  ngOnInit(): void {
    this.newPassGroup = this._formBuilder.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
  }

  get f(){
    return this.newPassGroup.controls;
  }

  toggleShowNewPassword()
  {
    this.isShowNewPassword = !this.isShowNewPassword;
  }

  toggleShowConfirmPassword()
  {
    this.isShowConfirmNewPassword = !this.isShowConfirmNewPassword;
  }

  public onSubmit()
  {
    this.loading = true;
    this.submitted = true;

    if(this.newPassGroup.invalid)
    {
      this.loading = false;
      return;
    }

    this.authService.setNewPassword(this.userId, this.newPassGroup.controls.password.value)
    .then(result => {
      if(result.success)
      {
        this.router.navigateByUrl("/auth/login?newPassUpdate=1");
        this.loading = false;
        this.submitted = false;
      }
    }, e => {
      console.log(e);
    });

  }

}

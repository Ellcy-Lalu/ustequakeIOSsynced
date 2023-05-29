import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loading = false;
  public error:string = '';
  public submitted = false;

  public showPassword = false;
  public isNewPasswordUpdate:boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router:Router, private _formBuilder: FormBuilder, private as:AuthenticationService)
  {
    this.loginForm = this._formBuilder.group({
      // email: ['ustadmin@gmail.com', [Validators.required, Validators.email]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
      // password: ['password', Validators.required]
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if(params.newPassUpdate)
      {
        this.isNewPasswordUpdate = true;
      }
    });

  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    
  }

  public onSubmit()
  {
    this.loading = true;

    this.as.signIn(this.loginForm.value).then(data => {
      // console.log(data)
      if(data !== false)
      {
        this.router.navigate(['/'+data.role+'/dashboard']);
      }else{
        this.loading = false;
        this.error = 'Something went wrong. Please contact your system administrator.';
      }
    }).catch(e => {
      // console.log(e.message)
      this.loading = false;
      this.error = e.message;
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}

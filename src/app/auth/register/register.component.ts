import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ConfirmedValidator } from 'src/app/helpers/confirm-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerGroup!: FormGroup;
  public loading = false;
  public error:string = '';
  public submitted = false;

  constructor(private router:Router, private _formBuilder:FormBuilder, private authService:AuthenticationService)
  {
    
  }

  get f(){
    return this.registerGroup.controls;
  }

  ngOnInit(): void {
    this.registerGroup = this._formBuilder.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      gender: ["", Validators.required],
      isSafe: [true, [Validators.required]],
      role: ['user', [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]],
      registerAs: ["", Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      isActive: [true],
      createdAt: [new Date()]
    }, {validators: [ConfirmedValidator('password', 'confirmPassword')]});
  }

  public onSubmit()
  {
    
    this.loading = true;

    this.submitted = true;
    if (this.registerGroup.invalid) {
      this.loading = false;
      return;
    }else{
      this.registerGroup.patchValue({
        phone:'+63'+this.registerGroup.controls.phone.value
      });
    }

    this.authService.register(this.registerGroup.value).then((data: any) => {
      // console.log(data)
      if(data.user)
      {
        //console.log(data)
        // Redirect to new user dashboard (default)
        this.router.navigate(['/user/dashboard'], {queryParams: {'newAccount':true}});
      }

    }).catch((e: { message: string; }) => {
      this.error = e.message;
    });
  }

}

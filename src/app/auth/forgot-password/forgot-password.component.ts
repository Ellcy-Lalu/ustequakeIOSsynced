import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public requestPassGroup!: FormGroup;
  public loading = false;
  public error:string = '';
  public submitted = false;

  otp: string = '';
  tempPhone:any = '';
  isOtp:boolean = false;

  userOTP:any = '';
  userId:any = '';

  constructor(private router:Router, private _formBuilder:FormBuilder, private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.requestPassGroup = this._formBuilder.group({
      phone: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10)]]
    });
  }

  get f(){
    return this.requestPassGroup.controls;
  }

  public onSubmit()
  {
    this.loading = true;

    this.submitted = true;

    if (this.requestPassGroup.invalid) {
      this.loading = false;
      return;
    }else{
      this.tempPhone = this.requestPassGroup.controls.phone.value;
      this.requestPassGroup.patchValue({
        phone:'+63'+this.requestPassGroup.controls.phone.value
      });
      
      this.generateOTP();

      // Check if phone number exist
      // console.log(this.requestPassGroup.controls.phone.value)
      let phone = this.requestPassGroup.controls.phone.value;
      this.authService.checkPhoneNumber(phone).subscribe(result => {
        // console.log(result);
        if(result.length === 0)
        {
          this.error = 'Phone number does not exist.';
          this.loading = false;
          this.submitted = false;
          
          this.requestPassGroup.patchValue({
            phone:this.tempPhone
          });

        }else{
          let message = 'This code will let you request new password on your USTeQuake account. '+this.otp;
          // console.log(phone)
          this.authService.sendSMS(phone, message);

          this.loading = false;
          this.submitted = false;
          this.error = '';
          this.isOtp = true;
          // console.log(result)
          result.forEach(row => {
            this.userId = row.payload.doc.id;
          })
        }
      }, e => {
        console.log(e)
      });
    }

  }

  generateOTP(): void {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    this.otp = otp;
    console.log(otp);
  }

  back()
  {
    this.isOtp = false;
    this.error = '';
  }

  verifyOTP()
  {    
    if(this.otp == this.userOTP)
    {
      this.router.navigateByUrl("/auth/new-password?account="+this.userId);
    }else{
      this.error = 'The opt code does not match.';
    }
  }

}

import { AdminService } from './../../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public createUserGroup!: FormGroup;
  public loading = false;
  public error:string = '';
  public submitted = false;
  constructor(private router:Router, private _formBuilder:FormBuilder, private authService:AuthenticationService, private adminService:AdminService) { }

  ngOnInit(): void {
    this.createUserGroup = this._formBuilder.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      gender: ["", Validators.required],
      isSafe: [true, [Validators.required]],
      role: ['user', [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]],
      registerAs: ["LCMC", Validators.required],
      password: [this.makeid(8), Validators.required],
      isActive: [true],
      createdAt: [new Date()]
    });
  }

  get f(){
    return this.createUserGroup.controls;
  }

  private makeid(length:number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

public async onSubmit()
{
  
  this.loading = true;
  this.submitted = true;
  this.error  ='';

  if (this.createUserGroup.invalid) {
    this.loading = false;
    return;
  }else{
    this.createUserGroup.patchValue({
      phone:'+63'+this.createUserGroup.controls.phone.value
    });
  }

  if(this.createUserGroup.controls.registerAs.value == "LCMC")
  {
    this.createUserGroup.patchValue({role:'lcmc'});
  }

  if(this.createUserGroup.controls.registerAs.value == "admin")
  {
    this.createUserGroup.patchValue({role:'admin'});
  }

  await this.authService.createUser(this.createUserGroup.value)
  .then((result:any) =>{
    if(result?.error)
    {
      this.error = result.error;
      this.loading = false;
    }else{
      this.submitted = false;
      this.loading = false;
      this.error = '';
      /* Send SMS */
      let msg = 'Welcome to USTeQuake. You have a new account created. Credentials: [email: '+this.createUserGroup.controls.email.value+' password: '+this.createUserGroup.controls.password.value+']';
      this.adminService.sendSMS(this.createUserGroup.controls.phone.value, msg);
      Swal.fire('Success', 'New account '+this.createUserGroup.controls.email.value+' was created.', 'success');
      this.createUserGroup.reset();

    }
  });
  
  /* if(result)
  {
    
  } */
}

}

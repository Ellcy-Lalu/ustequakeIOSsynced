import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: {isLayout: false} },
  { path: 'register', component: RegisterComponent, data: {isLayout: false} },
  { path: 'forgot-password', component: ForgotPasswordComponent, data: {isLayout: false} },
  { path: 'new-password', component: NewPasswordComponent, data: {isLayout: false} },
];

@NgModule({
  declarations: [
    RegisterComponent,
    ForgotPasswordComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }

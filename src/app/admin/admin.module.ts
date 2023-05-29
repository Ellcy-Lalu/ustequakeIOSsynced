import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MomentModule } from 'ngx-moment';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { EmergencyButtonComponent } from './emergency-button/emergency-button.component';
import { MapComponent } from './map/map.component';
import { EmergencyProtocolComponent } from './settings/emergency-protocol/emergency-protocol.component';
import { SoundAlarmsComponent } from './settings/sound-alarms/sound-alarms.component';
import { UsersComponent } from './settings/users/users.component';
import { CreateUserComponent } from './settings/create-user/create-user.component';
import { EmergencyProtocolListComponent } from './settings/emergency-protocol-list/emergency-protocol-list.component';
import { SoundAlarmListsComponent } from './settings/sound-alarm-lists/sound-alarm-lists.component';
import { AccountInvitesComponent } from './settings/account-invites/account-invites.component';
import { ArchivedUsersComponent } from './settings/archived-users/archived-users.component';
import { ViewFeedbackComponent } from './view-feedback/view-feedback.component';
import { EditFeedbackComponent } from './edit-feedback/edit-feedback.component';
import { UserChartComponent } from './chart/user-chart/user-chart.component';
import { EvaluationChartComponent } from './chart/evaluation-chart/evaluation-chart.component';
import { SafetyStatusComponent } from './chart/safety-status/safety-status.component';
import { PiechartSafetyStatusComponent } from './chart/piechart-safety-status/piechart-safety-status.component';

const routes: Routes = [
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: AdminComponent, data: {isLayout: true}},
  { path: 'reports/feedback', component: FeedbackComponent, data: {isLayout: true} },
  { path: 'reports/evaluation', component: EvaluationComponent, data: {isLayout: true} },
  { path: 'reports/evaluation/:id', component: ViewFeedbackComponent },
  { path: 'reports/edit/evaluation/:id', component: EditFeedbackComponent },
  { path: 'sop/emergency-button', component: EmergencyButtonComponent, data: {isLayout: true} },
  { path: 'sop/map', component: MapComponent, data: {isLayout: true} },
  { path: 'settings/emergency-protocol', component: EmergencyProtocolComponent, data: {isLayout: true} },
  { path: 'settings/sound-alarm', component: SoundAlarmsComponent, data: {isLayout: true} },
  { path: 'settings/user-accounts', component: UsersComponent, data: {isLayout: true} },
  { path: 'settings/create-user', component: CreateUserComponent, data: {isLayout: true} },
];

@NgModule({
  declarations: [
    AdminComponent,
    FeedbackComponent,
    EvaluationComponent,
    EmergencyButtonComponent,
    MapComponent,
    EmergencyProtocolComponent,
    SoundAlarmsComponent,
    UsersComponent,
    CreateUserComponent,
    EmergencyProtocolListComponent,
    SoundAlarmListsComponent,
    AccountInvitesComponent,
    ArchivedUsersComponent,
    ViewFeedbackComponent,
    EditFeedbackComponent,
    UserChartComponent,
    EvaluationChartComponent,
    SafetyStatusComponent,
    PiechartSafetyStatusComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    // BrowserAnimationsModule,
    RouterModule.forChild(routes),
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    })
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }

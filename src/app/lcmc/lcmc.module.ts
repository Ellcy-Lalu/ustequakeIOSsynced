import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { RouterModule, Routes } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { ViewFeedbackComponent } from './view-feedback/view-feedback.component';
import { EditFeedbackComponent } from './edit-feedback/edit-feedback.component';


const routes: Routes = [
  { path: 'user', redirectTo: 'lcmc/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'feedbacks', component: FeedbacksComponent },
  { path: 'feedback/:id', component: ViewFeedbackComponent },
  { path: 'edit/feedback/:id', component: EditFeedbackComponent },
];

@NgModule({
  declarations: [
    DashboardComponent,
    FeedbacksComponent,
    ViewFeedbackComponent,
    EditFeedbackComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB8GIbcXRQ5kUhh3UaWXqxqDy4qLPYBchE'
    }),
    RouterModule.forChild(routes),
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    })
  ]
})
export class LcmcModule { }

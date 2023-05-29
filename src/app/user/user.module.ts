import { MomentModule } from 'ngx-moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { SendFeedbackComponent } from './send-feedback/send-feedback.component';
import { SendLocationComponent } from './send-location/send-location.component';
import { UserRatingComponent } from './user-rating/user-rating.component';
import { OfflineFeatureComponent } from './offline-feature/offline-feature.component';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  { path: 'user', redirectTo: 'user/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: UserComponent },
  { path: 'send-feedback', component: SendFeedbackComponent },
  { path: 'send-my-location', component: SendLocationComponent },
  { path: 'my-rating', component: UserRatingComponent },
  { path: 'offline-feature', component: OfflineFeatureComponent },
];

@NgModule({
  declarations: [
    UserComponent,
    SendFeedbackComponent,
    SendLocationComponent,
    UserRatingComponent,
    OfflineFeatureComponent
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
    }),
    
  ],
  exports:[UserComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }

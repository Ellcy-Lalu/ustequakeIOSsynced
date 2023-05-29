import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features/features.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MomentModule } from 'ngx-moment';
// import {  NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer'; 

const routes: Routes = [
  { path: 'offline', redirectTo: 'offline/features', pathMatch: 'full'},
  { path: 'features', component: FeaturesComponent},
];


@NgModule({
  declarations: [
    FeaturesComponent
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
    // NgxExtendedPdfViewerModule
    PdfViewerModule
  ],
  exports:[FeaturesComponent]
})
export class OfflineModule { }

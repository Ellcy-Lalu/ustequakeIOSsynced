import { LcmcModule } from './lcmc/lcmc.module';
import { MomentModule } from 'ngx-moment';
// import { AgmCoreModule } from '@agm/core';
import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainHeaderComponent } from './layout/main-header/main-header.component';
import { MainSidebarComponent } from './layout/main-sidebar/main-sidebar.component';
import { ControlSidebarComponent } from './layout/control-sidebar/control-sidebar.component';
import { MainFooterComponent } from './layout/main-footer/main-footer.component';
import { ContentWrapperComponent } from './layout/content-wrapper/content-wrapper.component';
import { HomepageComponent } from './homepage/homepage.component';

import {AdminModule} from './admin/admin.module';
import {UserModule} from './user/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireModule } from '@angular/fire/';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './service/auth.guard';

let user = localStorage.getItem('eQuakeuserData');
let userData = user ? JSON.parse(user) : null;

const routes:Routes = [
  {
    path: '', redirectTo: (userData !== null ? userData?.role+'/dashboard' : 'auth/login'), pathMatch: 'full'
  },
  {path: 'offline', loadChildren: () => import('./offline/offline.module').then(m => m.OfflineModule) },
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [AuthGuard] },
  {path: 'lcmc', loadChildren: () => import('./lcmc/lcmc.module').then(m => m.LcmcModule), canActivate: [AuthGuard] },
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {path: 'home', component: HomepageComponent, data: {isLayout: false}},
  {path: '404', component: PageNotFoundComponent, data: {isLayout: false}},
  {
    path: '**', redirectTo: '404'
  },
  
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PageNotFoundComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    ControlSidebarComponent,
    MainFooterComponent,
    ContentWrapperComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    UserModule,
    LcmcModule,
    AuthModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MomentModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

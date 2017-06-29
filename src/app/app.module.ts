import { PopoverPage } from './../pages/popover/popover';
import { NoteModalPage } from './../pages/note-modal/note-modal';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';

import { PincodeInputModule } from  'ionic2-pincode-input';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NoteModalPage,
    LoginPage,
    PopoverPage
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    PincodeInputModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NoteModalPage,
    LoginPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { HttpProvider } from '../providers/http/http';

import { HttpClientModule } from '@angular/common/http';
import { NgCalendarModule  } from 'ionic2-calendar';

import { TabsPage } from '../pages/tabs/tabs';
import { AdministracionPage } from '../pages/administracion/administracion';
import { RepartosPage }  from '../pages/repartos/repartos';
import { CotizarPage } from '../pages/cotizar/cotizar';
import { CrearEventoPage } from '../pages/crear-evento/crear-evento';
 

@NgModule({
  declarations: [  
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    AdministracionPage,
    RepartosPage,
    CotizarPage,
    CrearEventoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
   // NgCalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    AdministracionPage,
    RepartosPage,
    CotizarPage,
    CrearEventoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider
  ]
})
export class AppModule {}

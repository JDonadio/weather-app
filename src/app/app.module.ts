import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { WeatherApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// pages
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

// providers
import { WeatherApiProvider} from '../providers/weather-api/weather-api';

import * as _ from 'lodash';

const pages: any = [
  AboutPage,
  SettingsPage,
  HomePage,
  TabsPage
];

const providers: any = [
  WeatherApiProvider
];
const pipes: any = [];
const directives: any = [];

@NgModule({
  declarations: _.compact(_.flattenDeep([
    WeatherApp,
    pages,
    pipes,
    directives,
  ])),
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(WeatherApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: _.compact(_.flattenDeep([
    WeatherApp,
    pages,
    pipes,
    directives
  ])),
  providers: [
    StatusBar,
    SplashScreen,
    _.compact(_.flattenDeep([
      WeatherApiProvider
    ])),
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}

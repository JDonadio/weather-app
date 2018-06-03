import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { WeatherApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// pages
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import * as _ from 'lodash';

const pages: any = [
  AboutPage,
  SettingsPage,
  HomePage,
  TabsPage
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

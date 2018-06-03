import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class WeatherApp {
  rootPage: any = TabsPage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  getTimeClass() {
    let currentTime = (new Date()).getHours();
    if (currentTime > 6 && currentTime <= 16) return 'day';
    if (currentTime > 16 && currentTime <= 19) return 'afternoon';
    if ((currentTime > 19 && currentTime <= 24) || (currentTime > 0 && currentTime <= 6)) return 'night';
  }
}

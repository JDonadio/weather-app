import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';

import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  public cities: any;
  public filteredCities: any;

  constructor(
    private navCtrl: NavController,
    private storage: LocalStorageService,
    private alertCtrl: AlertController,
  ) {
    this.cities = this.storage.get('cities');
    this.filteredCities = this.cities.slice(0, 5);
  }

  setWeatherForCity(city: any) {
    let confirmAlert = this.alertCtrl.create({
      title: 'Change weather',
      subTitle: 'Are you sure to get the weather information from ' + city.name + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: () => {
            this.storage.set('weatherFrom', city);
            this.navCtrl.parent.select(0);
          }
        }
      ]
    });
    confirmAlert.present();
  }
}

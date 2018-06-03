import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

import { HomePage } from '../home/home';

import { WeatherApiProvider } from '../../providers/weather-api/weather-api';
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
    private weatherProvider: WeatherApiProvider,
    private storage: LocalStorageService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
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
            this.setDefaultWeather(city);
          }
        }
      ]
    });
    confirmAlert.present();
  }

  setDefaultWeather(city: any) {
    let opts = {
      id: city.id
    };
    let loading = this.loadingCtrl.create({
      content: 'Setting weather city...'
    });
    loading.present();

    this.weatherProvider.getWeather(opts).subscribe((resp: any) => {
      let weather: any = {};
      weather.id = resp.id;
      weather.city = resp.name;
      weather.main = resp.main;
      weather.visibility = resp.visibility / 100;
      weather.description = resp.weather[0].description;
      weather.icon_url = 'http://openweathermap.org/img/w/' + resp.weather[0].icon + '.png';
      loading.dismiss();
      this.storage.set('weather', weather);
      this.navCtrl.parent.select(0);
    });
  }
}

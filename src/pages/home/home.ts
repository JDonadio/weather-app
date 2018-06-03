import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { WeatherApiProvider } from '../../providers/weather-api/weather-api';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { LocalStorageService } from 'angular-2-local-storage';

import * as _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public weather: any;
  public loading: any;

  constructor(
    private weatherProvider: WeatherApiProvider,
    private geolocationProvider: GeolocationProvider,
    private storage: LocalStorageService,
    private loadingCtrl: LoadingController
  ) {
    this.weather = null;
    this.loading = null;
  }

  ionViewWillEnter() {
    this.weather = this.storage.get('weather');

    if (!this.weather) {
      this.setLoading('Getting current position...');
      this.geolocationProvider.getCurrentPosition().then((resp) => {
        this.dismissLoading();
        let opts = {
          lat: resp.coords.latitude,
          lon: resp.coords.longitude,
        }
        this.getWeather(opts);
      }).catch((err) => {
        let opts = { id: 3836873 }; // default San Miguel de Tucumán
        this.getWeather(opts);
      })
    }
  }
  
  getWeather(opts) {
    if (_.isEmpty(this.weather)) this.weather = {};
    
    this.setLoading('Getting weather information...');
    this.weatherProvider.getWeather(opts).subscribe((resp: any) => {
      this.dismissLoading();
      this.weather.id = resp.id;
      this.weather.city = resp.name;
      this.weather.main = resp.main;
      this.weather.visibility = resp.visibility / 100;
      this.weather.description = resp.weather[0].description;
      this.weather.icon_url = 'http://openweathermap.org/img/w/' + resp.weather[0].icon + '.png';
      this.storage.set('weather', this.weather);
    });
  }

  setLoading(msg: string) {
    this.loading = this.loadingCtrl.create({
      content: msg || 'Please wait...'
    });
    this.loading.present();
  }

  dismissLoading() {
    if (this.loading) this.loading.dismiss();
  }
}

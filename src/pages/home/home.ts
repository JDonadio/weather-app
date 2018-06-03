import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { WeatherApiProvider } from '../../providers/weather-api/weather-api';
import { LocalStorageService } from 'angular-2-local-storage';

import * as _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public weather: any;

  constructor(
    private weatherProvider: WeatherApiProvider,
    private storage: LocalStorageService,
  ) {
    this.weather = {};
  }

  ionViewWillEnter() {
    let opts: any = {};
    let weatherFrom: any = this.storage.get('weatherFrom');
    if (weatherFrom && !_.isEmpty(weatherFrom)) {
      opts = { id: weatherFrom.id };
    }

    this.weatherProvider.getWeather(opts).subscribe((resp: any) => {
      this.weather.id = resp.id;
      this.weather.city = resp.name;
      this.weather.main = resp.main;
      this.weather.visibility = resp.visibility / 100;
      this.weather.description = resp.weather[0].description;
      this.weather.icon_url = 'http://openweathermap.org/img/w/' + resp.weather[0].icon + '.png';
      this.storage.set('weather', this.weather);
    });
  }
}

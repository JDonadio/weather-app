import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { WeatherApiProvider } from '../../providers/weather-api/weather-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public weather: any;

  constructor(
    private weatherProvider: WeatherApiProvider
  ) {
    this.weather = {};
  }

  ionViewDidLoad() {
    this.weatherProvider.getWeather().subscribe((resp: any) => {
      this.weather.city = resp.name;
      this.weather.main = resp.main;
      this.weather.visibility = resp.visibility / 100;
      this.weather.description = resp.weather[0].description;
      this.weather.icon_url = 'http://openweathermap.org/img/w/' + resp.weather[0].icon + '.png';
      console.log(resp);
    });
  }
}

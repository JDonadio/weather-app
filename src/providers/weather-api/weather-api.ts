import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as _ from 'lodash';

const apiKey = 'e24e2fd842f3e3002f649572d6674ff7';

@Injectable()
export class WeatherApiProvider {
  private url: string;

  constructor(
    private http: Http,
  ) {
    this.url = 'http://api.openweathermap.org/data/2.5/weather?';
  }

  getWeather(opts?: any) {
    opts = opts || {};
    opts.id = opts.id || 3836873    // default San Miguel de Tucumán
    opts.units = 'metric';          // detault Celsius

    let params: string = '';

    if (opts.lat && opts.lon) 
      params = 'lat=' + opts.lat + '&lon=' + opts.lon;
    else 
      params = 'id=' + opts.id;

    params += '&APPID=' + apiKey + '&units=' + opts.units;

    return this.http.get(this.url + params)
      .map(res => res.json());
  }

  getCities() {
    return this.http.get('assets/cities.json')
      .map(res => res.json());
  }
}
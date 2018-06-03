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
    opts.lat = opts.lat || '-26.824141';    // detaulf San Miguel de Tucumán
    opts.lon = opts.lon || '-65.222603';    // detaulf San Miguel de Tucumán
    opts.zip = opts.zip || '4000';          // detaulf San Miguel de Tucumán
    opts.id = opts.id || '3836873';         // detaulf San Miguel de Tucumán
    opts.country = opts.country || 'ar';    // detaulf Argentina
    opts.units = opts.units || 'metric';    // detaulf Celsius

    console.log('Set opts', opts);

    if (opts.id) this.url = this.url + 'id=' + opts.id;
    else if (opts.lat && opts.lon) this.url = this.url + 'lat=' + opts.lat + '&lon=' + opts.lon;
    else if (opts.zip && opts.country) this.url = this.url + 'zip=' + opts.zip + ',' + opts.country;

    console.log('Url', this.url);

    // set apiKey and default params
    this.url = this.url + '&APPID=' + apiKey;
    this.url = this.url + '&units=' + opts.units;
    return this.http.get(this.url).map(res => (res.json()));
  }
}
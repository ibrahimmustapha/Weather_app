import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  math = Math;
  city = 'Antarctica';
  language = 'EN'
  weatherImageLink = '';
  weather: any;
  cool = "30";

  ngOnInit(): void {
    this.getWeatherForecast();
  }

  constructor(private http: HttpClient) {}

  getWeatherForecast() {
    const url = `https://open-weather13.p.rapidapi.com/city/${this.city}/${this.language}`;

    const headers = new HttpHeaders({
      'x-rapidapi-key': '6c39472d9emsha8af3a7316fc9c3p18326djsn9800f36e63a3',
      'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
    });

    const params = new HttpParams()
    .set('city', this.city)
    .set('lang', this.language);    
    
    const weatherConditions = {
      clear: 'assets/images/animated/day.svg',
      rainy: 'assets/images/animated/rainy-6.svg',
      cloud: 'assets/images/animated/cloudy-day-3.svg',
      clear0: 'assets/images/animated/cloudy-day-2.svg',
      snowy: 'assets/images/animated/snowy-6.svg',
      thunder: 'assets/images/animated/thunder.svg',
    };
    
    this.http.get(url, { headers }).subscribe((response) => {
      this.weather = response;

      const temp = this.weather.main.temp;

      if (temp < 0) {
        this.weatherImageLink = weatherConditions.snowy;
      } else if (temp <= 15) {
        this.weatherImageLink = weatherConditions.thunder;
      } else if (temp <= 20) {
        this.weatherImageLink = weatherConditions.rainy;
      } else if (temp <= 30) {
        this.weatherImageLink = weatherConditions.clear0;
      } else if (temp <= 40) {
        this.weatherImageLink = weatherConditions.clear;
      } else {
        this.weatherImageLink = weatherConditions.clear;

      // console.log(this.weather.main.temp);
    }});
  }
}

/*
* I started learning @angular a week ago and I built this small weather search app with a free api from rapid-api. 

TBH angular is actually cool - give it a try :)

Canberra - 0
Buenos Aires - 15
Montevideo - 16
Antarctica - -54
Tamale - 32
Accra - 23

*/

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  city = 'Accra';
  weatherImageLink = '';
  weather: any;

  ngOnInit(): void {
    this.getWeatherForecast();
  }

  constructor(private http: HttpClient) {}

  getWeatherForecast() {
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather';
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': "3670434b68mshf9eef8ae6678c93p1c9920jsne43b3e9802c5",
      'X-RapidAPI-Host': "weather-by-api-ninjas.p.rapidapi.com",
    });
    const params = new HttpParams().set('city', this.city);
    const weatherConditions = {
      clear: 'assets/images/animated/day.svg',
      rainy: 'assets/images/animated/rainy-6.svg',
      cloud: 'assets/images/animated/cloudy-day-3.svg',
      clear0: 'assets/images/animated/cloudy-day-2.svg',
      snowy: 'assets/images/animated/snowy-6.svg',
      thunder: 'assets/images/animated/thunder.svg',
    };
    this.http.get(url, { headers, params }).subscribe((response) => {
      this.weather = response;
      if (this.weather.temp < 0)
        this.weatherImageLink = weatherConditions.snowy;
      if (this.weather.temp <= 15 && this.weather.temp >= 0)
        this.weatherImageLink = weatherConditions.thunder;
      if (this.weather.temp >= 16 && this.weather.temp <= 20)
        this.weatherImageLink = weatherConditions.rainy;
      if (this.weather.temp <= 30 && this.weather.temp >= 21)
        this.weatherImageLink = weatherConditions.clear0;
      if (this.weather.temp <= 40 && this.weather.temp >= 31)
        this.weatherImageLink = weatherConditions.clear;
      if (this.weather.temp >= 50)
        this.weatherImageLink = weatherConditions.clear;
      console.log(this.weather);
    });
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

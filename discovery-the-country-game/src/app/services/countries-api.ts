import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesApi {
  private baseUrl = "https://restcountries.com/v3.1"

  constructor(private http : HttpClient) {}

  async getRandomCountry() {
    const fields = "name,capital,region,flags,population,currencies,languages,area"
    const countries = await firstValueFrom(
      this.http.get<any[]>(`${this.baseUrl}/all?fields=${fields}`)
    );
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  }
}

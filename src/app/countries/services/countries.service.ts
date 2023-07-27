import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url: string = `${this.apiUrl}/alpha/${code}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null ),
        catchError( () => of(null) )
      );
  }

  searchCapital( term: string ): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${term}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError( () => of([]) )
      );
  }

  searchCountry( term: string ): Observable<Country[]> {
    const url: string = `${this.apiUrl}/name/${term}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError( () => of([]) )
      )
  }

  searchRegion( region: string ): Observable<Country[]> {
    const url: string = `${this.apiUrl}/region/${region}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError( () => of([]) )
      )
  }
}

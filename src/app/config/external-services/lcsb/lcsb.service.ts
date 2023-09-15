import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.prod';
import { EstateIPAMIS, Personel } from './lcsb';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LCSBService {

  apiroot = '';
  constructor(protected http: HttpClient) {
    this.apiroot = environment.lcsbApi;
  }

  personel(email: string) {
    return this.http.get<Personel>(`${this.apiroot}/api/staff/general/byemail/${email}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          // Return a fallback value if the server returns a 404 Not Found error
          return of({
            id: 0,
            name: "Anonymous",
            role: "User",
            imageUrl: "assets/images/anon.png",
            email: email,
          } as Personel);
        } else {
          // Rethrow the error for other HTTP status codes
          throw error;
        }
      })
    );
  }

  locationList() {
    return this.http.get<EstateIPAMIS[]>(`${this.apiroot}/api/location/all`);
  }
}

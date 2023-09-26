import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivestockstatusService {
  apiroot = '';

  constructor(protected http: HttpClient) {
    this.apiroot = environment.apiUrl;
  }

  getData(regid: string) {
    return this.http.get(`${this.apiroot}/ceLivestockstatus/regid/${regid}`);
  }

  getBuyer():Observable<any>{
    return this.http.get<any>(this.apiroot+'/buyerInfo/list');
  }
}

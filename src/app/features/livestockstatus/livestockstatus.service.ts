import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Livestockstatus } from './livestockstatus';
import { Buyerinfo } from '../buyerinfo/buyerinfo';

@Injectable({
  providedIn: 'root'
})
export class LivestockstatusService {
  apiroot = '';

  constructor(protected http: HttpClient) {
    this.apiroot = environment.apiUrl;
  }
/*
  getData(regid: string) {
    return this.http.get(`${this.apiroot}/ceLivestockstatus/regid/${regid}`);
  }

  getBuyer():Observable<any>{
    return this.http.get<any>(this.apiroot+'/buyerInfo/listbuyer');
  }

  delete(regid: string) {
    return this.http.delete(`${this.apiroot}/ceLivestockstatus/regid/${regid}`);
  }

  save(data: Livestockstatus) {
    return this.http.post(`${this.apiroot}/ceLivestockstatus`, data);
  }
*/

getData(regid: string) {
  return this.http.get(`${this.apiroot}/ceLivestockstatus/regid/${regid}`);
}

getBuyer():Observable<any>{
  return this.http.get<any>(this.apiroot+'/buyerInfo/listbuyer');
}

delete(id: string) {
  return this.http.delete(`${this.apiroot}/ceLivestockstatus/id/${id}`);
}

save(data: Livestockstatus) {
  return this.http.post(`${this.apiroot}/ceLivestockstatus`, data);
}

}

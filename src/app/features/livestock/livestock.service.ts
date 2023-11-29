import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Livestock } from './livestock';
import { EnterpriseInfo } from './enterpriseInfo';
import { Observable } from 'rxjs';
import { CeLivestock } from './CeLivestock';
import { Livestockstatus } from '../livestockstatus/livestockstatus';

@Injectable({
  providedIn: 'root'
})
export class LivestockService {

  apiroot = '';

  constructor(protected http: HttpClient) {
    this.apiroot = environment.apiUrl;
  }

  getEnterpriseList():Observable<any>{
    return this.http.get<any>(this.apiroot+'/enterpriseInfo/list');
  }

  getBreed():Observable<any>{
    return this.http.get<any>(this.apiroot+'/speciesInfo/list');
  }

  getSire():Observable<any>{
    return this.http.get<any>(this.apiroot+'/ceLivestock/listsire');
  }

  getDam():Observable<any>{
    return this.http.get<any>(this.apiroot+'/ceLivestock/listdam');
  }


  //nak try utk list option not applicable
  // getOptions(): Observable<any[]> {
  //   // Fetch options from your database here
  //   return this.http.get<any[]>('/api/options');
  // }

 
  getList(params: any) {
    const requestParams = {
      params: {
        page: params.first / params.rows,
        size: params.rows,
        sort: params.sortField ? `${params.sortField},${params.sortOrder ? params.sortOrder === 1 ? 'asc' : 'desc' : 'asc'}` : '',
        filter: params.globalFilter || ''
      }
    };
    console.log(requestParams);
    return this.http.get(this.apiroot+'/ceLivestock/list', requestParams);
  }
  delete(id: string) {
    return this.http.delete(`${this.apiroot}/ceLivestock/${id}`);
  }

  save(data: CeLivestock) {
    return this.http.post(`${this.apiroot}/ceLivestock`, data);
  }

  saveCeLivestock(data1: CeLivestock) {
    return this.http.post(`${this.apiroot}/ceLivestock`, data1);
  }
  getData(id: string) {
    return this.http.get(`${this.apiroot}/ceLivestock/${id}`);
  }

  getEnterprise(entercode: number): Observable<EnterpriseInfo> {
    return this.http.get<EnterpriseInfo>(`${this.apiroot}/ceLivestock/${entercode}`);
}

}

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
    return this.http.get<any>(this.apiroot+'/enterpriseInfo/listall');
  }

  getBreed():Observable<any>{
    return this.http.get<any>(this.apiroot+'/speciesInfo/list');
  }

  getSire():Observable<any>{
    return this.http.get<any>(this.apiroot+'/ceLivestock/list');
  }
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
  delete(id: number) {
    return this.http.delete(`${this.apiroot}/ceLivestock/${id}`);
  }

  save(data: Livestockstatus) {
    return this.http.post(`${this.apiroot}/livestockStatus`, data);
  }

  saveCeLivestock(data: CeLivestock) {
    return this.http.post(`${this.apiroot}/ceLivestock`, data);
  }
  getData(id: number) {
    return this.http.get(`${this.apiroot}/ceLivestock/${id}`);
  }

  getEnterprise(id: number): Observable<EnterpriseInfo> {
    return this.http.get<EnterpriseInfo>(`${this.apiroot}/ceLivestock/${id}`);
}

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Livestock } from './livestock';
import { EnterpriseInfo } from './enterpriseInfo';
import { Observable } from 'rxjs';

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
    return this.http.get(`${this.apiroot}/api/v1/soil/list`, requestParams);
  }
  delete(id: number) {
    return this.http.delete(`${this.apiroot}/api/v1/soil/${id}`);
  }

  save(data: Livestock) {
    return this.http.post(`${this.apiroot}/api/v1/soil`, data);
  }
  getData(id: number) {
    return this.http.get(`${this.apiroot}/api/v1/soil/${id}`);
  }

  getEnterprise(id: number): Observable<EnterpriseInfo> {
    return this.http.get<EnterpriseInfo>(`${this.apiroot}/api/v1/soil/${id}`);
}

}

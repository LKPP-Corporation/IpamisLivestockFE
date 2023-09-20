import { Injectable } from '@angular/core';
import { Livestockgroup } from './livestockgroup';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class LivestockgroupService {
  apiroot = '';

  constructor(protected http: HttpClient) {
    this.apiroot = environment.apiUrl;
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
    return this.http.get(`${this.apiroot}/enterpriseInfo/list`, requestParams);
  }
  delete(code: String) {
    return this.http.delete(`${this.apiroot}/enterpriseInfo/${code}`);
  }

  save(data: Livestockgroup) {
    return this.http.post(`${this.apiroot}/enterpriseInfo`, data);
  }
  getData(code: String) {
    return this.http.get(`${this.apiroot}/enterpriseInfo/${code}`);
  }
}

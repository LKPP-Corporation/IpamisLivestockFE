import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Soil } from './soil';

@Injectable({
  providedIn: 'root'
})
export class SoilService {

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
    return this.http.get(`${this.apiroot}/soil`, requestParams);
  }
  delete(id: number) {
    return this.http.delete(`${this.apiroot}/soil/${id}`);
  }

  save(data: Soil) {
    return this.http.post(`${this.apiroot}/soil`, data);
  }
  getData(id: number) {
    return this.http.get(`${this.apiroot}/soil/${id}`);
  }
}

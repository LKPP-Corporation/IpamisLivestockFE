import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})

export class PhysicalReportService {

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
        filter: params.globalFilter || '',
      }
    };
    console.log(requestParams);
    return this.http.get(this.apiroot+'/ceLivestock/list', requestParams);
  }

  getListMortality(params: any) {
    const requestParams = {
      params: {
        page: params.first / params.rows,
        size: params.rows,
        sort: params.sortField ? `${params.sortField},${params.sortOrder ? params.sortOrder === 1 ? 'asc' : 'desc' : 'asc'}` : '',
        filter: params.globalFilter || ''
      }
    };
    console.log(requestParams);
    return this.http.get(this.apiroot+'/ceLivestock/listdeath', requestParams);
  }

  getData(id: number) {
    return this.http.get(`${this.apiroot}/ceLivestock/${id}`);
  }
}

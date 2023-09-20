import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  apiroot = '';
  constructor(protected http: HttpClient) {
    this.apiroot = environment.apiUrl;
  }

  menu() {
    return this.http.get(`${this.apiroot}/menu`);
  }

  menus() {
    return this.http.get<MenuItem[]>(`${this.apiroot}/menu/top`);
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
    return this.http.get(`${this.apiroot}/menu/list`, requestParams);
  }
  delete(id: number) {
    return this.http.delete(`${this.apiroot}/menu/${id}`);
  }

  save(data: MenuItem) {
    return this.http.post(`${this.apiroot}/menu`, data);
  }
  getData(id: number) {
    return this.http.get(`${this.apiroot}/menu/${id}`);
  }
}

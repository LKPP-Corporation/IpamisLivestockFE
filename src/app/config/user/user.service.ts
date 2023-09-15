import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
    return this.http.get(`${this.apiroot}/api/v1/user/list`, requestParams);
  }
  delete(id: number) {
    return this.http.delete(`${this.apiroot}/api/v1/user/${id}`);
  }

  save(data: User) {
    return this.http.post(`${this.apiroot}/api/v1/user`, data);
  }
  getData(id: number) {
    return this.http.get(`${this.apiroot}/api/v1/user/${id}`);
  }

  getRoles() {
    return this.http.get<string[]>(`${this.apiroot}/api/v1/user/roles`);
  }


}

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(this.baseURL + 'clients/' + id, httpOptions);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseURL + 'clients', httpOptions);
  }

  updateClient(client: Client) {
    return this.http.put(this.baseURL + 'clients', client, httpOptions);
  }

  deleteClient(id: number) {
    return this.http.delete(this.baseURL + 'clients/' + id, httpOptions);
  }

  insertClient(): Observable<any> {
    return this.http.post(this.baseURL + 'clients', {}, httpOptions);
  }
}

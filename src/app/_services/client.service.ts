import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(this.baseURL + 'clients/' + id);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseURL + 'clients');
  }

  updateClient(id: number, client: Client) {
    return this.http.put(this.baseURL + 'clients/' + id, client);
  }
}

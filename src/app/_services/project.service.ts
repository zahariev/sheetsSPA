import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(this.baseURL + 'projects/' + id, httpOptions);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseURL + 'projects', httpOptions);
  }

  updateProject(id: number, project: Project) {
    return this.http.put(this.baseURL + 'projects/' + id, project, httpOptions);
  }

  deleteProject(id: number) {
    return this.http.delete(this.baseURL + 'projects/' + id, httpOptions);
  }

  insertProject() {
    return this.http.post(this.baseURL + 'projects', {}, httpOptions);
  }
}

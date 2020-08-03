import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { environment } from 'src/environments/environment';
import { TimeSheet } from '../models/TimeSheet';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTimeSheet(id: number): Observable<TimeSheet> {
    return this.http.get<TimeSheet>(
      this.baseURL + 'timesheets/' + id,
      httpOptions
    );
  }

  getTimeSheets(): Observable<TimeSheet[]> {
    return this.http.get<TimeSheet[]>(
      this.baseURL + 'timesheets/',
      httpOptions
    );
  }

  updateTimeSheet(id: number, timesheet: TimeSheet) {
    return this.http.put(
      this.baseURL + 'timesheets/' + id,
      timesheet,
      httpOptions
    );
  }

  deleteTimesheet(id: number) {
    return this.http.delete(this.baseURL + 'timesheets/' + id, httpOptions);
  }

  insertTimesheet() {
    return this.http.post(this.baseURL + 'timesheets', {}, httpOptions);
  }
}

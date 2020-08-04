import { TimesheetService } from './../../_services/timesheet.service';
import { TimeSheet } from './../../models/TimeSheet';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/_services/client.service';
import { ProjectService } from 'src/app/_services/project.service';
import { Client } from 'src/app/models/client';
import { Project } from 'src/app/models/project';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  clients: Client[] = [];
  projects: Project[] = [];
  timesheets = [];
  activeProjects: Project[];
  model: TimeSheet = new TimeSheet();
  editMode = false;
  activityName = 'Create';
  startDate = { year: 2020, month: 8, day: 6 };

  constructor(
    private clientService: ClientService,
    private projectService: ProjectService,
    private timesheetService: TimesheetService
  ) {}

  async ngOnInit() {
    this.clients = JSON.parse(localStorage.getItem('clients'));
    this.projects = JSON.parse(localStorage.getItem('projects'));
    this.timesheets = JSON.parse(localStorage.getItem('sheets'));
    // this.onSelect(this.clients[0].id);
  }

  onSelect(clientId) {
    this.activeProjects = this.projects.filter(
      (item) => item.clientId == clientId
    );
    this.model.clientId = clientId;
    // console.log(clientId);
  }

  getClientName(clientId) {
    return this.clients.filter((item) => item.id == clientId)[0]?.name;
  }

  getProjectName(projectId) {
    return this.projects.filter((item) => item.id == projectId)[0]?.name;
  }

  newSheet() {
    this.activityName = 'Create';
    this.editMode = true;
  }

  onSubmit() {
    // console.log(typeof this.model.date);

    if (typeof this.model.date == 'object')
      this.model.date = JSON.stringify(this.model.date);
    const sheet = {
      id: this.model.id,
      projectId: this.model.projectId,
      clientId: this.model.clientId,
      userId: 0,
      startTime: this.model.startTime || 0,
      endTime: this.model.endTime || 0,
      description: this.model.description || '',
      date: this.model.date || this.startDate,
    };
    // console.log(sheet.id);

    if (sheet.id == -1) {
      sheet.id = this.timesheets.length;
      // this.timesheetService.insertTimesheet(sheet).subscribe(async () => {
      this.timesheets.push(sheet);
    }
    // });
    // this.timesheetService.updateTimeSheet(sheet).subscribe(() => {});
    else {
      this.timesheets.filter((sht) => sht.id == sheet.id)[0] = sheet;
    }

    this.model = new TimeSheet();

    this.editMode = false;

    this.saveLocal();
  }

  saveLocal() {
    localStorage.setItem('sheets', JSON.stringify(this.timesheets));
  }

  calcTimeDiff(item: TimeSheet) {
    return (item.endTime || 0) - (item.startTime || 0);
  }

  toggleActivityName() {
    if (!this.editMode) return 'Update';
    return 'Create';
  }

  editSheet(idx) {
    this.model = this.timesheets[idx];
    // this.model.date = this.model.date;
    this.onSelect(this.model.clientId);
    this.activityName = 'Update';
    this.editMode = true;
  }

  getDate(date) {
    if (!date) return;
    // console.log(date);
    if (typeof date == 'string') date = JSON.parse(date);

    return date.year + '/' + date.month + '/' + date.day;
  }

  deleteSheet(idx) {
    // this.timesheetService.deleteTimesheet(id).subscribe(() => {
    this.timesheets.splice(idx, 1);
    // });
    this.saveLocal();
  }
}

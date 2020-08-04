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
  timesheets: TimeSheet[] = [];
  activeProjects: Project[];
  model: TimeSheet = new TimeSheet();
  editMode = false;

  constructor(
    private clientService: ClientService,
    private projectService: ProjectService,
    private timesheetService: TimesheetService
  ) {}

  async ngOnInit() {
    this.clients = await this.getClients();
    this.projects = await this.getProjects();
    this.timesheets = await this.getTimeSheets();
    // this.onSelect(this.clients[0].id);
  }

  onSelect(clientId) {
    this.activeProjects = this.projects.filter(
      (item) => item.clientId == clientId
    );
    console.log(clientId);
  }

  async getClients() {
    let clients = await this.clientService.getClients().toPromise();

    return clients;
  }

  async getTimeSheets() {
    let data = await this.timesheetService.getTimeSheets().toPromise();

    return data;
  }

  async getProjects() {
    let data = await this.projectService.getProjects().toPromise();

    return data;
  }

  getClientName(clientId) {
    return this.clients.filter((item) => item.id == clientId)[0]?.name;
  }

  getProjectName(projectId) {
    return this.projects.filter((item) => item.id == projectId)[0]?.name;
  }

  newSheet() {
    this.editMode = true;
  }

  onSubmit() {
    const sheet = {
      id: parseInt(this.model.id?.toString()) || 0,
      ProjectId: parseInt(this.model.projectId?.toString()) || 0,
      ClientId: parseInt(this.model.clientId?.toString()) || 0,
      UserId: 0,
      StartTime: parseInt(this.model.startTime?.toString()) || 0,
      EndTime: parseInt(this.model.endTime?.toString()) || 0,
      Description: this.model.description || '',
    };

    if (!sheet.id)
      this.timesheetService.insertTimesheet(sheet).subscribe(async () => {
        this.timesheets = await this.getTimeSheets();
      });
    else this.timesheetService.updateTimeSheet(sheet).subscribe(() => {});
    this.model = new TimeSheet();
    this.editMode = false;
  }

  calcTimeDiff(item: TimeSheet) {
    return item.endTime || 0 - item.startTime || 0;
  }

  editSheet(sheet) {
    this.model = sheet;
    this.onSelect(this.model.clientId);
    this.editMode = true;
  }
}

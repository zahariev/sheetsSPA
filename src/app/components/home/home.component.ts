import { TimesheetService } from './../../_services/timesheet.service';
import { TimeSheet } from './../../models/TimeSheet';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/_services/client.service';
import { ProjectService } from 'src/app/_services/project.service';
import { Client } from 'src/app/models/client';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  clients: Client[] = [];
  projects: Project[] = [];
  timesheets: TimeSheet[] = [];

  constructor(
    private clientService: ClientService,
    private projectService: ProjectService,
    private timesheetService: TimesheetService
  ) {}

  async ngOnInit() {
    this.clients = await this.getClients();
    this.projects = await this.getProjects();
    this.timesheets = await this.getTimeSheets();
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
}

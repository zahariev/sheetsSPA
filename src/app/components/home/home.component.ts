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

  constructor(
    private clientService: ClientService,
    private projectService: ProjectService
  ) {}

  async ngOnInit() {
    this.clients = await this.getClients();
    this.projects = await this.getProjects();
  }

  async getClients() {
    let clients = await this.clientService.getClients().toPromise();

    return clients;
  }

  async getProjects() {
    let data = await this.projectService.getProjects().toPromise();

    return data;
  }
}

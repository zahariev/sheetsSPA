import { ProjectService } from './../../_services/project.service';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/_services/client.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  clients: Client[] = [];
  editMode = false;
  model: Project = new Project();

  constructor(
    private projectService: ProjectService,
    private clientService: ClientService
  ) {}

  async ngOnInit() {
    this.projects = await this.getProjects();
    this.clients = await this.getClients();
    this.model.name = '';
    this.model.clientId = parseInt(this.clients[0].id.toString());
  }

  async getClients() {
    let clients = await this.clientService.getClients().toPromise();

    return clients;
  }

  async getProjects() {
    let data = await this.projectService.getProjects().toPromise();

    return data;
  }

  onSubmit() {
    console.log(this.model);

    if (this.model.clientId == null) this.model.clientId = 0;

    this.model.clientId = parseInt(this.model.clientId.toString());

    this.projectService.updateProject(this.model).subscribe(
      () => {},
      (err) => {}
    );

    this.editMode = false;
    this.model = new Project();
  }

  getClientName(clientId) {
    return this.clients.filter((item) => item.id == clientId)[0]?.name || '';
  }

  editProject(project) {
    this.model = project;

    this.editMode = true;
  }

  deleteProject(id: number) {
    // this.alertify.confirm('Are you sure you want to delete this photo?', () => {
    this.projectService.deleteProject(id).subscribe();
    // remove localy
    this.projects.splice(
      this.projects.findIndex((p) => p.id === id),
      1
    );
    console.log('deletePressed');
  }

  cancelEdit() {
    this.editMode = false;
    this.model = new Project();
  }

  newProject() {
    this.projectService.insertProject().subscribe(
      (project: Project) => {
        console.log(project);
        if (project) this.projects.push(project);
      },
      (error) => {
        //error message
        console.log(error);
      },
      () => {}
    );
  }
}

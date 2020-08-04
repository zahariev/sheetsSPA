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
  projects = [];
  clients: Client[] = [];
  editMode = false;
  model: Project = new Project(this.getId());

  constructor(
    private projectService: ProjectService,
    private clientService: ClientService
  ) {}

  async ngOnInit() {
    this.clients = JSON.parse(localStorage.getItem('clients')) || [];
    this.projects = JSON.parse(localStorage.getItem('projects')) || [];
    this.model.name = '';
    this.model.clientId = parseInt(this.clients[0]?.id.toString());
  }

  onSubmit() {
    console.log(this.model);

    this.projects.filter((sht) => sht.id == this.model.id)[0] = this.model;
    this.saveLocal();
    this.editMode = false;
    this.model = new Project(this.getId());
  }

  getClientName(clientId) {
    return this.clients.filter((item) => item.id == clientId)[0]?.name || '';
  }

  editProject(idx) {
    // console.log(project);

    this.model = this.projects[idx];
    // console.log(this.model);

    this.editMode = true;
  }

  deleteProject(idx) {
    // this.alertify.confirm('Are you sure you want to delete this photo?', () => {
    // this.projectService.deleteProject(id).subscribe();
    // remove localy
    this.projects.splice(idx, 1);
    this.saveLocal();
    console.log('deletePressed');
  }

  getId() {
    return this.projects.length + 1;
  }
  cancelEdit() {
    this.editMode = false;
    this.model = new Project(this.getId());
  }

  saveLocal() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  newProject() {
    // this.projectService.insertProject().subscribe(
    //   (project: Project) => {
    //     console.log(project);
    // if (project)
    console.log(this.getId());

    this.projects.push(new Project(this.getId()));
    //   },
    //   (error) => {
    //     //error message
    //     console.log(error);
    //   },
    //   () => {}
    // );
    this.saveLocal();
  }
}

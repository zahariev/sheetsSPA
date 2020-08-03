import { ProjectService } from './../../_services/project.service';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  constructor(private projectService: ProjectService) {}

  async ngOnInit() {
    this.projects = await this.getProjects();
  }

  async getProjects() {
    let data = await this.projectService.getProjects().toPromise();

    return data;
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

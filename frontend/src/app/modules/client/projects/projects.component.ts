import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Project } from 'src/app/models/project';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectCardComponent } from "../../../components/project-card/project-card.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    MatCardModule,
    TablerIconsModule,
    PipesModule,
    FormsModule,
    ProjectCardComponent
  ],
  providers: [
    ProjectService,
  ],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  params = {
    page: 1,
    limit: 20,
    status: '',
    key: ''
  }
  projects : Project[];

  constructor(private projectService:ProjectService) { }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects(){
    this.projectService.get(null, this.params).subscribe((res:any)=>{
      this.projects = res.data;
    });
  }
}

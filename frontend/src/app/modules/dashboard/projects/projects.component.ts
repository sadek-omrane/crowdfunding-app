import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    TablerIconsModule,
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
  };
  displayedColumns: string[] = [
    'id',
    'name',
    'goal',
    'start_date',
    'end_date',
    'status',
    'actions',
  ];
  projects : Project[];

  constructor(
    private projectService:ProjectService
  ) { }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects(loadMore = false){
    if(loadMore){
      this.params.page++;
    }
    this.projectService.getMyProjects(this.params).subscribe((res:any)=>{
      this.projects = res.data;
    });
  }

  delete(id:number){
    this.projectService.delete(id).subscribe((res:any)=>{
      this.loadProjects();
    });
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProjectCardComponent } from 'src/app/components/project-card/project-card.component';
import { MaterialModule } from 'src/app/material.module';
import { Project } from 'src/app/models/project';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ProjectService } from 'src/app/services/project.service';

const PRODUCT_DATA: any[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    name: 'John Doe',
    amount: 180,
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    name: 'Mary Jane',
    amount: 90,
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    name: 'Steve Smith',
    amount: 120,
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    name: 'Jeffrey Palmer',
    amount: 160,
  },
];
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    PipesModule,
    RouterModule,
    TablerIconsModule,
    MatProgressBarModule,
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    ProjectCardComponent,
    SlickCarouselModule,
  ],
  providers: [
    ProjectService,
  ],
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit {
  project : Project;
  similarProject : Project[];
  displayedColumns1: string[] = ['name', 'amount'];
  dataSource1 = PRODUCT_DATA;
  projectSlideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: false,
    dots: true,
    navText: [
      "<i-tabler name='square-rounded-arrow-left' class='icon-16'></i-tabler>",
      "<i-tabler name='square-rounded-arrow-right' class='icon-16'></i-tabler>"
    ],
  };
  constructor(
    private projectService:ProjectService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if(params['id']){
        this.loadProject(params['id']);
        this.loadSimilarProject(params['id']);
      }
    });

  }

  loadProject(id:number){
    this.projectService.get(id, {}).subscribe((res:any)=>{
      this.project = res.data;
    });
  }

  loadSimilarProject(id:number){
    this.projectService.similar(id).subscribe((res:any)=>{
      this.similarProject = res.data;
    });
  }
}

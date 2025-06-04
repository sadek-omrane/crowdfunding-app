import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { Project } from 'src/app/models/project';
import { PipesModule } from 'src/app/pipes/pipes.module';
interface productCards {
  id: number;
  imgSrc: string;
  title: string;
  price: string;
  rprice: string;
}

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    TablerIconsModule,
    MatButtonModule,
    PipesModule,
  ],
})
export class ProjectCardComponent implements OnInit {

  @Input() project:Project;

  constructor() { }

  ngOnInit() {
  }

}

import { PageContent } from '../../../models/page-content';
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
import { PageContentService } from 'src/app/services/page-content.service';

@Component({
  selector: 'app-page-contents',
  standalone: true,
  templateUrl: './page-contents.component.html',
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
    PageContentService,
  ],
})
export class PageContentsComponent implements OnInit {
  params = {
    page: 1,
    limit: 20,
  };
  displayedColumns: string[] = [

    'id',
    'title',
    'slug',
    'status',
    'actions',
  ];
  pagesContent : PageContent[];

  constructor(
    private pageContentService: PageContentService,
  ) { }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects(loadMore = false){
    if(loadMore){
      this.params.page++;
    }
    this.pageContentService.get(null, this.params).subscribe((res:any)=>{
      this.pagesContent = res.data;
    });
  }

  delete(id:number){
    this.pageContentService.delete(id).subscribe((res:any)=>{
      this.loadProjects();
    });
  }

}

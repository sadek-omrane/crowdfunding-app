import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxEditorModule, toHTML } from 'ngx-editor';
import { PageContentService } from 'src/app/services/page-content.service';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgxEditorModule,
  ],
  providers: [
    PageContentService,
  ],
})
export class PageContentComponent implements OnInit {

  id: number;

  // htmlContent: string;
  pageContent: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private pageContentService: PageContentService,
  ) { }

  ngOnInit() {
    this.loadPageContent();
  }

  loadPageContent() {

    this.activeRoute.queryParams.subscribe((params) => {
      console.log(params);
      this.id = params['id'];
      this.pageContentService.get(this.id, null).subscribe((res) => {
        this.pageContent = toHTML(res.data.content);
      });
    });
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { MaterialModule } from 'src/app/material.module';
import { PageContent } from 'src/app/models/page-content';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PageContentService } from 'src/app/services/page-content.service';

@Component({
  selector: 'app-page-content-form',
  standalone: true,
  templateUrl: './page-content-form.component.html',
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    TablerIconsModule,
    PipesModule,
    NgxEditorModule,
  ],
  providers: [
    PageContentService,
  ],
})
export class PageContentFormComponent implements OnInit {
  id?: number;
  pageContent?:PageContent;
  form:FormGroup;
  //'draft', 'published', 'successful', 'failed'
  status = [
    {value: 'draft', label: 'Brouillon'},
    {value: 'published', label: 'Publié'},
    {value: 'archived', label: 'Archivé'},
  ];
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  colorPresets = ['#136F63', '#22AAA1', '#49beff', '#ffae1f', '#dc3545', '#e74c3c', '#13deb9', '#ffffff'];
  constructor(
    private fb:FormBuilder,
    private pageContentService:PageContentService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
  ) { }

  ngOnInit() {
    this.editor = new Editor();
    this.buildForm();
    this.activatedRoute.params.subscribe((params:any)=>{
      if(params.id){
        this.id = params.id;
        this.loadProject();
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      title: [this.pageContent?.title],
      content: [this.pageContent?.content],
      slug: [this.pageContent?.slug],
      status: [this.pageContent?.status ?? this.status[0].value],
    });
  }


  loadProject(){
    this.pageContentService.get(this.id).subscribe((res:any)=>{
      this.pageContent = res.data;
      this.buildForm();
    });
  }

  submit(){
    console.log(this.form.getRawValue());
    console.log(this.form.valid);
    if (this.form.valid) {
      if(this.id){
        this.pageContentService.put(this.id!, this.form.getRawValue()).subscribe(
          (res:any)=>null,
          (err:any)=>null,
          ()=>this.router.navigate(['/dashboard/page-contents']),
        );
      }else{
        this.pageContentService.post(this.form.getRawValue()).subscribe(
          (res:any)=>null,
          (err:any)=>null,
          ()=>this.router.navigate(['/dashboard/page-contents']),
        );
      }

    }
  }

}

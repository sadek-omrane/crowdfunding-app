import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Editor, NgxEditorModule, Toolbar, Validators } from 'ngx-editor';

@Component({
  standalone: true,
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,

  ],
})
export class RichTextEditorComponent implements OnInit, OnDestroy {
  form:FormGroup;
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
  colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];
  constructor(
    private fb:FormBuilder,
    private router:Router,
  ) { }

  buildForm() {
    this.form = this.fb.group({
      editorContent: [null, Validators.required],
    });
  }

  get doc(): AbstractControl {
    return this.form.get('editorContent');
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Testmonial } from 'src/app/models/testmonial';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { EFileService } from 'src/app/services/efile.service';
import { TestmonialService } from 'src/app/services/testmonial.service';

@Component({
  selector: 'app-testmonial-form',
  templateUrl: './testmonial-form.component.html',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    TablerIconsModule,
    PipesModule,
  ],
  providers: [
    TestmonialService,
    EFileService,
  ],
})
export class TestmonialFormComponent implements OnInit {
id?: number;
  testmonial?:Testmonial;
  form:FormGroup;
  file?:File;
  ratings = [
    {value: 1, label: '1 star'},
    {value: 2, label: '2 stars'},
    {value: 3, label: '3 stars'},
    {value: 4, label: '4 stars'},
    {value: 5, label: '5 stars'},
  ];
  @ViewChild('uploadInput') uploadInput;
  constructor(
    private fb:FormBuilder,
    private testmonialService:TestmonialService,
    private efileService:EFileService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.activatedRoute.params.subscribe((params:any)=>{
      if(params.id){
        this.id = params.id;
        this.loadTestmonial();
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      e_file_id: [this.testmonial?.e_file_id],
      name: [this.testmonial?.name, Validators.required],
      content: [this.testmonial?.content, Validators.required],
      rating: [this.testmonial?.rating, Validators.required],
    });
  }


  loadTestmonial(){
    this.testmonialService.get(this.id).subscribe((res:any)=>{
      this.testmonial = res.data;
      this.buildForm();
    });
  }

  submit(){
    if (this.form.valid) {
      if(this.id){
        this.testmonialService.put(this.id!, this.form.getRawValue()).subscribe(
          (res:any)=>null,
          (err:any)=>null,
          ()=>this.router.navigate(['/dashboard/testmonials']),
        );
      }else{
        this.testmonialService.post(this.form.getRawValue()).subscribe(
          (res:any)=>null,
          (err:any)=>null,
          ()=>this.router.navigate(['/dashboard/testmonials']),
        );
      }

    }
  }

  onFileChange(event: any) {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    this.efileService.upload(formData).subscribe((res: any) => {
      this.form.get('e_file_id')?.setValue(res.data.id);
    });
  }

  removeFile(id: number) {
    this.efileService.delete(id).subscribe();
    this.form.get('e_file_id')?.setValue(null);
  }

  chooseFile(){
    this.uploadInput.nativeElement.click();
  }
}


import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { AuthService } from 'src/app/services/auth.service';
import { EFileService } from 'src/app/services/efile.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project-form',
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
    ProjectService,
    EFileService,
    UserService,
  ],
  templateUrl: './project-form.component.html',
})
export class ProjectFormComponent implements OnInit {
  id?: number;
  project?:Project;
  form:FormGroup;
  files:Array<File> = [];
  users:User[] = [];
  me : User | null = null;
  status = [
    {value: 'draft', label: 'Brouillon'},
    {value: 'published', label: 'Publié'},
    {value: 'successful', label: 'Réussi'},
    {value: 'failed', label: 'Echoué'},
  ];
  @ViewChild('uploadInput') uploadInput;
  constructor(
    private fb:FormBuilder,
    private projectService:ProjectService,
    private efileService:EFileService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private authService:AuthService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.authService.getObservableMe().subscribe((me) => {
      this.me = me;
    });
    this.buildForm();
    this.activatedRoute.params.subscribe((params:any)=>{
      if(params.id){
        this.id = params.id;
        this.loadProject();
      }
    });
    this.userService.get(null, {}).subscribe((res:any)=>{
      this.users = res.data;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      user_id: [
        {
          value: this.me?.hasRole('user') ? this.me?.id : this.project?.user_id,
          disabled: this.me?.hasRole('user')==true
        },
        this.me?.hasRole('user') ? Validators.required : null
      ],
      name: [this.project?.name, Validators.required],
      description: [this.project?.description, Validators.required],
      goal: [this.project?.goal, Validators.required],
      start_date: [this.project?.start_date, Validators.required],
      end_date: [this.project?.end_date, Validators.required],
      e_files: this.fb.array(this.project?.e_files?.map((efile:any)=>
        this.fb.group({
          id: [efile.id, Validators.required],
          name: [efile.name, Validators.required],
          path: [efile.path, Validators.required],
          size: [efile.size, Validators.required],
          type: [efile.type, Validators.required],
          created_at: [efile.created_at, Validators.required],
          updated_at: [efile.updated_at, Validators.required],
        }),
      ) ?? [], []),
      status: [this.project?.status ?? this.status[0].value, Validators.required],
    });
  }


  loadProject(){
    this.projectService.get(this.id).subscribe((res:any)=>{
      this.project = res.data;
      this.buildForm();
    });
  }

  submit(){
    if (this.form.valid) {
      if(this.id){
        this.projectService.put(this.id!, this.form.getRawValue()).subscribe(
          (res:any)=>null,
          (err:any)=>null,
          ()=>this.router.navigate(['/dashboard/projects']),
        );
      }else{
        this.projectService.post(this.form.getRawValue()).subscribe(
          (res:any)=>null,
          (err:any)=>null,
          ()=>this.router.navigate(['/dashboard/projects']),
        );
      }

    }
  }

  onFileChange(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      const formData = new FormData();
      formData.append('file', event.target.files[i]);
      this.efileService.upload(formData).subscribe((res: any) => {
        const formArray = this.form.get('e_files') as FormArray;
        formArray.push(this.fb.group({
          id: [res.data.id, Validators.required],
          name: [res.data.name, Validators.required],
          path: [res.data.path, Validators.required],
          size: [res.data.size, Validators.required],
          type: [res.data.type, Validators.required],
          created_at: [res.data.created_at, Validators.required],
          updated_at: [res.data.updated_at, Validators.required],
        }));
      });
    }
  }

  removeFile(id: number) {
    this.efileService.delete(id).subscribe();
    const formArray = this.form.get('e_files') as FormArray;
    const index = formArray.controls.findIndex((control: any) => control.value.id === id);
    formArray.removeAt(index);
  }

  chooseFile(){
    this.uploadInput.nativeElement.click();
  }
}


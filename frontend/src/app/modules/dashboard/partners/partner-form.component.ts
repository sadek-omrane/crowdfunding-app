import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { Validators } from 'ngx-editor';
import { MaterialModule } from 'src/app/material.module';
import { Partner } from 'src/app/models/partner';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { EFileService } from 'src/app/services/efile.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partner-form',
  templateUrl: './partner-form.component.html',
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
    PartnerService,
    EFileService,
  ],
})
export class PartnerFormComponent implements OnInit {
id?: number;
  partner?:Partner;
  form:FormGroup;
  file?:File;

  @ViewChild('uploadInput') uploadInput;
  constructor(
    private fb:FormBuilder,
    private partnerService:PartnerService,
    private efileService:EFileService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
  ) { }

  ngOnInit() {
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
      name: [this.partner?.name, Validators.required],
      e_file_id: [this.partner?.e_file_id],
    });
  }


  loadProject(){
    this.partnerService.get(this.id).subscribe((res:any)=>{
      this.partner = res.data;
      this.buildForm();
    });
  }

  submit(){
    if (this.form.valid) {
      if(this.id){
        this.partnerService.put(this.id!, this.form.getRawValue()).subscribe(
          (res:any)=>null,
          (err:any)=>null,
          ()=>this.router.navigate(['/dashboard/partners']),
        );
      }else{
        this.partnerService.post(this.form.getRawValue()).subscribe(
          (res:any)=>null,
          (err:any)=>null,
          ()=>this.router.navigate(['/dashboard/partners']),
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

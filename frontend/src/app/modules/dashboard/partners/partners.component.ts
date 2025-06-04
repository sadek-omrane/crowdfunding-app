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
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
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
    PipesModule,
  ],
  providers: [
    PartnerService,
  ],
})
export class PartnersComponent implements OnInit {
  params = {
    page: 1,
    limit: 20,
  };
  displayedColumns: string[] = [
    'id',
    'name',
    'image',
    'actions',
  ];
  partners : [];

  constructor(
    private partnerService:PartnerService
  ) { }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects(loadMore = false){
    if(loadMore){
      this.params.page++;
    }
    this.partnerService.get(null, this.params).subscribe((res:any)=>{
      this.partners = res.data;
    });
  }

  delete(id:number){
    this.partnerService.delete(id).subscribe((res:any)=>{
      this.loadProjects();
    });
  }

}

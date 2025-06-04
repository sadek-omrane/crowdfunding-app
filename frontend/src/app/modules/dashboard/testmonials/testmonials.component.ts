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
import { TestmonialService } from 'src/app/services/testmonial.service';

@Component({
  selector: 'app-testmonials',
  templateUrl: './testmonials.component.html',
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
    TestmonialService,
  ],
})
export class TestmonialsComponent implements OnInit {
params = {
    page: 1,
    limit: 20,
  };
  displayedColumns: string[] = [
    'id',
    'image',
    'name',
    'rating',
    'actions',
  ];
  testmonials : [];

  constructor(
    private testmonialService:TestmonialService
  ) { }

  ngOnInit() {
    this.loadTestmonials();
  }

  loadTestmonials(loadMore = false){
    if(loadMore){
      this.params.page++;
    }
    this.testmonialService.get(null, this.params).subscribe((res:any)=>{
      this.testmonials = res.data;
    });
  }

  delete(id:number){
    this.testmonialService.delete(id).subscribe((res:any)=>{
      this.loadTestmonials();
    });
  }

}

import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-sample-page',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './sample-page.component.html',
})

export class AppSamplePageComponent { }

import { Component, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [
    TablerIconsModule,
  ],
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

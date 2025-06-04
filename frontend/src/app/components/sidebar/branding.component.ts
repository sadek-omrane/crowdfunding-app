import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  template: `
    <div [ngClass]="mode === 'client' ? 'branding p-0' : 'branding'">
      <a [routerLink]="['/']">
        <img
          src="./assets/images/logos/dark-logo.svg"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  @Input() mode='client';
  constructor() {}
}

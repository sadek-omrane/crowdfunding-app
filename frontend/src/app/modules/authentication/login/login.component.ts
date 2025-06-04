import { AuthService } from '../../../services/auth.service';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    TablerIconsModule,
  ],
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  isLoading:boolean = false;
  errorMessage:string;
  hide:boolean = true;
  constructor(private router: Router, private authService: AuthService) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.isLoading = true;
      this.authService.login(this.form.getRawValue()).subscribe((data:any) => {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        this.authService.setMe(data.data.user);
        this.router.navigate(['/client']);
      }, (error:any) => {
        this.errorMessage = error.error.message;
      }, ()=>{
        this.isLoading = false;
      });
    }
  }
}

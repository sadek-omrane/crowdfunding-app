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
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  isLoading:boolean = false;
  errorMessage:string;
  constructor(private router: Router, private authService: AuthService) {}

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.isLoading = true;
      this.authService.register(this.form.getRawValue()).subscribe((data:any) => {
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

import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { jwtDecode } from 'jwt-decode'; // Ensure correct import syntax
import { User } from '../models/user';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseApiService {

  // current user BehaviorSubject
  private me: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  protected override suffix: string = '/auth';

  // Check if user is authenticated
  isAuthenticatedUser(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.exp > Date.now() / 1000) {
          return true;
        }else {
          console.error('Token expired');
        }
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
    return false;
  }

  // Register
  register(data: any): Observable<any> {
    return this.http.post(this.apiUrl + this.suffix +'/register', data);
  }

  // Login
  login(data: any): Observable<any> {
    return this.http.post(this.apiUrl+this.suffix+'/login', data);
  }

  // Logout
  logout(): Observable<any> {
    return this.http.post(this.apiUrl+this.suffix+'/logout', {});
  }

  // Fetch the current user's data from the server
  getMe(): Observable<User> {
    return this.http.get<User>(this.apiUrl+this.suffix+'/me').pipe(
      map((res:any) => Object.assign(new User(), res.data))
    );
  }

  // Get the saved token
  token(): string | null {
    return localStorage.getItem('token');
  }

  // Observable for the current user
  getObservableMe(): Observable<User | null> {
    return this.me.asObservable();
  }

  // Update the current user
  setMe(user: User | null): void {
    if (user) {
      this.me.next(Object.assign(new User(), user));
    } else {
      this.me.next(null);
    }
  }

  // Automatically fetch and set the user on login
  initializeMe(): void {
    if (this.isAuthenticatedUser()) {
      this.getMe().subscribe((user: any) => {
        this.setMe(user);
      }, (error) => {
        this.setMe(null);
      });
    } else {
      this.setMe(null);
    }
  }
}

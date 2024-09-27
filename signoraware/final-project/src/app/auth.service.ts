import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7163/api/auth'; 
  currentUserSubject: BehaviorSubject<any>;
  currentUser: Observable<any>;
  currentUserValue: any;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUserValue = this.currentUserSubject.value; // Initialize currentUserValue
    console.log('Initialized currentUserValue:', this.currentUserValue);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(map(user => {
        console.log('Server response:', user); // Log the server response
        // Store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.currentUserValue = user; // Update currentUserValue
        console.log('Updated currentUserValue:', this.currentUserValue);
        return user;
      }));
  }

  logout(): void {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.currentUserValue = null; // Update currentUserValue
    console.log('Logged out, currentUserValue:', this.currentUserValue);
  }

  getUserId(): number | null {
    const currentUser = this.currentUserValue;
    console.log('Current user:', currentUser);
    if (currentUser) {
      return currentUser.userId;
    }
    return null;
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }
}

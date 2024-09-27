import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';
import { UserService, NewUser } from '../user.service';


@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css']
})
export class LoginPopupComponent {
  @Output() closePopup = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<string>();

  username: string = '';
  password: string = '';
  isRegistering: boolean = false;
  newUser: NewUser = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: ''
  };

  showLoginPopup = false;
  loggedInUser: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  openLoginPopup() {
    this.showLoginPopup = true;
  }

  closeLoginPopup() {
    this.showLoginPopup = false;
  }

  onLoginSuccess(username: string) {
    this.loggedInUser = username;
  }

  close() {
    this.closePopup.emit();
  }

  onSubmit() {
    if (this.username === 'admin' && this.password === 'admin123') {
      console.log('Admin login successful');
      this.close();
      this.loginSuccess.emit('admin');
      this.router.navigate(['/admin']);
    } else {
      this.authService.login(this.username, this.password).subscribe(
        (response) => {
          if (response.success) {
            
            this.close();
            this.loginSuccess.emit(response.username);
            this.onLoginSuccess(response.username);
            
            this.router.navigate(['/cart']);
            console.log('User login successful');
          } else {
            console.log('Login failed');
            // Show error message to the user
          }
        },
        (error) => {
          console.error('Login error', error);
          // Handle error (show message to user)
        }
      );
    }
  }

  toggleRegistration(event: Event) {
    event.preventDefault();
    this.isRegistering = !this.isRegistering;
  }

  onRegister() {
    this.userService.addUser(this.newUser).subscribe(
      (user) => {
        console.log('User registered successfully:', user);
        this.isRegistering = false;
        this.username = this.newUser.username;
        this.password = this.newUser.password;
        // Optionally, you can automatically log in the user after registration
        this.onSubmit();
      },
      (error) => {
        console.error('Registration error', error);
        // Handle error (show message to user)
      }
    );
  }
}

import { CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService, User, NewUser } from '../user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  newUser: NewUser = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: ''
  };
  isLoading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.isLoading = false;
        console.log('Users loaded:', this.users);
      },
      (error) => {
        console.error('Error loading users', error);
        this.isLoading = false;
      }
    );
  }

  addUser(): void {
    this.userService.addUser(this.newUser).subscribe(
      (user) => {
        this.users.push(user);
        this.newUser = {
          username: '',
          password: '',
          email: '',
          firstName: '',
          lastName: ''
        };
        console.log('User added:', user);
      },
      (error) => {
        console.error('Error adding user', error);
      }
    );
  }

  startEdit(user: User): void {
    user.isEditing = true;
  }

  saveUser(user: User): void {
    this.userService.updateUser(user).subscribe(
      () => {
        user.isEditing = false;
        console.log('User updated:', user);
      },
      (error) => {
        console.error('Error updating user', error);
      }
    );
  }

  cancelEdit(user: User): void {
    user.isEditing = false;
    this.loadUsers(); // Reload to discard changes
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter(user => user.userID !== id);
        console.log('User deleted, id:', id);
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  }

}

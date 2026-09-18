import { Injectable } from '@angular/core';
import { User } from '../models/clinic';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [];
  private currentUser: User | null = null;

  register(name: string, email: string, password: string): { user?: User; error?: string } {
    if (!name.trim() || !email.trim() || !password) {
      return { error: 'Nombre, correo y contraseña son obligatorios.' };
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (this.users.some((user) => user.email === normalizedEmail)) {
      return { error: 'Ya existe una cuenta con ese correo.' };
    }

    const user: User = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password,
    };
    this.users = [...this.users, user];
    this.currentUser = user;
    return { user };
  }

  login(email: string, password: string): User | null {
    const user = this.users.find(
      (candidate) => candidate.email === email.trim().toLowerCase() && candidate.password === password,
    );
    this.currentUser = user ?? null;
    return this.currentUser;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
  }
}
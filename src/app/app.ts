import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { User } from './models/clinic';
import { UserService } from './services/user.service';

@Component({
  imports: [RouterOutlet, RouterLink, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly userService = inject(UserService);
  isAccountMenuOpen = false;
  accountView: 'login' | 'register' | 'create' = 'login';
  accountName = '';
  accountEmail = '';
  accountPassword = '';
  accountConfirm = '';
  accountMessage = '';
  accountError = '';
  currentUser: User | null = null;

  constructor() {
    this.currentUser = this.userService.getCurrentUser();
  }

  openAccountMenu(view: 'login' | 'register' | 'create' = 'login'): void {
    this.accountView = view;
    this.isAccountMenuOpen = true;
  }

  closeAccountMenu(): void {
    this.isAccountMenuOpen = false;
    this.accountMessage = '';
    this.accountError = '';
  }

  submitAccount(): void {
    this.accountMessage = '';
    this.accountError = '';

    if (this.accountView === 'login') {
      const user = this.userService.login(this.accountEmail, this.accountPassword);
      if (!user) {
        this.accountError = 'Correo o contraseña incorrectos.';
        return;
      }

      this.currentUser = user;
      this.accountMessage = `Bienvenido, ${user.name}.`;
      this.resetAccountFields();
      return;
    }

    if (this.accountPassword !== this.accountConfirm) {
      this.accountError = 'Las contraseñas no coinciden.';
      return;
    }

    const result = this.userService.register(this.accountName, this.accountEmail, this.accountPassword);
    if (!result.user) {
      this.accountError = result.error ?? 'No fue posible crear la cuenta.';
      return;
    }

    this.currentUser = result.user;
    this.accountMessage = 'Cuenta creada correctamente.';
    this.resetAccountFields();
  }

  logout(): void {
    this.userService.logout();
    this.currentUser = null;
    this.accountMessage = 'Sesión cerrada.';
  }

  private resetAccountFields(): void {
    this.accountName = '';
    this.accountEmail = '';
    this.accountPassword = '';
    this.accountConfirm = '';
  }

  get accountTitle(): string {
    return this.accountView === 'login'
      ? 'Iniciar sesión'
      : this.accountView === 'register'
        ? 'Registrarse'
        : 'Crear cuenta';
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  isAccountMenuOpen = false;
  accountView: 'login' | 'register' | 'create' = 'login';

  openAccountMenu(view: 'login' | 'register' | 'create' = 'login'): void {
    this.accountView = view;
    this.isAccountMenuOpen = true;
  }

  closeAccountMenu(): void {
    this.isAccountMenuOpen = false;
  }

  get accountTitle(): string {
    return this.accountView === 'login'
      ? 'Iniciar sesión'
      : this.accountView === 'register'
        ? 'Registrarse'
        : 'Crear cuenta';
  }
}

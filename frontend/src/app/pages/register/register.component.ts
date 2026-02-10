import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  criarConta() {
    this.errorMessage = '';
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => this.router.navigate(['/produtos']),
      error: () => this.errorMessage = 'Não foi possível criar a conta. Verifique os dados.'
    });
  }
}

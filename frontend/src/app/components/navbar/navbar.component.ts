import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  termoBusca: string = '';

  constructor(private router: Router, public authService: AuthService) {}

  buscar() {
    if (this.termoBusca.trim()) {
      this.router.navigate(['/produtos'], { queryParams: { busca: this.termoBusca } });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutoService, Produto } from '../../services/produtos.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService, public authService: AuthService) {}

  ngOnInit() {
    this.produtoService.listar({ page: 1, perPage: 8, sortBy: 'created_at', sortDir: 'desc' }).subscribe({
      next: (res) => this.produtos = res.data
    });
  }

  get produtosDestaque() {
    return this.produtos.slice(0, 5);
  }
}

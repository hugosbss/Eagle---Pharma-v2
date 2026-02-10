import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProdutoService, Produto } from '../../services/produtos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-produto',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {
  produtos: Produto[] = [];
  ultimosProdutos: Produto[] = [];
  paginaAtual = 1;
  produtosPorPagina = 10;
  modalAberto = false;
  termoBusca: string = '';
  errorMessage = '';

  novoProduto: Produto = {
    id: 0,
    nome: '',
    descricao: '',
    preco: 0,
    quantidade_estoque: 0,
    categoria: ''
  };

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.carregarProdutos();
    this.carregarUltimos();
  }

  carregarProdutos() {
    this.produtoService.listar({ page: this.paginaAtual, perPage: this.produtosPorPagina }).subscribe({
      next: (res) => {
        this.produtos = res.data;
      },
      error: () => this.errorMessage = 'Erro ao carregar produtos.'
    });
  }

  carregarUltimos() {
    this.produtoService.listar({ page: 1, perPage: 6, sortBy: 'created_at', sortDir: 'desc' }).subscribe({
      next: (res) => this.ultimosProdutos = res.data,
      error: () => {
        this.errorMessage = 'Erro ao carregar produtos recentes.';
      }
    });
  }

  get produtosPaginados(): Produto[] {
    const inicio = (this.paginaAtual - 1) * this.produtosPorPagina;
    return this.produtos.slice(inicio, inicio + this.produtosPorPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.produtos.length / this.produtosPorPagina);
  }

  mudarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
    }
  }

  abrirModal() { this.modalAberto = true; }
  fecharModal() { this.modalAberto = false; }

  criarProduto() {
    this.errorMessage = '';
    if (!this.novoProduto.nome || !this.novoProduto.preco) {
      this.errorMessage = 'Nome e preço são obrigatórios.';
      return;
    }

    this.produtoService.criar(this.novoProduto).subscribe({
      next: () => {
        this.carregarProdutos();
        this.carregarUltimos();
        this.fecharModal();
        this.novoProduto = { id: 0, nome: '', descricao: '', preco: 0, quantidade_estoque: 0, categoria: '' };
      },
      error: () => {
        this.errorMessage = 'Erro ao salvar produto.';
      }
    });
  }
}

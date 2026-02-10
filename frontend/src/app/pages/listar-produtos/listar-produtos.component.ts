import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProdutoService, Produto } from '../../services/produtos.service';


@Component({
  selector: 'app-produtos-listar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  paginaAtual = 1;
  produtosPorPagina = 10;
  totalPaginas = 1;
  totalItens = 0;

  busca = '';
  categoria = '';
  minPreco?: number;
  maxPreco?: number;
  sortBy = 'created_at';
  sortDir: 'asc' | 'desc' = 'desc';
  errorMessage = '';

  modalEditar = false;
  modalExcluir = false;


  produtoSelecionado?: Produto;

  buscar() {
    this.paginaAtual = 1;
    this.carregarProdutos();
  }

  limparFiltros() {
    this.busca = '';
    this.termoBusca = '';
    this.categoria = '';
    this.minPreco = undefined;
    this.maxPreco = undefined;
    this.sortBy = 'created_at';
    this.sortDir = 'desc';
    this.produtosPorPagina = 10;
    this.paginaAtual = 1;
    this.carregarProdutos();
  }


  abrirModalEditar(produto: Produto) {
    this.produtoSelecionado = { ...produto };
    this.modalEditar = true;
  }

  salvarProduto() {
    if (this.produtoSelecionado?.id) {
      this.produtoService.atualizar(this.produtoSelecionado.id, this.produtoSelecionado)
        .subscribe({
          next: () => {
            this.carregarProdutos();
            this.fecharModais();
          },
          error: () => this.errorMessage = 'Erro ao atualizar produto.'
        });
    }
  }

  abrirModalExcluir(produto: Produto) {
    this.produtoSelecionado = produto;
    this.modalExcluir = true;
  }

  confirmarExclusao() {
    if (this.produtoSelecionado?.id) {
      this.produtoService.excluir(this.produtoSelecionado.id)
        .subscribe({
          next: () => {
            this.carregarProdutos();
            this.fecharModais();
          },
          error: () => this.errorMessage = 'Erro ao excluir produto.'
        });
    }
  }

  fecharModais() {
    this.modalEditar = false;
    this.modalExcluir = false;
    this.produtoSelecionado = undefined;
  }

  termoBusca: string = '';

  constructor(private produtoService: ProdutoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.termoBusca = params['busca'] || '';
      if (this.termoBusca) {
        this.busca = this.termoBusca;
      }
      this.paginaAtual = 1;
      this.carregarProdutos();
    });
  }

  carregarProdutos() {
    this.errorMessage = '';
    this.produtoService.listar({
      search: this.busca || this.termoBusca,
      page: this.paginaAtual,
      perPage: this.produtosPorPagina,
      categoria: this.categoria,
      minPreco: this.minPreco,
      maxPreco: this.maxPreco,
      sortBy: this.sortBy,
      sortDir: this.sortDir
    }).subscribe({
      next: (res) => {
        this.produtos = res.data;
        this.totalPaginas = res.last_page;
        this.totalItens = res.total;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar produtos.';
      }
    });
  }
  
  mudarPagina(pagina: number) {
    if (pagina < 1) this.paginaAtual = 1;
    else if (pagina > this.totalPaginas) this.paginaAtual = this.totalPaginas;
    else this.paginaAtual = pagina;
    this.carregarProdutos();
  }
}

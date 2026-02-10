import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  quantidade_estoque?: number;
  categoria?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private apiUrl = 'http://localhost:8000/api/produtos';

  constructor(private http: HttpClient) {}

  listar(params?: {
    search?: string;
    page?: number;
    perPage?: number;
    categoria?: string;
    minPreco?: number;
    maxPreco?: number;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
  }): Observable<PaginatedResponse<Produto>> {
    let httpParams = new HttpParams();

    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.page) httpParams = httpParams.set('page', String(params.page));
    if (params?.perPage) httpParams = httpParams.set('per_page', String(params.perPage));
    if (params?.categoria) httpParams = httpParams.set('categoria', params.categoria);
    if (params?.minPreco !== undefined) httpParams = httpParams.set('min_preco', String(params.minPreco));
    if (params?.maxPreco !== undefined) httpParams = httpParams.set('max_preco', String(params.maxPreco));
    if (params?.sortBy) httpParams = httpParams.set('sort_by', params.sortBy);
    if (params?.sortDir) httpParams = httpParams.set('sort_dir', params.sortDir);

    return this.http.get<PaginatedResponse<Produto>>(this.apiUrl, { params: httpParams });
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  criar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  atualizar(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obter(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }
}

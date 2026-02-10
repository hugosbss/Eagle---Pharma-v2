import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastrarProdutoComponent } from './pages/cadastrar-produto/cadastrar-produto.component';
import { ListarProdutosComponent } from './pages/listar-produtos/listar-produtos.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [authGuard] },
  { path: 'produtos', component: ListarProdutosComponent, canActivate: [authGuard] },
  { path: 'cadastrar', component: CadastrarProdutoComponent, canActivate: [authGuard] },
];

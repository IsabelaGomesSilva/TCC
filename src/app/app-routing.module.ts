import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './Views/cadastro/cadastro.component';
import { CategoriaComponent } from './Views/categoria/categoria.component';
import { ClienteComponent } from './Views/cliente/cliente.component';

import { FornecedorComponent } from './Views/fornecedor/fornecedor.component';
import { HomeComponent } from './Views/home/home.component';
import { LoginComponent } from './Views/login/login.component';
import { PagamentoComponent } from './Views/pagamento/pagamento.component';
import { PedidoComponent } from './Views/pedido/pedido.component';
import { ProdutoComponent } from './Views/produto/produto.component';


const routes: Routes = [
  {path:'home',component: HomeComponent},
  {path:'categoria',component: CategoriaComponent},
  {path:'',component: LoginComponent},
  {path:'cadastro',component: CadastroComponent},
  {path:'cliente',component:ClienteComponent},
  {path:'pedido',component:PedidoComponent},
  {path:'produto',component:ProdutoComponent},
  {path:'fornecedor',component:FornecedorComponent},
  {path:'pagamento',component:PagamentoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Views/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaComponent } from './Views/categoria/categoria.component';
import { LoginComponent } from './Views/login/login.component';
import { CadastroComponent } from './Views/cadastro/cadastro.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MenuComponent } from './Views/menu/menu.component';
import { ClienteComponent } from './Views/cliente/cliente.component';

import { PagamentoComponent } from './Views/pagamento/pagamento.component';
import { PedidoComponent } from './Views/pedido/pedido.component';
import { ProdutoComponent } from './Views/produto/produto.component';
import { FornecedorComponent } from './Views/fornecedor/fornecedor.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriaComponent,
    LoginComponent,
    CadastroComponent,
    MenuComponent,
    ClienteComponent,
    PagamentoComponent,
    PedidoComponent,
    ProdutoComponent,
    FornecedorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(maskConfigFunction),
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Order } from 'src/app/Models/Order';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  compras:any;
  valorTotalCompra:any;
  dataCompra:any;
 
  
  clientes:any;
  fornecedores:any;
  valorTotalPedido:any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getClientes();
    this.getFornecedores();
  }
  getClientes(){
    this.http.get(`${environment.apibaseURL}api/Client`)
    .subscribe(response => {
      this.clientes = response
      console.log(this.clientes);

    });
  }
  getFornecedores(){
    this.http.get(`${environment.apibaseURL}api/Supplier`)
    .subscribe(response => {
      this.fornecedores = response
      console.log(this.fornecedores);

    });
  }
}
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from 'src/app/Models/Order';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  pedidos:any;
  valorTotal:any;
  data:any;
  pagament:any;
  cliente:any;
  order!:Order;
  botaoAdd !: boolean;
  botaoUpdate !: boolean;
  @ViewChild('orderForm') form !: NgForm;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPedidos();
  }

  postPedidos() {
    var order = {valueTotal:this.valorTotal,date:this.data,
      idPayment:this.pagament,idClient:this.cliente} ;

      this.http.post(`${environment.apibaseURL}api/Order`,order)
      .subscribe(
        resultado => {
          console.log(resultado);
          this.getPedidos();
         
          let ref = document.getElementById('closer')
          ref?.click();
          
        },
        erro => {
          if(erro.status == 400) {
            console.log(erro);
          }
        }
      );
    
  }

  getPedidos(){
    this.http.get(`${environment.apibaseURL}api/Order`)
    .subscribe(response => {
      this.pedidos = response
      console.log(this.pedidos);

    });
  }

  excluir(order:Order,template:any){
    console.log(order);
    this.order=order;
    
}

excluirPedido(template:any){
  this.http.delete(`${environment.apibaseURL}api/Order/${this.order.id}`)
            .subscribe(
              () => {
                this.getPedidos();
                let ref = document.getElementById('cancel')
                ref?.click();
                
              },
              erro => {
                if(erro.status == 404) {
                  console.log('Pedido não localizado.');
                }
              }
            );
}

editarPedido(order:Order,template:any){
  this.botaoAdd = false;
  this.botaoUpdate = true;
  console.log(order);
  this.order=order;

}

editarPedidoUpdate(template:any){
  var order = {id:this.order.id,valueTotal:this.valorTotal,date:this.data,
    idPayment:this.pagament,idClient:this.cliente} ;

  this.http.put(`${environment.apibaseURL}api/Order/${order.id}`, order)
  .subscribe(
    resultado => {
      console.log(resultado);
      this.getPedidos();
      this.form.reset();
      let ref = document.getElementById('closer');
      ref?.click();
      
    },
    erro => {
      if(erro.status == 400) {
        console.log(erro);
      }
    }
  );
}

escondeBotao(){
  this.botaoAdd = true;
  this.botaoUpdate = false;
}
}

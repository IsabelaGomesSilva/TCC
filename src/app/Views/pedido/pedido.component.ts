import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from 'src/app/Models/Order';
import { OrderDetails } from 'src/app/Models/OrderDetails';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  detalhespedidos:any;
  pedidos:any;
  data:any;
  pagament:any;
  cliente:any; 
  produto:any;
  quantd:any;
  valorUni:any;
  valorTotal:any;
  filterOrder:any;
  detalhepedido:any;
  

  orderdetails!: OrderDetails;
  order!:Order;
  botaoAdd !: boolean;
  botaoUpdate !: boolean;
  @ViewChild('orderForm') form !: NgForm;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
   
    this.getPedidos();
   
  }

  postPedidos() {
    var order = {date:this.data,idPayment:this.pagament,idClient:this.cliente,idProduct:this.produto,amountOrder:this.quantd, 
      valueUni:this.valorUni,valueTotal:this.valorTotal } ;

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
  postDetalhePedido() {
    var orderdetails = { } ;

      this.http.post(`${environment.apibaseURL}api/Order`,orderdetails)
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


getOrderDetails(pedido:OrderDetails, detalhepedido:OrderDetails ,template:any ){
 this.orderdetails = pedido;
 console.log(this.orderdetails.id);
  
  this.http.get(`${environment.apibaseURL}api/OrderDetails/OrderDetailsId`)
    .subscribe(response => {
      
      this.detalhespedidos = response
      console.log(this.detalhespedidos);
    });
  
}

// mostrarDetalhes(template:any){
//   var pedido = {id:this.orderdetails.id}

//   this.http.get(`${environment.apibaseURL}api/OrderDetails/${pedido.id}`)
//     .subscribe(response => {
//       this.detalhespedidos = response
//       console.log(this.detalhespedidos);
//     });
// }
  

  // getOrderDetails(){
  //   var ordedetails = {id:this.orderdetails.id}
  //   this.http.get(`${environment.apibaseURL}api/OrderDetails/${orderdetails.id}`)
  //   .subscribe(response => {
  //     this.detalhespedidos = response
  //     console.log(this.detalhespedidos);
  //   });
  // }

  excluir(order:Order,template:any){
    console.log(order);
    this.order=order;
    
}

// filter(pedido:any){
//   this.filterOrder == this.pedidos.filter((a:any) => {
//     if(a.pedidos == pedido )
//     {
//       return a;
//     }
//   })
// }

editarPedido(order:Order,template:any){
  this.botaoAdd = false;
  this.botaoUpdate = true;
  console.log(order);
  this.order=order;

}

editarPedidoUpdate(template:any){
  var order = {id:this.order.id,date:this.data,idPayment:this.pagament,idClient:this.cliente,idProduct:this.produto,amountOrder:this.quantd, valueUni:this.valorUni,valueTotal:this.valorTotal} ;

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

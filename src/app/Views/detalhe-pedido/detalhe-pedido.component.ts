import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from 'src/app/Models/OrderDetails';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhe-pedido',
  templateUrl: './detalhe-pedido.component.html',
  styleUrls: ['./detalhe-pedido.component.css']
})
export class DetalhePedidoComponent implements OnInit {

  detPedidos:any;
  produto:any;
  compra:any;
  valorUni:any;
  quantd:any;
  subTotal:any;
  pagament:any;
  orderDetails!:OrderDetails;
  botaoAdd !: boolean;
  botaoUpdate !: boolean;
  @ViewChild('detPedidosForm') form !: NgForm;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDetPedidos();
  }

  postDetPedidos() {
    var orderDetails = {idOrder:this.compra,idProduct:this.produto,amountOrder:this.quantd,
      valueUni:this.valorUni,subTotal:this.subTotal} ;

      this.http.post(`${environment.apibaseURL}api/OrderDetails`, orderDetails)
      .subscribe(
        resultado => {
          console.log(resultado);
          this.getDetPedidos();
         
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

  getDetPedidos(){
    this.http.get(`${environment.apibaseURL}api/OrderDetails`)
    .subscribe(response => {
      this.detPedidos = response
      console.log(this.detPedidos)

    });
  }

  excluir(orderDetails:OrderDetails,template:any){
    console.log(orderDetails);
    this.orderDetails=orderDetails;
    
}

excluirDetPedido(template:any){
  this.http.delete(`${environment.apibaseURL}api/OrderDetails/${this.orderDetails.id}`)
            .subscribe(
              () => {
                this.getDetPedidos();
                let ref = document.getElementById('cancel')
                ref?.click();
                
              },
              erro => {
                if(erro.status == 404) {
                  console.log('Detalhe do Pedido não localizado.');
                }
              }
            );
}

editarDetPedido(orderDetails:OrderDetails,template:any){
  this.botaoAdd = false;
  this.botaoUpdate = true;
  console.log(orderDetails);
  this.orderDetails=orderDetails;

}

editarDetPedidoUpdate(template:any){
  var orderDetails = {id:this.orderDetails.id,idOrder:this.compra,idProduct:this.produto,
    amountOrder:this.quantd,valueUni:this.valorUni,subTotal:this.subTotal} ;

  this.http.put(`${environment.apibaseURL}api/OrderDetails/${orderDetails.id}`, orderDetails)
  .subscribe(
    resultado => {
      console.log(resultado);
      this.getDetPedidos();
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

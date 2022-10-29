import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Buy } from 'src/app/Models/Buy';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  compras:any;
  valorTotal:any;
  data:any;
  produto:any;
  fornecedor:any;
  buy!:Buy;
  botaoAdd !: boolean;
  botaoUpdate !: boolean;
  @ViewChild('buyForm') form !: NgForm;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCompras();
  }

  postCompras() {
    var buy = {date:this.data,valueTotal:this.valorTotal,
      idProduct:this.produto,idProvider:this.fornecedor} ;

      this.http.post(`${environment.apibaseURL}api/Buy`,buy)
      .subscribe(
        resultado => {
          console.log(resultado);
          this.getCompras();
         
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

  getCompras(){
    this.http.get(`${environment.apibaseURL}api/Buy`)
    .subscribe(response => {
      this.compras = response
      console.log(this.compras);

    });
  }

  excluir(compra:Buy,template:any){
    console.log(compra);
    this.buy=compra;
    
}

excluirCompra(template:any){
  this.http.delete(`${environment.apibaseURL}api/Buy/${this.buy.id}`)
            .subscribe(
              () => {
                this.getCompras();
                let ref = document.getElementById('cancel')
                ref?.click();
                
              },
              erro => {
                if(erro.status == 404) {
                  console.log('Compra não localizada.');
                }
              }
            );
}

editarCompra(compra:Buy,template:any){
  this.botaoAdd = false;
  this.botaoUpdate = true;
  console.log(compra);
  this.buy=compra;

}

editarCompraUpdate(template:any){
  var buy = {id:this.buy.id,date:this.data,valueTotal:this.valorTotal,
    idProduct:this.produto,idProvider:this.fornecedor} ;

  this.http.put(`${environment.apibaseURL}api/Buy/${buy.id}`, buy)
  .subscribe(
    resultado => {
      console.log(resultado);
      this.getCompras();
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

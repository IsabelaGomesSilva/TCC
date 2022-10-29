import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Supplier } from 'src/app/Models/Supplier';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {

  fornecedores:any;
  cnpj:any;
  nome:any;
  fone:any;
  email:any;
  nomeEmpresa:any;
  supplier!:Supplier;
  botaoAdd !: boolean;
  botaoUpdate !: boolean;
  @ViewChild('supplierForm') form !: NgForm;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getFornecedores();
  }

  postFornecedores() {
    var supplier = {name:this.nome,cnpj:this.cnpj,phone:this.fone,email:this.email,nameCompany:this.nomeEmpresa} ;

      this.http.post(`${environment.apibaseURL}api/Supplier`, supplier)
      .subscribe(
        resultado => {
          console.log(resultado);
          this.getFornecedores();
         
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

  getFornecedores(){
    this.http.get(`${environment.apibaseURL}api/Supplier`)
    .subscribe(response => {
      this.fornecedores = response
      console.log(this.fornecedores)

    });
  }

  excluir(supplier:Supplier,template:any){
    console.log(this.supplier);
    this.supplier=supplier;
    
}

excluirFornecedor(template:any){
  this.http.delete(`${environment.apibaseURL}api/Supplier/${this.supplier.id}`)
            .subscribe(
              () => {
                this.getFornecedores();
                let ref = document.getElementById('cancel')
                ref?.click();
                
              },
              erro => {
                if(erro.status == 404) {
                  console.log('Fornecedor não localizado.');
                }
              }
            );
}

editarFornecedor(supplier:Supplier,template:any){
  this.botaoAdd = false;
  this.botaoUpdate = true;
  console.log(supplier);
  this.supplier=supplier;

}

editarFornecedorUpdate(template:any){
  var supplier = {id:this.supplier.id,name:this.nome,cnpj:this.cnpj,phone:this.fone,email:this.email,nameCompany:this.nomeEmpresa} ;
  this.http.put(`${environment.apibaseURL}api/Supplier/${supplier.id}`, supplier)
  .subscribe(
    resultado => {
      console.log(resultado);
      this.getFornecedores();
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

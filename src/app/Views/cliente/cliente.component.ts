import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/Models/Client';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  
})


export class ClienteComponent implements OnInit {
  clientes:any;
  nome:any;
  aniv:any;
  cpf:any;
  fone:any;
  email:any;
  senha:any;
  client!:Client;
  botaoAdd !: boolean;
  botaoUpdate !: boolean;
  @ViewChild('clientForm') form !: NgForm;

 

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getClientes();
  }


  postClientes() {
    var client = {name:this.nome,cpf:this.cpf,birth:this.aniv,phone:this.fone,
      email:this.email,password:this.senha} ;

      this.http.post(`${environment.apibaseURL}api/Client`, client)
      .subscribe(
        resultado => {
          console.log(resultado);
          this.getClientes();
         
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


  getClientes(){
    this.http.get(`${environment.apibaseURL}api/Client`)
    .subscribe(response => {
      this.clientes = response
      console.log(this.clientes)

    });
  }

  excluir(cliente:Client,template:any){
    console.log(cliente);
    this.client=cliente;
    
}

  excluirCliente(template:any){
    this.http.delete(`${environment.apibaseURL}api/Client/${this.client.id}`)
              .subscribe(
                () => {
                  this.getClientes();
                  let ref = document.getElementById('cancel')
                  ref?.click();
                  
                },
                erro => {
                  if(erro.status == 404) {
                    console.log('Cliente não localizado.');
                  }
                }
              );
  }


  editarCliente(cliente:Client,template:any){
     this.botaoAdd = false;
     this.botaoUpdate = true;
     console.log(cliente);
     this.client=cliente;

}

editarClienteUpdate(template:any){
  var cliente = {id:this.client.id,name:this.nome,cpf:this.cpf,birth:this.aniv,phone:this.fone,
    email:this.email,password:this.senha} ;

  this.http.put(`${environment.apibaseURL}api/Client/${cliente.id}`, cliente)
  .subscribe(
    resultado => {
      console.log(resultado);
      this.getClientes();
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

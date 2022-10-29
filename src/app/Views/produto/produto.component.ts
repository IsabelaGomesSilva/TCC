import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/Models/Product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})

export class ProdutoComponent implements OnInit {
  produtos:any;
  public arquivoSelecionado!:File ;
  nome:any;
  desc:any;
  preco:any;
  imagem:any;
  categoria:any;
  quantidade:any;
  fornecedor:any;
  product!:Product;
  botaoAdd !: boolean;
  botaoUpdate !: boolean;
  @ViewChild('produtoform') form !: NgForm;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProdutos();
  }

  postProdutos() {
    var product = {name:this.nome,description:this.desc,price:this.preco,categoryId:this.categoria,
      amount:this.quantidade,idsupplier:this.fornecedor,  UrlArquivo:this.imagem} ;

      this.http.post(`${environment.apibaseURL}api/Product`, product)
      .subscribe(
        resultado => {
          console.log(resultado);
          this.getProdutos();
   
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

  getProdutos(){
    this.http.get(`${environment.apibaseURL}api/Product`)
    .subscribe(response => {
      this.produtos = response
      console.log(this.produtos)
    });
  }

  excluir(produto:Product,template:any){
    console.log(produto);
    this.product=produto;
    }

  excluirProduto(template:any){
    this.http.delete(`${environment.apibaseURL}api/Product/${this.product.id}`)
              .subscribe(
                () => {
                  this.getProdutos();
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


  editarProduto(produto:Product,template:any)
    {
     this.botaoAdd = false;
     this.botaoUpdate = true;
     console.log(produto);
     this.product=produto;
    }

editarProdutoUpdate(template:any){
  var produto = {id:this.product.id,name:this.nome,description:this.desc,price:this.preco,categoryId:this.categoria,
    amount:this.quantidade,idprovider:this.fornecedor,  UrlArquivo:this.imagem} ;

  this.http.put(`${environment.apibaseURL}api/Product/${produto.id}`, produto)
  .subscribe(
    resultado => {
      console.log(resultado);
      this.getProdutos();
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

   escondeBotao() {
    this.botaoAdd = true;
    this.botaoUpdate = false;
   }
 
   inputChange(files:FileList){

    this.imagem = files.item(0);

    this.http.post<string>(`${environment.apibaseURL}api/Product`, this.imagem)
         .subscribe(
            nomeArquivo => 
            {
                this.product.UrlArquivo = nomeArquivo;
                console.log(nomeArquivo);
            },
            e =>{
              console.log(e.error);
            }
         )
   } 
}
import { HttpClient, HttpEventType} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from 'src/app/Models/OrderDetails';
import { Product } from 'src/app/Models/Product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})

export class ProdutoComponent implements OnInit {
  produtos:any;
  public arquivoSelecionado!:File | null ;
  nome:any;
  desc:any;
  preco:any;
  imagem:any;
  categoria:any;
  categories:any;
  quantidade:any;
  fornecedor:any;
  fornecedores:any;
 
  product!:Product;
//  selectedFile!:  File ;
  botaoAdd !: boolean;
  botaoUpdate !: boolean;

  @ViewChild('produtoform') form !: NgForm;

  constructor(private http: HttpClient ) { }
  
  ngOnInit(): void {
    this.getProdutos();
    this.getCategories();
    this.getFornecedor();
  }
  
  enviarArquivo(files: File | null)
  {
    return this.http.post(`${environment.apibaseURL}api/Product`,files);
  }

   getCategories () {
   this.http.get(`${environment.apibaseURL}api/Category`)
   .subscribe(response => {
    this.categories = response
    console.log(this.categories)})
   }

   getFornecedor (){
    this.http.get(`${environment.apibaseURL}api/Supplier`)
    .subscribe(response => {
      this.fornecedores = response
      console.log(this.fornecedores)})
   }
   
  

  // onFileSelected(event: any){
   
  //   this.selectedFile = <File>event.target.files[0];
  //   console.log(this.selectedFile)
  // }
  // onUpload(){
  //  const fd = new FormData();
  //  fd.append('image', this.selectedFile, this.selectedFile.name )

  //  this.http.post(`${environment.apibaseURL}api/Product`, fd, {
  //   reportProgress:true,
  //   observe: 'events'
  //  } )
  //  .subscribe(event => {
  //   if(event.type === HttpEventType.UploadProgress)
  //   {
  //     console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100)  + '%')
  //     }else if (event.type === HttpEventType.Response) {
  //       console.log(event);
  //     }
   
  //   console.log(this.selectedFile)
  //  }

  //  )
  // }
 

// html (change)="inputChange($any($event.target).files)"
  postProdutos() {
    var product = {name:this.nome,description:this.desc,price:this.preco,categoryId:this.categoria,
      amount:this.quantidade,idSupplier:this.fornecedor,  UrlArquivo:this.imagem} ;

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
    amount:this.quantidade,idSupplier:this.fornecedor,  UrlArquivo:this.imagem} ;

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
    console.log(files);
    console.log(files.item(0))

    console.log(files.item(0)?.name)

    this.arquivoSelecionado = files.item(0);
    this.enviarArquivo(this.arquivoSelecionado)

         .subscribe(
            nomeArquivo => 
            {
                this.form.value.UrlArquivo = nomeArquivo;
                console.log('nomeArquivo');
                console.log(nomeArquivo);
            },
            e =>{
              console.log(e.error);
            }
         )
   } 
}
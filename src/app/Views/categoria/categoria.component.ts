import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {HttpBackend, HttpClient, HttpClientModule} from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/Models/Category';
import { ToastrService } from 'ngx-toastr';
import { ThisReceiver } from '@angular/compiler'; 
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categories: any;
  category!:Category;
  desc:any;
  bodyDeletar:any;
  editMode: boolean = false;
  currentCategoryId!: string;
  botaoAdd !: boolean;
  botaoUpdate !: boolean;
  
  @ViewChild('categoryForm') form !: NgForm;

 

  constructor( private http: HttpClient,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCategories();
     
  }


  postCategories() {
    var category = {description:this.desc} ;

      this.http.post(`${environment.apibaseURL}api/Category`, category)
      .subscribe(
        resultado => {
          console.log(resultado);
          this.getCategories();
          this.desc='';
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


  getCategories(){
    this.http.get(`${environment.apibaseURL}api/Category`)
    .subscribe(response => {
      this.categories = response
      console.log(this.categories)

    });
  }

excluir(categoria:Category,template:any){
      console.log(categoria);
      this.category=categoria;
      
}

  excluirCategory(template:any) {
    this.http.delete(`${environment.apibaseURL}api/Category/${this.category.id}`)
              .subscribe(
                () => {
                  this.getCategories();
                  let ref = document.getElementById('cancel')
                  ref?.click();
                  
                },
                erro => {
                  if(erro.status == 404) {
                    console.log('Produto não localizado.');
                  }
                }
              );
  }

  editarCategory(categoria:Category,template:any){
      this.botaoAdd = false;
      this.botaoUpdate = true;
       console.log(categoria);
       this.category=categoria; 
  }
    
  editarCategoryUpdate(template:any){
    var categorie = {id:this.category.id,description: this.desc} ;

    this.http.put(`${environment.apibaseURL}api/Category/${categorie.id}`, categorie)
    .subscribe(
      resultado => {
        console.log(resultado);
        this.getCategories();
        this.desc='';
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
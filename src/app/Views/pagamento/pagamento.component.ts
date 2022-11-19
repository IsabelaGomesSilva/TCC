import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {HttpBackend, HttpClient, HttpClientModule} from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/Models/Category';
import { ToastrService } from 'ngx-toastr';
import { ThisReceiver } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import { Payment } from 'src/app/Models/Payment';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {
  pagamentos:any;
  payment!:Payment;
  formValue!:FormGroup;

  constructor(private formbuilder: FormBuilder, private http:HttpClient) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      descricao: ['']
    })
    this.getPagamentos();
  }
  
  
  getPagamentos () {
    this.http.get(`${environment.apibaseURL}api/Payment`)
    .subscribe(response => {
      this.pagamentos= response
     console.log(this.pagamentos)})
    }

  postPagamento() {
    this.payment.description= this.formValue.value.descricao ;

      this.http.post(`${environment.apibaseURL}api/Payment`, this.payment)
      .subscribe(
        resultado => {
          console.log(resultado);
         
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

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {HttpBackend, HttpClient, HttpClientModule} from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  desc: any;
  pagamentos: any;
  payment!:Payment;
  botaoAdd!: boolean;
  botaoUpdate!: boolean;
  bodyDeletar:any;
  editMode: boolean = false;
  currentPaymentId!: string;
  
  @ViewChild('paymentForm') form !: NgForm;
formValue: any;

  constructor( private http: HttpClient,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPagamentos();
     
  }


  postPagamentos() {
    var payment = {description:this.desc} ;

      this.http.post(`${environment.apibaseURL}api/Payment`, payment)
      .subscribe(
        resultado => {
          console.log(resultado);
          this.getPagamentos();
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


  getPagamentos(){
    this.http.get(`${environment.apibaseURL}api/Payment`)
    .subscribe(response => {
      this.pagamentos = response
      console.log(this.pagamentos)

    });
  }

excluir(pagamento:Payment,template:any){
      console.log(pagamento);
      this.payment=pagamento;
      
}

  excluirPagamento(template:any) {
    this.http.delete(`${environment.apibaseURL}api/Payment/${this.payment.id}`)
              .subscribe(
                () => {
                  this.getPagamentos();
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

  editarPayment(pagamento:Payment,template:any){
      this.botaoAdd = false;
      this.botaoUpdate = true;
       console.log(pagamento);
       this.payment=pagamento; 
  }
    
  editarPaymentUpdate(template:any){
    var pagamento = {id:this.payment.id,description: this.desc} ;

    this.http.put(`${environment.apibaseURL}api/Payment/${pagamento.id}`, pagamento)
    .subscribe(
      resultado => {
        console.log(resultado);
        this.getPagamentos();
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

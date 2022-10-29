import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhe-compra',
  templateUrl: './detalhe-compra.component.html',
  styleUrls: ['./detalhe-compra.component.css']
})
export class DetalheCompraComponent implements OnInit {

  detCompras:any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDetCompras();
  }

  getDetCompras(){
    this.http.get(`${environment.apibaseURL}api/Buy`)
    .subscribe(response => {
      this.detCompras = response
      console.log(this.detCompras);

    });
  }

}

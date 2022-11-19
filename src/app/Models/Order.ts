import { DecimalPipe } from "@angular/common";

export class Order{
    id:string='';
    date!:Date;
    idPayment:string='';
    idClient:string='';
    idProduct:string='';
    valueTotal!: DecimalPipe;
}
import { DecimalPipe } from "@angular/common";

export class Order{
    id:string='';
    valueTotal!: DecimalPipe;
    date!:Date;
    idPayment:string='';
    idClient:string='';
}
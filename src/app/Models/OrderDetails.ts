import { DecimalPipe } from "@angular/common";

export class OrderDetails{
    id:string='';
  idOrder:string='';
  idProduct:string='';
  amountOrder!: DecimalPipe;
  myProperty!: DecimalPipe;
  valueUni!: DecimalPipe;
  subTotal!: DecimalPipe;
}
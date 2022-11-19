import { DecimalPipe } from "@angular/common";

export class OrderDetails{
    id!:string
    idProduct:string='';
    amountOrder!:Number;
    valueUni!: DecimalPipe;
    subTotal!: DecimalPipe;
}
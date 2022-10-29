import { DecimalPipe } from "@angular/common";

export class Buy{
    id!:string;
    date!:Date;
    valueTotal!:DecimalPipe;
    idProduct!:string;
    idProvider!:string;

}
import { DecimalPipe } from "@angular/common";

export class Product{
    id:string='';
    name!:string;
    description:string='';
    price!:DecimalPipe;
    categoryId!:DecimalPipe;
    amount!:DecimalPipe;
    IdSupplier:string='';
    UrlArquivo:string='';
}

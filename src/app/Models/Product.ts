import { DecimalPipe } from "@angular/common";

export class Product{
    id:string='';
    Name:string='';
    Description:string='';
    Price!:DecimalPipe;
    CategoryId!:DecimalPipe;
    Amount!:DecimalPipe;
    IdSupplier:string='';
    UrlArquivo:string='';
}

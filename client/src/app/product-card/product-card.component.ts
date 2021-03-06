import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  sellerProduct: Product;

  //@Output()
  //sellerProductUpdated = new EventEmitter();

  constructor() {
    // initilize so unit tests does not give name = undefined
    this.sellerProduct = { id: undefined, name: '', price: undefined, quantitySold: undefined, quantityInStock: undefined, imagePath: '' };
  }

  ngOnInit() {

  }

  /*onEdit() {
    this.sellerProduct.name = "smuuu";
    this.sellerProductUpdated.emit(this.sellerProduct);
  }*/
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Seller } from './sellers.service';

@Injectable()
export class MockService {

  sellerList: Seller[];

  constructor() { 
    this.sellerList.push({id: 0, name: 'Kalli', category: 'Womens Clothing', imagePath: 'http://imgur.com/gallery/etjgJ2D'});
    this.sellerList.push({id: 1, name: 'Keli', category: 'Pandas', imagePath: 'http://imgur.com/r/panda/xhE1cN4'});
    this.sellerList.push({id: 2, name: 'Danni', category: 'Cats', imagePath: 'http://imgur.com/r/cats/xXYgX7h'});    
  }

  getSellers() : Observable<Seller[]> {
    return Observable.of(this.sellerList);
  }

  
}
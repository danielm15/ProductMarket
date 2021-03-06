/* tslint:disable:no-unused-variable */
import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { Headers, BaseRequestOptions, Response, HttpModule, Http, XHRBackend, RequestMethod } from '@angular/http';
import { ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { SellersService } from './sellers.service';
import { Seller } from './interfaces/seller';
import { Product } from './interfaces/product';
import { } from 'jasmine';

describe('SellersService', () => {

  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SellersService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
        }
      ],
      imports: [ HttpModule ]
    });
    mockBackend = getTestBed().get(MockBackend);
  });


  it('should get sellers', async(() => {
    let sellersService: SellersService = getTestBed().get(SellersService);
    
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: [
              {
                id: 2,
                name: 'Danni',
                category: 'Cats',
                imagePath: 'http://imgur.com/r/cats/xXYgX7h'
              }]
          }
          )));
      });

      sellersService.getSellers().subscribe((seller) => {
          expect(seller.length).toBe(1);
          expect(seller[0].id).toBe(2);
          expect(seller[0].name).toBe('Danni');
          expect(seller[0].category).toBe('Cats');
          expect(seller[0].imagePath).toBe('http://imgur.com/r/cats/xXYgX7h');
      });
  }));

  it('should get single seller by id', async(() => {
    let sellersService: SellersService = getTestBed().get(SellersService);
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        expect(connection.request.url).toMatch('http://localhost:5000/api/sellers/2');
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: {
                id: 2,
                name: 'Keli',
                category: 'Pandas',
                imagePath: 'http://imgur.com/r/panda/xhE1cN4'
              }
            }))
        );
      }
    );
    
    sellersService.getSellerById(2).subscribe((seller) => {
      expect(seller.id).toBe(2);
      expect(seller.name).toBe('Keli');
      expect(seller.category).toBe('Pandas');
      expect(seller.imagePath).toBe('http://imgur.com/r/panda/xhE1cN4');
    });

  }));

  it('should get products by seller id', async(() => {
    let sellersService: SellersService = getTestBed().get(SellersService);
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        expect(connection.request.url).toMatch('http://localhost:5000/api/sellers/1/products');
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              body: [{
                  id: 1,
                  name: 'Ullarvettlingar',
                  price: 1899,
                  quantitySold: 500,
                  quantityInStock: 12,
                  imagePath: 'http://i.imgur.com/MZOmRnH.jpg'
              }]
            }))
        );
      }
    );

    sellersService.getProductsById(1).subscribe((product) => {
      expect(product.length).toBe(1);
      expect(product[0].id).toBe(1);
      expect(product[0].name).toBe('Ullarvettlingar');
      expect(product[0].price).toBe(1899);
      expect(product[0].quantitySold).toBe(500);
      expect(product[0].quantityInStock).toBe(12);
      expect(product[0].imagePath).toBe('http://i.imgur.com/MZOmRnH.jpg');
    })
  }));

  it('addOrEditSeller() should add seller', async (() => {
    let sellersService: SellersService = getTestBed().get(SellersService);

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        expect(connection.request.url).toMatch('http://localhost:5000/api/sellers');

        connection.mockRespond(
          new Response(
            new ResponseOptions({
              status: 201
            })
          ));
      });

    let newSeller: Seller = {
      id: undefined,
      name: 'Danni',
      category: 'Spaceships',
      imagePath: 'http://imgur.com/r/panda/xhE1cN4'
    }
      
    sellersService.addOrEditSeller(newSeller).subscribe((statusCode) => {
      expect(statusCode).toBeDefined();
      expect(statusCode).toEqual(201);
    });
  }));

  it('addOrEditSeller() should update seller', async (() => {
    let sellersService: SellersService = getTestBed().get(SellersService);

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        expect(connection.request.url).toMatch('http://localhost:5000/api/sellers/5');

        connection.mockRespond(
          new Response(
            new ResponseOptions({
              status: 200
            })
          ));
      });
      
    let existingSeller: Seller = {
      id: 5,
      name: 'Danni',
      category: 'Spaceships',
      imagePath: 'http://imgur.com/r/panda/xhE1cN4'
    }

    sellersService.addOrEditSeller(existingSeller).subscribe((statusCode) => {
      expect(statusCode).toBeDefined();
      expect(statusCode).toEqual(200);
    });
  }));

  it('addOrEditProduct() should add product', async (() => {
    let sellersService: SellersService = getTestBed().get(SellersService);

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        expect(connection.request.url).toMatch('http://localhost:5000/api/sellers/3/products');

        connection.mockRespond(
          new Response(
            new ResponseOptions({
              status: 201
            })
          ));
      });
    
    let sellerID = 3;
    let newProduct: Product = {
      id: undefined,
      name: 'Trefill',
      price: 899,
      quantitySold: 420,
      quantityInStock: 42,
      imagePath: 'http://i.imgur.com/50ivFlC.jpg'
    }

    sellersService.addOrEditProduct(newProduct, sellerID).subscribe((statusCode) => {
      expect(statusCode).toBeDefined();
      expect(statusCode).toEqual(201);
    });
  }));

  it('addOrEditProduct() should update product', async (() => {
    let sellersService: SellersService = getTestBed().get(SellersService);

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        expect(connection.request.url).toMatch('http://localhost:5000/api/sellers/2/products/7');

        connection.mockRespond(
          new Response(
            new ResponseOptions({
              status: 200
            })
          ));
      });
    
    let sellerID = 2;
    let existingProduct: Product = {
      id: 7,
      name: 'Ullarvettlingar',
      price: 1899,
      quantitySold: 500,
      quantityInStock: 12,
      imagePath: 'http://i.imgur.com/MZOmRnH.jpg'
    }

    sellersService.addOrEditProduct(existingProduct, sellerID).subscribe((statusCode) => {
      expect(statusCode).toBeDefined();
      expect(statusCode).toEqual(200);
    });
  }));


});
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { SellerListComponent} from './seller-list/seller-list.component';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { SellersService } from './sellers.service';

@NgModule({
  declarations: [
    AppComponent,
    SellerListComponent,
    SellerDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([{
      path: '',
      redirectTo: 'sellers',
      pathMatch: 'full'
      }, {
        path: 'sellers',
        component: SellerListComponent
      }, {
        path: 'seller/:id',
        component: SellerDetailsComponent
      }])
  ],
  providers: [SellersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
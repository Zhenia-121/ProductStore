import { AdminGuard } from './shared/guards/AdminGuard';
import { AuthInterceptor } from './shared/services/AuthInterceptor';
import { AuthService } from './auth/services/auth-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { OrdersComponent } from './orders/orders.component';
import { BsNavmenuComponent } from './bs-navmenu/bs-navmenu.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ProductsComponent } from './products/products.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './auth/components/login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AuthGuard } from './shared/guards/AuthGuard';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ShoppingCartComponent,
    ManageOrdersComponent,
    ManageProductsComponent,
    OrdersComponent,
    OrderSuccessComponent,
    BsNavmenuComponent,
    LoginComponent,
    CheckOutComponent,
    ProductsComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NgbModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      // { path: 'counter', component: CounterComponent },
      // { path: 'fetch-data', component: FetchDataComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'manage-orders', component: ManageOrdersComponent, canActivate: [ AuthGuard, AdminGuard] },
      { path: 'manage-products', component: ManageProductsComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'my-orders', component: OrdersComponent },
      { path: 'check-out', component: CheckOutComponent },
      { path: 'login', component: LoginComponent},
      { path: 'order-success', component: OrderSuccessComponent},
      { path: 'no-access', component: NoAccessComponent }
    ])
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

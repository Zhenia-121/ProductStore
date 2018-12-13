import { ProductService } from './shared/services/product-service.service';
import { AdminGuard } from './shared/guards/AdminGuard';
import { AuthInterceptor } from './shared/services/AuthInterceptor';
import { AuthService } from './auth/services/auth-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { OrdersComponent } from './orders/orders.component';
import { BsNavmenuComponent } from './bs-navmenu/bs-navmenu.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './auth/components/login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AuthGuard } from './shared/guards/AuthGuard';
import { CreateProductComponent } from './admin/create-product/create-product.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { CustomFormsModule } from 'ng2-validation';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductCatalogComponent } from './products/product-catalog/product-catalog.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ShoppingCartComponent,
    ManageOrdersComponent,
    ManageProductsComponent,
    OrdersComponent,
    OrderSuccessComponent,
    BsNavmenuComponent,
    LoginComponent,
    CheckOutComponent,
    NoAccessComponent,
    CreateProductComponent,
    PaginationComponent,
    ProductCardComponent,
    ProductCatalogComponent,
    ProductFilterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CustomFormsModule,
    RouterModule.forRoot([
      // { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '', component: ProductCatalogComponent},
      { path: 'products', component: ProductCatalogComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'manage-orders', component: ManageOrdersComponent, canActivate: [ AuthGuard, AdminGuard] },
      { path: 'manage-products', component: ManageProductsComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'create-product', component: CreateProductComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'create-product/:id', component: CreateProductComponent, canActivate: [AuthGuard, AdminGuard]},
      { path: 'my-orders', component: OrdersComponent },
      { path: 'check-out', component: CheckOutComponent },
      { path: 'login', component: LoginComponent},
      { path: 'order-success', component: OrderSuccessComponent},
      { path: 'no-access', component: NoAccessComponent }
    ])
  ],
  providers: [
    AuthService,
    ProductService,
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

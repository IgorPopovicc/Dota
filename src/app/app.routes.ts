import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, data: { scrollPositionRestoration: 'top' } },
    { path: 'home', component: HomeComponent, data: { scrollPositionRestoration: 'top' } },
    { path: 'product-details', component: ProductDetailsComponent, data: { scrollPositionRestoration: 'top' } },
    { path: 'shopping-cart', component: ShoppingCartComponent, data: { scrollPositionRestoration: 'top' } }
];

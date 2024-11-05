import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { OrderMessageComponent } from './pages/order-message/order-message.component';
import { ProductsComponent } from './pages/products/products.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', data: { scrollPositionRestoration: 'top' }, pathMatch: 'full'  },
    { path: 'home', component: HomeComponent, data: { scrollPositionRestoration: 'top' } },
    { path: 'product-details/:productId', component: ProductDetailsComponent, data: { scrollPositionRestoration: 'top' } },
    { path: 'shopping-cart', component: ShoppingCartComponent, data: { scrollPositionRestoration: 'top' } },
    { path: 'contact', component: ContactComponent, data: { scrollPositionRestoration: 'top' } },
    { path: 'order-details', component: OrderDetailsComponent, data: { scrollPositionRestoration: 'top' } },
    { path: 'order-message', component: OrderMessageComponent, data: { scrollPositionRestoration: 'top'} },
    { path: 'products', component: ProductsComponent },
    { path: 'products/type/:type', component: ProductsComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: '**', redirectTo: '/home' }
];

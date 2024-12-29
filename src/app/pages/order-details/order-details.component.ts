import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShoppingCartItem } from '../../model/Product';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { Router } from '@angular/router';
import { RouterService } from '../../service/router.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { LoadingService } from '../../service/loading.service';
import {ProductsService} from "../../service/products.service";

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent
  ],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, AfterViewInit {

  places: any[] = [];
  cities: any[] = [];
  searchTerm: string = '';
  showResults: boolean = false;
  deliveryForm: FormGroup;
  shoppingCartItems: ShoppingCartItem[] = [];
  totalPrice: number;
  isReservation: boolean = false;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private shoppingCartService: ShoppingCartService,
              private router: Router,
              private routerService: RouterService,
              private loadingService: LoadingService,
              private productsService: ProductsService) {
                if(this.router.getCurrentNavigation().extras.state) {
                  let product = this.router.getCurrentNavigation().extras.state;
                  this.shoppingCartItems.push(new ShoppingCartItem(product['product'], 1, true));
                  this.totalPrice = product['product'].price;
                  this.isReservation = true;
                  this.loadingService.show();
                }
              }

  ngOnInit(): void {
    if(!this.isReservation) {
      this.shoppingCartItems = this.shoppingCartService.getCartItems();
      this.totalPrice = this.shoppingCartService.totalPrice.value;
    }

    this.http.get<any[]>('assets/json/serbia_zip_codes.json').subscribe(data => {
      this.places = data.map(item => ({ city: item.city, id: item._id }));
      this.cities = this.places;
    });
    this.deliveryForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required]],
      postCode: [{ value: '', disabled: true }, [Validators.required]],
      address: ['', [Validators.required]],
      placeNumber: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      message: [''],
      contactUs: [false, [Validators.required]],
    });

    this.deliveryForm.get('city')?.valueChanges.subscribe(value => {
      this.searchCity(value);
    });
  }

  ngAfterViewInit(): void {
    this.loadingService.hide();
  }

  searchCity(searchTerm: string) {
    if (searchTerm.trim() === '') {
      this.showResults = false;
    } else {
      this.cities = this.places.filter(place =>
        place.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.showResults = this.cities.length > 0;
      if (!this.showResults && searchTerm.length > 0) {
        this.deliveryForm.get('postCode')?.enable();
      } else {
        this.deliveryForm.get('postCode')?.disable();
      }
    }
  }

  selectResult(result){
    this.deliveryForm.get('city').setValue(result.city);
    this.deliveryForm.get('postCode').setValue(result.id);
    this.showResults = false;
  }

  onSubmit() {
    this.deliveryForm.get('postCode')?.enable();
    if (this.deliveryForm.invalid) {
      this.deliveryForm.markAllAsTouched();
      return;
    }

    const payload = {
      fullName: this.deliveryForm.value.fullName,
      email: this.deliveryForm.value.email,
      city: this.deliveryForm.value.city,
      postalCode: this.deliveryForm.value.postCode,
      address: this.deliveryForm.value.address,
      flatNumber: this.deliveryForm.value.placeNumber,
      phone: this.deliveryForm.value.phone,
      description: this.deliveryForm.value.message || '',
      totalPrice: this.totalPrice,
      waitReserved: this.isReservation,
      orderItems: this.shoppingCartItems.map(item => ({
        productDetailsId: item.product.productDetails[0].id,
        quantity: item.bagQuantity,
        isAvailable: item.reservation
    }))
    };

    this.loadingService.show();

    this.productsService.placeOrder(payload).subscribe({
      next: (response) => {
        if (!this.isReservation) {
          this.routerService.routerWithBody('order-message', { isError: false, isReservation: false });
        }
        this.shoppingCartService.clearShoppingCart();
      },
      error: (error) => {
        this.loadingService.hide();
        this.routerService.routerWithBody('order-message', { isError: true, isReservation: false });
      }
    });
  }

  onReservationSubmit() {
    this.onSubmit();
    this.routerService.routerWithBody('order-message', { isError: false, isReservation: true });
  }

  openShoppingCart() {
    this.routerService.routerByPath('shopping-cart');
  }

  openShoppingPage() {
    this.routerService.routerByPath('products');
  }

  get f() { return this.deliveryForm.controls; }

}

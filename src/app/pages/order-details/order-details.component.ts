import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShoppingCartItem } from '../../model/Product';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

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
              private router: Router) { 
                if(this.router.getCurrentNavigation().extras.state) {
                  let product = this.router.getCurrentNavigation().extras.state;
                  console.log("PRODUCT: ", product['product']);
                  this.shoppingCartItems.push(new ShoppingCartItem(product['product'], 1));
                  this.totalPrice = product['product'].price;
                  this.isReservation = true;
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
      phone: [''],
      message: [''],
      contactUs: [false]
    });

    this.deliveryForm.get('city')?.valueChanges.subscribe(value => {
      this.searchCity(value);
    });
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
    console.log('Izabran rezultat:', result);
    this.deliveryForm.get('city').setValue(result.city);
    this.deliveryForm.get('postCode').setValue(result.id);
    this.showResults = false;
  }

  onSubmit() {
    this.router.navigate(['/order-message']);
    this.shoppingCartService.clearShoppingCart();
    if (this.deliveryForm.invalid) {
      return;
    }
    console.log('Form submitted:', this.deliveryForm.value);
  }

  onReservationSubmit() {
    this.router.navigate(['/order-message'], { state: { isReservation: true }});
    if (this.deliveryForm.invalid) {
      return;
    }
  }

  openShoppingCart() {
    this.router.navigate(['/shopping-cart']);
  }

  openShoppingPage() {
    this.router.navigate(['/products']);
  }

  get f() { return this.deliveryForm.controls; }

}

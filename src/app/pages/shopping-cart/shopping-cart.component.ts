import { Component, OnInit } from "@angular/core";
import { ProductComponent } from "../../components/product/product.component";
import { CommonModule } from "@angular/common";
import { Product } from "../../model/Product";

@Component({
    selector: 'shopping-cart',
    standalone: true,
    imports: [
        CommonModule,
        ProductComponent
    ],
    templateUrl: './shopping-cart.component.html',
    styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {

    public products: Array<Product>;
    public totalPrice: number = 0;
    
    constructor() {
        this.products = new Array<Product>;
    }

    ngOnInit(): void {
       
    }

    getProductsForHomePage() {
        let product: Product = {
          id: "1",
          name: "MOONLIGHT",
          imagesDisplay: {
            imageDisplay1: "./assets/images/products/bags/test-product/product1.png",
            imageDisplay2: "./assets/images/products/bags/test-product/product1.png",
            imageDisplay3: "./assets/images/products/bags/test-product/product1.png"
          },
          price: 2000,
          type: "mini bag",
          color: "#000000",
          quantity: 5
        };
        return product;
    }

    addItemsToBag() {
        this.products.push(this.getProductsForHomePage());
        this.totalPrice += this.getProductsForHomePage().price
    }

}
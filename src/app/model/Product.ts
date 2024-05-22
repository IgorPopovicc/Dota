export class Product {
    id: number;
    name: string;
    price: number;
    productDetails: ProductDetails[];
    isNewCollection?: boolean;
    type: string;
    size?: string;
}

export class ProductDetails {
    id?: number;
    color: string;
    images: ProductImages[];
    info: string;
    productId: number;
    quantity: number;
}

export class ProductImages {
    id: number;
    isDisplay: boolean;
    imagePath: string;
}

export class ShoppingCartItem {
    product: Product;
    bagQuantity?: number;
    reservation?: boolean;

    constructor(product: Product, bagQuantity: number, reservation: boolean) {
        this.product = product;
        this.bagQuantity = bagQuantity;
        this.reservation = reservation;
    }

}
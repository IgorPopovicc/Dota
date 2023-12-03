export class ShoppingCartItem {

    id: number;
    name: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;

    constructor(id) {
        this.id = id;
        this.name = "Product";
        this.imageUrl = "imageUrl";
        this.unitPrice = 100;
        this.quantity = 1;
    }

}
export class Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    isNewCollection?: boolean;
    imagesDisplay: ProductImages;
    color?: string;
    type: string;
}

export class ProductImages {
    imageDisplay1: string;
    imageDisplay2?: string;
    imageDisplay3?: string;
}
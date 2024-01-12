export class Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    isNewCollection?: boolean;
    imagesDisplay: ProductImages;
    color?: string;
}

export class ProductImages {
    imageDisplay1: string;
    imageDIsplay2: string;
    imageDIsplay3: string;
}
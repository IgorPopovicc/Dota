import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'https://dota-be.onrender.com/dota'

  private cartSIze = 0;

  constructor(private httpClient: HttpClient) { }

  setCartItemsSize(size: number) {
    this.cartSIze = size;
  }

  getCartItemsSize() {
    return this.cartSIze;
  }

  getAllProducts(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/products").pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getProductsByType(type: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/products/type/${type}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  placeOrder(payload: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/orders", payload).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error instanceof Error) {
      // Klijentska ili mrežna greška
      errorMessage = `An error occurred: ${error.message}`;
    } else if (error instanceof HttpErrorResponse) {
      // Server error
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    } else {
      errorMessage = 'Unknown error';
    }
    console.error(errorMessage);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getProductById(id: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/products/" + id).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

}

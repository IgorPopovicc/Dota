import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'http://localhost:8080/dota'

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
      catchError(this.handleError)
    );;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (typeof error.error === 'string') {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    } else {
      // Client-side error
      errorMessage = `Error: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}

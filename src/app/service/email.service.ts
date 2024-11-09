import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as emailjs from 'emailjs-com';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseUrl = 'https://dota-be.onrender.com/dota';

  constructor(private httpClient: HttpClient) {

  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  sendEmail(email: string): Observable<any>  {
    if (this.isValidEmail(email)) {
      return this.httpClient.post(this.baseUrl + "/newsletter", { email: email }, {});
    } else {
      return of(null);
    }
  }

  sendContactForm(formData: { fullName: string; email: string; phone: string; message: string }): Observable<any> {
    if (this.isValidEmail(formData.email)) {
      return this.httpClient.post(`${this.baseUrl}/contact`, formData, {});
    } else {
      return of(null);
    }
  }

}

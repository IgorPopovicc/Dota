import { Injectable } from '@angular/core';
import * as emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  sendEmail(email: string) {
    if (this.isValidEmail(email)) {
      const templateParams = {
        to_email: email
      };

      return emailjs.send("service_dota", "template_bj9wwqo", templateParams, "MbP3G-16Env1srvYF");
    } else {
      console.error('Neispravna e-mail adresa.');
      return Promise.reject('Neispravna e-mail adresa.');
    }
  }

}

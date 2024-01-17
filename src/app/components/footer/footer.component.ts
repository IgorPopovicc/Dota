import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { EmailService } from '../../service/email.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'dota-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FooterComponent { 
  public isPhone: boolean = false;
  public isTablet: boolean = false;
  public emailForm: FormGroup;

  constructor(private fb: FormBuilder, private emailService: EmailService) {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.checkScreenSize();
    this.emailForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]]
    });
  }

  checkScreenSize(): void {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      this.isPhone = screenWidth <= 480;
      this.isTablet = screenWidth > 480 && screenWidth <= 884;
    }
  }

  sendEmail() {
    console.log("STARTED");
    if (this.emailForm.valid) {
      const email = this.emailForm.get('userEmail').value;
      this.emailService.sendEmail(email)
        .then(response => {
          console.log('Email sent successfully', response);
          // Dodajte logiku za prikazivanje korisniku poruke o uspešnom slanju e-maila
        })
        .catch(error => {
          console.error('Error sending email', error);
          // Dodajte logiku za prikazivanje korisniku poruke o grešci pri slanju e-maila
        });
    } else {
      console.error('Invalid email address');
      // Dodajte logiku za prikazivanje korisniku poruke o neispravnoj e-mail adresi
    }
  }

}

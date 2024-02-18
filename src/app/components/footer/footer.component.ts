import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Renderer2 } from '@angular/core';
import { EmailService } from '../../service/email.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';

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
  public isContact = true;
  public isContactRoute: boolean = false;

  constructor(private fb: FormBuilder, private emailService: EmailService, private router: Router, private renderer: Renderer2) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isContactRoute = this.router.url === '/contact';
        this.setFooterTextColor();
      }
    });
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

  openCOntact() {
    this.router.navigate(['/contact']);
  }

  setFooterTextColor(): void {
    if (typeof window !== 'undefined') {
      const footerElement = document.querySelector('.footer');
      const emailInput = document.querySelector('#emailInput');
      if (footerElement && emailInput) {
        if (this.isContactRoute) {
          this.renderer.addClass(footerElement, 'white-text');
          this.renderer.addClass(emailInput, 'white');
        } else {
          this.renderer.removeClass(footerElement, 'white-text');
          this.renderer.removeClass(emailInput, 'white');
        }
      }
    }
  }
}

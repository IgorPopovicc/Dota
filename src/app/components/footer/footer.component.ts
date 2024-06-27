import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Renderer2 } from '@angular/core';
import { EmailService } from '../../service/email.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { RouterService } from '../../service/router.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private fb: FormBuilder, private emailService: EmailService, private router: Router, private routerService: RouterService , private renderer: Renderer2, private snackBar: MatSnackBar) {}

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
      this.emailService.sendEmail(email).subscribe(result => {
        console.log(result);
        this.emailForm.get('userEmail').setValue("");
        this.showCustomSnackbar("Uspjesno ste se prijavili za newsletter!");
      });
    } else {
      this.showCustomSnackbar("Unesite vazecu email adresu!");
      this.emailForm.get('userEmail').setValue("");
    }
  }

  showCustomSnackbar(message: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message: message },
      duration: 5000, 
      horizontalPosition: 'center', 
      verticalPosition: 'bottom'
    });
  }

  openCOntact() {
    this.routerService.routerByPath('contact');
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

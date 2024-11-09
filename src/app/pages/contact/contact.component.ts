import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../../components/loading/loading.component';
import { LoadingService } from '../../service/loading.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EmailService} from "../../service/email.service";
import {SnackbarComponent} from "../../components/snackbar/snackbar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit {
  contactForm: FormGroup;

  constructor(private loadingService: LoadingService,
              private fb: FormBuilder,
              private emailService: EmailService,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadingService.show()

    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.loadingService.hide();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.emailService.sendContactForm(this.contactForm.value).subscribe({
        next: (result) => {
          if (result) {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: { message: 'Uspešno poslat email' },
              duration: 3000
            });
            this.contactForm.reset();
          }
        },
        error: () => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: { message: 'Došlo je do greške pri slanju' },
            duration: 3000
          });
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

}

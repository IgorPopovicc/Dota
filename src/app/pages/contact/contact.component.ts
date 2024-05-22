import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../../components/loading/loading.component';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit {

  constructor(private loadingService: LoadingService) { 
    this.loadingService.show();
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.loadingService.hide();
  }

}

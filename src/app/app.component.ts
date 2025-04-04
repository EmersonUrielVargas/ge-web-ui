import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { DecryptHttpIntercept } from './core/interceptor/decrypt-http-intercept';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  providers:[
    DecryptHttpIntercept
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{

  constructor(private primeng: PrimeNG){
  }
  ngOnInit(): void {
    this.primeng.ripple.set(true);
  }
}

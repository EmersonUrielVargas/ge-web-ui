import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CryptoService } from '../services/crypto/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class DecryptHttpIntercept implements HttpInterceptor {

  constructor(
    private crypto: CryptoService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          if (typeof event.body === 'string') {
            return event.clone({ 
              body: this.crypto.decryptData(event.body)
            });
          }
        }
        return event;
      })
    );
  }
}

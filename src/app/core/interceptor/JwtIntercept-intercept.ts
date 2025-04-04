import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StoreService } from '../../modules/shared/services/store/store.service';
import { Constants } from '../../modules/shared/constants/Constants';


export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StoreService);
  const token = storageService.getItemSession(Constants.storageKeys.session.authToken);
  const request = token 
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) 
    : req;

  return next(request);
};

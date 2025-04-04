import { inject } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { StoreService } from '../../../modules/shared/services/store/store.service';
import { Constants } from '../../../modules/shared/constants/Constants';

export const validateToken: CanActivate = {
  canActivate(): MaybeAsync<GuardResult> {
    const storageService = inject(StoreService);
    const router = inject(Router);
    const token = storageService.getItemSession(Constants.storageKeys.session.authToken);
    console.log('que oasooo', token? true :router.createUrlTree(['/login']))
    return token? true :router.createUrlTree(['/login']);
  }
};

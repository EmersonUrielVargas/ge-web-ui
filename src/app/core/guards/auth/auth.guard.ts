import { inject } from '@angular/core';
import { CanMatchFn, GuardResult, MaybeAsync, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanMatchFn = (route, segments): MaybeAsync<GuardResult> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.currentUser$.pipe(
    map((user) => {
        return user? true :router.createUrlTree(['/login']);
    })
  );
};

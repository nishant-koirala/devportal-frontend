import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const portalGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && (authService.hasRole('ADMIN') || authService.hasRole('PORTAL_USER'))) {
    return true;
  }

  if (authService.isAuthenticated()) {
    return router.parseUrl('/login'); // Valid token but no portal role
  }

  return router.parseUrl('/portal/login');
};

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Don't intercept 401s for login/otp endpoints so the component can handle them and show errors
      const isAuthRequest = req.url.includes('/login') || req.url.includes('/otp');
      if (error.status === 401 && !isAuthRequest) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};

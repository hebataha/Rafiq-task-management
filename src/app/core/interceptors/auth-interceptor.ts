import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');

  const apiKey =
    'sb_publishable_MUL_oO1sCf-c5NKi1as6Sg_42ECtX8U';

  const router = inject(Router);

  let request = req.clone({
    setHeaders: {
      apikey: apiKey
    }
  });

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request).pipe(
    catchError((err) => {

      if (
        err.status === 401 ||
        (
          err.status === 403 &&
          err.error?.error_code === 'bad_jwt'
        )
      ) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        router.navigate(['/login']);
      }

      return throwError(() => err);
    })
  );
};
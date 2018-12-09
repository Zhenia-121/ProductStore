import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor( private injector: Injector) { }
  intercept(
             req: HttpRequest<any>,
             next: HttpHandler): Observable<HttpEvent<any>> {
      const auth = this.injector.get(AuthService);
      const token = (auth.isLoggedIn()) ? auth.getAuth().token : null;
      if (token) {
        req = req.clone({
          setHeaders: {'Authorization': `Bearer  ${token}`}}
        );
      }
      return next.handle(req);
  }
}

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private clientId = 'ProductStore';
  private authKey = 'access_token ' + this.clientId;
  private url = 'http://localhost:5000/';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  login(username: string, password: string): Observable<boolean> {
    const data: LoginData = {
      username: username,
      password: password,
      client_id: this.clientId,
      grant_type: 'password'
    };
    const headersOptions = new HttpHeaders({'Content-Type': 'application/json'});
    console.log(data);
    return this.http.post<TokenResponse>(this.url + 'api/token/auth', data, {headers: headersOptions}).pipe(map((result) => {
      console.log(result);
       const token = result && result.token;
       if (token) {
         this.setAuth(result);
        return true;
       }
       return false;
    }, catchError(error => new  Observable<any>(error)))
    );
  }

  logout(): boolean {
    this.setAuth(null);
    return true;
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem(this.authKey) != null;
  }

  private setAuth(token: TokenResponse | null): boolean {
    if (token) {
      localStorage.setItem(this.authKey, JSON.stringify(token));
    } else {
      localStorage.removeItem(this.authKey);
    }
    return true;
  }
  public getAuth(): TokenResponse | null {
    const token = localStorage.getItem(this.authKey);
    if (token) {
      return JSON.parse(token);
    }
    return null;
  }

  private decodeJwtToken() {
    const token = this.getAuth().token;
    const jwtHelper = new JwtHelperService();
    const dataFromToken = jwtHelper.decodeToken(token);
    return dataFromToken;
  }

  public getUserName(): string {
    const userName = this.decodeJwtToken().Name;
    return userName;
  }
  public getUserId() {
    const userId = this.decodeJwtToken().Id;
    return userId;
  }
  public isAdmin(): boolean {
    // if (!this.isLoggedIn()) {
    //   return false;
    // }
    const roles = <string[]>this.decodeJwtToken().Role;
    if (roles.length === 0) {
      return false;
    }
    if (Array.isArray(roles)) {
      return roles.some((element) => element === 'Admins');
    }
    if (roles === 'Admins') {
      return true;
    }
    return false;
  }

}


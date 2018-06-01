import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from "ngx-cookie";
import {jwtDecode} from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    readonly COOKIE_KEY: string = '_JUI_AUTH_';

    constructor(public router: Router, private cookieService: CookieService) {
    }

    createLoginUrl() {
        //Base url plus callback url

    }

    login() {
        console.log('login');
        // localStorage.setItem('LOGGED_IN', 'true');
        // this.router.navigate(['']);
    }

    logout() {
        localStorage.removeItem('LOGGED_IN');
        this.router.navigate(['login']);
    }

    isAuthenticated(): boolean {
        console.log('isAuthenticated');
        const jwt = this.cookieService.get(this.COOKIE_KEY);
        if(!jwt) return false;
        const jwtData = jwtDecode(jwt);
        if(jwtData) return false;
        console.log(jwtData);

        //do stuff!!
        return true;
    }
}

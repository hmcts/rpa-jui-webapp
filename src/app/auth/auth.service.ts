import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from "ngx-cookie";
import * as jwtDecode from 'jwt-decode';
import {ConfigService} from "../config.service";
import {DOCUMENT} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    COOKIE_KEY: string;

    constructor(public router: Router,
                private configService: ConfigService,
                private cookieService: CookieService,
                @Inject(DOCUMENT) private document: any) {
        this.COOKIE_KEY = this.configService.config.cookieName;
    }

    generateLoginUrl() {
        const base = this.configService.config.services.idam_web;
        const clientId = 'jui_webapp';
        const callback = this.configService.config.oauth_callback_url;
        return `${base}?response_type=code&client_id=${clientId}&redirect_uri=${callback}`;
    }

    getAuthHeaders() {
        return {
            Authorization: this.cookieService.get(this.COOKIE_KEY),
            __USERID__: this.cookieService.get('__USERID__'),
        }
    }

    loginRedirect() {
        this.document.location.href = this.generateLoginUrl();
    }

    logout() {
        // localStorage.removeItem('LOGGED_IN');
        // this.router.navigate(['login']);
    }

    isAuthenticated(): boolean {
        const jwt = this.cookieService.get(this.COOKIE_KEY);
        console.log(jwt);
        if (!jwt) return false;
        const jwtData = jwtDecode(jwt);
        console.log(jwtData);
        // if(jwtData) return false;
        const expired = jwtData.exp > new Date().getTime();
        // do stuff!!
        return !expired;
    }
}

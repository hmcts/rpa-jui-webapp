import {Inject, Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {ConfigService} from "../config.service";
import {DOCUMENT} from '@angular/common';
import * as config from '../../../config';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    constructor(public auth: AuthService,
                public router: Router,
                private configService: ConfigService,
                @Inject(DOCUMENT) private document: any) {
    }


    generateLoginUrl() {
        const base = this.configService.config.services.idam_web;
        const clientId = 'jui_webapp';
        const callback = config.oauth_callback_url;
        return `${base}?response_type=code&client_id=${clientId}&redirect_uri=${callback}`;
    }


    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.document.location.href = this.generateLoginUrl();
            // this.router.navigate([this.configService.config.services.idam_web]);
            return false;
        }
        return true;
    }
}



import { Inject, NgModule } from '@angular/core';
import {CookieModule} from "ngx-cookie";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInteceptor} from "./auth-inteceptor";
import {AuthService} from "./auth.service";
import {AuthGuardService} from "./auth-guard.service";

@NgModule({
    imports: [
        CookieModule.forRoot()
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInteceptor,
            multi: true
        },
        AuthService,
        AuthGuardService
    ]
})
export class AuthModule {}

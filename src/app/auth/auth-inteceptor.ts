import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {NavigationError, Router, Route} from '@angular/router';
import 'rxjs/add/operator/do';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {NotFoundComponent} from '../../../projects/static-pages/src/lib/containers/not-found/not-found.component';
import {GatewayTimeoutComponent} from '../../../projects/static-pages/src/lib/containers/gateway-timeout/gateway-timeout.component';
import {of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthInteceptor implements HttpInterceptor  {

    constructor(
        public router: Router,
        private authService: AuthService,
        private location: Location
        ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /**
         * continues request execution
         */
        return next.handle(request).pipe(catchError((error, caught) => {
            //intercept the respons error and displace it to the console
            console.log(error);
            this.handleAuthError(error, request);
            return of(error);
        }) as any);
    }

    /**
     * manage errors
     * @param err
     * @returns {any}
     */
    private handleAuthError(err: HttpErrorResponse, request: HttpRequest<any>): Observable<any> {
        // handle your auth error or rethrow
        if (err.status === 401) {
            this.authService.loginRedirect();
            return of(err.message);
        }
        if (err.status === 400) {
            // this.router.events
            //     .filter(event => event instanceof NavigationError)
            //     .subscribe((event: NavigationError) => {
            //         this.router.navigate(['/404'], {skipLocationChange: true})
            //             .then(() =>  this.location.go(event.url));
            //     });
            console.log('handled error ' + err.status);
            console.log('request = >', this.router);

            this.router.navigate(['/404'], { skipLocationChange: true }).then(() =>  this.location.go('QWERTY'));
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return of(err.message);
        }
        if (err.status === 504) {
            this.router.navigate(['/504']);
            return of(err.message);
        }

        throw err;
    }



}

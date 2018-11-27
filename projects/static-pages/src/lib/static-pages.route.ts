import {Routes} from '@angular/router';
import {GatewayTimeoutComponent} from './containers/gateway-timeout/gateway-timeout.component';
import {NotFoundComponent} from './containers/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '404',
        component: NotFoundComponent,
        data : {status : '404'}
    },
    {
        path: '504',
        component: GatewayTimeoutComponent,
        data : {status : '504'}
    }
];

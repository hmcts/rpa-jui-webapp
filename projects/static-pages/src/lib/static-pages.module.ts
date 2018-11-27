import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './static-pages.route';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { GatewayTimeoutComponent } from './containers/gateway-timeout/gateway-timeout.component';

@NgModule({
  imports: [
      RouterModule.forChild(routes),
      CommonModule
  ],
  declarations: [
      NotFoundComponent,
      GatewayTimeoutComponent
  ],
  exports: [
      NotFoundComponent,
      GatewayTimeoutComponent
  ]
})
export class StaticPagesModule { }

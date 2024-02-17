import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorHomeComponent } from './vendor-home/vendor-home.component';

@NgModule({
  declarations: [
    // VerifyComponent
  
    VendorHomeComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule
  ]
})
export class VendorModule { }

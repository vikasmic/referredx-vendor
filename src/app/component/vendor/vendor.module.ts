import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorHomeComponent } from './vendor-home/vendor-home.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { LanguageComponent } from './language/language.component';

@NgModule({
  declarations: [
    // VerifyComponent
  
    VendorHomeComponent,
    PurchaseComponent,
    LanguageComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule
  ]
})
export class VendorModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from './vendor.component';
import { VerifyComponent } from '../verify/verify.component';
import { VendorHomeComponent } from './vendor-home/vendor-home.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { LanguageComponent } from './language/language.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: VendorComponent, children: [
      { path: 'home', component: VendorHomeComponent },
      { path: 'purchase', component: PurchaseComponent },
      { path: 'language', component: LanguageComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }

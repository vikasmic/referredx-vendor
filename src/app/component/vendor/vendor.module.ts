import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorHomeComponent } from './vendor-home/vendor-home.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { LanguageComponent } from './language/language.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpinnerModule } from '../common/spinner/spinner.module';
import { QuestionsComponent } from './questions/questions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // VerifyComponent

    VendorHomeComponent,
    PurchaseComponent,
    LanguageComponent,
    QuestionsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    SpinnerModule,
    VendorRoutingModule
  ]
})
export class VendorModule { }

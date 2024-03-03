import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VerifyComponent } from './component/verify/verify.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'vendor', canActivate: [AuthGuard], loadChildren: () => import('../app/component/vendor/vendor.module').then(m => m.VendorModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

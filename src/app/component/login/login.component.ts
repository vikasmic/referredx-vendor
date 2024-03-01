import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';
import { SuccessService } from 'src/app/services/success.service';
import { AppConstants } from 'src/app/utility/AppConstants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  forgotForm: FormGroup = new FormGroup({
    email: new FormControl(''),
  });
  COPYRIGHT = AppConstants.copyright;

  submitted = false;
  forgotSubmitted = false;
  loginResponse: any;
  lognResponseMessage: string = "";
  resetLinkLoad: boolean = false;
  isLoginLoad: boolean = false;
  isMessage: boolean = false;
  token: string | undefined;
  ForgotPopup: string = 'forgotClosePopup';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService, private successService: SuccessService, private errorService: ErrorService) {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get fp(): { [key: string]: AbstractControl } {
    return this.forgotForm.controls;
  }

  ngOnInit() {
    this.loginForm();
    this.resetForgotPasswordForm();
  }

  loginForm() {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
          ]
        ],
      }, {}
    );
  }

  resetForgotPasswordForm() {
    this.forgotForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
      }, {}
    );
  }

  onSubmit(): void {
    this.submitted = true;
    this.isLoginLoad = true;
    if (this.form.invalid) {
      this.isLoginLoad = false;
      return;
    }
    this.authService.performSave('/api/auth/vendor/login', this.form.value).subscribe(response => {
      this.isLoginLoad = false;
      this.loginResponse = response;
      if (this.loginResponse.success == 1) {
        this.toastr.success("login successful");
        localStorage.setItem('access_token', this.loginResponse.token);
        this.router.navigate(['/vendor']);
      } else {
        this.isMessage = true;
        this.lognResponseMessage = this.loginResponse.message;
      }
    })
  }

  getClickEventForLoader() {
    this.isLoginLoad = false;
  }


  forgotPassword() {
    this.ForgotPopup = 'forgotOpenPopup';
  }

  closeForgot() {
    this.resetForgotPasswordForm();
    this.ForgotPopup = 'forgotClosePopup';
  }

  onForgotSubmit() {
    this.forgotSubmitted = true;
    this.resetLinkLoad = true;
    if (this.forgotForm.invalid) {
      this.resetLinkLoad = false;
      return;
    }
    this.authService.performSave('/api/auth/forgot', this.forgotForm.value).subscribe((resp: any) => {
      if (resp.success == 1) {
        this.successService.showSuccessMessage(resp.message);
        this.resetLinkLoad = false;
        this.closeForgot();
      } else {
        this.resetLinkLoad = false;
        this.errorService.showError(resp.message);
      }
    })
  }

}

import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SuccessService } from 'src/app/services/success.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  constructor(private route: ActivatedRoute, private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private successService: SuccessService) { }
  submitted = false;
  token: any;
  form: FormGroup = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
  });


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.getTokenFromUrl();
    this.changePasswordForm();
  }

  getTokenFromUrl(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (this.token) {
      this.authService.getQueryParam('/api/vendor/check/token', this.token).subscribe((resp: any) => {
        if (resp.success == 0) {
          this.router.navigate(['/login']);
        }
      });
    }
  }

  changePasswordForm() {
    this.form = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, this.passwordsMatchValidator.bind(this)]],
    });
  }

  passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { 'passwordsNotMatch': true };
    }
    return null;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formValueWithToken = {
      ...this.form.value,
      token: this.token
    };
    this.authService.performSave('/api/vendor/set/password', formValueWithToken).subscribe((response: any) => {
      if (response.success == 0) {
        this.successService.showSuccessMessage(response.message);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else {

      }
    })
  }
}

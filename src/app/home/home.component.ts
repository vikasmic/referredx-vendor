import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  countryList: any;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  form: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl(''),
    countryId: new FormControl(''),

  });

  ngOnInit() {
    this.getCountries();
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        contact: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^[0-9]{10}$/
            ),
          ]
        ],
        countryId: ['', [
          Validators.required],],
      }, {}
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getCountries() {
    this.authService.getInfo('/api/country/list').subscribe((response: any) => {
      this.countryList = response.data;
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    console.log("form value", this.form.value);
    this.authService.performSave('/api/vendor/create/enquiry', this.form.value).subscribe((resp) => {
      console.log("resp", resp);
    })
  }

}

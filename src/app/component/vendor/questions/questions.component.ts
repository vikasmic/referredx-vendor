import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faPencil, faTrashAlt, faLink } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  form: FormGroup = new FormGroup({
    youtubeLink: new FormControl(''),
  });

  que: any;
  loading: boolean = true;
  faPencil = faPencil;
  faTrashAlt = faTrashAlt;
  faLink = faLink;
  submitted = false;
  ytLoading: boolean = false;
  questionId!: string;
  questionForVendor: any[] = [];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    // this.que = history.state.questions;
    // this.loading = false;
    this.questionId = history.state.questionId;
    this.questionList();
    this.youtubeLinkForm();
  }

  questionList() {
    const questionId = this.questionId;
    const baseUrl = `/api/vendor/question/list/${questionId}`;
    this.authService.getInfo(baseUrl).subscribe((response: any) => {
      this.que = response;
      this.loading = false;
      this.questionForVendor = response.data.questions;
    })

  }

  youtubeLinkForm() {
    this.form = this.formBuilder.group(
      {
        youtubeLink: ['', [Validators.required, this.validateYoutubeLink]],
      }, {}
    );
  }

  onSubmit(index: number) {
    this.submitted = true;
    this.ytLoading = true;
    if (this.form.invalid) {
      this.ytLoading = false;
      return;
    }
    const formValue = { ...this.form.value, languageId: this.que.data.languageId, language: this.que.data.language, question: this.que.data.questions[index] };
    this.authService.performSave('/api/vendor/add/question', formValue).subscribe((resp: any) => {
      console.log("resp", resp);
    });
  }

  validateYoutubeLink(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && !control.value.includes('youtube.com/')) {
      return { 'invalidYoutubeLink': true };
    }
    return null;
  }


}

import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent {

  constructor(private authService: AuthService, private router: Router) { }

  langList: any;
  faCalendarPlus = faCalendarPlus
  loading: boolean = true;
  questions: any[] = [];

  ngOnInit() {
    this.languageList();
  }

  languageList() {
    this.authService.getInfo('/api/vendor/available/list').subscribe((response: any) => {
      this.langList = response.data;
      this.loading = false;
    });
  }

  getQuestions(index: number) {
    this.questions = this.langList[index]._id;
    const questionId = this.questions;

    const baseUrl = `/api/vendor/copy/question/${questionId}`;
    this.authService.getInfo(baseUrl).subscribe((response: any) => {
      this.router.navigate(['/vendor/questions'], { state: { questionId: questionId } });
    })
  }
}

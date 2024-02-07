import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  constructor(private route: ActivatedRoute, private authService: AuthService) { }
  ngOnInit(): void {
    this.getTokenFromUrl();
  }
  getTokenFromUrl(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    console.log('Token from URL:', token);

    if (token) {
      this.authService.getQueryParam('/api/vendor/check/token', token).subscribe((resp: any) => {
        console.log("Rsp", resp);
      });
    } else {
      console.error('Token is null or undefined.');
    }
  }
}

import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent {
  isProfile: boolean = false;
  isActivity: boolean = false;
  isMail: boolean = false;
  isActive = false;
  invitePopup: string = 'inviteClosePopup';
  languagePopup: string = 'languageClosePopup';
  contactPopup: string = 'contactClosePopup';

  constructor(private authService: AuthService) { }

  isActivityOpen() {
    this.isActivity = true;
  }

  isShowPopup(val: boolean) {
    this.isMail = false;
    this.isActive = val;
  }

  isMailOpen() {
    this.isActive = false;
    if (this.isMail) {
      this.isMail = false;
    } else {
      this.isMail = true
    }
  }

  openInvite() {
    this.isActive = false;
    this.invitePopup = 'inviteOpenPopup';
  }

  openLanguage() {
    this.isActive = false;
    this.languagePopup = 'languageOpenPopup';
  }

  
  openContact() {
    this.isActive = false;
    this.contactPopup = 'contactOpenPopup';
  }

  addCompany() {
    this.isActive = false;
  }

  isProfilePop() {
    this.isProfile = true;
  }

  logout() {
    this.authService.logout();
  }
}

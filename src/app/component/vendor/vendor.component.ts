import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppConstants } from 'src/app/utility/AppConstants';
import { faLanguage, faHome, faStore, faFile, faCodePullRequest, faGripVertical, faMoneyBill, faEnvelopesBulk, faBuildingCircleArrowRight, faWaveSquare, faShareFromSquare, faBarsStaggered, faMessage, faUser, faBriefcaseClock, faClock, faEnvelope, faLink, faShield, faCreditCard, faTerminal, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder } from '@angular/forms';
import { SuccessService } from 'src/app/services/success.service';
import { ErrorService } from 'src/app/services/error.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent {
  COPYRIGHT = AppConstants.copyright;
  isProfile: boolean = false;
  isActivity: boolean = false;
  isMail: boolean = false;
  isActive = false;
  invitePopup: string = 'inviteClosePopup';
  languagePopup: string = 'languageClosePopup';
  contactPopup: string = 'contactClosePopup';
  faHome = faHome;
  faStore = faStore;
  faShield = faShield;
  faMoneyBill = faMoneyBill;
  faClock = faClock;
  faFile = faFile;
  faLink = faLink;
  faEnvelope = faEnvelope;
  faUser = faUser
  faTerminal = faTerminal;
  faCodePullRequest = faCodePullRequest;
  faGripVertical = faGripVertical;
  faEnvelopesBulk = faEnvelopesBulk;
  faMoneyBillWave = faMoneyBillWave;
  faShareFromSquare = faShareFromSquare;
  faMessage = faMessage;
  faBarsStaggered = faBarsStaggered;
  faBuildingCircleArrowRight = faBuildingCircleArrowRight;
  faWaveSquare = faWaveSquare;
  faBriefcaseClock = faBriefcaseClock;
  faLanguage = faLanguage;
  faCreditCard = faCreditCard;
  isHomeActive: boolean = false;
  isLanguageActive: boolean = false;
  isPaymentActive: boolean = false;


  constructor(private authService: AuthService, private formBuilder: FormBuilder, private successService: SuccessService, private errorServie: ErrorService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.handleRouteChange(event.url);
      }
    });
  }

  homeAside() {
    this.isHomeActive = true;
    this.isLanguageActive = false;
    this.isPaymentActive = false;
  }

  languageAside() {
    this.isLanguageActive = true;
    this.isHomeActive = false;
    this.isPaymentActive = false;
  }
  paymentAside() {
    this.isPaymentActive = true;
    this.isLanguageActive = false;
    this.isHomeActive = false;
  }

  private handleRouteChange(url: string): void {
    if (url.includes('/vendor/home')) {
      this.homeAside();
    } else if (url.includes('/vendor/language')) {
      this.languageAside();
    } else if (url.includes('/vendor/purchase')) {
      this.paymentAside();
    }
  }

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

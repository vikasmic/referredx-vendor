import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr: ToastrService) { }

  showError(msg: string) {
    this.toastr.error(msg);
  }
}

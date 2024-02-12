import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SuccessService {

  constructor(private toastr: ToastrService) { }

  showSuccessMessage(msg: string) {
    this.toastr.success(msg);
  }
}

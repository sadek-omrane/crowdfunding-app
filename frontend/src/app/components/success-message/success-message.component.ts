import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
})
export class SuccessMessageComponent implements OnInit {

  snackBarRef = inject(MatSnackBarRef);

  message : string = this.data;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }

  ngOnInit() {
  }

  close(){
    this.snackBarRef.dismiss();
  }

}

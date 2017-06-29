import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  template: `
    <ion-list no-lines>
      <button ion-item icon-right (click)="selectedValue('update')">
        Update
          <ion-icon name="create" color="primary"></ion-icon>
      </button>
      <button ion-item icon-right (click)="selectedValue('delete')">
        Delete
          <ion-icon name="trash" color="danger"></ion-icon>        
      </button>
    </ion-list>
  `
})
export class PopoverPage {
  value: string
  constructor(public viewCtrl: ViewController) {
    this.value = 'none'
  }

  selectedValue(valueSelected) {
    this.viewCtrl.dismiss(valueSelected);
  }
}
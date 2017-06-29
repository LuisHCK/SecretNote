import { PopoverPage } from './../popover/popover';
import { LocalStorageProvider } from './../../providers/localstorage';
import { NoteModalPage } from './../note-modal/note-modal';
import { Component } from '@angular/core';
import { NavController, Platform, NavParams, ViewController, PopoverController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LocalStorageProvider]
})
export class HomePage {

  private pincode: string

  private notes = []

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private navParams: NavParams, public localStorage: LocalStorageProvider, public popoverCtrl: PopoverController) {
    this.pincode = navParams.get('pincode');

    this.getNotes()
  }

  getNotes() {
    let decryptedNotes = []
    this.localStorage.getNotes().then(notes => {
      if (notes) {
        this.notes = []
        notes.forEach(note => {
          let Addnote = {
            title: this.localStorage.decryptString(note.title, this.pincode),
            content: this.localStorage.decryptString(note.content, this.pincode),
            date: note.date.toLocaleString()
          }
          this.notes.push(Addnote)
        });
      }
    })
    console.log(this.notes[4])
  }

    presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((popoverData)=>{
      console.log(popoverData)
    })
  }

  openModal() {
    let modal = this.modalCtrl.create(NoteModalPage, {
      pincode: this.pincode
    });
    modal.present()

    modal.onDidDismiss(()=>{
      this.getNotes()
    })
  }
}

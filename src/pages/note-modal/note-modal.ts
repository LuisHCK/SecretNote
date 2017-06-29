import { LocalStorageProvider } from './../../providers/localstorage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-note-modal',
  templateUrl: 'note-modal.html',
  providers: [LocalStorageProvider]
})
export class NoteModalPage {

  private pincode: string
  private noteForm: any
  storedNotes = []

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public localStorage: LocalStorageProvider,
    public builder: FormBuilder) {

      this.localStorage.getNotes().then(notes=>{
        if(notes){
          this.storedNotes = notes
        }
      })

    this.noteForm = builder.group({
      title: '',
      content: ''
    })

    this.pincode = navParams.get('pincode');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteModalPage');
  }

  onSubmit(formData) {
    try {
      let newNote = {
        title: formData.title,
        content: formData.content,
        date: new Date
      }
      this.localStorage.addNote(formData.title, formData.content, this.pincode, this.storedNotes)
    }
    catch (error) {
      console.log(error)
    }
  }

  getNotes() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import CryptoJS from 'crypto-js';

@Injectable()
export class LocalStorageProvider {

    private encrypt_key: string

    constructor(private storage: Storage) {
    }

    addNote(title, content, pincode, notes) {
        console.log(notes)
        let encrypt_pincode = String(CryptoJS.SHA1(pincode))

        let newNote = {
            title: String(CryptoJS.AES.encrypt(title, encrypt_pincode)),
            content: String(CryptoJS.AES.encrypt(content, encrypt_pincode)),
            date: new Date()
        }

        notes.push(newNote)

        this.storage.set('notes', notes)
    }

    getNotes() {
        return this.storage.get('notes')
    }

    decryptString(text, pincode) {
        let encrypt_pincode = String(CryptoJS.SHA1(pincode))

        let bytes = CryptoJS.AES.decrypt(text, encrypt_pincode);
        let plaintext = bytes.toString(CryptoJS.enc.Utf8);

        return plaintext
    }
}
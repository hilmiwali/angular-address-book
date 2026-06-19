import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { STATE_LIST } from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];

  getContacts(): Contact[] {
    return [...this.contacts];
  }

  getStateList(): readonly string[] {
    return STATE_LIST;
  }

  insert(contact: Contact): void {
    this.contacts = [...this.contacts, contact];
  }

  update(contact: Contact): void {
    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index !== -1) {
      this.contacts = [
        ...this.contacts.slice(0, index),
        contact,
        ...this.contacts.slice(index + 1)
      ];
    }
  }

  delete(contact: Contact): void {
    this.contacts = this.contacts.filter(c => c.id !== contact.id);
  }
}

import { Component, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { formatAddress } from '../../utils/address-formatter';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    DxDataGridModule,
    DxPopupModule,
    DxButtonModule,
    ModalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  contacts: Contact[] = [];
  isPopupVisible = false;
  selectedContact: Contact | null = null;

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
  }

  formatAddress = formatAddress;

  onAddClick(): void {
    this.selectedContact = null;
    this.isPopupVisible = true;
  }

  onRowClick(e: any): void {
    // Ignore clicks on the delete button column
    if (e.column && e.column.type === 'buttons') return;
    this.selectedContact = { ...e.data, address: { ...e.data.address } };
    this.isPopupVisible = true;
  }

  onDeleteButtonClick = (e: any): void => {
    const contact = e.row.data as Contact;
    const confirmed = confirm(`Are you sure you want to delete "${contact.name}"?`);
    if (confirmed) {
      this.contactService.delete(contact);
      this.refreshContacts();
    }
  };

  handleSave(contact: Contact): void {
    if (this.selectedContact === null) {
      // Create mode
      contact.id = this.generateId();
      this.contactService.insert(contact);
    } else {
      // Edit mode
      this.contactService.update(contact);
    }
    this.isPopupVisible = false;
    this.refreshContacts();
  }

  handleCancel(): void {
    this.isPopupVisible = false;
    this.selectedContact = null;
  }

  calculateAddressValue = (rowData: Contact): string => {
    return formatAddress(rowData.address);
  };

  private refreshContacts(): void {
    this.contacts = this.contactService.getContacts();
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}

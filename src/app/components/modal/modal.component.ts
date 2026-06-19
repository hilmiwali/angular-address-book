import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { Contact, Address } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { validateName, validateEmail, validatePhone, validatePostcode, ValidationState } from '../../validators/contact-validators';

type ModalMode = 'create' | 'view' | 'edit';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [DxTextBoxModule, DxSelectBoxModule, DxButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnChanges {
  @Input() contactData: Contact | null = null;
  @Output() onSave = new EventEmitter<Contact>();
  @Output() onCancel = new EventEmitter<void>();

  mode: ModalMode = 'create';
  stateList: string[] = [];

  // Form fields
  name = '';
  email = '';
  phone = '';
  street = '';
  state = '';
  postcode = '';
  description = '';

  // Validation state
  validation: ValidationState = {
    name: false,
    email: true,
    phone: true,
    postcode: true
  };

  // Error messages
  nameError = '';
  emailError = '';
  phoneError = '';
  postcodeError = '';

  // Track if fields have been touched (for showing errors)
  touched: Record<string, boolean> = {};

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {
    this.stateList = [...this.contactService.getStateList()];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contactData']) {
      this.resetForm();
      if (this.contactData) {
        this.mode = 'view';
        this.populateForm(this.contactData);
      } else {
        this.mode = 'create';
      }
      this.validateAll();
      this.cdr.markForCheck();
    }
  }

  get isReadOnly(): boolean {
    return this.mode === 'view';
  }

  get isFormValid(): boolean {
    return this.validation.name && this.validation.email && this.validation.phone && this.validation.postcode;
  }

  get showCreateButton(): boolean {
    return this.mode === 'create';
  }

  get showEditButton(): boolean {
    return this.mode === 'view';
  }

  get showSaveButton(): boolean {
    return this.mode === 'edit';
  }

  onNameChanged(value: string): void {
    this.name = value;
    this.touched['name'] = true;
    this.validation.name = validateName(value);
    this.nameError = this.validation.name ? '' : 'Name is required';
  }

  onEmailChanged(value: string): void {
    this.email = value;
    this.touched['email'] = true;
    this.validation.email = validateEmail(value);
    this.emailError = this.validation.email ? '' : 'Please enter a valid email address';
  }

  onPhoneChanged(value: string): void {
    this.phone = value;
    this.touched['phone'] = true;
    this.validation.phone = validatePhone(value);
    this.phoneError = this.validation.phone ? '' : 'Phone number cannot contain letters';
  }

  onStreetChanged(value: string): void {
    this.street = value;
  }

  onStateChanged(value: string): void {
    this.state = value || '';
  }

  onPostcodeChanged(value: string): void {
    this.postcode = value;
    this.touched['postcode'] = true;
    this.validation.postcode = validatePostcode(value);
    this.postcodeError = this.validation.postcode ? '' : 'Postcode must contain only numbers';
  }

  onDescriptionChanged(value: string): void {
    this.description = value;
  }

  onEditClick(): void {
    this.mode = 'edit';
    this.cdr.markForCheck();
  }

  onCreateClick(): void {
    if (!this.isFormValid) return;
    const contact = this.buildContact();
    this.onSave.emit(contact);
  }

  onSaveClick(): void {
    if (!this.isFormValid) return;
    const contact = this.buildContact();
    this.onSave.emit(contact);
  }

  onCancelClick(): void {
    this.onCancel.emit();
  }

  private buildContact(): Contact {
    return {
      id: this.contactData?.id || '',
      name: this.name.trim(),
      email: this.email.trim(),
      phone: this.phone.trim(),
      address: {
        street: this.street.trim(),
        state: this.state,
        postcode: this.postcode.trim()
      },
      description: this.description.trim()
    };
  }

  private populateForm(contact: Contact): void {
    this.name = contact.name || '';
    this.email = contact.email || '';
    this.phone = contact.phone || '';
    this.street = contact.address?.street || '';
    this.state = contact.address?.state || '';
    this.postcode = contact.address?.postcode || '';
    this.description = contact.description || '';
  }

  private resetForm(): void {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.street = '';
    this.state = '';
    this.postcode = '';
    this.description = '';
    this.nameError = '';
    this.emailError = '';
    this.phoneError = '';
    this.postcodeError = '';
    this.touched = {};
    this.validation = { name: false, email: true, phone: true, postcode: true };
  }

  private validateAll(): void {
    this.validation.name = validateName(this.name);
    this.validation.email = validateEmail(this.email);
    this.validation.phone = validatePhone(this.phone);
    this.validation.postcode = validatePostcode(this.postcode);
  }
}

export interface Address {
  street: string;
  state: string;
  postcode: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  description: string;
}

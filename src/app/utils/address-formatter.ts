import { Address } from '../models/contact.model';

/**
 * Formats an Address object into a display string.
 * Concatenates street, state, and postcode with ", " separator.
 * Omits empty/falsy segments and their associated separators.
 * 
 * Examples:
 *   { street: '123 Main St', state: 'Selangor', postcode: '40000' } → '123 Main St, Selangor, 40000'
 *   { street: '123 Main St', state: '', postcode: '40000' } → '123 Main St, 40000'
 *   { street: '', state: '', postcode: '' } → ''
 */
export function formatAddress(address: Address): string {
  return [address.street, address.state, address.postcode]
    .filter(segment => segment !== undefined && segment !== null && segment.trim() !== '')
    .join(', ');
}

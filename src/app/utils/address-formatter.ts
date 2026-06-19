import { Address } from '../models/contact.model';

/**
 * Formats an Address object into a display string.
 * Concatenates street, state, and postcode with ", " separator.
 * Omits empty/falsy segments and their associated separators.
 * 
 */
export function formatAddress(address: Address): string {
  const street = address.street?.trim() || '';
  const state = address.state?.trim() || '';
  const postcode = address.postcode?.trim() || '';

  // Format: street, postcode state
  const statePart = [postcode, state].filter(s => s !== '').join(' ');
  return [street, statePart].filter(s => s !== '').join(', ');
}

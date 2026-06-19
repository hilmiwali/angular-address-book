export interface ValidationState {
  name: boolean;
  email: boolean;
  phone: boolean;
  postcode: boolean;
}

/**
 * Validates the Name field.
 * Accepts if trimmed length is between 1 and 200 characters (inclusive).
 */
export function validateName(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length >= 1 && trimmed.length <= 200;
}

/**
 * Validates the Email field.
 * Accepts if empty (optional) or matches valid email format:
 * one "@", non-empty local part, domain with at least one ".".
 */
export function validateEmail(value: string): boolean {
  if (value === '') return true;
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value);
}

/**
 * Validates the Phone field.
 * Accepts if empty (optional) or contains no alphabetic characters and max 20 chars.
 */
export function validatePhone(value: string): boolean {
  if (value === '') return true;
  if (value.length > 20) return false;
  return !/[a-zA-Z]/.test(value);
}

/**
 * Validates the Postcode field.
 * Accepts if empty (optional) or contains only digits and max 10 chars.
 */
export function validatePostcode(value: string): boolean {
  if (value === '') return true;
  if (value.length > 10) return false;
  return /^\d+$/.test(value);
}

/**
 * Returns true when all individual validations pass.
 */
export function isFormValid(state: ValidationState): boolean {
  return state.name && state.email && state.phone && state.postcode;
}

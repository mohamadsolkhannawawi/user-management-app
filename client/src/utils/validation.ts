// src/utils/validation.ts

// This file contains utility functions for validating various input fields
// used throughout the client application. These functions help ensure data integrity
// and provide immediate feedback to the user on form inputs.

/**
 * Validates an email address using a regular expression.
 * @param email The email string to validate.
 * @returns True if the email is valid, false otherwise.
 */
export const validateEmail = (email: string): boolean => {
    // Regular expression for a standard email format.
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
};

/**
 * Validates a phone number.
 * Allows an optional '+' prefix and requires 10 to 15 digits.
 * @param phoneNumber The phone number string to validate.
 * @returns True if the phone number is valid, false otherwise.
 */
export const validatePhoneNumber = (phoneNumber: string): boolean => {
    // Regular expression for phone numbers, allowing optional '+' and 10-15 digits.
    const re = /^\+?[0-9]{10,15}$/;
    return re.test(String(phoneNumber));
};

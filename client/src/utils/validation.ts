// src/utils/validation.ts

export const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
    const re = /^\+?[0-9]{10,15}$/; // Allows optional '+' and 10-15 digits
    return re.test(String(phoneNumber));
};

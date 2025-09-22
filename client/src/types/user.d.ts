// src/types/user.d.ts

// Define User type (should match backend)
export type User = {
    id: number;
    nama: string;
    email: string;
    nomorTelepon: string;
    departemen: string;
    statusAktif: boolean;
    createdAt: string;
    updatedAt: string;
};

// Define UserFormData type for creation/update
export type UserFormData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

// Define UserEditData type for editable fields (same as UserFormData)
export type UserEditData = UserFormData;

import { Document } from 'mongoose';

export interface Contact {
  firstName?: string;
  lastName?: string;
  workEmail?: string;
  personalEmail?: string;
  workPhone?: string;
  homePhone?: string;
  phone?: string;
  company?: string;
  website?: string;
  address?: string;
  notes?: string;
  photo?: string;
  birthday?: Date;
}

export interface ContactModel extends Contact, Document {}

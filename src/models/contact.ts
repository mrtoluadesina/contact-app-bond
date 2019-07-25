import mongoose from 'mongoose';

import { ContactModel } from '../typings/contact';

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  workEmail: { type: String, index: true },
  personalEmail: { type: String, index: true },
  workPhone: { type: String, index: true },
  homePhone: { type: String, index: true },
  phone: String,
  company: String,
  website: String,
  address: String,
  notes: String,
  photo: String,
  birthday: Date,
});

export default mongoose.model<ContactModel>('Contact', contactSchema);

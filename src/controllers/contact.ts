import joi from '@hapi/joi';

import Contact from '../models/contact';
import { Contact as IContact } from '../typings/contact';

export async function allContacts() {
  return Contact.find();
}

export async function findContactByID(id: string) {
  return Contact.findById(id);
}

export async function findContact(query: string) {
  return Contact.find({
    $or: [
      { workEmail: query },
      { personalEmail: query },
      { workPhone: query },
      { phone: query },
    ],
  });
}

const contactSchema = {
  firstName: joi.string().allow(''),
  lastName: joi.string().allow(''),
  workEmail: joi
    .string()
    .email()
    .allow(''),
  personalEmail: joi
    .string()
    .email()
    .allow(''),
  workPhone: joi
    .string()
    .regex(/^\+\d{13}$/)
    .allow(''),
  homePhone: joi
    .string()
    .regex(/^\+\d{13}$/)
    .allow(''),
  phone: joi
    .string()
    .regex(/^\+\d{13}$/)
    .allow(''),
  company: joi.string().allow(''),
  website: joi.string().allow(''),
  address: joi.string().allow(''),
  notes: joi.string().allow(''),
  photo: joi.string().allow(''),
  birthday: joi.date().allow(''),
};

export async function createContact(contactBody: IContact) {
  const { error, value } = joi.validate(contactBody, contactSchema, {
    skipFunctions: true,
    stripUnknown: true,
    abortEarly: false,
  });

  if (error) {
    console.log(error);
    throw new Error('ContactBody is not valid');
  }

  const contact = new Contact(value);

  return contact.save();
}

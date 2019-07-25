import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql';

import { ContactModel } from '../typings/contact';

const ContactType = new GraphQLObjectType<ContactModel>({
  name: 'Contact',
  description: 'A contact in our app',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The unique identifier for this contact',
      resolve: source => source._id,
    },
    fullName: {
      type: GraphQLString,
      description: 'The full name of the contact',
      resolve: source => `${source.firstName} ${source.lastName}`,
    },
    workEmail: {
      type: GraphQLString,
      description: 'The work email of this contact',
    },
    personalEmail: {
      type: GraphQLString,
      description: 'The personal email of this contact',
    },
    workPhone: {
      type: GraphQLString,
      description: 'The work phone of this contact',
    },
    homePhone: {
      type: GraphQLString,
      description: 'The home phone of this contact',
    },
    phone: {
      type: GraphQLString,
      description: 'The work email of this contact',
    },
    company: {
      type: GraphQLString,
      description: 'The work email of this contact',
    },
    website: {
      type: GraphQLString,
      description: 'The work email of this contact',
    },
    address: {
      type: GraphQLString,
      description: 'The work email of this contact',
    },
    notes: {
      type: GraphQLString,
      description: 'The work email of this contact',
    },
    photo: {
      type: GraphQLString,
      description: 'The work email of this contact',
    },
  }),
});

export const ContactInput = new GraphQLInputObjectType({
  name: 'ContactInput',
  description: 'The body of the contact to create',
  fields: () => ({
    firstName: {
      type: GraphQLString,
      description: 'The full name of the contact',
    },
    lastName: {
      type: GraphQLString,
      description: 'The full name of the contact',
    },
    workEmail: {
      type: GraphQLString,
      description: 'The work email of this contact',
    },
    personalEmail: {
      type: GraphQLString,
      description: 'The personal email of this contact',
    },
    workPhone: {
      type: GraphQLString,
      description: 'The work phone of this contact',
    },
    homePhone: {
      type: GraphQLString,
      description: 'The home phone of this contact',
    },
    phone: {
      type: GraphQLString,
      description: 'The work email of this contact',
    },
    company: {
      type: GraphQLString,
      description: 'The work email of this contact',
    },
    website: {
      type: GraphQLString,
      description: 'The work email of this contact',
    },
    address: {
      type: GraphQLString,
      description: 'The work email of this contact',
    },
    notes: {
      type: GraphQLString,
      description: 'The work email of this contact',
    },
    photo: {
      type: GraphQLString,
      description: 'The work email of this contact',
    },
  }),
});

export default ContactType;

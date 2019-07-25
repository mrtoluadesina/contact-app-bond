import { GraphQLObjectType, GraphQLSchema, GraphQLList } from 'graphql';

import { allContacts, createContact } from './controllers/contact';
import ContactType, { ContactInput } from './types/contact';

const query = new GraphQLObjectType({
  name: 'ContactQuery',
  description: 'All the Query types supported by our contact app',
  fields: () => ({
    contacts: {
      type: new GraphQLList(ContactType),
      description: 'Returns all contacts',
      resolve: () => allContacts(),
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: 'ContactMutations',
  description: 'All the mutations supported by our contact app',
  fields: () => ({
    createContact: {
      type: ContactType,
      description: 'Create a new contact',
      args: {
        input: {
          type: ContactInput,
          description: 'The values to create a new contact',
        },
      },
      resolve: (_, args) => createContact(args.input),
    },
  }),
});

const schema = new GraphQLSchema({
  query,
  mutation,
});

export default schema;

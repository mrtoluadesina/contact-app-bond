import { Router } from 'express';
import { allContacts, findContactByID } from '../controllers/contact';

const router = Router();

router.get('/contacts', async function(_req, res, _next) {
  const contacts = await allContacts();

  res.status(200).json({ contacts });
});

router.get('/contact/:contactID', (req, res) => {
  const { contactID } = req.params;

  findContactByID(contactID)
    .then(contact => {
      if (contact) {
        res.status(200).json({ contact });

        return;
      }

      res.status(404).json({ error: 'Contact was not found' });
    })
    .catch(err => {
      res.status(404).json({ error: 'Contact was not found' });

      console.error(err);
    });
});

export default router;

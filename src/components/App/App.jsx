import { useState } from 'react';
import useLocaleStorage from 'hooks/useLocaleStorage';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import Container from './app.styled';
import ContactForm from 'components/ContactForm/';
import ContactList from 'components/ContactList/';
import Filter from 'components/Filter/';

const CONTACTS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useLocaleStorage(CONTACTS_KEY, []);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const normalizedName = name.toLowerCase();

    const existingName = contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    );

    if (existingName) {
      Report.failure(`${normalizedName} is already in contacts`, 'sorry');
      return;
    }

    setContacts([{ id: nanoid(), name, number }, ...contacts]);
  };

  const onDeleteContact = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };

  const onChangeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      {contacts.length > 0 &&
        ((<Filter value={filter} onChange={onChangeFilter} />),
        (
          <ContactList
            contacts={getVisibleContacts()}
            onDeleteContact={onDeleteContact}
          />
        ))}
    </Container>
  );
};

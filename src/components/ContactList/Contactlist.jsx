import PropTypes from 'prop-types';
import { FaUserAltSlash } from 'react-icons/fa';
import { List } from './Contactlist.styled';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          {name}: {number}
          <button type="button" onClick={() => onDeleteContact(id)}>
            <FaUserAltSlash size={20} color={'red'} />
          </button>
        </li>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;

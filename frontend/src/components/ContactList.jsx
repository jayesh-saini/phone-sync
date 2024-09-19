import React from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';

const ContactList = ({ contacts, onContactClick, loading }) => {
  return (
    <div className="h-100 d-flex flex-column p-3">
      <h2 className="mb-3">Contacts</h2>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <ListGroup className="flex-grow-1 overflow-auto">
          {contacts.map((contact) => (
            <ListGroup.Item
              key={contact.id}
              action
              onClick={() => onContactClick(contact)}
              className="d-flex justify-content-between align-items-center"
            >
              <span>{contact.name}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default ContactList;
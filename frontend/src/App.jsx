import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ContactList from './components/ContactList';
import ConversationView from './components/ConversationView';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const serverBaseUrl = "http://localhost:3000/api/sms"

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverBaseUrl}/contacts`);
      setContacts(response.data.contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConversation = async (contact) => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverBaseUrl}/conversation/${contact.phoneNumber}`);
      setConversation(response.data.conversation);
      setSelectedContact(contact);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = (contact) => {
    fetchConversation(contact);
  };

  const handleRefresh = () => {
    if (selectedContact) {
      fetchConversation(selectedContact);
    }
  };

  return (
    <Container fluid className="vh-100 d-flex flex-column p-0">
      <Row className="flex-grow-1 g-0">
        <Col lg={4} md={5} className="contact-list-col">
          <ContactList
            contacts={contacts}
            onContactClick={handleContactClick}
            loading={loading}
          />
        </Col>
        <Col lg={8} md={7} className="conversation-view-col">
          <ConversationView
            contact={selectedContact}
            conversation={conversation}
            onRefresh={handleRefresh}
            loading={loading}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
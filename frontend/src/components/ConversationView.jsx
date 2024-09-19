import React from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import DOMPurify from 'dompurify';

const ConversationView = ({ contact, conversation, onRefresh, loading }) => {
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true };

  if (!contact) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <p>Select a contact to view conversation</p>
      </div>
    );
  }

  return (
    <div className="h-100 d-flex flex-column p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{contact.name}</h2>
        <Button onClick={onRefresh} disabled={loading}>
          Refresh
        </Button>
      </div>
      <Card className="flex-grow-1">
        <Card.Header>
          <strong>{contact.name}</strong> ({contact.phoneNumber})
        </Card.Header>
        <Card.Body className="overflow-auto">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            conversation.map((message) => (
              <div
                key={message.id}
                className={`mb-2 d-flex ${message.receiver_number == "" ? 'justify-content-start' : 'justify-content-end'
                  }`}
              >
                <div
                  className={`p-2 rounded ${message.receiver_number != "" ? 'bg-success' : 'bg-primary text-white'
                    }`}
                >
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.message) }} />
                  <small className="text-muted">{new Date(message.creation_ts).toLocaleString('en-US', options).replace(/,/g, '').replace(/(\d{1,2}):(\d{2})/, (match, p1, p2) => {
                    return `${p1}:${p2}`;
                  })}</small>
                </div>
              </div>
            ))
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ConversationView;
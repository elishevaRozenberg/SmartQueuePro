// CallNextButton.jsx
import React from 'react';
import './CallNextButton.css';

const CallNextButton = ({ queueId, onCalled }) => {
  const handleCallNext = async () => {
    try {
      const res = await fetch(`/calls/${queueId}/next`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      console.log('Next user called:', data);
      if (onCalled) onCalled(data);
    } catch (err) {
      console.error('Failed to call next:', err);
    }
  };

  return (
    <button className="call-next-button" onClick={handleCallNext}>
      Call Next
    </button>
  );
};

export default CallNextButton;

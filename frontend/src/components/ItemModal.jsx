import React, { useState } from 'react';
import { X, MapPin, Clock, Info } from 'lucide-react';
import Button from './Button';
import Input from './Input';
import './ItemModal.css';

const ItemModal = ({ item, onClose, onSubmitClaim }) => {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitClaim(item.id, answer);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setAnswer('');
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container glass-panel animate-fade-in" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-content-grid">
          <div className="modal-image-section">
            <img src={item.image} alt={item.title} className="modal-image" />
          </div>

          <div className="modal-details-section">
            <div className="modal-header">
              <h2 className="modal-title">{item.title}</h2>
              <span className={`status-badge badge-${item.status.toLowerCase()}`}>
                {item.status}
              </span>
            </div>

            <p className="modal-description">{item.description}</p>

            <div className="modal-meta-grid">
              <div className="meta-item">
                <MapPin size={18} />
                <span>{item.location}</span>
              </div>
              <div className="meta-item">
                <Clock size={18} />
                <span>{new Date(item.date).toLocaleDateString()}</span>
              </div>
              <div className="meta-item">
                <Info size={18} />
                <span>Category: {item.category}</span>
              </div>
            </div>

            <div className="modal-action-section">
              {submitted ? (
                <div className="success-message">
                  ✓ Claim request sent successfully!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="claim-form">
                  {item.verificationQuestion ? (
                    <div className="verification-block">
                      <label className="verification-label">
                        Verification Required: {item.verificationQuestion}
                      </label>
                      <Input
                        placeholder="Your answer..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                      />
                    </div>
                  ) : (
                    <p className="verification-notice">
                      Please confirm if this item belongs to you.
                    </p>
                  )}
                  
                  <Button type="submit" variant="primary" fullWidth>
                    {item.status.toLowerCase() === 'lost' ? 'I found this' : 'Claim this item'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;

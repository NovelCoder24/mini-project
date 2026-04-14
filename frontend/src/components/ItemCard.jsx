import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import './ItemCard.css';

const ItemCard = ({ item, onClick }) => {
  const isLost = item.status.toLowerCase() === 'lost';
  const badgeClass = isLost ? 'badge-lost' : 'badge-found';

  return (
    <div className="item-card glass-panel animate-fade-in" onClick={() => onClick(item)}>
      <div className="card-image-wrapper">
        <img src={item.image} alt={item.title} className="card-image" />
        <span className={`status-badge ${badgeClass}`}>
          {item.status}
        </span>
      </div>
      <div className="card-content">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-description">{item.description}</p>
        
        <div className="card-meta">
          <div className="meta-item">
            <MapPin size={16} />
            <span>{item.location}</span>
          </div>
          <div className="meta-item">
            <Clock size={16} />
            <span>{new Date(item.createdAt || item.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

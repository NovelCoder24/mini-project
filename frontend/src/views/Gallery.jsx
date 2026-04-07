import React, { useState } from 'react';
import ItemCard from '../components/ItemCard';
import ItemModal from '../components/ItemModal';
import { mockedItems } from '../mockData';
import './Gallery.css';

const Gallery = ({ searchQuery }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All'); // All, Lost, Found
  
  const filteredItems = mockedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || item.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const handleClaim = (itemId, verificationAnswer) => {
    console.log(`Claimed item ${itemId} with answer: ${verificationAnswer}`);
    // In a real app, this would hit an API endpoint
  };

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Recently Reported</h1>
        <p className="subtitle">Help locate missing belongings across campus</p>
        
        <div className="filter-chips">
          {['All', 'Lost', 'Found'].map(status => (
            <button
              key={status}
              className={`chip ${selectedStatus === status ? 'chip-active' : ''}`}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="empty-state glass-panel">
          <h3>No items found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="items-grid">
          {filteredItems.map(item => (
            <ItemCard 
              key={item.id} 
              item={item} 
              onClick={setSelectedItem} 
            />
          ))}
        </div>
      )}

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSubmitClaim={handleClaim}
        />
      )}
    </div>
  );
};

export default Gallery;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import ItemModal from '../components/ItemModal';
import { currentUser } from '../mockData';
import './Gallery.css';

const Gallery = ({ searchQuery }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All'); // All, Lost, Found
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get('/api/items');
        setItems(data);
      } catch (error) {
        console.error('Error fetching items', error);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter(item => {
    const searchLower = searchQuery ? searchQuery.toLowerCase() : '';
    const matchesSearch = item.title?.toLowerCase().includes(searchLower) || 
                          item.description?.toLowerCase().includes(searchLower);
    const matchesStatus = selectedStatus === 'All' || item.status?.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const handleClaim = async (itemId, verificationAnswer) => {
    try {
      await axios.post('/api/claims', {
        itemId,
        claimerId: currentUser.id,
        claimerName: currentUser.name,
        answer: verificationAnswer
      });
      // Optionally trigger re-fetch or state update here
    } catch (error) {
      console.error('Error submitting claim', error);
    }
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
              key={item._id || item.id} 
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

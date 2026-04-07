import React, { useState } from 'react';
import { currentUser, mockedItems, mockedClaims } from '../mockData';
import ItemCard from '../components/ItemCard';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('myItems'); // myItems, myClaims

  const myItems = mockedItems.filter(item => item.finderId === currentUser.id);
  
  const myClaims = mockedClaims
    .filter(claim => claim.claimerId === currentUser.id)
    .map(claim => {
      const item = mockedItems.find(i => i.id === claim.itemId);
      return { ...claim, item };
    });

  return (
    <div className="dashboard-container">
      <div className="profile-header glass-panel">
        <img src={currentUser.avatar} alt={currentUser.name} className="profile-avatar" />
        <div className="profile-info">
          <h1>{currentUser.name}</h1>
          <p className="profile-email">{currentUser.email}</p>
          <span className="profile-role">{currentUser.role}</span>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'myItems' ? 'active' : ''}`}
            onClick={() => setActiveTab('myItems')}
          >
            Reported by Me ({myItems.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'myClaims' ? 'active' : ''}`}
            onClick={() => setActiveTab('myClaims')}
          >
            My Claims ({myClaims.length})
          </button>
        </div>

        <div className="tab-panels">
          {activeTab === 'myItems' && (
            <div className="items-grid">
              {myItems.length === 0 ? (
                <div className="empty-state glass-panel">
                  <p>You haven't reported any items yet.</p>
                </div>
              ) : (
                myItems.map(item => (
                  <ItemCard key={item.id} item={item} onClick={() => {}} />
                ))
              )}
            </div>
          )}

          {activeTab === 'myClaims' && (
            <div className="claims-list">
              {myClaims.length === 0 ? (
                <div className="empty-state glass-panel">
                  <p>You haven't made any claims yet.</p>
                </div>
              ) : (
                myClaims.map(claim => (
                  <div key={claim.id} className="claim-card glass-panel flex-row">
                    <img src={claim.item?.image} alt={claim.item?.title} className="claim-thumbnail" />
                    <div className="claim-details">
                      <h3>{claim.item?.title}</h3>
                      <p>Claimed on: {new Date(claim.date).toLocaleDateString()}</p>
                      <span className={`status-badge badge-${claim.status}`}>
                        {claim.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

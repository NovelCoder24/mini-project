import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { currentUser } from '../mockData';
import ItemCard from '../components/ItemCard';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('myItems');
  const [myItems, setMyItems] = useState([]);
  const [myClaims, setMyClaims] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: allItems } = await axios.get('/api/items');
        setMyItems(allItems.filter(item => item.finderId === currentUser.id));

        const { data: claims } = await axios.get(`/api/claims?claimerId=${currentUser.id}`);
        const claimsWithItem = claims.map(claim => ({
          ...claim,
          item: claim.itemId // Mongoose populated this
        }));
        setMyClaims(claimsWithItem);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };
    fetchDashboardData();
  }, []);

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
                  <ItemCard key={item._id || item.id} item={item} onClick={() => {}} />
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
                  <div key={claim._id || claim.id} className="claim-card glass-panel flex-row">
                    <img src={claim.item?.image} alt={claim.item?.title} className="claim-thumbnail" />
                    <div className="claim-details">
                      <h3>{claim.item?.title}</h3>
                      <p>Claimed on: {new Date(claim.createdAt).toLocaleDateString()}</p>
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

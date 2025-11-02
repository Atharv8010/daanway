import React, { useState } from 'react';
import './ImpactTracker.css';

const ImpactTracker = ({ donations }) => {
  const [selectedDonation, setSelectedDonation] = useState(null);

  const getCategoryIcon = (category) => {
    const icons = {
      food: '🍲',
      clothes: '👕',
      books: '📚',
      toys: '🧸',
      medicine: '💊'
    };
    return icons[category] || '📦';
  };

  const getStatusProgress = (status) => {
    const statusMap = {
      pending: { step: 1, label: 'Donation Submitted' },
      accepted: { step: 2, label: 'Accepted by NGO' },
      picked: { step: 3, label: 'Picked Up' },
      distributed: { step: 4, label: 'Distributed' }
    };
    return statusMap[status] || statusMap.pending;
  };

  const donationsWithImpact = donations.filter(d => 
    d.status !== 'pending' && d.status !== 'declined'
  );

  return (
    <div className="impact-tracker-container">
      <div className="impact-header">
        <h2>Impact Tracker</h2>
        <p>See how your donations are making a difference</p>
      </div>

      {donationsWithImpact.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📊</span>
          <h3>No impact data yet</h3>
          <p>Once your donations are accepted and distributed, you'll see their impact here</p>
        </div>
      ) : (
        <div className="impact-content">
          <div className="donations-timeline">
            {donationsWithImpact.map(donation => {
              const progress = getStatusProgress(donation.status);
              
              return (
                <div 
                  key={donation._id} 
                  className={`timeline-item ${selectedDonation?._id === donation._id ? 'selected' : ''}`}
                  onClick={() => setSelectedDonation(donation)}
                >
                  <div className="timeline-icon">
                    {getCategoryIcon(donation.category)}
                  </div>
                  
                  <div className="timeline-content">
                    <h3>{donation.category.charAt(0).toUpperCase() + donation.category.slice(1)}</h3>
                    <p className="timeline-date">
                      {new Date(donation.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    
                    <div className="progress-tracker">
                      {[1, 2, 3, 4].map(step => (
                        <div 
                          key={step}
                          className={`progress-step ${step <= progress.step ? 'completed' : ''}`}
                        >
                          <div className="progress-dot"></div>
                          {step < 4 && <div className="progress-line"></div>}
                        </div>
                      ))}
                    </div>
                    
                    <p className="progress-label">{progress.label}</p>
                    
                    {donation.assignedNGO && (
                      <p className="ngo-name">
                        Handled by: <strong>{donation.assignedNGO.name}</strong>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {selectedDonation && (
            <div className="impact-details">
              <h3>Impact Details</h3>
              
              <div className="donation-summary">
                <div className="summary-item">
                  <label>Category:</label>
                  <span>{getCategoryIcon(selectedDonation.category)} {selectedDonation.category.charAt(0).toUpperCase() + selectedDonation.category.slice(1)}</span>
                </div>
                
                <div className="summary-item">
                  <label>Items Donated:</label>
                  <ul>
                    {selectedDonation.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} - {item.quantity} {item.unit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {selectedDonation.assignedNGO && (
                  <div className="summary-item">
                    <label>NGO Partner:</label>
                    <span>{selectedDonation.assignedNGO.name}</span>
                  </div>
                )}
              </div>

              {selectedDonation.impactUpdates && selectedDonation.impactUpdates.length > 0 ? (
                <div className="impact-updates">
                  <h4>Impact Updates from NGO</h4>
                  {selectedDonation.impactUpdates.map((update, idx) => (
                    <div key={idx} className="update-card">
                      <div className="update-header">
                        <span className="update-status">{update.status}</span>
                        <span className="update-date">
                          {new Date(update.updatedAt).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                      
                      <p className="update-description">{update.description}</p>
                      
                      {update.beneficiaries && (
                        <div className="update-stat">
                          <span className="stat-icon">👥</span>
                          <span><strong>{update.beneficiaries}</strong> people benefited</span>
                        </div>
                      )}
                      
                      {update.location && (
                        <div className="update-stat">
                          <span className="stat-icon">📍</span>
                          <span>{update.location}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-updates">
                  <p>Waiting for impact updates from the NGO...</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImpactTracker;


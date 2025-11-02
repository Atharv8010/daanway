import React, { useState } from 'react';
import api from '../../services/api';
import './DonationRequests.css';

const DonationRequests = ({ donations, onUpdate }) => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [filterStatus, setFilterStatus] = useState('pending');

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

  const handleAction = async (donationId, action) => {
    setProcessing(donationId);
    try {
      await api.put(`/donations/${donationId}/status`, {
        status: action
      });
      onUpdate();
      setSelectedDonation(null);
    } catch (error) {
      console.error('Error updating donation:', error);
      alert('Failed to update donation. Please try again.');
    } finally {
      setProcessing(null);
    }
  };

  const filteredDonations = filterStatus === 'all' 
    ? donations 
    : donations.filter(d => d.status === filterStatus);

  return (
    <div className="donation-requests-container">
      <div className="requests-header">
        <h2>Donation Requests</h2>
        <div className="filter-tabs">
          <button
            className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pending')}
          >
            Pending ({donations.filter(d => d.status === 'pending').length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'accepted' ? 'active' : ''}`}
            onClick={() => setFilterStatus('accepted')}
          >
            Accepted ({donations.filter(d => d.status === 'accepted').length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All ({donations.length})
          </button>
        </div>
      </div>

      {filteredDonations.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <h3>No {filterStatus} donations</h3>
          <p>New donation requests will appear here</p>
        </div>
      ) : (
        <div className="requests-list">
          {filteredDonations.map(donation => (
            <div key={donation._id} className="request-card">
              <div className="request-card-header">
                <div className="request-category">
                  <span className="category-icon-large">
                    {getCategoryIcon(donation.category)}
                  </span>
                  <div>
                    <h3>{donation.category.charAt(0).toUpperCase() + donation.category.slice(1)} Donation</h3>
                    <p className="request-date">
                      {new Date(donation.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <span className={`status-badge status-${donation.status}`}>
                  {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                </span>
              </div>

              <div className="request-card-body">
                <div className="request-section">
                  <h4>Donor Information</h4>
                  <p><strong>Name:</strong> {donation.donor?.name}</p>
                  <p><strong>Phone:</strong> {donation.donor?.phone}</p>
                  <p><strong>Email:</strong> {donation.donor?.email}</p>
                </div>

                <div className="request-section">
                  <h4>Items</h4>
                  <ul className="items-list">
                    {donation.items.map((item, idx) => (
                      <li key={idx}>
                        <strong>{item.name}</strong> - {item.quantity} {item.unit}
                        {item.description && <p className="item-desc">{item.description}</p>}
                        {item.expiryDate && (
                          <p className="item-expiry">
                            Expires: {new Date(item.expiryDate).toLocaleDateString('en-IN')}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="request-section">
                  <h4>Pickup Details</h4>
                  <p><strong>Address:</strong> {donation.pickupAddress.street}, {donation.pickupAddress.city}, {donation.pickupAddress.pincode}</p>
                  <p><strong>Preferred Date:</strong> {new Date(donation.preferredPickupDate).toLocaleDateString('en-IN')}</p>
                  <p><strong>Preferred Time:</strong> {donation.preferredPickupTime}</p>
                </div>

                {donation.notes && (
                  <div className="request-section">
                    <h4>Additional Notes</h4>
                    <p>{donation.notes}</p>
                  </div>
                )}
              </div>

              <div className="request-card-footer">
                {donation.status === 'pending' && (
                  <>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleAction(donation._id, 'accepted')}
                      disabled={processing === donation._id}
                    >
                      {processing === donation._id ? (
                        <span className="loading"></span>
                      ) : (
                        '✓ Accept'
                      )}
                    </button>
                    <button
                      className="btn btn-outline"
                      onClick={() => handleAction(donation._id, 'declined')}
                      disabled={processing === donation._id}
                    >
                      ✕ Decline
                    </button>
                  </>
                )}
                {donation.status === 'accepted' && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAction(donation._id, 'picked')}
                    disabled={processing === donation._id}
                  >
                    {processing === donation._id ? (
                      <span className="loading"></span>
                    ) : (
                      '📦 Mark as Picked Up'
                    )}
                  </button>
                )}
                <button
                  className="btn btn-outline btn-small"
                  onClick={() => setSelectedDonation(donation)}
                >
                  👁️ View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedDonation && (
        <div className="modal-overlay" onClick={() => setSelectedDonation(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Donation Details</h3>
              <button className="modal-close-btn" onClick={() => setSelectedDonation(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Category:</label>
                  <span>{getCategoryIcon(selectedDonation.category)} {selectedDonation.category}</span>
                </div>
                <div className="detail-item">
                  <label>Status:</label>
                  <span className={`status-badge status-${selectedDonation.status}`}>
                    {selectedDonation.status}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Donor Name:</label>
                  <span>{selectedDonation.donor?.name}</span>
                </div>
                <div className="detail-item">
                  <label>Phone:</label>
                  <span>{selectedDonation.donor?.phone}</span>
                </div>
                <div className="detail-item full-width">
                  <label>Pickup Address:</label>
                  <span>
                    {selectedDonation.pickupAddress.street}, {selectedDonation.pickupAddress.city}, {selectedDonation.pickupAddress.state} - {selectedDonation.pickupAddress.pincode}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
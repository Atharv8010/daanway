// import React, { useState } from 'react';
// import api from '../../services/api';
// import './UpdateImpact.css';

// const UpdateImpact = ({ donations, onUpdate }) => {
//   const [selectedDonation, setSelectedDonation] = useState(null);
//   const [formData, setFormData] = useState({
//     status: 'Picked Up',
//     description: '',
//     beneficiaries: '',
//     location: '',
//     });
//   const [submitting, setSubmitting] = useState(false);

//   const getCategoryIcon = (category) => {
//     const icons = {
//       food: '🍲',
//       clothes: '👕',
//       books: '📚',
//       toys: '🧸',
//       medicine: '💊'
//     };
//     return icons[category] || '📦';
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     try {
//       await api.post(`/donations/${selectedDonation._id}/impact`, {
//         status: formData.status,
//         description: formData.description,
//         beneficiaries: parseInt(formData.beneficiaries) || 0,
//         location: formData.location
//       });

//       // Update donation status if it's being distributed
//       if (formData.status === 'Distributed') {
//         await api.put(`/donations/${selectedDonation._id}/status`, {
//           status: 'distributed'
//         });
//       }

//       setFormData({
//         status: 'Picked Up',
//         description: '',
//         beneficiaries: '',
//         location: ''
//       });
//       setSelectedDonation(null);
//       onUpdate();
//       alert('Impact update added successfully!');
//     } catch (error) {
//       console.error('Error updating impact:', error);
//       alert('Failed to update impact. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="update-impact-container">
//       <div className="impact-header">
//         <h2>Update Impact</h2>
//         <p>Add impact updates for accepted donations</p>
//       </div>

//       {donations.length === 0 ? (
//         <div className="empty-state">
//           <span className="empty-icon">📊</span>
//           <h3>No donations to update</h3>
//           <p>Accept donations to start tracking impact</p>
//         </div>
//       ) : (
//         <div className="donations-grid">
//           {donations.map(donation => (
//             <div key={donation._id} className="impact-donation-card">
//               <div className="donation-card-header">
//                 <div className="donation-info">
//                   <span className="category-icon">{getCategoryIcon(donation.category)}</span>
//                   <div>
//                     <h3>{donation.category.charAt(0).toUpperCase() + donation.category.slice(1)}</h3>
//                     <p className="donor-name">By {donation.donor?.name}</p>
//                   </div>
//                 </div>
//                 <span className={`status-badge status-${donation.status}`}>
//                   {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
//                 </span>
//               </div>

//               <div className="donation-card-body">
//                 <div className="info-row">
//                   <span className="info-label">Items:</span>
//                   <span className="info-value">{donation.items.length} items</span>
//                 </div>
//                 <div className="info-row">
//                   <span className="info-label">Pickup Date:</span>
//                   <span className="info-value">
//                     {new Date(donation.preferredPickupDate).toLocaleDateString('en-IN')}
//                   </span>
//                 </div>
//                 <div className="info-row">
//                   <span className="info-label">Updates:</span>
//                   <span className="info-value">{donation.impactUpdates?.length || 0} updates</span>
//                 </div>
//               </div>

//               <div className="donation-card-footer">
//                 <button
//                   className="btn btn-primary btn-full"
//                   onClick={() => setSelectedDonation(donation)}
//                 >
//                   ➕ Add Impact Update
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedDonation && (
//         <div className="modal-overlay" onClick={() => setSelectedDonation(null)}>
//           <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h3>Add Impact Update</h3>
//               <button className="modal-close-btn" onClick={() => setSelectedDonation(null)}>
//                 ✕
//               </button>
//             </div>

//             <div className="modal-body">
//               <div className="donation-summary-modal">
//                 <div className="summary-row">
//                   <span className="summary-label">Category:</span>
//                   <span className="summary-value">
//                     {getCategoryIcon(selectedDonation.category)} {selectedDonation.category}
//                   </span>
//                 </div>
//                 <div className="summary-row">
//                   <span className="summary-label">Donor:</span>
//                   <span className="summary-value">{selectedDonation.donor?.name}</span>
//                 </div>
//                 <div className="summary-row">
//                   <span className="summary-label">Items:</span>
//                   <span className="summary-value">
//                     {selectedDonation.items.map(item => `${item.name} (${item.quantity} ${item.unit})`).join(', ')}
//                   </span>
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit} className="impact-form">
//                 <div className="form-group">
//                   <label>Update Status *</label>
//                   <select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="Picked Up">Picked Up</option>
//                     <option value="In Transit">In Transit</option>
//                     <option value="Distributed">Distributed</option>
//                     <option value="Beneficiaries Identified">Beneficiaries Identified</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label>Description *</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     placeholder="Describe how the donation is being used or its impact..."
//                     rows="4"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Number of Beneficiaries</label>
//                   <input
//                     type="number"
//                     name="beneficiaries"
//                     value={formData.beneficiaries}
//                     onChange={handleChange}
//                     placeholder="How many people benefited?"
//                     min="0"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Location</label>
//                   <input
//                     type="text"
//                     name="location"
//                     value={formData.location}
//                     onChange={handleChange}
//                     placeholder="Where was it distributed? (e.g., Community Center, School)"
//                   />
//                 </div>

//                 <div className="form-actions">
//                   <button
//                     type="button"
//                     className="btn btn-outline"
//                     onClick={() => setSelectedDonation(null)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="btn btn-primary"
//                     disabled={submitting}
//                   >
//                     {submitting ? <span className="loading"></span> : '✓ Submit Update'}
//                   </button>
//                 </div>
//               </form>

//               {selectedDonation.impactUpdates && selectedDonation.impactUpdates.length > 0 && (
//                 <div className="previous-updates">
//                   <h4>Previous Updates</h4>
//                   <div className="updates-timeline">
//                     {selectedDonation.impactUpdates.map((update, idx) => (
//                       <div key={idx} className="update-item">
//                         <div className="update-dot"></div>
//                         <div className="update-content">
//                           <div className="update-header-timeline">
//                             <span className="update-status-badge">{update.status}</span>
//                             <span className="update-date">
//                               {new Date(update.updatedAt).toLocaleDateString('en-IN', {
//                                 day: 'numeric',
//                                 month: 'short',
//                                 year: 'numeric'
//                               })}
//                             </span>
//                           </div>
//                           <p className="update-description">{update.description}</p>
//                           {update.beneficiaries > 0 && (
//                             <p className="update-detail">
//                               <strong>👥 {update.beneficiaries}</strong> people benefited
//                             </p>
//                           )}
//                           {update.location && (
//                             <p className="update-detail">
//                               <strong>📍</strong> {update.location}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdateImpact;

import React, { useState } from 'react';
import api from '../../services/api';
import './UpdateImpact.css';

const UpdateImpact = ({ donations, onUpdate }) => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [formData, setFormData] = useState({
    status: 'Picked Up',
    description: '',
    beneficiaries: '',
    location: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

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

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      accepted: '#3b82f6',
      picked: '#8b5cf6',
      distributed: '#10b981'
    };
    return colors[status] || '#64748b';
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post(`/donations/${selectedDonation._id}/impact`, {
        status: formData.status,
        description: formData.description,
        beneficiaries: parseInt(formData.beneficiaries) || 0,
        location: formData.location
      });

      // Update donation status if it's being distributed
      if (formData.status === 'Distributed') {
        await api.put(`/donations/${selectedDonation._id}/status`, {
          status: 'distributed'
        });
      }

      // Success animation
      const successMsg = document.createElement('div');
      successMsg.className = 'success-toast';
      successMsg.innerHTML = '✓ Impact update added successfully!';
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 3000);

      setFormData({
        status: 'Picked Up',
        description: '',
        beneficiaries: '',
        location: ''
      });
      setSelectedDonation(null);
      onUpdate();
    } catch (error) {
      console.error('Error updating impact:', error);
      
      // Error toast
      const errorMsg = document.createElement('div');
      errorMsg.className = 'error-toast';
      errorMsg.innerHTML = '✕ Failed to update impact. Please try again.';
      document.body.appendChild(errorMsg);
      setTimeout(() => errorMsg.remove(), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  // Filter and search donations
  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         donation.donor?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || donation.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'food', 'clothes', 'books', 'toys', 'medicine'];

  const getTotalBeneficiaries = (donation) => {
    if (!donation.impactUpdates) return 0;
    return donation.impactUpdates.reduce((sum, update) => sum + (update.beneficiaries || 0), 0);
  };

  return (
    <div className="update-impact-container">
      <div className="impact-header">
        <div>
          <h2>Update Impact</h2>
          <p>Add impact updates for accepted donations and track beneficiaries</p>
        </div>
        
        {/* Search and Filter */}
        <div className="search-filter-container">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search donations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="category-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-pill ${filterCategory === cat ? 'active' : ''}`}
            onClick={() => setFilterCategory(cat)}
          >
            {cat === 'all' ? '📦 All' : `${getCategoryIcon(cat)} ${cat.charAt(0).toUpperCase() + cat.slice(1)}`}
          </button>
        ))}
      </div>

      {filteredDonations.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📊</span>
          <h3>{searchQuery ? 'No donations found' : 'No donations to update'}</h3>
          <p>{searchQuery ? 'Try adjusting your search' : 'Accept donations to start tracking impact'}</p>
        </div>
      ) : (
        <div className="donations-grid">
          {filteredDonations.map((donation, index) => (
            <div key={donation._id} className="impact-donation-card" style={{ '--card-index': index }}>
              {/* Progress Bar */}
              <div className="card-progress-bar" style={{ 
                background: `linear-gradient(90deg, ${getStatusColor(donation.status)} 0%, ${getStatusColor(donation.status)}80 100%)`
              }}></div>

              <div className="donation-card-header">
                <div className="donation-info">
                  <div className="category-icon-wrapper">
                    <span className="category-icon">{getCategoryIcon(donation.category)}</span>
                    <div className="icon-glow"></div>
                  </div>
                  <div>
                    <h3>{donation.category.charAt(0).toUpperCase() + donation.category.slice(1)}</h3>
                    <p className="donor-name">By {donation.donor?.name}</p>
                  </div>
                </div>
                <span className={`status-badge status-${donation.status}`} style={{
                  background: `${getStatusColor(donation.status)}20`,
                  color: getStatusColor(donation.status)
                }}>
                  {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                </span>
              </div>

              <div className="donation-card-body">
                <div className="info-row">
                  <span className="info-label">📦 Items:</span>
                  <span className="info-value">{donation.items.length} items</span>
                </div>
                <div className="info-row">
                  <span className="info-label">📅 Pickup:</span>
                  <span className="info-value">
                    {new Date(donation.preferredPickupDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">📝 Updates:</span>
                  <span className="info-value">{donation.impactUpdates?.length || 0} updates</span>
                </div>
                {getTotalBeneficiaries(donation) > 0 && (
                  <div className="info-row highlight">
                    <span className="info-label">👥 Helped:</span>
                    <span className="info-value highlight-value">{getTotalBeneficiaries(donation)} people</span>
                  </div>
                )}
              </div>

              <div className="donation-card-footer">
                <button
                  className="btn btn-primary btn-full"
                  onClick={() => setSelectedDonation(donation)}
                >
                  ➕ Add Impact Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedDonation && (
        <div className="modal-overlay" onClick={() => setSelectedDonation(null)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Impact Update</h3>
              <button className="modal-close-btn" onClick={() => setSelectedDonation(null)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="donation-summary-modal">
                <div className="summary-header">
                  <span className="summary-icon">{getCategoryIcon(selectedDonation.category)}</span>
                  <div>
                    <h4>{selectedDonation.category.charAt(0).toUpperCase() + selectedDonation.category.slice(1)}</h4>
                    <p>Donation #{selectedDonation._id.slice(-6)}</p>
                  </div>
                </div>
                <div className="summary-row">
                  <span className="summary-label">👤 Donor:</span>
                  <span className="summary-value">{selectedDonation.donor?.name}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">📦 Items:</span>
                  <span className="summary-value">
                    {selectedDonation.items.map(item => `${item.name} (${item.quantity} ${item.unit})`).join(', ')}
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">📊 Status:</span>
                  <span className="summary-value" style={{ color: getStatusColor(selectedDonation.status), fontWeight: 'bold' }}>
                    {selectedDonation.status.charAt(0).toUpperCase() + selectedDonation.status.slice(1)}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="impact-form">
                <div className="form-group">
                  <label>Update Status *</label>
                  <div className="select-wrapper">
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="Picked Up">🚚 Picked Up</option>
                      <option value="In Transit">🛣️ In Transit</option>
                      <option value="Distributed">✅ Distributed</option>
                      <option value="Beneficiaries Identified">👥 Beneficiaries Identified</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe how the donation is being used or its impact... Be specific and heartfelt!"
                    rows="4"
                    required
                  />
                  <span className="char-count">{formData.description.length} characters</span>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>👥 Number of Beneficiaries</label>
                    <input
                      type="number"
                      name="beneficiaries"
                      value={formData.beneficiaries}
                      onChange={handleChange}
                      placeholder="e.g., 25"
                      min="0"
                    />
                  </div>

                  <div className="form-group">
                    <label>📍 Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Community Center, School"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setSelectedDonation(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="loading"></span>
                        Submitting...
                      </>
                    ) : (
                      <>✓ Submit Update</>
                    )}
                  </button>
                </div>
              </form>

              {selectedDonation.impactUpdates && selectedDonation.impactUpdates.length > 0 && (
                <div className="previous-updates">
                  <h4>📊 Previous Updates ({selectedDonation.impactUpdates.length})</h4>
                  <div className="updates-timeline">
                    {selectedDonation.impactUpdates.map((update, idx) => (
                      <div key={idx} className="update-item" style={{ '--update-delay': `${idx * 0.1}s` }}>
                        <div className="update-dot"></div>
                        <div className="update-content">
                          <div className="update-header-timeline">
                            <span className="update-status-badge">{update.status}</span>
                            <span className="update-date">
                              {new Date(update.updatedAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <p className="update-description">{update.description}</p>
                          <div className="update-details-row">
                            {update.beneficiaries > 0 && (
                              <p className="update-detail">
                                <strong>👥 {update.beneficiaries}</strong> people benefited
                              </p>
                            )}
                            {update.location && (
                              <p className="update-detail">
                                <strong>📍</strong> {update.location}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateImpact;
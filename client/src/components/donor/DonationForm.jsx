import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import OCRScanner from './OCRScanner';
import api from '../../services/api';
import './DonationForm.css';

const DonationForm = ({ onSuccess }) => {
  const { user } = useAuth();
  const [category, setCategory] = useState('food');
  const [items, setItems] = useState([{ name: '', quantity: '', unit: 'kg', description: '', batchNumber: '', expiryDate: '' }]);
  const [pickupAddress, setPickupAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || 'Nagpur',
    state: user?.address?.state || 'Maharashtra',
    pincode: user?.address?.pincode || ''
  });
  const [preferredPickupDate, setPreferredPickupDate] = useState('');
  const [preferredPickupTime, setPreferredPickupTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showOCR, setShowOCR] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const categories = [
    { value: 'food', label: 'Food', icon: '🍲' },
    { value: 'clothes', label: 'Clothes', icon: '👕' },
    { value: 'books', label: 'Books', icon: '📚' },
    { value: 'toys', label: 'Toys', icon: '🧸' },
    { value: 'medicine', label: 'Medicine', icon: '💊' }
  ];

  const units = {
    food: ['kg', 'grams', 'liters', 'pieces', 'packets'],
    clothes: ['pieces', 'sets'],
    books: ['books', 'sets'],
    toys: ['pieces', 'sets'],
    medicine: ['tablets', 'bottles', 'boxes', 'strips']
  };

  const addItem = () => {
    setItems([...items, { name: '', quantity: '', unit: units[category][0], description: '', batchNumber: '', expiryDate: '' }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleOCRScan = (index) => {
    setCurrentItemIndex(index);
    setShowOCR(true);
  };

  const handleOCRResult = (result) => {
    if (result.batchNumber) {
      updateItem(currentItemIndex, 'batchNumber', result.batchNumber);
    }
    if (result.expiryDate) {
      updateItem(currentItemIndex, 'expiryDate', result.expiryDate);
    }
    setShowOCR(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Location captured successfully
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate medicine items have expiry dates
      if (category === 'medicine') {
        const invalidItems = items.filter(item => !item.expiryDate);
        if (invalidItems.length > 0) {
          setError('Please provide expiry dates for all medicine items');
          setLoading(false);
          return;
        }
      }

      const donationData = {
        category,
        items: items.map(item => ({
          name: item.name,
          quantity: parseInt(item.quantity),
          unit: item.unit,
          description: item.description,
          ...(category === 'medicine' && {
            batchNumber: item.batchNumber,
            expiryDate: item.expiryDate
          })
        })),
        pickupAddress,
        pickupLocation: {
          type: 'Point',
          coordinates: user.location?.coordinates || [79.0882, 21.1458]
        },
        preferredPickupDate,
        preferredPickupTime,
        notes
      };

      await api.post('/donations', donationData);
      
      setSuccess('Donation created successfully! NGOs will review your request.');
      
      // Reset form
      setItems([{ name: '', quantity: '', unit: units[category][0], description: '', batchNumber: '', expiryDate: '' }]);
      setPreferredPickupDate('');
      setPreferredPickupTime('');
      setNotes('');
      
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donation-form-container">
      <div className="form-header">
        <h2>Create New Donation</h2>
        <p>Fill in the details to donate items to NGOs</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="donation-form">
        <div className="form-section">
          <h3>Select Category</h3>
          <div className="category-selector">
            {categories.map(cat => (
              <button
                key={cat.value}
                type="button"
                className={`category-btn ${category === cat.value ? 'active' : ''}`}
                onClick={() => {
                  setCategory(cat.value);
                  setItems([{ name: '', quantity: '', unit: units[cat.value][0], description: '', batchNumber: '', expiryDate: '' }]);
                }}
              >
                <span className="category-btn-icon">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <div className="section-header-form">
            <h3>Items Details</h3>
            <button type="button" className="btn btn-outline btn-small" onClick={addItem}>
              ➕ Add Item
            </button>
          </div>

          {items.map((item, index) => (
            <div key={index} className="item-group">
              <div className="item-group-header">
                <h4>Item {index + 1}</h4>
                {items.length > 1 && (
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeItem(index)}
                  >
                    ✕ Remove
                  </button>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Item Name *</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                    placeholder="e.g., Rice, Shirt, Textbook"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Quantity *</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                    placeholder="0"
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Unit *</label>
                  <select
                    value={item.unit}
                    onChange={(e) => updateItem(index, 'unit', e.target.value)}
                    required
                  >
                    {units[category].map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  placeholder="Add any additional details..."
                  rows="2"
                />
              </div>

              {category === 'medicine' && (
                <>
                  <div className="medicine-scan-section">
                    <button
                      type="button"
                      className="btn btn-secondary btn-small"
                      onClick={() => handleOCRScan(index)}
                    >
                      📸 Scan Medicine Label
                    </button>
                    <p className="help-text">Use OCR to automatically extract batch number and expiry date</p>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Batch Number</label>
                      <input
                        type="text"
                        value={item.batchNumber}
                        onChange={(e) => updateItem(index, 'batchNumber', e.target.value)}
                        placeholder="Batch/Lot Number"
                      />
                    </div>

                    <div className="form-group">
                      <label>Expiry Date *</label>
                      <input
                        type="date"
                        value={item.expiryDate}
                        onChange={(e) => updateItem(index, 'expiryDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="form-section">
          <h3>Pickup Address</h3>
          <div className="form-group">
            <label>Street Address *</label>
            <input
              type="text"
              value={pickupAddress.street}
              onChange={(e) => setPickupAddress({ ...pickupAddress, street: e.target.value })}
              placeholder="Enter street address"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                value={pickupAddress.city}
                onChange={(e) => setPickupAddress({ ...pickupAddress, city: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Pincode *</label>
              <input
                type="text"
                value={pickupAddress.pincode}
                onChange={(e) => setPickupAddress({ ...pickupAddress, pincode: e.target.value })}
                placeholder="440001"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Preferred Pickup Schedule</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Preferred Date *</label>
              <input
                type="date"
                value={preferredPickupDate}
                onChange={(e) => setPreferredPickupDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>Preferred Time *</label>
              <select
                value={preferredPickupTime}
                onChange={(e) => setPreferredPickupTime(e.target.value)}
                required
              >
                <option value="">Select time</option>
                <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                <option value="Evening (4 PM - 7 PM)">Evening (4 PM - 7 PM)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Notes</h3>
          <div className="form-group">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions or additional information..."
              rows="3"
            />
          </div>
        </div>

        <div className="form-actions">
         <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
            {loading ? <span className="loading"></span> : '📤 Submit Donation'}
          </button>
        </div>
      </form>

      {showOCR && (
        <OCRScanner
          onClose={() => setShowOCR(false)}
          onResult={handleOCRResult}
        />
      )}
    </div>
  );
};

export default DonationForm;
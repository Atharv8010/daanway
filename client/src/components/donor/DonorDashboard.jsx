import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DonationForm from './DonationForm';
import ImpactTracker from './ImpactTracker';
import RewardSystem from './RewardSystem';
import api from '../../services/api';
import './DonorDashboard.css';

const DonorDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({
    totalDonations: 0,
    pendingDonations: 0,
    completedDonations: 0,
    rewardsEarned: 0
  });
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'donor')) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchDonations();
    }
  }, [user]);

  const fetchDonations = async () => {
    try {
      const response = await api.get('/donations/donor');
      setDonations(response.data);
      
      const total = response.data.length;
      const pending = response.data.filter(d => d.status === 'pending').length;
      const completed = response.data.filter(d => d.status === 'distributed').length;
      
      setStats({
        totalDonations: total,
        pendingDonations: pending,
        completedDonations: completed,
        rewardsEarned: user.rewardsEarned?.length || 0
      });
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Pending', class: 'status-pending' },
      accepted: { label: 'Accepted', class: 'status-accepted' },
      picked: { label: 'Picked Up', class: 'status-picked' },
      distributed: { label: 'Distributed', class: 'status-distributed' },
      declined: { label: 'Declined', class: 'status-declined' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

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

  if (loading || loadingData) {
    return (
      <div className="dashboard-loading">
        <div className="loading"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="donor-dashboard">
      <div className="container dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, {user?.name}! 👋</h1>
            <p>Your generosity is making a difference</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card-dashboard">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
              📊
            </div>
            <div className="stat-content">
              <h3>{stats.totalDonations}</h3>
              <p>Total Donations</p>
            </div>
          </div>

          <div className="stat-card-dashboard">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              ⏳
            </div>
            <div className="stat-content">
              <h3>{stats.pendingDonations}</h3>
              <p>Pending Review</p>
            </div>
          </div>

          <div className="stat-card-dashboard">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              ✓
            </div>
            <div className="stat-content">
              <h3>{stats.completedDonations}</h3>
              <p>Completed</p>
            </div>
          </div>

          <div className="stat-card-dashboard">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
              🎁
            </div>
            <div className="stat-content">
              <h3>{stats.rewardsEarned}</h3>
              <p>Rewards Earned</p>
            </div>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📋 Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'donate' ? 'active' : ''}`}
            onClick={() => setActiveTab('donate')}
          >
            ➕ New Donation
          </button>
          <button
            className={`tab-btn ${activeTab === 'impact' ? 'active' : ''}`}
            onClick={() => setActiveTab('impact')}
          >
            📈 Impact Tracker
          </button>
          <button
            className={`tab-btn ${activeTab === 'rewards' ? 'active' : ''}`}
            onClick={() => setActiveTab('rewards')}
          >
            🎁 Rewards
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <div className="section-header">
                <h2>Your Donations</h2>
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTab('donate')}
                >
                  ➕ Make New Donation
                </button>
              </div>

              {donations.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📦</span>
                  <h3>No donations yet</h3>
                  <p>Start making a difference by creating your first donation</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setActiveTab('donate')}
                  >
                    Create Donation
                  </button>
                </div>
              ) : (
                <div className="donations-list">
                  {donations.map(donation => (
                    <div key={donation._id} className="donation-card">
                      <div className="donation-card-header">
                        <div className="donation-category">
                          <span className="category-icon-large">
                            {getCategoryIcon(donation.category)}
                          </span>
                          <div>
                            <h3>{donation.category.charAt(0).toUpperCase() + donation.category.slice(1)}</h3>
                            <p className="donation-date">
                              {new Date(donation.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(donation.status)}
                      </div>

                      <div className="donation-card-body">
                        <div className="donation-items">
                          <h4>Items:</h4>
                          <ul>
                            {donation.items.map((item, idx) => (
                              <li key={idx}>
                                {item.name} - {item.quantity} {item.unit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {donation.assignedNGO && (
                          <div className="donation-ngo">
                            <h4>Assigned to:</h4>
                            <p>{donation.assignedNGO.name}</p>
                            <p className="ngo-contact">{donation.assignedNGO.phone}</p>
                          </div>
                        )}

                        <div className="donation-pickup">
                          <h4>Pickup Details:</h4>
                          <p>{donation.pickupAddress.street}, {donation.pickupAddress.city}</p>
                          <p className="pickup-date">
                            Preferred: {new Date(donation.preferredPickupDate).toLocaleDateString('en-IN')} at {donation.preferredPickupTime}
                          </p>
                        </div>
                      </div>

                      <div className="donation-card-footer">
                        <button 
                          className="btn btn-outline btn-small"
                          onClick={() => {
                            setActiveTab('impact');
                          }}
                        >
                          View Impact
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'donate' && (
            <DonationForm onSuccess={fetchDonations} />
          )}

          {activeTab === 'impact' && (
            <ImpactTracker donations={donations} />
          )}

          {activeTab === 'rewards' && (
            <RewardSystem />
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DonationRequests from './DonationRequests';
import UpdateImpact from './UpdateImpact';
import api from '../../services/api';
import './NGODashboard.css';

const NGODashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requests');
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({
    pendingRequests: 0,
    acceptedDonations: 0,
    completedDonations: 0,
    totalBeneficiaries: 0
  });
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ngo')) {
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
      const response = await api.get('/donations/ngo');
      setDonations(response.data);
      
      const pending = response.data.filter(d => d.status === 'pending').length;
      const accepted = response.data.filter(d => d.status === 'accepted').length;
      const completed = response.data.filter(d => d.status === 'distributed').length;
      
      const totalBeneficiaries = response.data.reduce((sum, donation) => {
        const beneficiaryCount = donation.impactUpdates?.reduce((acc, update) => 
          acc + (update.beneficiaries || 0), 0) || 0;
        return sum + beneficiaryCount;
      }, 0);
      
      setStats({
        pendingRequests: pending,
        acceptedDonations: accepted,
        completedDonations: completed,
        totalBeneficiaries
      });
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoadingData(false);
    }
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
    <div className="ngo-dashboard">
      <div className="container dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome, {user?.name}! 🏢</h1>
            <p>Manage donation requests and update impact</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card-dashboard">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              ⏳
            </div>
            <div className="stat-content">
              <h3>{stats.pendingRequests}</h3>
              <p>Pending Requests</p>
            </div>
          </div>

          <div className="stat-card-dashboard">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
              ✓
            </div>
            <div className="stat-content">
              <h3>{stats.acceptedDonations}</h3>
              <p>Accepted</p>
            </div>
          </div>

          <div className="stat-card-dashboard">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              📦
            </div>
            <div className="stat-content">
              <h3>{stats.completedDonations}</h3>
              <p>Distributed</p>
            </div>
          </div>

          <div className="stat-card-dashboard">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
              👥
            </div>
            <div className="stat-content">
              <h3>{stats.totalBeneficiaries}</h3>
              <p>People Helped</p>
            </div>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            📋 Donation Requests
          </button>
          <button
            className={`tab-btn ${activeTab === 'impact' ? 'active' : ''}`}
            onClick={() => setActiveTab('impact')}
          >
            📈 Update Impact
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'requests' && (
            <DonationRequests 
              donations={donations} 
              onUpdate={fetchDonations}
            />
          )}

          {activeTab === 'impact' && (
            <UpdateImpact 
              donations={donations.filter(d => 
                d.status === 'accepted' || d.status === 'picked' || d.status === 'distributed'
              )}
              onUpdate={fetchDonations}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;
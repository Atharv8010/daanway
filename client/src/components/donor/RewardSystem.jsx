import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './RewardSystem.css';

const RewardSystem = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(null);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const response = await api.get('/rewards');
      setRewards(response.data);
    } catch (error) {
      console.error('Error fetching rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (rewardId) => {
    setRedeeming(rewardId);
    try {
      await api.put(`/rewards/${rewardId}/redeem`);
      fetchRewards();
    } catch (error) {
      console.error('Error redeeming reward:', error);
      alert('Failed to redeem reward. Please try again.');
    } finally {
      setRedeeming(null);
    }
  };

  const getRewardIcon = (type) => {
    const icons = {
      coupon: '🎫',
      certificate: '📜',
      badge: '🏆'
    };
    return icons[type] || '🎁';
  };

  const availableRewards = rewards.filter(r => !r.redeemed);
  const redeemedRewards = rewards.filter(r => r.redeemed);

  if (loading) {
    return (
      <div className="rewards-loading">
        <div className="loading"></div>
        <p>Loading your rewards...</p>
      </div>
    );
  }

  return (
    <div className="rewards-container">
      <div className="rewards-header">
        <div>
          <h2>Your Rewards</h2>
          <p>Earn rewards for every 3 successful donations</p>
        </div>
        <div className="rewards-count">
          <span className="count-number">{availableRewards.length}</span>
          <span className="count-label">Available</span>
        </div>
      </div>

      <div className="rewards-info-banner">
        <div className="info-icon">ℹ️</div>
        <div>
          <h4>How Rewards Work</h4>
          <p>Complete 3 successful donations (picked up and distributed by NGOs) to earn exciting rewards like discount coupons, certificates, and badges!</p>
        </div>
      </div>

      {rewards.length === 0 ? (
       <div className="empty-state">
          <span className="empty-icon">🎁</span>
          <h3>No rewards yet</h3>
          <p>Complete 3 successful donations to earn your first reward!</p>
          <div className="reward-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '0%' }}></div>
            </div>
            <p className="progress-text">0 / 3 donations completed</p>
          </div>
        </div>
      ) : (
        <>
          {availableRewards.length > 0 && (
            <div className="rewards-section">
              <h3 className="section-title">Available Rewards</h3>
              <div className="rewards-grid">
                {availableRewards.map(reward => (
                  <div key={reward._id} className="reward-card available">
                    <div className="reward-card-header">
                      <span className="reward-type-icon">{getRewardIcon(reward.type)}</span>
                      <span className="reward-type-badge">{reward.type}</span>
                    </div>
                    
                    <div className="reward-card-body">
                      <h4>{reward.title}</h4>
                      <p className="reward-description">{reward.description}</p>
                      
                      {reward.type === 'coupon' && (
                        <div className="reward-details">
                          {reward.discount && (
                            <div className="reward-detail-item">
                              <span className="detail-label">Discount:</span>
                              <span className="detail-value discount-value">
                                {reward.discount > 100 ? `₹${reward.discount}` : `${reward.discount}%`}
                              </span>
                            </div>
                          )}
                          {reward.partner && (
                            <div className="reward-detail-item">
                              <span className="detail-label">Partner:</span>
                              <span className="detail-value">{reward.partner}</span>
                            </div>
                          )}
                          {reward.code && (
                            <div className="reward-code">
                              <span className="code-label">Coupon Code:</span>
                              <span className="code-value">{reward.code}</span>
                              <button 
                                className="copy-btn"
                                onClick={() => {
                                  navigator.clipboard.writeText(reward.code);
                                  alert('Code copied to clipboard!');
                                }}
                              >
                                📋
                              </button>
                            </div>
                          )}
                          {reward.validUntil && (
                            <div className="reward-validity">
                              Valid until: {new Date(reward.validUntil).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="reward-earned">
                        <span className="earned-icon">🎉</span>
                        <span>Earned on {new Date(reward.createdAt).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                    
                    <div className="reward-card-footer">
                      <button
                        className="btn btn-primary btn-full"
                        onClick={() => handleRedeem(reward._id)}
                        disabled={redeeming === reward._id}
                      >
                        {redeeming === reward._id ? (
                          <span className="loading"></span>
                        ) : (
                          '✓ Mark as Redeemed'
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {redeemedRewards.length > 0 && (
            <div className="rewards-section">
              <h3 className="section-title">Redeemed Rewards</h3>
              <div className="rewards-grid">
                {redeemedRewards.map(reward => (
                  <div key={reward._id} className="reward-card redeemed">
                    <div className="redeemed-badge">
                      <span>✓ Redeemed</span>
                    </div>
                    
                 <div className="reward-card-header">
                      <span className="reward-type-icon">{getRewardIcon(reward.type)}</span>
                      <span className="reward-type-badge">{reward.type}</span>
                    </div>
                    
                    <div className="reward-card-body">
                      <h4>{reward.title}</h4>
                      <p className="reward-description">{reward.description}</p>
                      
                      <div className="reward-redeemed-info">
                        <span className="redeemed-icon">✓</span>
                        <span>Redeemed on {new Date(reward.redeemedAt).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RewardSystem;
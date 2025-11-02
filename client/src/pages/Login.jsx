// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import './Login.css';

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const user = await login(formData.email, formData.password);
//       if (user.role === 'donor') {
//         navigate('/donor/dashboard');
//       } else {
//         navigate('/ngo/dashboard');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="container">
//         <div className="auth-container">
//           <div className="auth-left">
//             <div className="auth-branding">
//               <h1>Welcome Back to DaanWay</h1>
//               <p>Continue your journey of making a difference</p>
//               <div className="auth-features">
//                 <div className="auth-feature-item">
//                   <span className="auth-feature-icon">✓</span>
//                   <span>Track your donations</span>
//                 </div>
//                 <div className="auth-feature-item">
//                   <span className="auth-feature-icon">✓</span>
//                   <span>Earn rewards</span>
//                 </div>
//                 <div className="auth-feature-item">
//                   <span className="auth-feature-icon">✓</span>
//                   <span>See your impact</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="auth-right">
//             <div className="auth-card">
//               <h2>Login</h2>
//               <p className="auth-subtitle">Sign in to your account</p>

//               {error && (
//                 <div className="error-message">
//                   {error}
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="auth-form">
//                 <div className="form-group">
//                   <label>Email Address</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="your.email@example.com"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Password</label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                     required
//                   />
//                 </div>

//                 <button 
//                   type="submit" 
//                   className="btn btn-primary btn-full"
//                   disabled={loading}
//                 >
//                   {loading ? <span className="loading"></span> : 'Login'}
//                 </button>
//               </form>

//               <p className="auth-link">
//                 Don't have an account? <Link to="/register">Register here</Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(formData.email, formData.password);
      if (user.role === 'donor') {
        navigate('/donor/dashboard');
      } else {
        navigate('/ngo/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-new">
      <div className="auth-background">
        <div className="auth-shapes">
          <div className="auth-shape auth-shape-1"></div>
          <div className="auth-shape auth-shape-2"></div>
          <div className="auth-shape auth-shape-3"></div>
        </div>
      </div>

      <div className="auth-container-new">
        <div className="auth-left-new">
          <div className="auth-branding-new">
            <div className="auth-logo-badge">
              <span className="logo-icon">🎁</span>
              <span className="logo-text">DaanWay</span>
            </div>
            
            <h1 className="auth-heading">
              Welcome <span className="text-gradient">Back</span>
            </h1>
            
            <p className="auth-description">
              Continue your journey of making a difference in the lives of those who need it most.
            </p>

            <div className="auth-features-new">
              <div className="auth-feature-new">
                <div className="feature-icon-box" style={{ '--feature-color': '#667eea' }}>
                  <span>📊</span>
                </div>
                <div className="feature-content">
                  <h3>Track Donations</h3>
                  <p>Monitor your impact in real-time</p>
                </div>
              </div>

              <div className="auth-feature-new">
                <div className="feature-icon-box" style={{ '--feature-color': '#f093fb' }}>
                  <span>🎁</span>
                </div>
                <div className="feature-content">
                  <h3>Earn Rewards</h3>
                  <p>Get certificates and coupons</p>
                </div>
              </div>

              <div className="auth-feature-new">
                <div className="feature-icon-box" style={{ '--feature-color': '#4ade80' }}>
                  <span>❤️</span>
                </div>
                <div className="feature-content">
                  <h3>See Impact</h3>
                  <p>Visualize lives changed</p>
                </div>
              </div>
            </div>

            <div className="auth-stats">
              <div className="auth-stat">
                <div className="stat-value">1234+</div>
                <div className="stat-label">Donations</div>
              </div>
              <div className="auth-stat">
                <div className="stat-value">890+</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="auth-stat">
                <div className="stat-value">65+</div>
                <div className="stat-label">NGO Partners</div>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-right-new">
          <div className="auth-card-new">
            <div className="card-glow-effect"></div>
            
            <div className="auth-card-header">
              <h2>Sign In</h2>
              <p>Enter your credentials to access your account</p>
            </div>

            {error && (
              <div className="error-message-new">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form-new">
              <div className="form-group-new">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group-new">
                <label>Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-submit-new"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <span className="btn-arrow-icon">→</span>
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <p className="auth-link-new">
              Don't have an account? 
              <Link to="/register" className="link-gradient">Create one now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
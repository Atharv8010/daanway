// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import './Register.css';

// const Register = () => {
//   const navigate = useNavigate();
//   const { register } = useAuth();
//   const [role, setRole] = useState('donor');
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//     street: '',
//     city: 'Nagpur',
//     state: 'Maharashtra',
//     pincode: '',
//     latitude: '',
//     longitude: '',
//     registrationNumber: '',
//     category: []
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleCategoryChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setFormData({
//         ...formData,
//         category: [...formData.category, value]
//       });
//     } else {
//       setFormData({
//         ...formData,
//         category: formData.category.filter(cat => cat !== value)
//       });
//     }
//   };

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setFormData({
//             ...formData,
//             latitude: position.coords.latitude.toFixed(6),
//             longitude: position.coords.longitude.toFixed(6)
//           });
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//           setFormData({
//             ...formData,
//             latitude: '21.1458',
//             longitude: '79.0882'
//           });
//         }
//       );
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const userData = {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         phone: formData.phone,
//         address: {
//           street: formData.street,
//           city: formData.city,
//           state: formData.state,
//           pincode: formData.pincode
//         },
//         location: {
//           type: 'Point',
//           coordinates: [
//             parseFloat(formData.longitude || '79.0882'),
//             parseFloat(formData.latitude || '21.1458')
//           ]
//         },
//         role
//       };

//       if (role === 'ngo') {
//         userData.ngoDetails = {
//           registrationNumber: formData.registrationNumber,
//           category: formData.category
//         };
//       }

//       const user = await register(userData);
      
//       if (user.role === 'donor') {
//         navigate('/donor/dashboard');
//       } else {
//         navigate('/ngo/dashboard');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="container">
//         <div className="auth-container register-container">
//           <div className="auth-left">
//             <div className="auth-branding">
//               <h1>Join DaanWay Today</h1>
//               <p>Start your journey of making a meaningful impact</p>
//               <div className="auth-features">
//                 <div className="auth-feature-item">
//                   <span className="auth-feature-icon">✓</span>
//                   <span>Easy donation process</span>
//                 </div>
//                 <div className="auth-feature-item">
//                   <span className="auth-feature-icon">✓</span>
//                   <span>Real-time impact tracking</span>
//                 </div>
//                 <div className="auth-feature-item">
//                   <span className="auth-feature-icon">✓</span>
//                   <span>Earn exclusive rewards</span>
//                 </div>
//                 <div className="auth-feature-item">
//                   <span className="auth-feature-icon">✓</span>
//                   <span>Connect with verified NGOs</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="auth-right">
//             <div className="auth-card">
//               <h2>Register</h2>
//               <p className="auth-subtitle">Create your account</p>

//               <div className="role-selector">
//                 <button
//                   type="button"
//                   className={`role-btn ${role === 'donor' ? 'active' : ''}`}
//                   onClick={() => setRole('donor')}
//                 >
//                   I'm a Donor
//                 </button>
//                 <button
//                   type="button"
//                   className={`role-btn ${role === 'ngo' ? 'active' : ''}`}
//                   onClick={() => setRole('ngo')}
//                 >
//                   I'm an NGO
//                 </button>
//               </div>

//               {error && (
//                 <div className="error-message">
//                   {error}
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="auth-form">
//                 <div className="form-group">
//                   <label>Full Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Enter your name"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Email Address *</label>
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
//                   <label>Password *</label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Create a strong password"
//                     required
//                     minLength={6}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Phone Number *</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="+91 98765 43210"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Street Address *</label>
//                   <input
//                     type="text"
//                     name="street"
//                     value={formData.street}
//                     onChange={handleChange}
//                     placeholder="Enter your street address"
//                     required
//                   />
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>City *</label>
//                     <input
//                       type="text"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label>Pincode *</label>
//                     <input
//                       type="text"
//                       name="pincode"
//                       value={formData.pincode}
//                       onChange={handleChange}
//                       placeholder="440001"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label>Location (Optional)</label>
//                   <div className="location-inputs">
//                     <input
//                       type="text"
//                       name="latitude"
//                       value={formData.latitude}
//                       onChange={handleChange}
//                       placeholder="Latitude"
//                     />
//                     <input
//                       type="text"
//                       name="longitude"
//                       value={formData.longitude}
//                       onChange={handleChange}
//                       placeholder="Longitude"
//                     />
//                     <button 
//                       type="button" 
//                       className="btn btn-outline"
//                       onClick={getCurrentLocation}
//                     >
//                       📍 Get Location
//                     </button>
//                   </div>
//                 </div>

//                 {role === 'ngo' && (
//                   <>
//                     <div className="form-group">
//                       <label>NGO Registration Number *</label>
//                       <input
//                         type="text"
//                         name="registrationNumber"
//                         value={formData.registrationNumber}
//                         onChange={handleChange}
//                         placeholder="MH/NAG/YYYY/XXX"
//                         required
//                       />
//                     </div>

//                     <div className="form-group">
//                       <label>Categories You Support *</label>
//                       <div className="checkbox-group">
//                         {['food', 'clothes', 'books', 'toys', 'medicine'].map(cat => (
//                           <label key={cat} className="checkbox-label">
//                             <input
//                               type="checkbox"
//                               value={cat}
//                               checked={formData.category.includes(cat)}
//                               onChange={handleCategoryChange}
//                             />
//                             <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   </>
//                 )}

//                 <button 
//                   type="submit" 
//                   className="btn btn-primary btn-full"
//                   disabled={loading}
//                 >
//                   {loading ? <span className="loading"></span> : 'Register'}
//                 </button>
//               </form>

//               <p className="auth-link">
//                 Already have an account? <Link to="/login">Login here</Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [role, setRole] = useState('donor');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    street: '',
    city: 'Nagpur',
    state: 'Maharashtra',
    pincode: '',
    latitude: '',
    longitude: '',
    registrationNumber: '',
    category: []
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        category: [...formData.category, value]
      });
    } else {
      setFormData({
        ...formData,
        category: formData.category.filter(cat => cat !== value)
      });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6)
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setFormData({
            ...formData,
            latitude: '21.1458',
            longitude: '79.0882'
          });
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        location: {
          type: 'Point',
          coordinates: [
            parseFloat(formData.longitude || '79.0882'),
            parseFloat(formData.latitude || '21.1458')
          ]
        },
        role
      };

      if (role === 'ngo') {
        userData.ngoDetails = {
          registrationNumber: formData.registrationNumber,
          category: formData.category
        };
      }

      const user = await register(userData);
      
      if (user.role === 'donor') {
        navigate('/donor/dashboard');
      } else {
        navigate('/ngo/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: 'food', label: 'Food', icon: '🍲', color: '#ff6b6b' },
    { value: 'clothes', label: 'Clothes', icon: '👕', color: '#4ecdc4' },
    { value: 'books', label: 'Books', icon: '📚', color: '#95e1d3' },
    { value: 'toys', label: 'Toys', icon: '🧸', color: '#feca57' },
    { value: 'medicine', label: 'Medicine', icon: '💊', color: '#48dbfb' }
  ];

  return (
    <div className="auth-page-new register-page">
      <div className="auth-background">
        <div className="auth-shapes">
          <div className="auth-shape auth-shape-1"></div>
          <div className="auth-shape auth-shape-2"></div>
          <div className="auth-shape auth-shape-3"></div>
        </div>
      </div>

      <div className="auth-container-new register-container-new">
        <div className="auth-left-new">
          <div className="auth-branding-new">
            <div className="auth-logo-badge">
              <span className="logo-icon">🎁</span>
              <span className="logo-text">DaanWay</span>
            </div>
            
            <h1 className="auth-heading">
              Start Your <span className="text-gradient">Journey</span>
            </h1>
            
            <p className="auth-description">
              Join thousands of compassionate individuals making a real difference in Nagpur.
            </p>

            <div className="auth-features-new">
              <div className="auth-feature-new">
                <div className="feature-icon-box" style={{ '--feature-color': '#667eea' }}>
                  <span>⚡</span>
                </div>
                <div className="feature-content">
                  <h3>Easy Process</h3>
                  <p>Simple and quick donations</p>
                </div>
              </div>

              <div className="auth-feature-new">
                <div className="feature-icon-box" style={{ '--feature-color': '#f093fb' }}>
                  <span>🎯</span>
                </div>
                <div className="feature-content">
                  <h3>Real-time Tracking</h3>
                  <p>Monitor your impact live</p>
                </div>
              </div>

              <div className="auth-feature-new">
                <div className="feature-icon-box" style={{ '--feature-color': '#4ade80' }}>
                  <span>🏆</span>
                </div>
                <div className="feature-content">
                  <h3>Exclusive Rewards</h3>
                  <p>Earn certificates and benefits</p>
                </div>
              </div>

              <div className="auth-feature-new">
                <div className="feature-icon-box" style={{ '--feature-color': '#feca57' }}>
                  <span>✓</span>
                </div>
                <div className="feature-content">
                  <h3>Verified NGOs</h3>
                  <p>100% trusted organizations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-right-new">
          <div className="auth-card-new register-card">
            <div className="card-glow-effect"></div>
            
            <div className="auth-card-header">
              <h2>Create Account</h2>
              <p>Join the community of change-makers</p>
            </div>

            <div className="role-selector-new">
              <button
                type="button"
                className={`role-btn-new ${role === 'donor' ? 'active' : ''}`}
                onClick={() => setRole('donor')}
              >
                <span className="role-icon">👤</span>
                <span>I'm a Donor</span>
              </button>
              <button
                type="button"
                className={`role-btn-new ${role === 'ngo' ? 'active' : ''}`}
                onClick={() => setRole('ngo')}
              >
                <span className="role-icon">🏢</span>
                <span>I'm an NGO</span>
              </button>
            </div>

            {error && (
              <div className="error-message-new">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form-new">
              <div className="form-group-new">
                <label>Full Name *</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="form-group-new">
                <label>Email Address *</label>
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

              <div className="form-row-new">
                <div className="form-group-new">
                  <label>Password *</label>
                  <div className="input-wrapper">
                    <span className="input-icon">🔒</span>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Strong password"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <div className="form-group-new">
                  <label>Phone Number *</label>
                  <div className="input-wrapper">
                    <span className="input-icon">📱</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group-new">
                <label>Street Address *</label>
                <div className="input-wrapper">
                  <span className="input-icon">📍</span>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Enter your street address"
                    required
                  />
                </div>
              </div>

              <div className="form-row-new">
                <div className="form-group-new">
                  <label>City *</label>
                  <div className="input-wrapper">
                    <span className="input-icon">🏙️</span>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-new">
                  <label>Pincode *</label>
                  <div className="input-wrapper">
                    <span className="input-icon">📮</span>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="440001"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group-new">
                <label>Location (Optional)</label>
                <div className="location-inputs-new">
                  <div className="input-wrapper">
                    <span className="input-icon">🌐</span>
                    <input
                      type="text"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                      placeholder="Latitude"
                    />
                  </div>
                  <div className="input-wrapper">
                    <span className="input-icon">🌐</span>
                    <input
                      type="text"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      placeholder="Longitude"
                    />
                  </div>
                  <button 
                    type="button" 
                    className="btn-location"
                    onClick={getCurrentLocation}
                  >
                    <span>📍</span>
                    <span>Get Location</span>
                  </button>
                </div>
              </div>

              {role === 'ngo' && (
                <>
                  <div className="form-group-new">
                    <label>NGO Registration Number *</label>
                    <div className="input-wrapper">
                      <span className="input-icon">📋</span>
                      <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        placeholder="MH/NAG/YYYY/XXX"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group-new">
                    <label>Categories You Support *</label>
                    <div className="category-grid-new">
                      {categories.map(cat => (
                        <label 
                          key={cat.value} 
                          className={`category-checkbox ${formData.category.includes(cat.value) ? 'checked' : ''}`}
                          style={{ '--cat-color': cat.color }}
                        >
                          <input
                            type="checkbox"
                            value={cat.value}
                            checked={formData.category.includes(cat.value)}
                            onChange={handleCategoryChange}
                          />
                          <span className="checkbox-icon">{cat.icon}</span>
                          <span className="checkbox-label">{cat.label}</span>
                          <span className="checkbox-check">✓</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <button 
                type="submit" 
                className="btn-submit-new"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <span className="btn-arrow-icon">→</span>
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <p className="auth-link-new">
              Already have an account? 
              <Link to="/login" className="link-gradient">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
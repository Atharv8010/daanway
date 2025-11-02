// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import NGOMap from '../components/map/NGOMap';
// import './Home.css';

// const Home = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [activeStep, setActiveStep] = useState(0);
//   const [stats, setStats] = useState({
//     totalDonations: 0,
//     totalNGOs: 0,
//     impactedLives: 0,
//     activeDonors: 0
//   });

//   useEffect(() => {
//     // Animate stats counter
//     const intervals = [];
//     const targets = { totalDonations: 1234, totalNGOs: 65, impactedLives: 5670, activeDonors: 890 };
    
//     Object.keys(targets).forEach(key => {
//       let current = 0;
//       const interval = setInterval(() => {
//         current += Math.ceil(targets[key] / 50);
//         if (current >= targets[key]) {
//           current = targets[key];
//           clearInterval(interval);
//         }
//         setStats(prev => ({ ...prev, [key]: current }));
//       }, 30);
//       intervals.push(interval);
//     });

//     return () => intervals.forEach(clearInterval);
//   }, []);

//   const categories = [
//     { icon: '🍲', name: 'Food', description: 'Nourish the hungry', color: '#ff6b6b', gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)' },
//     { icon: '👕', name: 'Clothes', description: 'Dress with dignity', color: '#4ecdc4', gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)' },
//     { icon: '📚', name: 'Books', description: 'Educate minds', color: '#95e1d3', gradient: 'linear-gradient(135deg, #95e1d3 0%, #38ada9 100%)' },
//     { icon: '🧸', name: 'Toys', description: 'Spread joy', color: '#feca57', gradient: 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)' },
//     { icon: '💊', name: 'Medicine', description: 'Heal lives', color: '#48dbfb', gradient: 'linear-gradient(135deg, #48dbfb 0%, #0abde3 100%)' }
//   ];

//   const features = [
//     { icon: '🎯', title: 'Smart OCR', description: 'AI-powered medicine verification', color: '#ff6348' },
//     { icon: '🗺️', title: 'Live Map', description: 'Find NGOs instantly', color: '#1dd1a1' },
//     { icon: '📊', title: 'Impact Dashboard', description: 'Track your difference', color: '#feca57' },
//     { icon: '🎁', title: 'Rewards', description: 'Earn exclusive benefits', color: '#5f27cd' }
//   ];

//   const steps = [
//     { number: '01', title: 'Sign Up', subtitle: 'Join our community', icon: '✨' },
//     { number: '02', title: 'Choose Item', subtitle: 'Select donation type', icon: '🎯' },
//     { number: '03', title: 'Schedule', subtitle: 'Easy pickup time', icon: '📅' },
//     { number: '04', title: 'Track Impact', subtitle: 'See your impact', icon: '🚀' }
//   ];

//   const handleGetStarted = () => {
//     if (user) {
//       navigate(user.role === 'donor' ? '/donor/dashboard' : '/ngo/dashboard');
//     } else {
//       navigate('/register');
//     }
//   };

//   return (
//     <div className="home-redesign">
//       {/* Hero Section - Completely New */}
//       <section className="hero-new">
//         <div className="hero-background">
//           <div className="animated-shapes">
//             <div className="shape shape-1"></div>
//             <div className="shape shape-2"></div>
//             <div className="shape shape-3"></div>
//             <div className="shape shape-4"></div>
//           </div>
//         </div>
        
//         <div className="container hero-grid">
//           <div className="hero-left">
//             <div className="badge-pill">
//               <span className="pulse-dot"></span>
//               <span>Transforming Lives Since 2024</span>
//             </div>
            
//             <h1 className="hero-heading">
//               Your <span className="text-gradient">Generosity</span><br/>
//               Creates <span className="text-gradient-alt">Miracles</span>
//             </h1>
            
//             <p className="hero-text">
//               Connect with 65+ verified NGOs in Nagpur. Every donation tells a story, 
//               every contribution changes a life. Be the change you wish to see.
//             </p>
            
//             <div className="hero-actions">
//               <button onClick={handleGetStarted} className="btn-new btn-primary-new">
//                 <span>Start Your Journey</span>
//                 <span className="btn-arrow">→</span>
//               </button>
//               <button 
//                 onClick={() => document.getElementById('explore').scrollIntoView({ behavior: 'smooth' })}
//                 className="btn-new btn-ghost-new"
//               >
//                 <span>Explore More</span>
//                 <span className="btn-icon">↓</span>
//               </button>
//             </div>
            
//             <div className="trust-indicators">
//               <div className="trust-item">
//                 <span className="trust-icon">✓</span>
//                 <span>100% Verified NGOs</span>
//               </div>
//               <div className="trust-item">
//                 <span className="trust-icon">✓</span>
//                 <span>Secure & Transparent</span>
//               </div>
//               <div className="trust-item">
//                 <span className="trust-icon">✓</span>
//                 <span>Real-time Tracking</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="hero-right">
//             <div className="stats-container">
//               <div className="stat-box" style={{ '--delay': '0.1s' }}>
//                 <div className="stat-icon">📊</div>
//                 <div className="stat-number">{stats.totalDonations}+</div>
//                 <div className="stat-label">Donations</div>
//                 <div className="stat-glow"></div>
//               </div>
              
//               <div className="stat-box" style={{ '--delay': '0.2s' }}>
//                 <div className="stat-icon">🏢</div>
//                 <div className="stat-number">{stats.totalNGOs}+</div>
//                 <div className="stat-label">NGO Partners</div>
//                 <div className="stat-glow"></div>
//               </div>
              
//               <div className="stat-box" style={{ '--delay': '0.3s' }}>
//                 <div className="stat-icon">❤️</div>
//                 <div className="stat-number">{stats.impactedLives}+</div>
//                 <div className="stat-label">Lives Changed</div>
//                 <div className="stat-glow"></div>
//               </div>
              
//               <div className="stat-box" style={{ '--delay': '0.4s' }}>
//                 <div className="stat-icon">👥</div>
//                 <div className="stat-number">{stats.activeDonors}+</div>
//                 <div className="stat-label">Active Donors</div>
//                 <div className="stat-glow"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Categories Section - New Card Design */}
//       <section id="explore" className="categories-new">
//         <div className="container">
//           <div className="section-header-new">
//             <span className="section-badge">What We Accept</span>
//             <h2 className="section-title-new">
//               Choose Your <span className="highlight-text">Contribution</span>
//             </h2>
//             <p className="section-subtitle-new">
//               Every category makes a difference. Select what matters to you.
//             </p>
//           </div>
          
//           <div className="categories-grid-new">
//             {categories.map((category, index) => (
//               <div 
//                 key={index} 
//                 className="category-card-new"
//                 style={{ 
//                   '--card-color': category.color,
//                   '--card-gradient': category.gradient,
//                   '--delay': `${index * 0.1}s`
//                 }}
//               >
//                 <div className="card-glow"></div>
//                 <div className="card-inner">
//                   <div className="category-icon-new">{category.icon}</div>
//                   <h3 className="category-title-new">{category.name}</h3>
//                   <p className="category-desc-new">{category.description}</p>
//                   <div className="category-arrow">→</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works - Interactive Timeline */}
//       <section className="process-new">
//         <div className="container">
//           <div className="section-header-new">
//             <span className="section-badge">Simple Process</span>
//             <h2 className="section-title-new">
//               How <span className="highlight-text">DaanWay</span> Works
//             </h2>
//           </div>
          
//           <div className="process-timeline">
//             {steps.map((step, index) => (
//               <div 
//                 key={index}
//                 className={`timeline-step ${activeStep >= index ? 'active' : ''}`}
//                 onMouseEnter={() => setActiveStep(index)}
//                 style={{ '--step-delay': `${index * 0.15}s` }}
//               >
//                 <div className="step-connector"></div>
//                 <div className="step-content">
//                   <div className="step-number">{step.number}</div>
//                   <div className="step-icon">{step.icon}</div>
//                   <h3 className="step-title">{step.title}</h3>
//                   <p className="step-subtitle">{step.subtitle}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features - Bento Grid Style */}
//       <section className="features-new">
//         <div className="container">
//           <div className="section-header-new">
//             <span className="section-badge">Why Choose Us</span>
//             <h2 className="section-title-new">
//               Powerful <span className="highlight-text">Features</span>
//             </h2>
//           </div>
          
//           <div className="bento-grid">
//             {features.map((feature, index) => (
//               <div 
//                 key={index}
//                 className="bento-item"
//                 style={{ 
//                   '--item-color': feature.color,
//                   '--item-delay': `${index * 0.1}s`
//                 }}
//               >
//                 <div className="bento-content">
//                   <div className="feature-icon-new">{feature.icon}</div>
//                   <h3 className="feature-title-new">{feature.title}</h3>
//                   <p className="feature-desc-new">{feature.description}</p>
//                 </div>
//                 <div className="bento-hover"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Map Section - Immersive Design */}
//       <section className="map-new">
//         <div className="container">
//           <div className="section-header-new">
//             <span className="section-badge">Find NGOs</span>
//             <h2 className="section-title-new">
//               Discover <span className="highlight-text">Nearby</span> Organizations
//             </h2>
//             <p className="section-subtitle-new">
//               65+ verified NGOs across Nagpur waiting to receive your contribution
//             </p>
//           </div>
          
//           <div className="map-wrapper-new">
//             <div className="map-frame">
//               <NGOMap />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section - Magnetic Design */}
//       <section className="cta-new">
//         <div className="cta-background">
//           <div className="cta-gradient"></div>
//           <div className="cta-pattern"></div>
//         </div>
        
//         <div className="container cta-content">
//           <div className="cta-badge">
//             <span className="badge-icon">⚡</span>
//             <span>Join 890+ Active Donors</span>
//           </div>
          
//           <h2 className="cta-heading">
//             Ready to Make a<br/>
//             <span className="cta-highlight">Difference?</span>
//           </h2>
          
//           <p className="cta-text">
//             Your journey towards creating positive change starts here. 
//             Join thousands of compassionate individuals making Nagpur better.
//           </p>
          
//           <button onClick={handleGetStarted} className="btn-cta">
//             <span className="btn-cta-text">Get Started Now</span>
//             <span className="btn-cta-icon">
//               <span>→</span>
//               <span>→</span>
//             </span>
//           </button>
          
//           <div className="cta-features">
//             <div className="cta-feature">
//               <span className="feature-check">✓</span>
//               <span>Free Forever</span>
//             </div>
//             <div className="cta-feature">
//               <span className="feature-check">✓</span>
//               <span>No Hidden Fees</span>
//             </div>
//             <div className="cta-feature">
//               <span className="feature-check">✓</span>
//               <span>Instant Rewards</span>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NGOMap from '../components/map/NGOMap';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalNGOs: 0,
    impactedLives: 0,
    activeDonors: 0
  });

  useEffect(() => {
    // Animate stats counter
    const intervals = [];
    const targets = { totalDonations: 1234, totalNGOs: 65, impactedLives: 5670, activeDonors: 890 };
    
    Object.keys(targets).forEach(key => {
      let current = 0;
      const interval = setInterval(() => {
        current += Math.ceil(targets[key] / 50);
        if (current >= targets[key]) {
          current = targets[key];
          clearInterval(interval);
        }
        setStats(prev => ({ ...prev, [key]: current }));
      }, 30);
      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const categories = [
    { 
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#ff6b6b" opacity="0.2"/>
          <ellipse cx="32" cy="44" rx="16" ry="8" fill="#ff6b6b"/>
          <path d="M32 20c-8.837 0-16 7.163-16 16v8c0 4.418 7.163 8 16 8s16-3.582 16-8v-8c0-8.837-7.163-16-16-16z" fill="#ff6b6b"/>
          <ellipse cx="32" cy="36" rx="14" ry="7" fill="#ee5a6f"/>
          <path d="M22 32c0-2 2-4 4-4h4v8h-4c-2 0-4-2-4-4z" fill="white" opacity="0.3"/>
          <path d="M34 28h4c2 0 4 2 4 4s-2 4-4 4h-4v-8z" fill="white" opacity="0.3"/>
          <circle cx="32" cy="30" r="2" fill="white"/>
        </svg>
      ),
      name: 'Food',
      description: 'Nourish the hungry',
      color: '#ff6b6b',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)'
    },
    { 
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#4ecdc4" opacity="0.2"/>
          <path d="M20 18l12-6 12 6v8l-12 4-12-4v-8z" fill="#4ecdc4"/>
          <path d="M32 26v28" stroke="#44a08d" strokeWidth="3"/>
          <path d="M20 26c0 0 0 12 0 16s2 6 6 8h12c4-2 6-4 6-8s0-16 0-16" fill="#4ecdc4"/>
          <path d="M26 32h12v8c0 2-2.686 4-6 4s-6-2-6-4v-8z" fill="#44a08d"/>
          <rect x="28" y="36" width="8" height="2" fill="white" opacity="0.5"/>
        </svg>
      ),
      name: 'Clothes',
      description: 'Dress with dignity',
      color: '#4ecdc4',
      gradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)'
    },
    { 
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#95e1d3" opacity="0.2"/>
          <rect x="18" y="14" width="28" height="36" rx="2" fill="#95e1d3"/>
          <rect x="18" y="14" width="28" height="6" rx="2" fill="#38ada9"/>
          <path d="M22 14v-2c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v2" fill="#38ada9"/>
          <line x1="24" y1="28" x2="40" y2="28" stroke="#38ada9" strokeWidth="2" strokeLinecap="round"/>
          <line x1="24" y1="34" x2="40" y2="34" stroke="#38ada9" strokeWidth="2" strokeLinecap="round"/>
          <line x1="24" y1="40" x2="36" y2="40" stroke="#38ada9" strokeWidth="2" strokeLinecap="round"/>
          <line x1="24" y1="46" x2="38" y2="46" stroke="#38ada9" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      name: 'Books',
      description: 'Educate minds',
      color: '#95e1d3',
      gradient: 'linear-gradient(135deg, #95e1d3 0%, #38ada9 100%)'
    },
    { 
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#feca57" opacity="0.2"/>
          <circle cx="32" cy="26" r="14" fill="#feca57"/>
          <circle cx="26" cy="24" r="3" fill="#333"/>
          <circle cx="38" cy="24" r="3" fill="#333"/>
          <circle cx="26" cy="24" r="1.5" fill="white"/>
          <circle cx="38" cy="24" r="1.5" fill="white"/>
          <path d="M26 30c0 3.314 2.686 6 6 6s6-2.686 6-6" stroke="#ff9ff3" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="32" cy="44" r="8" fill="#feca57"/>
          <circle cx="20" cy="46" r="6" fill="#ff9ff3" opacity="0.7"/>
          <circle cx="44" cy="46" r="6" fill="#ff9ff3" opacity="0.7"/>
          <path d="M28 18c0-2 1-4 4-4s4 2 4 4" fill="#ff9ff3"/>
        </svg>
      ),
      name: 'Toys',
      description: 'Spread joy',
      color: '#feca57',
      gradient: 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)'
    },
    { 
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#48dbfb" opacity="0.2"/>
          <rect x="22" y="18" width="20" height="28" rx="3" fill="#48dbfb"/>
          <rect x="22" y="18" width="20" height="8" rx="3" fill="#0abde3"/>
          <rect x="30" y="18" width="4" height="4" fill="white" opacity="0.4"/>
          <circle cx="28" cy="30" r="2.5" fill="white"/>
          <circle cx="36" cy="30" r="2.5" fill="white"/>
          <circle cx="28" cy="37" r="2.5" fill="white"/>
          <circle cx="36" cy="37" r="2.5" fill="white"/>
          <rect x="26" y="42" width="12" height="2" rx="1" fill="white"/>
          <path d="M27 16l5-4 5 4" fill="#0abde3"/>
        </svg>
      ),
      name: 'Medicine',
      description: 'Heal lives',
      color: '#48dbfb',
      gradient: 'linear-gradient(135deg, #48dbfb 0%, #0abde3 100%)'
    }
  ];

  const features = [
    { 
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#ff6348" opacity="0.2"/>
          <rect x="16" y="20" width="32" height="28" rx="2" fill="#ff6348"/>
          <rect x="16" y="20" width="32" height="8" fill="#e84118"/>
          <circle cx="32" cy="38" r="8" fill="white"/>
          <path d="M32 32l-4 6h8l-4-6z" fill="#ff6348"/>
        </svg>
      ),
      title: 'Smart OCR',
      description: 'AI-powered medicine verification',
      color: '#ff6348'
    },
    { 
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#1dd1a1" opacity="0.2"/>
          <circle cx="32" cy="32" r="16" fill="#1dd1a1"/>
          <circle cx="32" cy="32" r="10" fill="#10ac84"/>
          <circle cx="32" cy="22" r="3" fill="white"/>
          <path d="M32 32l8-8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Live Map',
      description: 'Find NGOs instantly',
      color: '#1dd1a1'
    },
    { 
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#feca57" opacity="0.2"/>
          <path d="M16 42h32v6H16z" fill="#feca57"/>
          <path d="M20 42V22l12-10 12 10v20" fill="#feca57"/>
          <rect x="26" y="28" width="12" height="14" fill="#f79f1f"/>
          <rect x="24" y="20" width="4" height="4" fill="white"/>
          <rect x="36" y="20" width="4" height="4" fill="white"/>
        </svg>
      ),
      title: 'Impact Dashboard',
      description: 'Track your difference',
      color: '#feca57'
    },
    { 
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" fill="#5f27cd" opacity="0.2"/>
          <rect x="20" y="24" width="24" height="20" rx="2" fill="#5f27cd"/>
          <path d="M26 24l6-8 6 8" fill="#341f97"/>
          <rect x="28" y="32" width="8" height="2" fill="white"/>
          <rect x="28" y="36" width="8" height="2" fill="white"/>
        </svg>
      ),
      title: 'Rewards',
      description: 'Earn exclusive benefits',
      color: '#5f27cd'
    }
  ];

  const steps = [
    { 
      number: '01',
      title: 'Sign Up',
      subtitle: 'Join our community',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="24" r="10" fill="#6366f1"/>
          <path d="M16 50c0-8.837 7.163-16 16-16s16 7.163 16 16" fill="#8b5cf6"/>
          <circle cx="32" cy="24" r="6" fill="white" opacity="0.3"/>
        </svg>
      )
    },
    { 
      number: '02',
      title: 'Choose Item',
      subtitle: 'Select donation type',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="16" y="20" width="32" height="28" rx="2" fill="#6366f1"/>
          <path d="M20 20l12-8 12 8" fill="#8b5cf6"/>
          <rect x="26" y="32" width="12" height="3" fill="white"/>
          <rect x="26" y="38" width="12" height="3" fill="white"/>
        </svg>
      )
    },
    { 
      number: '03',
      title: 'Schedule',
      subtitle: 'Easy pickup time',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="16" fill="#6366f1"/>
          <path d="M32 20v12l8 4" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="32" cy="32" r="2" fill="white"/>
        </svg>
      )
    },
    { 
      number: '04',
      title: 'Track Impact',
      subtitle: 'See your impact',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 42l8-16 8 8 8-12 8 4" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="16" cy="42" r="3" fill="#8b5cf6"/>
          <circle cx="24" cy="26" r="3" fill="#8b5cf6"/>
          <circle cx="32" cy="34" r="3" fill="#8b5cf6"/>
          <circle cx="40" cy="22" r="3" fill="#8b5cf6"/>
          <circle cx="48" cy="26" r="3" fill="#8b5cf6"/>
        </svg>
      )
    }
  ];

  const handleGetStarted = () => {
    if (user) {
      navigate(user.role === 'donor' ? '/donor/dashboard' : '/ngo/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="home-redesign">
      {/* Hero Section */}
      <section className="hero-new">
        <div className="hero-background">
          <div className="animated-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        
        <div className="container hero-grid">
          <div className="hero-left">
            <div className="badge-pill">
              <span className="pulse-dot"></span>
              <span>Transforming Lives Since 2024</span>
            </div>
            
            <h1 className="hero-heading">
              Your <span className="text-gradient">Generosity</span><br/>
              Creates <span className="text-gradient-alt">Miracles</span>
            </h1>
            
            <p className="hero-text">
              Connect with 65+ verified NGOs in Nagpur. Every donation tells a story, 
              every contribution changes a life. Be the change you wish to see.
            </p>
            
            <div className="hero-actions">
              <button onClick={handleGetStarted} className="btn-new btn-primary-new">
                <span>Start Your Journey</span>
                <span className="btn-arrow">→</span>
              </button>
              <button 
                onClick={() => document.getElementById('explore').scrollIntoView({ behavior: 'smooth' })}
                className="btn-new btn-ghost-new"
              >
                <span>Explore More</span>
                <span className="btn-icon">↓</span>
              </button>
            </div>
            
            <div className="trust-indicators">
              <div className="trust-item">
                <span className="trust-icon">✓</span>
                <span>100% Verified NGOs</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">✓</span>
                <span>Secure & Transparent</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">✓</span>
                <span>Real-time Tracking</span>
              </div>
            </div>
          </div>
          
          <div className="hero-right">
            <div className="stats-container">
              <div className="stat-box" style={{ '--delay': '0.1s' }}>
                <div className="stat-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                    <path d="M16 42l8-16 8 8 8-12 8 4" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                    <circle cx="24" cy="26" r="2" fill="white"/>
                    <circle cx="32" cy="34" r="2" fill="white"/>
                    <circle cx="40" cy="22" r="2" fill="white"/>
                    <circle cx="48" cy="26" r="2" fill="white"/>
                  </svg>
                </div>
                <div className="stat-number">{stats.totalDonations}+</div>
                <div className="stat-label">Donations</div>
                <div className="stat-glow"></div>
              </div>
              
              <div className="stat-box" style={{ '--delay': '0.2s' }}>
                <div className="stat-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                    <rect x="20" y="24" width="24" height="20" rx="2" fill="white"/>
                    <path d="M26 24l6-8 6 8" fill="white" opacity="0.7"/>
                    <rect x="28" y="32" width="8" height="2" fill="#f59e0b"/>
                    <rect x="28" y="36" width="8" height="2" fill="#f59e0b"/>
                  </svg>
                </div>
                <div className="stat-number">{stats.totalNGOs}+</div>
                <div className="stat-label">NGO Partners</div>
                <div className="stat-glow"></div>
              </div>
              
              <div className="stat-box" style={{ '--delay': '0.3s' }}>
                <div className="stat-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                    <path d="M32 16c-8.837 0-16 7.163-16 16 0 12 16 24 16 24s16-12 16-24c0-8.837-7.163-16-16-16z" fill="white"/>
                    <circle cx="32" cy="32" r="6" fill="#10b981"/>
                  </svg>
                </div>
                <div className="stat-number">{stats.impactedLives}+</div>
                <div className="stat-label">Lives Changed</div>
                <div className="stat-glow"></div>
              </div>
              
              <div className="stat-box" style={{ '--delay': '0.4s' }}>
                <div className="stat-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                    <circle cx="24" cy="24" r="8" fill="white"/>
                    <circle cx="40" cy="24" r="8" fill="white" opacity="0.7"/>
                    <path d="M12 50c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="white"/>
                    <path d="M28 50c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="white" opacity="0.7"/>
                  </svg>
                </div>
                <div className="stat-number">{stats.activeDonors}+</div>
                <div className="stat-label">Active Donors</div>
                <div className="stat-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="explore" className="categories-new">
        <div className="container">
          <div className="section-header-new">
            <span className="section-badge">What We Accept</span>
            <h2 className="section-title-new">
              Choose Your <span className="highlight-text">Contribution</span>
            </h2>
            <p className="section-subtitle-new">
              Every category makes a difference. Select what matters to you.
            </p>
          </div>
          
          <div className="categories-grid-new">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="category-card-new"
                style={{ 
                  '--card-color': category.color,
                  '--card-gradient': category.gradient,
                  '--delay': `${index * 0.1}s`
                }}
              >
                <div className="card-glow"></div>
                <div className="card-inner">
                  <div className="category-icon-new">{category.icon}</div>
                  <h3 className="category-title-new">{category.name}</h3>
                  <p className="category-desc-new">{category.description}</p>
                  <div className="category-arrow">→</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Interactive Timeline */}
      <section className="process-new">
        <div className="container">
          <div className="section-header-new">
            <span className="section-badge">Simple Process</span>
            <h2 className="section-title-new">
              How <span className="highlight-text">DaanWay</span> Works
            </h2>
          </div>
          
          <div className="process-timeline">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`timeline-step ${activeStep >= index ? 'active' : ''}`}
                onMouseEnter={() => setActiveStep(index)}
                style={{ '--step-delay': `${index * 0.15}s` }}
              >
                <div className="step-connector"></div>
                <div className="step-content">
                  <div className="step-number">{step.number}</div>
                  <div className="step-icon">{step.icon}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-subtitle">{step.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Bento Grid Style */}
      <section className="features-new">
        <div className="container">
          <div className="section-header-new">
            <span className="section-badge">Why Choose Us</span>
            <h2 className="section-title-new">
              Powerful <span className="highlight-text">Features</span>
            </h2>
          </div>
          
          <div className="bento-grid">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bento-item"
                style={{ 
                  '--item-color': feature.color,
                  '--item-delay': `${index * 0.1}s`
                }}
              >
                <div className="bento-content">
                  <div className="feature-icon-new">{feature.icon}</div>
                  <h3 className="feature-title-new">{feature.title}</h3>
                  <p className="feature-desc-new">{feature.description}</p>
                </div>
                <div className="bento-hover"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section - Immersive Design */}
      <section className="map-new">
        <div className="container">
          <div className="section-header-new">
            <span className="section-badge">Find NGOs</span>
            <h2 className="section-title-new">
              Discover <span className="highlight-text">Nearby</span> Organizations
            </h2>
            <p className="section-subtitle-new">
              65+ verified NGOs across Nagpur waiting to receive your contribution
            </p>
          </div>
          
          <div className="map-wrapper-new">
            <div className="map-frame">
              <NGOMap />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Magnetic Design */}
      <section className="cta-new">
        <div className="cta-background">
          <div className="cta-gradient"></div>
          <div className="cta-pattern"></div>
        </div>
        
        <div className="container cta-content">
          <div className="cta-badge">
            <span className="badge-icon">⚡</span>
            <span>Join 890+ Active Donors</span>
          </div>
          
          <h2 className="cta-heading">
            Ready to Make a<br/>
            <span className="cta-highlight">Difference?</span>
          </h2>
          
          <p className="cta-text">
            Your journey towards creating positive change starts here. 
            Join thousands of compassionate individuals making Nagpur better.
          </p>
          
          <button onClick={handleGetStarted} className="btn-cta">
            <span className="btn-cta-text">Get Started Now</span>
            <span className="btn-cta-icon">
              <span>→</span>
              <span>→</span>
            </span>
          </button>
          
          <div className="cta-features">
            <div className="cta-feature">
              <span className="feature-check">✓</span>
              <span>Free Forever</span>
            </div>
            <div className="cta-feature">
              <span className="feature-check">✓</span>
              <span>No Hidden Fees</span>
            </div>
            <div className="cta-feature">
              <span className="feature-check">✓</span>
              <span>Instant Rewards</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
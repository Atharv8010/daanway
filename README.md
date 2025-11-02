# DaanWay - Donation Management Platform

DaanWay is a comprehensive donation management platform connecting donors with NGOs in Nagpur. The platform facilitates donations across 5 categories: Food, Clothes, Books, Toys, and Medicine.

## Features

### For Donors
- **Easy Donation Process**: Create donations across 5 categories
- **OCR Medicine Scanner**: Automatic batch number and expiry date detection
- **Impact Tracking**: Real-time updates on donation distribution
- **Reward System**: Earn coupons and certificates for every 3 successful donations
- **Geolocation**: Find nearby NGOs on an interactive map

### For NGOs
- **Donation Management**: Review, accept, or decline donation requests
- **Impact Updates**: Add detailed updates on donation distribution
- **Real-time Dashboard**: Track all donations and their statuses

### General Features
- **65+ Verified NGOs**: All NGOs are verified organizations in Nagpur
- **FAQ Chatbot**: Instant answers to common questions
- **Responsive Design**: Works seamlessly on all devices
- **Secure Authentication**: JWT-based authentication system

## Tech Stack

### Frontend
- React 18 with Vite
- Plain CSS (no Tailwind)
- React Router for navigation
- Axios for API calls
- Leaflet for maps
- Tesseract.js for OCR

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with the following:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/daanway
JWT_SECRET=your_secret_key_here
```

4. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:3000`

## Usage

### As a Donor

1. **Register**: Create an account as a donor
2. **Make Donation**: 
   - Select category (Food, Clothes, Books, Toys, Medicine)
   - Add item details
   - For medicine, use OCR scanner to detect expiry dates
   - Schedule pickup
3. **Track Impact**: View real-time updates from NGOs
4. **Earn Rewards**: Complete 3 donations to earn rewards

### As an NGO

1. **Register**: Create an account with NGO details
2. **Review Requests**: View pending donation requests
3. **Accept/Decline**: Review and respond to donations
4. **Update Status**: Mark donations as picked up or distributed
5. **Add Impact Updates**: Share how donations helped beneficiaries

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Donations
- `POST /api/donations` - Create donation (Donor only)
- `GET /api/donations/donor` - Get donor's donations
- `GET /api/donations/ngo` - Get NGO's donations
- `PUT /api/donations/:id/status` - Update donation status (NGO only)
- `POST /api/donations/:id/impact` - Add impact update (NGO only)

### NGOs
- `GET /api/ngos` - Get all verified NGOs
- `GET /api/ngos/nearby` - Get nearby NGOs
- `GET /api/ngos/category/:category` - Get NGOs by category

### Rewards
- `GET /api/rewards` - Get user rewards (Donor only)
- `PUT /api/rewards/:id/redeem` - Redeem reward

## Project Structure
```
daanway/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── context/       # React context
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── models/           # Mongoose models
│   ├── routes/           # Express routes
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   └── package.json
│
└── README.md
```

## Key Features Implementation

### OCR Scanner
- Uses Tesseract.js for client-side OCR
- Extracts batch numbers and expiry dates from medicine labels
- Validates expiry dates before donation

### Reward System
- Automatically tracks donation count
- Awards rewards after every 3 successful donations
- Includes discount coupons, certificates, and badges

### Impact Tracker
- NGOs can add multiple updates per donation
- Tracks beneficiaries, locations, and distribution details
- Real-time visibility for donors

### Geolocation
- Interactive Leaflet map showing all NGOs
- Filter NGOs by category
- Shows distance from user location

## Contributing

This is a complete production-ready project. For modifications:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues or questions:
- Email: support@daanway.com
- Phone: +91 712 2345678

## Acknowledgments

- 65+ NGOs in Nagpur for their partnership
- Open source community for amazing libraries
- All donors making a difference

---

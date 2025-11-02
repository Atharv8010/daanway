import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: String,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  categories: [{
    type: String,
    enum: ['food', 'clothes', 'books', 'toys', 'medicine']
  }],
  description: String,
  website: String,
  verified: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  totalDonationsReceived: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

ngoSchema.index({ location: '2dsphere' });

const NGO = mongoose.model('NGO', ngoSchema);

export default NGO;
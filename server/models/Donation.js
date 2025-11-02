import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['food', 'clothes', 'books', 'toys', 'medicine'],
    required: true
  },
  items: [{
    name: String,
    quantity: Number,
    unit: String,
    description: String,
    batchNumber: String,
    expiryDate: Date
  }],
  pickupAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  pickupLocation: {
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
  preferredPickupDate: Date,
  preferredPickupTime: String,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'picked', 'distributed', 'declined'],
    default: 'pending'
  },
  assignedNGO: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  impactUpdates: [{
    status: String,
    description: String,
    beneficiaries: Number,
    location: String,
    photos: [String],
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  notes: String
}, {
  timestamps: true
});

donationSchema.index({ pickupLocation: '2dsphere' });

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
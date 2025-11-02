import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['coupon', 'certificate', 'badge'],
    required: true
  },
  title: String,
  description: String,
  code: String,
  discount: Number,
  partner: String,
  validUntil: Date,
  redeemed: {
    type: Boolean,
    default: false
  },
  redeemedAt: Date,
  earnedFor: {
    type: String,
    default: '3 successful donations'
  }
}, {
  timestamps: true
});

const Reward = mongoose.model('Reward', rewardSchema);

export default Reward;
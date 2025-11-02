import Reward from '../models/Reward.js';

export const getUserRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const redeemReward = async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);

    if (!reward) {
      return res.status(404).json({ message: 'Reward not found' });
    }

    if (reward.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (reward.redeemed) {
      return res.status(400).json({ message: 'Reward already redeemed' });
    }

    reward.redeemed = true;
    reward.redeemedAt = new Date();
    await reward.save();

    res.json(reward);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
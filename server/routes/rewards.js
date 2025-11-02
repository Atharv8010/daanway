import express from 'express';
import { getUserRewards, redeemReward } from '../controllers/rewardController.js';
import { protect, donorOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, donorOnly, getUserRewards);
router.put('/:id/redeem', protect, donorOnly, redeemReward);

export default router;
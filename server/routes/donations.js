import express from 'express';
import {
  createDonation,
  getDonorDonations,
  getNGODonations,
  updateDonationStatus,
  addImpactUpdate,
  getDonationById
} from '../controllers/donationController.js';
import { protect, donorOnly, ngoOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, donorOnly, createDonation);
router.get('/donor', protect, donorOnly, getDonorDonations);
router.get('/ngo', protect, ngoOnly, getNGODonations);
router.get('/:id', protect, getDonationById);
router.put('/:id/status', protect, ngoOnly, updateDonationStatus);
router.post('/:id/impact', protect, ngoOnly, addImpactUpdate);

export default router;
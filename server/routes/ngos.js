import express from 'express';
import { getAllNGOs, getNearbyNGOs, getNGOsByCategory } from '../controllers/ngoController.js';

const router = express.Router();

router.get('/', getAllNGOs);
router.get('/nearby', getNearbyNGOs);
router.get('/category/:category', getNGOsByCategory);

export default router;
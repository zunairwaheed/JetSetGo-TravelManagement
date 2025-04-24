import express from 'express';
import { smartSearch } from '../controllers/smartSearchController.js';

const router = express.Router();

router.post('/smart', smartSearch);

export default router;
import express from 'express';
import { createClaim, getClaims } from '../controllers/claimController.js';

const router = express.Router();

router.route('/')
  .post(createClaim)
  .get(getClaims);

export default router;

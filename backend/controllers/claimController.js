import Claim from '../models/Claim.js';
import Item from '../models/Item.js';

// @desc    Create a new claim
// @route   POST /api/claims
// @access  Public
export const createClaim = async (req, res) => {
  try {
    const { itemId, claimerId, claimerName, answer } = req.body;

    const claim = new Claim({
      itemId,
      claimerId,
      claimerName,
      answer
    });

    const createdClaim = await claim.save();
    res.status(201).json(createdClaim);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all claims (Optionally filtered by user or item)
// @route   GET /api/claims
// @access  Public
export const getClaims = async (req, res) => {
  try {
    let query = {};
    if (req.query.claimerId) {
      query.claimerId = req.query.claimerId;
    }
    if (req.query.itemId) {
      query.itemId = req.query.itemId;
    }

    const claims = await Claim.find(query).populate('itemId');
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

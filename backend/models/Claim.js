import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  claimerId: {
    type: String, // String for mock auth user id
    required: true
  },
  claimerName: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const Claim = mongoose.model('Claim', claimSchema);

export default Claim;

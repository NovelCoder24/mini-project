import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Lost', 'Found', 'Claimed'],
    default: 'Lost'
  },
  type: {
    type: String,
    enum: ['lost', 'found'],
    required: true
  },
  image: {
    type: String
  },
  verificationQuestion: {
    type: String
  },
  finderId: {
    type: String, // Kept simple since it's mock auth
    required: true
  },
  finderName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Item = mongoose.model('Item', itemSchema);

export default Item;

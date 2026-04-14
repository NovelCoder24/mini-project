import Item from '../models/Item.js';

// @desc    Fetch all items
// @route   GET /api/items
// @access  Public
export const getItems = async (req, res) => {
  try {
    const items = await Item.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single item
// @route   GET /api/items/:id
// @access  Public
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an item
// @route   POST /api/items
// @access  Public
export const createItem = async (req, res) => {
  try {
    const { title, description, category, location, status, type, image, verificationQuestion, finderId, finderName } = req.body;

    const item = new Item({
      title,
      description,
      category,
      location,
      status,
      type,
      image,
      verificationQuestion,
      finderId,
      finderName
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

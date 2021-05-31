const express = require('express');
const router = new express.Router();
const PracticeItem = require('../models/practiceItem');
const auth = require('../middleware/auth');

//?CREATE new practice item
router.post('/items', auth, async (req, res) => {
  const item = new PracticeItem({
    ...req.body,
    userId: req.user._id,
  });
  try {
    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

//? FETCH all practice items
router.get('/items', auth, async (req, res) => {
  try {
    const items = await PracticeItem.find({ userId: req.user._id });
    res.send(items);
  } catch (error) {
    res.status(500).send();
  }
});

//? DELETE a practice item by ID
router.delete('/items/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const item = await PracticeItem.findOneAndDelete({
      _id,
      userId: req.user._id,
    });
    if (!item) {
      return res.status(404).send();
    }
    res.send(item);
  } catch (error) {
    res.status(500).send();
  }
});

//?UPDATE item by ID
router.patch('/items/:id', auth, async (req, res) => {
  const _id = req.params.id;

  //Allowing certain keys to be updated
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'duration', 'type'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }

  try {
    const item = await PracticeItem.findOne({
      _id,
      userId: req.user._id,
    });
    if (!item) {
      return res.status(404).send();
    }
    updates.forEach((update) => (item[update] = req.body[update]));

    await item.save();
    res.send(item);
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;

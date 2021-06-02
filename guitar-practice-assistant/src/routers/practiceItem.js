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
  const match = {};
  const sort = {};

  //Get songs
  if (req.query.type) {
    match.type = req.query.type;
  }
  //Get excercises
  if (req.query.type) {
    match.type = req.query.type;
  }

  if (req.query.sort) {
    const parts = req.query.sort.split('_');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }
  try {
    await req.user
      .populate({
        path: 'items',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.items);
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

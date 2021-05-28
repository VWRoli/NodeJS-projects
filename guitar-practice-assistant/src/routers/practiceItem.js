const express = require('express');
const router = new express.Router();
const PracticeItem = require('../models/practiceItem');

//?CREATE new practice item
router.post('/items', async (req, res) => {
  const item = new PracticeItem(req.body);
  try {
    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

//? FETCH all practice items
router.get('/items', async (req, res) => {
  try {
    const items = await PracticeItem.find({});
    res.send(items);
  } catch (error) {
    res.status(500).send();
  }
});

//? DELETE a practice item by ID
router.delete('/items/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const item = await PracticeItem.findByIdAndDelete(_id);
    if (!item) {
      return res.status(404).send();
    }
    res.send(item);
  } catch (error) {
    res.status(500).send();
  }
});

//?UPDATE item by ID
router.patch('/items/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const item = await PracticeItem.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).send();
    }
    res.send(item);
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;

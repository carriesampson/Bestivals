
const express = require('express');
const router = express.Router();

const User   = require('../models/users.js');
const Book   = require('../models/bestivals.js');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    const bestivals = await Bestival.find({ user: user._id });
    res.status(200).json({ user, bestivals });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    req.session.user = user;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

router.delete(':/id', async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    await Bestival.remove({ user: user.id });
    res.status(200).json({ message: 'Festival removed' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;

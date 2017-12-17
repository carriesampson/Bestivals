const express     = require('express');
const router      = express.Router();

//MODELS
const Festival    = require('../models/bestivals.js');
const Comments    = require('../models/comments.js')

//INDEX
router.get('/', async (req, res) => {
try {
  const festival = await Festival.find();
  res.status( 200 ).json( festival );
  console.log(festival);
} catch ( error ) {
  res.status( 400 ).json({error : err.message});
}
});

//CREATE
router.post('/', async (req, res) => {
  try {
    const newFestival = await Festival.create(req.body);
    res.status(200).json(newFestival);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

//DELETE
router.delete('/:id', async (req, res) => {
  try {
    const removeFestival = await Festival.findByIdAndRemove(req.params.id);
    res.status(200).json(removeFestival);
    console
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

//UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updateFestival = await Festival.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updateFestival);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;

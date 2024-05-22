import express from 'express';
import { DanceEventModel } from '../../models/danceEventModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (!req.body.eventName || !req.body.location) {
      return res.status(500).json({ message: 'Missing a required field' });
    }
    const danceEvent = {
      eventName: req.body.eventName,
      location: req.body.location,
      danceStyles: req.body.danceStyles,
      attendees: req.body.attendees,
    };
    const newDanceEvent = await DanceEventModel.create(danceEvent);
    return res.status(201).send(newDanceEvent);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const danceEventList = await DanceEventModel.find({});
    return res
      .status(200)
      .json({ count: danceEventList.length, data: danceEventList });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const danceEvent = await DanceEventModel.findById(req.params.id);
    return res.status(200).json(danceEvent);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const danceEventToUpdate = await DanceEventModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!danceEventToUpdate) {
      return res.status(404).json({ message: 'Dance event not found' });
    }
    return res
      .status(200)
      .json({ message: 'Dance event updated', data: danceEventToUpdate });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const danceEvent = await DanceEventModel.findByIdAndDelete(req.params.id);
    if (!danceEvent) {
      return res.status(404).send({ message: 'Dance event not found' });
    }
    return res.status(200).send({ message: 'Dance event deleted' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;

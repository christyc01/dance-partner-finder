import express from 'express';
import { DanceEventModel } from '../../models/danceEventModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // validation - check if any of the required fields are missing - if so, return a message to send required fields #TODO
    // define a new danceEvent object with all the available fields to be received from the client, to be saved (gotten from the body of the request)
    const danceEvent = {
      eventName: req.body.eventName,
      location: req.body.location,
      danceStyles: req.body.danceStyles,
    };
    // define a new variable that uses the model to create a new danceEvent object
    const newDanceEvent = await DanceEventModel.create(danceEvent);
    // return & send it
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

// Get a specific dance event by id
router.get('/:id', async (req, res) => {
  try {
    // const danceEvent = await DanceEventModel.find({ _id: req.params.id }); // returns 'data' inside an object, and directly inside that is an array with an object inside that
    const danceEvent = await DanceEventModel.findById(req.params.id); // returns 'data' inside an object, with an object inside of that
    // return res.status(200).json({ data: danceEvent }); // returns {data: {...}}
    return res.status(200).json(danceEvent); // less cluttered
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Update a specific dance event
router.put('/:id', async (req, res) => {
  try {
    // add validation
    console.log(req.params);
    console.log(req.body);
    const danceEventToUpdate = await DanceEventModel.findByIdAndUpdate(
      req.params.id,
      // can just pass in the body in general
      // { location: req.body.location },
      // {
      //   new: true,
      // }
      { eventName: 'updated in the code - NEW', location: req.body.location },
      {
        new: true,
      }
    );
    // If there's no danceEventToUpdate: return res.status(404).json({ message: 'Dance event not found' });
    // Otherwise return message that dance event was updated
    console.log(req.params.id);
    return res.status(200).json(danceEventToUpdate);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Delete a dance event

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

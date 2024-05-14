import express from 'express';
import { DancerModel } from '../../models/dancerModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // if (!req.body.name || !req.body.location || !req.body.danceStyles) {
    //   return res.status(400).send({
    //     message: 'Send all required fields',
    //   });
    // }

    const newDancer = {
      name: req.body.name,
      location: req.body.location,
      danceStyles: req.body.danceStyles,
    };
    const newlyCreatedDancer = await DancerModel.create(newDancer);
    return res.status(201).send(newlyCreatedDancer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const dancerList = await DancerModel.find({});
    return res.status(200).json({ count: dancerList.length, data: dancerList });
    // throw new Error('mwahaha');
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dancer = await DancerModel.findById(req.params.id);
    return res.status(200).json(dancer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // if (!req.body.name || !req.body.location || !req.body.danceStyles) {
    //   return res.status(400).send({ message: 'Missing a required field' });
    // }
    const dancer = await DancerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!dancer) {
      return res.status(404).json({ message: 'Dancer not found' });
    }
    return res
      .status(200)
      .json({ message: 'Dancer updated successfully!', data: dancer });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const dancer = await DancerModel.findByIdAndDelete(req.params.id);
    if (!dancer) {
      res.status(404).json({ message: 'Dancer not found' });
    }
    return res.status(200).send({ message: 'Dancer deleted' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;

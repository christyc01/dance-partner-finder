import mongoose from 'mongoose';

const danceEventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    danceStyles: {
      type: Array,
      // required: true,
    },
    attendees: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export const DanceEventModel = mongoose.model('DanceEvent', danceEventSchema);

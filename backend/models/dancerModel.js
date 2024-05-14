import mongoose from 'mongoose';

const dancerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// danceStyles: {
//   type: Array,
//   required: false,
// },

export const DancerModel = mongoose.model('Dancer', dancerSchema);

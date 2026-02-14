import mongoose from 'mongoose';

const TileSchema = new mongoose.Schema({
  tileId: { type: Number, required: true, unique: true },
  owner: { type: String, default: null },
  color: { type: String, default: null },
  claimedAt: { type: Date, default: null }
});

export default mongoose.model('Tile', TileSchema);

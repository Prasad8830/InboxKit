import Tile from '../models/Tile.js';

export async function seedTiles(totalTiles) {
  const count = await Tile.countDocuments();
  if (count < totalTiles) {
    const bulk = [];
    for (let i = 0; i < totalTiles; i++) bulk.push({ tileId: i });
    await Tile.deleteMany({});
    await Tile.insertMany(bulk);
    console.log(`Seeded ${totalTiles} tiles`);
    return true;
  }
  console.log(`Found ${count} tiles, no seed required`);
  return false;
}

export async function getAllTiles() {
  return Tile.find({}).lean().sort({ tileId: 1 });
}

export async function claimTile(tileId, username, color) {
  return Tile.findOneAndUpdate(
    { tileId: tileId, owner: null },
    { $set: { owner: username, color: color, claimedAt: new Date() } },
    { new: true }
  ).lean();
}

export async function countTiles() {
  return Tile.countDocuments();
}

export async function clearAllTiles() {
  const result = await Tile.updateMany(
    {},
    { $set: { owner: null, color: null, claimedAt: null } }
  );
  console.log(`Cleared ${result.modifiedCount} tiles`);
  return result;
}

const tileService = { seedTiles, getAllTiles, claimTile, countTiles, clearAllTiles };
export default tileService;

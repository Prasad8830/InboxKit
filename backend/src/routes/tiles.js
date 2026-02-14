import express from 'express';

export default function (tileService, io) {
  const router = express.Router();

  // GET /api/tiles - return all tiles
  router.get('/', async (req, res) => {
    try {
      const tiles = await tileService.getAllTiles();
      res.json(tiles);
    } catch (err) {
      console.error('GET /api/tiles error', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // POST /api/tiles/clear - admin endpoint to clear all tiles
  router.post('/clear', async (req, res) => {
    try {
      const { username } = req.body;
      const adminUsername = process.env.ADMIN_USERNAME || 'prasad';
      
      // Check if user is admin
      if (username !== adminUsername) {
        return res.status(403).json({ error: 'Unauthorized: Admin access only' });
      }

      const result = await tileService.clearAllTiles();
      
      // Broadcast to all connected clients
      const tiles = await tileService.getAllTiles();
      io.emit('gridCleared', tiles);
      
      res.json({ 
        success: true, 
        message: `Cleared ${result.modifiedCount} tiles`,
        modifiedCount: result.modifiedCount 
      });
    } catch (err) {
      console.error('POST error', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  return router;
};

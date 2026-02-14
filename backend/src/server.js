import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import connectDB from './db.js';
import tileService from './services/tileService.js';
import tilesRoute from './routes/tiles.js';
import initSockets from './socket.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sharedgrid';
const PORT = process.env.PORT || 4000;
const GRID_SIZE = parseInt(process.env.GRID_SIZE || '20', 10);
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;

(async function start() {
  try {
    await connectDB(MONGO_URI);

    await tileService.seedTiles(TOTAL_TILES);

    const app = express();
    app.use(cors()); // Enable CORS for all routes
    app.use(express.json());

    app.get('/health', (req, res) => res.json({ ok: true }));

    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: '*'
      }
    });

    const usersMap = new Map();
    app.use('/api/tiles', tilesRoute(tileService, io));

    initSockets(io, usersMap, tileService);

    server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error('Startup error', err);
    process.exit(1);
  }
})();

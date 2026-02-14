import createTileController from './controllers/tileController.js';

export default function initSockets(io, usersMap, tileService) {
  const controller = createTileController(io, usersMap, tileService);

  io.on('connection', (socket) => {
    controller.handleConnection(socket);
  });
}

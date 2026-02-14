export default function createTileController(io, usersMap, tileService) {
  function handleConnection(socket) {
    console.log('socket connected', socket.id);

    socket.on('join', async ({ username, color } = {}) => {
      usersMap.set(socket.id, { username, color });
      const tiles = await tileService.getAllTiles();
      socket.emit('initBoard', tiles);
      io.emit('users', Array.from(usersMap.values()));
      io.emit('onlineCount', usersMap.size);
    });

    socket.on('claimTile', async ({ tileId, username, color } = {}, cb) => {
      try {
        const updated = await tileService.claimTile(tileId, username, color);
        if (!updated) {
          cb && cb({ success: false, message: 'Tile already claimed' });
          return;
        }

        io.emit('tileClaimed', updated);
        cb && cb({ success: true, tile: updated });
      } catch (err) {
        console.error('claimTile error', err);
        cb && cb({ success: false, message: 'Server error' });
      }
    });

    socket.on('disconnect', () => {
      usersMap.delete(socket.id);
      io.emit('users', Array.from(usersMap.values()));
      io.emit('onlineCount', usersMap.size);
    });
  }

  return { handleConnection };
}

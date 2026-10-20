import { listMembers, listOwner } from './lists.js';

export const notifyCatalog = (req, list, extraUsers = []) => {
  const io = req.app.get('io');
  const users = new Set([listOwner(list), ...listMembers(list), ...extraUsers]);
  for (const user of users) if (user) io.to(`user_${user}`).emit('catalog_updated');
};

export const revokeRoom = (req, list, member) => {
  const io = req.app.get('io');
  for (const socket of io.sockets.sockets.values()) {
    if (socket.data.list !== list || (member && socket.data.user !== member)) continue;
    socket.emit('access_revoked', { list });
    socket.leave(`list_${list}`);
    socket.data.list = null;
  }
  const users = new Set();
  for (const id of io.sockets.adapter.rooms.get(`list_${list}`) ?? []) {
    users.add(io.sockets.sockets.get(id)?.data.user);
  }
  io.to(`list_${list}`).emit('presence', [...users].filter(Boolean));
};

export const revokeSessions = (req, userId) => {
  const io = req.app.get('io');
  for (const socket of io.sockets.sockets.values()) {
    if (socket.data.userId === userId) socket.disconnect(true);
  }
};

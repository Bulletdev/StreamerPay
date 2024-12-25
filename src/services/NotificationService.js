import { Server } from 'socket.io';
import User from '../models/User.js';

let io;

export const initializeSocketIO = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    socket.on('join', (userId) => {
      socket.join(userId);
    });
  });
};

export const createNotification = async (userId, notification) => {
  try {
    const user = await User.findById(userId);
    user.notifications.push(notification);
    await user.save();

    if (io) {
      io.to(userId).emit('notification', notification);
    }
  } catch (error) {
    throw new Error('Erro ao criar notificação');
  }
};
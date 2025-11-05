import AsyncStorage from '@react-native-async-storage/async-storage';
import { SOCKET_PATH, SOCKET_SERVER, TOKEN_KEY } from '../services/Endpoints';
import { io } from 'socket.io-client';
import { logToConsole } from './functions';

export const socket1 = io(SOCKET_SERVER, {
  auth: async cb => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    logToConsole(token, 'token');
    cb({
      token: token,
    });
  },
  path: SOCKET_PATH,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
});

export const socket = io(SOCKET_SERVER, {
  transports: ["websocket"],
  reconnection: true,
});

export const SocketIO = () => {
  socket.connect();
  socket.on('connect', () => {
    logToConsole('socket connected', socket.id);
    socket.emit('connect_user', { connect: true });
    socket.on('disconnect', () => {
      logToConsole('connection to server lost.');
    });
    socket.on('connect_error', async () => {
      socket.auth = async cb => {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        cb({
          token: token,
        });
      };
      socket.connect();
    });
    socket.on('disconnect', reason => {
      logToConsole('socket disconnected');
      if (reason === 'io server disconnect') {
        socket.connect();
      }
    });
  });
};

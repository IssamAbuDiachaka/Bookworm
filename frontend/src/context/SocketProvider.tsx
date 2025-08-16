import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../store/auth.store';
import type { Message } from '../types';

interface SocketContextValue {
  socket: Socket | null;
  isConnected: boolean;
  sendMessageRT: (payload: { receiverId: string; content: string }) => void;
}

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuthStore();
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  const value = useMemo<SocketContextValue>(() => ({
    socket: socketRef.current,
    isConnected,
    sendMessageRT: ({ receiverId, content }) => {
      if (!socketRef.current || !user) return;
      socketRef.current.emit('send_message', {
        senderId: user._id,
        receiverId,
        content,
      });
    },
  }), [isConnected, user]);

  useEffect(() => {
    if (!user) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      }
      return;
    }

    const socket = io(import.meta.env.VITE_API_BASE as string, {
      transports: ['websocket'],
      autoConnect: true,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('user_connected', { userId: user._id, username: user.username });
    });

    socket.on('connection_confirmed', (data) => {
      console.log('Socket connected:', data);
    });

    socket.on('message_sent', (data: { message: Message; conversationId: string }) => {
      console.log('Message confirmed sent:', data);
    });

    socket.on('new_message', (data: { message: Message; conversationId: string }) => {
      console.log('New message received:', data);
    });

    socket.on('pong', (payload) => {
      console.log('PONG from server:', payload);
    });

    socket.on('disconnect', () => setIsConnected(false));

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocket must be used within SocketProvider');
  return ctx;
};
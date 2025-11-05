import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button } from 'react-native';
import io from 'socket.io-client';
import TicTacToeBoard from '../components/TicTacToe';

// const SERVER = 'http://localhost:4000';
const SERVER = 'http://13.235.83.139:3001';

export default function TicTacToeScreen({ route }: any) {
  const room = route.params?.room || 'room1';
  const socketRef = useRef<any>(null);
  const [board, setBoard] = useState<(string|null)[]>(Array(9).fill(null));
  const [current, setCurrent] = useState<'X'|'O'>('X');
  const [winner, setWinner] = useState<any>(null);

  useEffect(() => {
    const s = io(SERVER);
    socketRef.current = s;
    s.on('connect', () => {
      s.emit('ttt-join', { room });
    });
    s.on('ttt-state', (state: any) => {
      setBoard(state.board || Array(9).fill(null));
      if (state.current) setCurrent(state.current);
      if (state.winner) setWinner(state.winner);
    });
    return () => s.disconnect();
  }, []);

  const move = (i: number) => {
    if (board[i] || winner) return;
    // choose player based on current (client tells server which player — keep simple: assign X to first player)
    // For the demo, alternate player client-side assignment is simplified; server enforces rules.
    const player: 'X'|'O' = current;
    socketRef.current.emit('ttt-move', { room, player, index: i });
  };

  const reset = () => socketRef.current.emit('ttt-reset', { room });

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
      <Text>Room: {room}</Text>
      <Text>Current: {current}</Text>
      <TicTacToeBoard board={board} onPress={move} />
      {winner && <Text>Winner: {winner}</Text>}
      <Button title="Reset" onPress={reset} />
    </View>
  );
}

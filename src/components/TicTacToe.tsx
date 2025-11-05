import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TicTacToeBoard({ board, onPress }: { board: (string|null)[], onPress: (i:number)=>void }) {
  return (
    <View style={styles.board}>
      {board.map((cell, i) => (
        <TouchableOpacity key={i} style={styles.cell} onPress={() => onPress(i)}>
          <Text style={{ fontSize: 32 }}>{cell || ''}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: { width: 300, height: 300, flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: '33.3333%', height: '33.3333%', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }
});

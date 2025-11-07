import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyState({ title = 'No items', subtitle }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.circle}>
        <Text style={styles.emoji}>📭</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  circle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#F1F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: { fontSize: 34 },
  title: { fontSize: 18, fontWeight: '700', color: '#222' },
  subtitle: { color: '#666', marginTop: 6, textAlign: 'center' },
});

import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Header from '../components/Header';
import FAB from '../components/FAB';
import EmptyState from '../components/EmptyState';
import { useData } from '../context/DataProvider';

export default function BusinessesList({ navigation }) {
  const { listBusinesses } = useData();
  const businesses = listBusinesses();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('BusinessDetails', {
          businessId: item.id,
          businessName: item.name,
        })
      }
    >
      <View style={styles.cardLeft}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSub}>ID: {item.id.slice(0, 8)}</Text>
      </View>
      <Text style={styles.chev}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header title="Businesses" subtitle="Create and manage businesses" />
      <View style={{ flex: 1, padding: 12 }}>
        {businesses.length === 0 ? (
          <EmptyState
            title="No businesses yet"
            subtitle="Tap the + button to add your first business"
          />
        ) : (
          <FlatList
            data={businesses}
            keyExtractor={i => i.id}
            renderItem={renderItem}
          />
        )}
        <FAB
          onPress={() => navigation.navigate('AddBusiness')}
          label="Add business"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardLeft: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  cardSub: { fontSize: 12, color: '#666', marginTop: 4 },
  chev: { fontSize: 24, color: '#999' },
});

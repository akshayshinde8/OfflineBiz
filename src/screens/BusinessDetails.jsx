import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import FAB from '../components/FAB';
import EmptyState from '../components/EmptyState';
import { useData } from '../context/DataProvider';

export default function BusinessDetails({ route, navigation }) {
  const { businessId, businessName } = route.params;
  const { listArticlesByBusiness, deleteBusiness, deleteArticle } = useData();
  const articles = listArticlesByBusiness(businessId);

  const onDeleteBusiness = () => {
    Alert.alert(
      'Delete business',
      'Delete this business and all related articles?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteBusiness(businessId);
            navigation.goBack();
          },
        },
      ],
    );
  };

  const onDeleteArticle = articleId => {
    Alert.alert(
      'Delete article',
      'Are you sure you want to delete this article?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteArticle(articleId);
          },
        },
      ],
    );
  };

  const onEditArticle = article => {
    // navigate to AddArticle with article payload for editing
    navigation.navigate('AddArticle', { businessId, article });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.meta}>
          Qty: {item.qty} • ₹{item.selling_price}
        </Text>
      </View>

      <View style={styles.rowActions}>
        <TouchableOpacity
          onPress={() => onEditArticle(item)}
          style={styles.action}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onDeleteArticle(item.id)}
          style={[styles.action, { marginLeft: 8 }]}
        >
          <Text style={[styles.actionText, { color: '#D32F2F' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={businessName}
        onBack={() => navigation.goBack()}
        subtitle="Articles"
      />
      <View style={{ flex: 1, padding: 12 }}>
        {articles.length === 0 ? (
          <EmptyState
            title="No articles yet"
            subtitle="Add articles for this business"
          />
        ) : (
          <FlatList
            data={articles}
            keyExtractor={i => i.id}
            renderItem={renderItem}
          />
        )}

        <View style={{ marginTop: 12 }}>
          <TouchableOpacity style={styles.deleteBtn} onPress={onDeleteBusiness}>
            <Text style={styles.deleteText}>Delete Business</Text>
          </TouchableOpacity>
        </View>

        <FAB
          onPress={() => navigation.navigate('AddArticle', { businessId })}
          label="Add article"
          icon="plus"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  title: { fontWeight: '700', fontSize: 15, color: '#111' },
  meta: { color: '#666', marginTop: 6 },
  rowActions: { flexDirection: 'row', alignItems: 'center' },
  action: { paddingHorizontal: 10, paddingVertical: 6 },
  actionText: { color: '#1976D2', fontWeight: '600' },
  deleteBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F44336',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteText: { color: '#F44336', fontWeight: '700' },
});

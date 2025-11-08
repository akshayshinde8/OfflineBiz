import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import Header from '../components/Header';
import { useData } from '../context/DataProvider';

export default function AddArticle({ route, navigation }) {
  const { businessId, article } = route.params || {};
  const { createArticle, updateArticle } = useData();

  // if article is present => edit mode
  const isEdit = !!article;

  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (isEdit && article) {
      setName(article.name ?? '');
      setQty(String(article.qty ?? ''));
      setPrice(String(article.selling_price ?? ''));
    }
  }, [isEdit, article]);

  const onSave = async () => {
    if (!name.trim() || !qty.trim() || !price.trim()) return;

    if (isEdit) {
      await updateArticle(article.id, {
        name: name.trim(),
        qty: Number(qty),
        selling_price: Number(price),
      });
    } else {
      await createArticle({
        name: name.trim(),
        qty: Number(qty),
        selling_price: Number(price),
        business_id: businessId,
      });
    }
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={isEdit ? 'Edit Article' : 'Add Article'}
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <Text style={styles.label}>Article name</Text>
          <TextInput
            style={styles.input}
            placeholder="T-shirt"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />

          <Text style={[styles.label, { marginTop: 12 }]}>Quantity</Text>
          <TextInput
            style={styles.input}
            placeholder="10"
            placeholderTextColor="#999"
            value={qty}
            onChangeText={setQty}
            keyboardType="numeric"
          />

          <Text style={[styles.label, { marginTop: 12 }]}>Selling price</Text>
          <TextInput
            style={styles.input}
            placeholder="1999"
            placeholderTextColor="#999"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
            <Text style={styles.saveText}>
              {isEdit ? 'Save changes' : 'Save Article'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  label: { color: '#444', marginBottom: 6, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  saveBtn: {
    marginTop: 20,
    backgroundColor: '#1976D2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontWeight: '700' },
});

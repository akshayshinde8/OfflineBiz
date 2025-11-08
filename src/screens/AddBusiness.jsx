import React, { useState } from 'react';
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

export default function AddBusiness({ navigation }) {
  const [name, setName] = useState('');
  const { createBusiness } = useData();

  const onSave = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    await createBusiness(trimmed);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Add Business" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <Text style={styles.label}>Business name</Text>
          <TextInput
            style={styles.input}
            placeholder="Acme Store"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  label: { color: '#444', marginBottom: 8, fontWeight: '600' },
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
    alignItems: 'center',
    borderRadius: 8,
  },
  saveText: { color: '#fff', fontWeight: '700' },
});

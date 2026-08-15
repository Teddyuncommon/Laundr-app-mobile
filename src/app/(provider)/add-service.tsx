import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useData } from '@/contexts/DataContext';
import { Page, Header, InputField, Btn, BottomBtn, s, BLUE, MUTED } from '@/components/ProviderSharedUI';

const UNITS = ['per kg', 'per item', 'per bundle', 'per pair'];
const CATEGORIES = ['Washing', 'Dry Cleaning', 'Specialty', 'Bundles'];

export default function AddServiceScreen() {
  const router = useRouter();
  const { addService } = useData();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('per kg');
  const [turnaround, setTurnaround] = useState('');
  const [category, setCategory] = useState('Washing');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a service name');
      return;
    }
    if (!price || isNaN(Number(price))) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }
    addService({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      unit,
      turnaround: turnaround.trim() || '24 hrs',
      category,
      enabled: true,
    });
    router.push('/(provider)/services');
  };

  return (
    <Page bottom={<BottomBtn label="Save Service" onPress={handleSave} />}>
      <Header title="Add New Service" onBack={() => router.push('/(provider)/services')} />
      <ScrollView contentContainerStyle={s.formBody}>
        <Text style={s.formIntro}>Create a new service for your customers.</Text>

        <InputField label="Service Name" value={name} onChangeText={setName} placeholder="e.g. Express Wash" />
        <InputField label="Description" value={description} onChangeText={setDescription} placeholder="Describe the service..." multiline />
        <InputField label="Price (US$)" value={price} onChangeText={setPrice} placeholder="e.g. 5.00" keyboardType="numeric" />
        <InputField label="Turnaround Time" value={turnaround} onChangeText={setTurnaround} placeholder="e.g. 24 hrs" />

        <Text style={s.inputLabel}>Unit</Text>
        <View style={s.chipRow}>
          {UNITS.map((u) => (
            <Pressable
              key={u}
              style={[s.chipOption, unit === u && s.chipOptionActive]}
              onPress={() => setUnit(u)}
            >
              <Text style={[s.chipOptionText, unit === u && s.chipOptionTextActive]}>{u}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={s.inputLabel}>Category</Text>
        <View style={s.chipRow}>
          {CATEGORIES.map((c) => (
            <Pressable
              key={c}
              style={[s.chipOption, category === c && s.chipOptionActive]}
              onPress={() => setCategory(c)}
            >
              <Text style={[s.chipOptionText, category === c && s.chipOptionTextActive]}>{c}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Page>
  );
}

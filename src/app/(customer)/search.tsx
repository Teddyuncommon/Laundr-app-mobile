import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useData } from '@/contexts/DataContext';
import { useBooking } from '@/contexts/BookingContext';
import {
  Page, AppIcon, IconButton, ProviderCard, TabBar,
  styles, BLUE, INK, MUTED,
} from '@/components/SharedUI';

export default function SearchScreen() {
  const router = useRouter();
  const { providers } = useData();
  const { selectProvider } = useBooking();
  const [search, setSearch] = useState('');

  const go = (target: string) => {
    if (target === 'home') router.push('/(customer)/home');
    else if (target === 'search') router.push('/(customer)/search');
    else if (target === 'orders') router.push('/(customer)/orders');
    else if (target === 'chat') router.push('/(customer)/messages');
    else if (target === 'profile') router.push('/(customer)/profile');
  };

  const filtered = providers.filter(p => {
    const query = search.toLowerCase();
    if (!query) return true;
    return (
      p.name.toLowerCase().includes(query) ||
      p.neighbourhood.toLowerCase().includes(query) ||
      p.services.some(s => s.toLowerCase().includes(query))
    );
  });

  return (
    <Page bottom={<TabBar active="Search" go={go} />}>
      {/* Fixed Header */}
      <View style={styles.allProvidersHeader}>
        <View style={styles.allProvidersTopRow}>
          <IconButton name="arrow_back" onPress={() => router.push('/(customer)/home')} />
          <Text style={styles.allProvidersTitle}>Find Providers</Text>
          <View style={{ width: 44 }} />
        </View>
        <View style={styles.allProvidersSearchBar}>
          <AppIcon name="search" size={20} color={MUTED} />
          <TextInput
            style={styles.allProvidersSearchInput}
            placeholder="Search by name, service, location..."
            placeholderTextColor={MUTED}
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <AppIcon name="close" size={18} color={MUTED} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Scrollable Provider List */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.allProvidersBody}>
        <Text style={styles.allProvidersCount}>
          {filtered.length} provider{filtered.length !== 1 ? 's' : ''} found
        </Text>
        {filtered.length === 0 ? (
          <View style={styles.allProvidersEmpty}>
            <AppIcon name="search_off" size={48} color={MUTED} />
            <Text style={styles.allProvidersEmptyText}>No providers match your search</Text>
          </View>
        ) : (
          filtered.map(provider => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onPress={() => {
                selectProvider(provider);
                router.push('/(customer)/provider');
              }}
            />
          ))
        )}
      </ScrollView>
    </Page>
  );
}

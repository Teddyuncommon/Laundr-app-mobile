import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useData } from '@/contexts/DataContext';
import { Page, Header, Icon, Pill, s, money, BLUE, INK, MUTED, GREEN, ORANGE } from '@/components/ProviderSharedUI';

const FILTERS = ['All', 'Completed', 'Pending'];

export default function EarningsScreen() {
  const router = useRouter();
  const { providerEarnings } = useData();
  const [filter, setFilter] = useState('All');

  const filtered = providerEarnings.filter((e) => {
    if (filter === 'All') return true;
    return e.status === filter;
  });

  const statusColor = (status: string) => {
    if (status === 'Completed') return GREEN;
    if (status === 'Pending') return ORANGE;
    return BLUE;
  };

  return (
    <Page>
      <Header title="Earnings & Payouts" onBack={() => router.push('/(provider)/revenue')} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filterRow}>
        {FILTERS.map((f) => (
          <Pressable
            key={f}
            style={[s.filterChip, filter === f && s.filterChipActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[s.filterChipText, filter === f && s.filterChipTextActive]}>{f}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView style={s.flex} contentContainerStyle={s.listBody}>
        {filtered.length === 0 ? (
          <View style={s.emptyState}>
            <Icon name="payments" size={48} color={MUTED} />
            <Text style={s.emptyText}>No earnings found</Text>
          </View>
        ) : (
          filtered.map((earning) => (
            <View key={earning.id} style={s.earningCard}>
              <View style={s.earningTop}>
                <Text style={s.earningOrder}>Order {earning.orderId}</Text>
                <Pill label={earning.status} color={statusColor(earning.status)} />
              </View>
              <View style={s.earningBottom}>
                <Text style={s.earningDate}>{earning.date} - {earning.method}</Text>
                <Text style={s.earningAmount}>{money(earning.amount)}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </Page>
  );
}

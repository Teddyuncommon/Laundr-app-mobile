import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useData } from '@/contexts/DataContext';
import { Page, Icon, Pill, TabBar, s, statusColor, money, BLUE, INK, MUTED } from '@/components/ProviderSharedUI';

const FILTERS = ['All', 'Pending', 'Active', 'Completed', 'Cancelled'];

export default function OrdersScreen() {
  const router = useRouter();
  const { providerOrders } = useData();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const go = (target: string) => {
    if (target === 'Dashboard') router.push('/(provider)/dashboard');
    else if (target === 'Orders') router.push('/(provider)/orders');
    else if (target === 'Services') router.push('/(provider)/services');
    else if (target === 'Revenue') router.push('/(provider)/revenue');
    else if (target === 'Profile') router.push('/(provider)/profile');
  };

  const activeStatuses = ['Accepted', 'Pickup Scheduled', 'In Progress', 'Ready', 'Out for Delivery'];

  const filtered = providerOrders.filter((order) => {
    if (filter === 'Active' && !activeStatuses.includes(order.status)) return false;
    if (filter !== 'All' && filter !== 'Active' && order.status !== filter) return false;
    if (search && !order.customer.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <Page bottom={<TabBar active="Orders" go={go} />}>
      <View style={s.ordersHeader}>
        <Text style={s.screenTitle}>Orders</Text>
        <View style={s.searchBar}>
          <Icon name="search" size={18} color={MUTED} />
          <TextInput
            style={s.searchInput}
            placeholder="Search by customer name..."
            placeholderTextColor={MUTED}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

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
            <Icon name="inventory_2" size={48} color={MUTED} />
            <Text style={s.emptyText}>No orders found</Text>
          </View>
        ) : (
          filtered.map((order) => (
            <Pressable
              key={order.id}
              style={s.orderCard}
              onPress={() => router.push({ pathname: '/(provider)/order-detail', params: { id: order.id } })}
            >
              <View style={s.orderCardTop}>
                <View>
                  <Text style={s.orderCardService}>{order.service}</Text>
                  <Text style={s.orderCardCustomer}>{order.customer} - {order.load} kg</Text>
                </View>
                <Pill label={order.status} color={statusColor(order.status)} />
              </View>
              <View style={s.orderCardBottom}>
                <Text style={s.orderCardSlot}>{order.slot}</Text>
                <Text style={s.orderCardTotal}>{money(order.total)}</Text>
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </Page>
  );
}

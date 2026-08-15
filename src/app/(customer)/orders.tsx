import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useData } from '@/contexts/DataContext';
import { useBooking } from '@/contexts/BookingContext';
import {
  Page, Chip, Pill, TabBar,
  styles, money, BLUE, INK, MUTED, FONT,
} from '@/components/SharedUI';

export default function OrdersScreen() {
  const router = useRouter();
  const { orders } = useData();
  const { setSelectedOrder } = useBooking();
  const [tab, setTab] = useState<'active' | 'completed'>('active');

  const go = (target: string) => {
    if (target === 'home') router.push('/(customer)/home');
    else if (target === 'search') router.push('/(customer)/search');
    else if (target === 'orders') router.push('/(customer)/orders');
    else if (target === 'chat') router.push('/(customer)/messages');
    else if (target === 'profile') router.push('/(customer)/profile');
  };

  const filteredOrders = orders.filter(order => {
    if (tab === 'active') return order.status !== 'Ready';
    return order.status === 'Ready';
  });

  return (
    <Page bottom={<TabBar active="Orders" go={go} />}>
      <View style={styles.ordersHeader}>
        <Text style={styles.ordersTitle}>My Orders</Text>
        <View style={styles.orderTabs}>
          <Pressable onPress={() => setTab('active')}>
            <Chip label="Active" active={tab === 'active'} />
          </Pressable>
          <Pressable onPress={() => setTab('completed')}>
            <Chip label="Completed" active={tab === 'completed'} />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.flexScroll} contentContainerStyle={styles.ordersBody}>
        {filteredOrders.length === 0 ? (
          <View style={{ alignItems: 'center', paddingTop: 60 }}>
            <Text style={{ fontFamily: FONT, color: MUTED, fontSize: 16 }}>
              No {tab} orders
            </Text>
          </View>
        ) : (
          filteredOrders.map(order => (
            <Pressable
              key={order.id}
              style={styles.orderCard}
              onPress={() => {
                setSelectedOrder(order);
                router.push('/(customer)/track');
              }}
            >
              <View>
                <Text style={styles.orderService}>{order.service}</Text>
                <Text style={styles.orderProvider}>
                  {order.provider} · {order.load} {order.service === 'Dry Cleaning' ? 'items' : 'kg'}
                </Text>
              </View>
              <Pill label={order.status} />
              <View style={styles.orderFooter}>
                <Text style={styles.orderSlot}>{order.slot}</Text>
                <Text style={styles.orderTotal}>{money(order.total)}</Text>
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </Page>
  );
}

import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useData } from '@/contexts/DataContext';
import { Page, Header, Btn, Pill, s, statusColor, money, BLUE, INK, MUTED, GREEN, ORANGE } from '@/components/ProviderSharedUI';

const STATUS_FLOW = ['Pending', 'Accepted', 'Pickup Scheduled', 'In Progress', 'Ready', 'Out for Delivery', 'Completed'];

export default function OrderDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { providerOrders, updateProviderOrderStatus } = useData();

  const order = providerOrders.find(o => o.id === id);

  if (!order) {
    return (
      <Page>
        <Header title="Order Detail" onBack={() => router.push('/(provider)/orders')} />
        <View style={s.emptyState}>
          <Text style={s.emptyText}>Order not found</Text>
        </View>
      </Page>
    );
  }

  const currentIndex = STATUS_FLOW.indexOf(order.status);
  const canAdvance = currentIndex >= 0 && currentIndex < STATUS_FLOW.length - 1 && order.status !== 'Cancelled';
  const nextStatus = canAdvance ? STATUS_FLOW[currentIndex + 1] : null;

  const handleUpdateStatus = () => {
    if (nextStatus) {
      updateProviderOrderStatus(order.id, nextStatus);
    }
  };

  const handleContact = () => {
    Alert.alert('Contact Customer', `Call ${order.customer} at ${order.customerPhone}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Call', onPress: () => {} },
    ]);
  };

  return (
    <Page
      bottom={
        <View style={s.orderDetailBottom}>
          <Btn label="Contact Customer" onPress={handleContact} secondary style={{ flex: 1 }} />
          {canAdvance && (
            <Btn label={`Mark ${nextStatus}`} onPress={handleUpdateStatus} style={{ flex: 1 }} />
          )}
        </View>
      }
    >
      <Header title={`Order ${order.id}`} subtitle={order.placed} onBack={() => router.push('/(provider)/orders')} />
      <ScrollView contentContainerStyle={s.detailBody}>
        {/* Status */}
        <View style={s.detailCard}>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Status</Text>
            <Pill label={order.status} color={statusColor(order.status)} />
          </View>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Order ID</Text>
            <Text style={s.detailValue}>{order.id}</Text>
          </View>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Placed</Text>
            <Text style={s.detailValue}>{order.placed}</Text>
          </View>
        </View>

        {/* Customer Info */}
        <View style={s.detailCard}>
          <Text style={s.timelineTitle}>Customer</Text>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Name</Text>
            <Text style={s.detailValue}>{order.customer}</Text>
          </View>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Phone</Text>
            <Text style={s.detailValue}>{order.customerPhone}</Text>
          </View>
        </View>

        {/* Service Details */}
        <View style={s.detailCard}>
          <Text style={s.timelineTitle}>Service Details</Text>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Service</Text>
            <Text style={s.detailValue}>{order.service}</Text>
          </View>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Load</Text>
            <Text style={s.detailValue}>{order.load} kg</Text>
          </View>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Time Slot</Text>
            <Text style={s.detailValue}>{order.slot}</Text>
          </View>
        </View>

        {/* Addresses */}
        <View style={s.detailCard}>
          <Text style={s.timelineTitle}>Addresses</Text>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Pickup</Text>
            <Text style={s.detailValue}>{order.pickupAddress}</Text>
          </View>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Delivery</Text>
            <Text style={s.detailValue}>{order.deliveryAddress}</Text>
          </View>
        </View>

        {/* Payment */}
        <View style={s.detailCard}>
          <Text style={s.timelineTitle}>Payment</Text>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Method</Text>
            <Text style={s.detailValue}>{order.payment}</Text>
          </View>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Status</Text>
            <Pill label={order.paymentStatus} color={order.paymentStatus === 'Paid' ? GREEN : order.paymentStatus === 'Failed' ? '#dc3545' : ORANGE} />
          </View>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Total</Text>
            <Text style={s.detailValueBold}>{money(order.total)}</Text>
          </View>
        </View>

        {/* Notes */}
        {order.notes ? (
          <View style={s.detailCard}>
            <Text style={s.timelineTitle}>Notes</Text>
            <Text style={{ color: INK, fontSize: 14, lineHeight: 21 }}>{order.notes}</Text>
          </View>
        ) : null}

        {/* Review */}
        {order.rating ? (
          <View style={s.detailCard}>
            <Text style={s.timelineTitle}>Customer Review</Text>
            <View style={s.detailRow}>
              <Text style={s.detailLabel}>Rating</Text>
              <Text style={s.detailValue}>{'★'.repeat(order.rating)}{'☆'.repeat(5 - order.rating)}</Text>
            </View>
            {order.review ? (
              <Text style={{ color: MUTED, fontSize: 14, lineHeight: 21 }}>{order.review}</Text>
            ) : null}
          </View>
        ) : null}
      </ScrollView>
    </Page>
  );
}

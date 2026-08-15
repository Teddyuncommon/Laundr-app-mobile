import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useBooking } from '@/contexts/BookingContext';
import {
  Page, BookingHeader, Pill, SummaryRow, Timeline, Primary, AppIcon,
  styles, money, BLUE, INK, MUTED, FONT,
} from '@/components/SharedUI';

export default function TrackScreen() {
  const router = useRouter();
  const { selectedOrder } = useBooking();

  if (!selectedOrder) {
    return (
      <Page>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: FONT, color: MUTED, fontSize: 16 }}>No order selected</Text>
          <Pressable onPress={() => router.push('/(customer)/orders')} style={{ marginTop: 16 }}>
            <Text style={{ fontFamily: FONT, color: BLUE, fontWeight: '700' }}>Go to orders</Text>
          </Pressable>
        </View>
      </Page>
    );
  }

  return (
    <Page
      bottom={
        <View style={styles.trackBottom}>
          <Pressable
            onPress={() => router.push('/(customer)/messages')}
            style={styles.chatShortcut}
          >
            <AppIcon name="chat_bubble_outline" size={29} color={INK} />
          </Pressable>
          <Primary
            label="Contact provider"
            onPress={() => router.push('/(customer)/messages')}
            style={styles.trackCta}
          />
        </View>
      }
    >
      <BookingHeader
        title={`Order ${selectedOrder.id}`}
        subtitle={selectedOrder.provider}
        onBack={() => router.push('/(customer)/orders')}
      />
      <ScrollView style={styles.flexScroll} contentContainerStyle={styles.trackBody}>
        {/* Order Summary Card */}
        <View style={styles.trackCard}>
          <View style={styles.trackHead}>
            <View>
              <Text style={styles.orderService}>{selectedOrder.service}</Text>
              <Text style={styles.orderProvider}>
                {selectedOrder.load} kg · placed {selectedOrder.placed}
              </Text>
            </View>
            <Pill label={selectedOrder.status} />
          </View>
          <View style={styles.summaryDivider} />
          <SummaryRow name="Slot" value={selectedOrder.slot} />
          <SummaryRow name="Address" value={selectedOrder.address} />
          <SummaryRow name="Collection" value={selectedOrder.collection} />
          <SummaryRow name="Delivery" value={selectedOrder.delivery} />
          <SummaryRow name="Payment" value={selectedOrder.payment} />
          <SummaryRow name="Total" value={money(selectedOrder.total)} />
        </View>

        {/* Tracking Timeline */}
        <View style={styles.trackingCard}>
          <Text style={styles.trackingTitle}>Tracking</Text>
          <Timeline status={selectedOrder.status} />
        </View>
      </ScrollView>
    </Page>
  );
}

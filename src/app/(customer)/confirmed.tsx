import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useBooking } from '@/contexts/BookingContext';
import {
  Page, Primary, SummaryCard,
  styles, money, FONT, INK, MUTED,
} from '@/components/SharedUI';

export default function ConfirmedScreen() {
  const router = useRouter();
  const { selectedOrder, booking, resetBooking } = useBooking();

  const orderRows: string[][] = selectedOrder
    ? [
        ['Order', selectedOrder.id],
        ['Provider', selectedOrder.provider],
        ['Service', selectedOrder.service],
        ['Paid via', selectedOrder.payment],
        ['Total', money(selectedOrder.total)],
      ]
    : [
        ['Order', 'Pending'],
        ['Total', money(0)],
      ];

  return (
    <Page>
      <View style={styles.confirmed}>
        <Text style={styles.checkCircle}>✓</Text>
        <Text style={styles.confirmedTitle}>Booking Confirmed!</Text>
        <Text style={styles.confirmedCopy}>
          {selectedOrder
            ? `${selectedOrder.provider} will collect your laundry on ${selectedOrder.slot}.`
            : 'Your booking has been placed successfully.'}
        </Text>

        <SummaryCard rows={orderRows} />

        <Primary
          label="Track my order"
          onPress={() => router.push('/(customer)/track')}
          style={styles.confirmedButton}
        />

        <Pressable
          onPress={() => {
            resetBooking();
            router.push('/(customer)/home');
          }}
        >
          <Text style={styles.backHome}>Back to home</Text>
        </Pressable>
      </View>
    </Page>
  );
}

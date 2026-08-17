import React from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useBooking } from '@/contexts/BookingContext';
import {
  Page, BookingHeader, BookingBottom, SummaryCard, SummaryRow,
  styles, money,
} from '@/components/SharedUI';

export default function SummaryScreen() {
  const router = useRouter();
  const { booking, subtotal, deliveryFee, serviceFee, total } = useBooking();

  const rows: string[][] = [
    ['Provider', booking.provider?.name || 'Not selected'],
    ['Service', booking.service ? `${booking.service.name} · ${booking.load} ${booking.service.unit.replace('per ', '')}` : 'Not selected'],
    ['Collection', booking.collection === 'pickup' ? 'Pickup from me' : 'I will drop off'],
    ['Delivery', booking.delivery === 'deliver' ? 'Deliver to me' : 'I will collect'],
    ['Time slot', booking.slot || 'Not selected'],
    ['Address', booking.address || '12 Bosman Rd, Mt Pleasant, Harare'],
  ];

  return (
    <Page
      bottom={
        <BookingBottom
          label="Continue to payment"
          detail={`Total: ${money(total)}`}
          onPress={() => router.push('/(customer)/payment')}
        />
      }
    >
      <BookingHeader
        title="Booking Summary"
        onBack={() => router.back()}
        step={4}
      />
      <ScrollView style={styles.flexScroll} contentContainerStyle={styles.summaryBody}>
        {/* Booking Details */}
        <SummaryCard rows={rows} />

        {/* Cost Breakdown */}
        <View style={styles.summaryCard}>
          <SummaryRow name="Service subtotal" value={money(subtotal)} />
          <SummaryRow name="Pickup & delivery" value={money(deliveryFee)} />
          <SummaryRow name="Laundr fee (5%)" value={money(serviceFee)} />
          <View style={styles.summaryDivider} />
          <SummaryRow name="Total" value={money(total)} total />
        </View>
      </ScrollView>
    </Page>
  );
}

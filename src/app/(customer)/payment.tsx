import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useData } from '@/contexts/DataContext';
import { useBooking } from '@/contexts/BookingContext';
import {
  Page, BookingHeader, BookingBottom, MethodChoice, SummaryRow,
  styles, money, FONT, INK, MUTED,
} from '@/components/SharedUI';

export default function PaymentScreen() {
  const router = useRouter();
  const { bookService } = useData();
  const { booking, updateBooking, total, setSelectedOrder } = useBooking();

  const methods: { key: 'ecocash' | 'card' | 'cash'; icon: string; title: string; text: string }[] = [
    { key: 'ecocash', icon: 'smartphone', title: 'EcoCash', text: '077 *** 4412' },
    { key: 'card', icon: 'credit_card', title: 'Card', text: 'Visa / Mastercard' },
    { key: 'cash', icon: 'account_balance_wallet', title: 'Cash on delivery', text: 'Pay the rider' },
  ];

  const confirmBooking = async () => {
    const order = await bookService({
      provider: booking.provider?.name || 'Unknown',
      service: booking.service?.name || 'Wash & Fold',
      load: booking.load,
      collection: booking.collection === 'pickup' ? 'Pickup from me' : 'I will drop off',
      delivery: booking.delivery === 'deliver' ? 'Deliver to me' : 'I will collect',
      slot: booking.slot || 'Today, 16:00 - 18:00',
      address: booking.address || '12 Bosman Rd, Mt Pleasant',
      payment: booking.payment === 'ecocash' ? 'EcoCash' : booking.payment === 'card' ? 'Card' : 'Cash on delivery',
      total,
    });
    setSelectedOrder(order);
    router.push('/(customer)/confirmed');
  };

  return (
    <Page
      bottom={
        <BookingBottom
          label={`Pay ${money(total)}`}
          onPress={confirmBooking}
        />
      }
    >
      <BookingHeader
        title="Payment"
        subtitle="Choose payment method"
        onBack={() => router.back()}
        step={5}
      />
      <ScrollView style={styles.flexScroll} contentContainerStyle={styles.paymentBody}>
        {methods.map(method => (
          <MethodChoice
            key={method.key}
            selected={booking.payment === method.key}
            icon={method.icon}
            title={method.title}
            text={method.text}
            onPress={() => updateBooking({ payment: method.key })}
          />
        ))}

        <View style={styles.amountCard}>
          <SummaryRow name="Amount due" value={money(total)} total />
          <Text style={styles.amountNote}>
            Funds are held by Laundr and released to the provider once you confirm delivery.
          </Text>
        </View>
      </ScrollView>
    </Page>
  );
}

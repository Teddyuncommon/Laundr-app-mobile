import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useBooking } from '@/contexts/BookingContext';
import {
  Page, BookingHeader, BookingBottom, MethodChoice,
  styles, BLUE, INK, MUTED, FONT, PAGE,
} from '@/components/SharedUI';

const SAVED_ADDRESSES = [
  { label: 'Home', address: '12 Bosman Rd, Mt Pleasant, Harare' },
  { label: 'Campus', address: 'New Complex Block C, UZ, Mt Pleasant' },
  { label: 'Office', address: '5th Floor, Fidelity House, Harare CBD' },
];

export default function CollectionScreen() {
  const router = useRouter();
  const { booking, updateBooking } = useBooking();

  const providerLocation = booking.provider
    ? `${booking.provider.name}, ${booking.provider.neighbourhood}`
    : 'the laundry hub';

  return (
    <Page
      bottom={
        <BookingBottom
          label="Continue"
          onPress={() => router.push('/(customer)/schedule')}
        />
      }
    >
      <BookingHeader
        title="Collection method"
        onBack={() => router.back()}
        step={2}
      />
      <ScrollView style={styles.flexScroll} contentContainerStyle={local.body}>
        <MethodChoice
          selected={booking.collection === 'pickup'}
          icon="delivery_dining"
          title="Pickup from me"
          text={`A rider collects from your address. +US$2 within 10 km of ${booking.provider?.neighbourhood || 'Mt Pleasant'}.`}
          onPress={() => updateBooking({ collection: 'pickup' })}
        />

        <MethodChoice
          selected={booking.collection === 'dropoff'}
          icon="storefront"
          title="I'll drop off"
          text={`Bring your laundry to ${providerLocation}. No extra fee.`}
          onPress={() => updateBooking({ collection: 'dropoff', address: '' })}
        />

        {booking.collection === 'pickup' && (
          <View style={local.addressSection}>
            <Text style={local.addressLabel}>PICKUP ADDRESS</Text>
            {SAVED_ADDRESSES.map(item => {
              const isSelected = booking.address === item.address;
              return (
                <Pressable
                  key={item.label}
                  style={[local.addressCard, isSelected && local.addressCardSelected]}
                  onPress={() => updateBooking({ address: item.address })}
                >
                  <Text style={[local.addressName, isSelected && local.addressNameSelected]}>
                    {item.label}
                  </Text>
                  <Text style={local.addressText}>{item.address}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>
    </Page>
  );
}

const local = StyleSheet.create({
  body: { padding: 20, paddingBottom: 40, gap: 14 },
  addressSection: { marginTop: 10, gap: 12 },
  addressLabel: {
    fontFamily: FONT,
    fontSize: 12,
    fontWeight: '700',
    color: MUTED,
    letterSpacing: 0.8,
  },
  addressCard: {
    borderWidth: 1.5,
    borderColor: '#e0e5ed',
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 18,
  },
  addressCardSelected: {
    borderColor: BLUE,
    backgroundColor: '#e8f2ff',
  },
  addressName: {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: '800',
    color: INK,
    marginBottom: 4,
  },
  addressNameSelected: {
    color: INK,
  },
  addressText: {
    fontFamily: FONT,
    fontSize: 14,
    color: MUTED,
    lineHeight: 20,
  },
});

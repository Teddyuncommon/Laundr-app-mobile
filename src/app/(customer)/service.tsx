import React from 'react';
import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useBooking } from '@/contexts/BookingContext';
import {
  Page, BookingHeader, BookingBottom,
  styles, money, BLUE, INK, MUTED, FONT,
} from '@/components/SharedUI';
import { serviceCatalog } from '@/data/laundr-api';

export default function ServiceScreen() {
  const router = useRouter();
  const { booking, updateBooking, subtotal } = useBooking();

  const handleServiceSelect = (service: typeof serviceCatalog[number]) => {
    updateBooking({ service });
  };

  const incrementLoad = () => {
    if (booking.load < 20) updateBooking({ load: booking.load + 1 });
  };

  const decrementLoad = () => {
    if (booking.load > 1) updateBooking({ load: booking.load - 1 });
  };

  return (
    <Page
      bottom={
        <BookingBottom
          label="Continue"
          detail={`Subtotal: ${money(subtotal)}`}
          onPress={() => router.push('/(customer)/schedule')}
        />
      }
    >
      <BookingHeader
        title="Select Service"
        subtitle={booking.provider?.name || 'Choose a service'}
        onBack={() => router.back()}
        step={1}
      />
      <ScrollView style={styles.flexScroll} contentContainerStyle={styles.bookingBody}>
        {/* Service Options */}
        {serviceCatalog.map(service => (
          <Pressable
            key={service.key}
            style={[
              styles.serviceChoice,
              booking.service?.key === service.key && styles.selectedChoice,
            ]}
            onPress={() => handleServiceSelect(service)}
          >
            <View>
              <Text style={styles.serviceChoiceTitle}>{service.name}</Text>
              <Text style={styles.serviceChoiceMeta}>{service.duration} · {service.unit}</Text>
            </View>
            <Text style={styles.servicePrice}>{money(service.price)}</Text>
          </Pressable>
        ))}

        {/* Load Stepper */}
        <View style={styles.loadCard}>
          <View>
            <Text style={styles.serviceChoiceTitle}>Estimated load</Text>
            <Text style={styles.serviceChoiceMeta}>{booking.service?.unit || 'per kg'}</Text>
          </View>
          <View style={styles.stepper}>
            <Pressable style={styles.stepperMinus} onPress={decrementLoad}>
              <Text style={styles.stepperText}>-</Text>
            </Pressable>
            <Text style={styles.loadNumber}>{booking.load}</Text>
            <Pressable style={styles.stepperPlus} onPress={incrementLoad}>
              <Text style={styles.stepperPlusText}>+</Text>
            </Pressable>
          </View>
        </View>

        {/* Special Instructions */}
        <Text style={styles.instructionsTitle}>Special instructions</Text>
        <TextInput
          style={styles.instructions}
          placeholder="e.g. iron the two blue shirts separately"
          placeholderTextColor={MUTED}
          multiline
          value={booking.instructions}
          onChangeText={(text) => updateBooking({ instructions: text })}
        />
      </ScrollView>
    </Page>
  );
}

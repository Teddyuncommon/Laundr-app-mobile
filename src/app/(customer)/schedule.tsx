import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useBooking } from '@/contexts/BookingContext';
import {
  Page, BookingHeader, BookingBottom, Calendar,
  styles, INK, BLUE, MUTED, FONT,
} from '@/components/SharedUI';

const TIME_SLOTS = [
  { label: 'Morning', time: '08:00 - 10:00' },
  { label: 'Midday', time: '10:00 - 12:00' },
  { label: 'Afternoon', time: '14:00 - 16:00' },
  { label: 'Evening', time: '16:00 - 18:00' },
];

export default function ScheduleScreen() {
  const router = useRouter();
  const { booking, updateBooking } = useBooking();

  return (
    <Page
      bottom={
        <BookingBottom
          label="Continue"
          onPress={() => router.push('/(customer)/summary')}
        />
      }
    >
      <BookingHeader
        title="Schedule"
        subtitle="Pick collection date & time"
        onBack={() => router.back()}
        step={2}
      />
      <ScrollView style={styles.flexScroll} contentContainerStyle={styles.scheduleBody}>
        <Text style={styles.scheduleTitle}>Choose a date</Text>
        <Text style={styles.scheduleIntro}>
          Select when you'd like your laundry collected. We'll handle the rest.
        </Text>

        <Calendar />

        {/* Time Slots */}
        <View style={styles.slotPanel}>
          <Text style={styles.slotHeading}>Available Time Slots</Text>
          {TIME_SLOTS.map(slot => {
            const slotValue = `Today, ${slot.time}`;
            const isSelected = booking.slot === slotValue;
            return (
              <Pressable
                key={slot.label}
                style={[styles.slot, isSelected && styles.slotSelected]}
                onPress={() => updateBooking({ slot: slotValue })}
              >
                <View>
                  <Text style={styles.slotTitle}>{slot.label}</Text>
                  <Text style={styles.slotTime}>{slot.time}</Text>
                </View>
                {isSelected && <Text style={styles.slotCheck}>✓</Text>}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </Page>
  );
}

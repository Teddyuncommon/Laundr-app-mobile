import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Page, Primary, IconButton, Dots, DiscoverArt, FlowArt, TrackArt, styles, BLUE } from '@/components/SharedUI';

const SLIDES = [
  { art: 'discover', title: ['Discover local ', 'laundry services', ''], text: 'Find trusted laundry providers within your area in just a few taps.' },
  { art: 'flow', title: ['Schedule ', 'pickup & delivery', ''], text: 'Flexible options designed for your schedule. Whether you come to us or we come to you.' },
  { art: 'track', title: ['Track your ', 'orders', ' in real-time'], text: 'Stay informed throughout the entire process from pickup to delivery.' },
];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const slide = SLIDES[step];

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      router.push('/(auth)/role-select');
    }
  };

  const handleSkip = () => {
    router.push('/(auth)/role-select');
  };

  return (
    <Page scroll={false} style={styles.onboardPage}>
      <View style={styles.onboardNav}>
        {step > 0 ? (
          <IconButton name="arrow_back" onPress={() => setStep(step - 1)} />
        ) : (
          <View style={{ width: 42 }} />
        )}
        <Pressable onPress={handleSkip} style={{ position: 'absolute', right: 16, top: 20 }}>
          <Text style={{ color: BLUE, fontSize: 15, fontWeight: '600' }}>Skip</Text>
        </Pressable>
      </View>

      {step === 0 ? <DiscoverArt /> : step === 1 ? <FlowArt /> : <TrackArt />}

      <View style={styles.progressLine}>
        <Dots count={3} active={step} />
        <Text style={styles.stepText}>Step {step + 1} of 3</Text>
      </View>

      <Text style={styles.onboardTitle}>
        {slide.title[0]}
        <Text style={styles.blue}>{slide.title[1]}</Text>
        {slide.title[2]}
      </Text>
      <Text style={styles.onboardCopy}>{slide.text}</Text>

      <Primary
        label={step < 2 ? 'Next' : 'Get Started'}
        onPress={handleNext}
        style={styles.onboardButton}
      />
    </Page>
  );
}

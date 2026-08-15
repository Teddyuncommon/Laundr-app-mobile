import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { WasherIcon, BLUE } from '@/components/SharedUI';

export default function SplashScreen() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    const timer = setTimeout(() => {
      if (user) {
        if (user.role === 'customer') router.replace('/(customer)/home');
        else router.replace('/(provider)/dashboard');
      } else {
        router.replace('/(auth)/onboard');
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [isLoading, user]);

  return (
    <SafeAreaView style={s.container}>
      <View style={s.lockup}>
        <WasherIcon size={38} color={BLUE} />
        <Text style={s.logo}>Laundr</Text>
      </View>
      <Text style={s.tagline}>Your digital laundry concierge</Text>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  lockup: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  logo: { color: '#0967ce', fontSize: 51, lineHeight: 58, fontWeight: '900', letterSpacing: -3.7 },
  tagline: { color: '#687284', fontSize: 15, marginTop: 12 },
});

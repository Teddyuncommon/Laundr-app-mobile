import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import { BookingProvider } from '@/contexts/BookingContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <DataProvider>
            <BookingProvider>
              <StatusBar style="dark" />
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(customer)" options={{ headerShown: false }} />
                <Stack.Screen name="(provider)" options={{ headerShown: false }} />
              </Stack>
            </BookingProvider>
          </DataProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

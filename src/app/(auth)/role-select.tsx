import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Page, AppIcon, Primary, IconButton, styles, BLUE } from '@/components/SharedUI';

export default function RoleSelect() {
  const router = useRouter();
  const { setPendingRole } = useAuth();
  const [role, setRole] = useState<UserRole | null>(null);

  const handleContinue = () => {
    if (role) {
      setPendingRole(role);
      router.push('/(auth)/register');
    }
  };

  return (
    <Page scroll={false} style={styles.onboardPage}>
      <View style={styles.onboardNav}>
        <IconButton name="arrow_back" onPress={() => router.push('/(auth)/onboard')} />
      </View>

      <ScrollView contentContainerStyle={styles.roleBody}>
        <Text style={styles.roleTitle}>
          Choose Your{'\n'}
          <Text style={styles.blue}>Account Type</Text>
        </Text>
        <Text style={styles.roleSubtitle}>
          Select how you want to use Laundr. This determines your experience.
        </Text>

        <Pressable
          onPress={() => setRole('customer')}
          style={[styles.roleCard, role === 'customer' && styles.roleCardActive]}
        >
          <View style={[styles.roleIcon, role === 'customer' && styles.roleIconActive]}>
            <AppIcon name="person" size={30} color={role === 'customer' ? '#ffffff' : BLUE} />
          </View>
          <View style={styles.roleCopy}>
            <Text style={styles.roleCardTitle}>I Need Laundry Done</Text>
            <Text style={styles.roleCardType}>Customer Account</Text>
            <Text style={styles.roleCardText}>
              Find, book, and manage laundry services from trusted providers near you.
            </Text>
          </View>
          {role === 'customer' && (
            <View style={styles.roleCheck}>
              <Text style={styles.roleCheckText}>✓</Text>
            </View>
          )}
        </Pressable>

        <Pressable
          onPress={() => setRole('provider')}
          style={[styles.roleCard, role === 'provider' && styles.roleCardActive]}
        >
          <View style={[styles.roleIcon, role === 'provider' && styles.roleIconActive]}>
            <AppIcon name="storefront" size={30} color={role === 'provider' ? '#ffffff' : BLUE} />
          </View>
          <View style={styles.roleCopy}>
            <Text style={styles.roleCardTitle}>I Offer Laundry Services</Text>
            <Text style={styles.roleCardType}>Provider Account</Text>
            <Text style={styles.roleCardText}>
              Receive bookings, manage orders, grow your laundry business, and earn income.
            </Text>
          </View>
          {role === 'provider' && (
            <View style={styles.roleCheck}>
              <Text style={styles.roleCheckText}>✓</Text>
            </View>
          )}
        </Pressable>

        <View style={styles.tip}>
          <AppIcon name="verified_user" size={24} color={BLUE} />
          <Text style={styles.tipText}>
            You can change your account type later from settings.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.roleBottom}>
        <Primary
          label="Continue"
          onPress={handleContinue}
          style={[!role && styles.btnDisabled]}
        />
      </View>
    </Page>
  );
}

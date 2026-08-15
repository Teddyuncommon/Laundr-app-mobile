import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Page, AppIcon, Primary, IconButton, styles, BLUE } from '@/components/SharedUI';
import { ScrollView } from 'react-native';

export default function ForgotPassword() {
  const router = useRouter();
  const auth = useAuth();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    const result = await auth.forgotPassword(email.trim());
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      router.push('/(auth)/otp');
    }
  };

  return (
    <Page>
      <ScrollView contentContainerStyle={styles.authContent}>
        <IconButton name="arrow_back" onPress={() => router.push('/(auth)/login')} />

        <View style={styles.forgotIcon}>
          <AppIcon name="lock" size={32} color={BLUE} />
        </View>

        <Text style={styles.authTitle}>Forgot Password?</Text>
        <Text style={styles.authSubtitle}>
          Enter the email associated with your account and we'll send a verification code to reset your password.
        </Text>

        {error ? (
          <View style={{ backgroundColor: '#fef2f2', borderRadius: 12, padding: 14, marginBottom: 16 }}>
            <Text style={{ color: '#dc2626', fontSize: 14 }}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Email Address</Text>
          <View style={styles.field}>
            <TextInput
              placeholder="name@company.com"
              placeholderTextColor="#788397"
              style={styles.fieldInput}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>

        <Primary
          label={loading ? 'Sending...' : 'Send Reset Code'}
          onPress={handleSubmit}
          style={styles.authButton}
        />
      </ScrollView>
    </Page>
  );
}

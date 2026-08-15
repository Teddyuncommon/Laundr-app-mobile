import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Page, AppIcon, Primary, IconButton, styles, BLUE } from '@/components/SharedUI';
import { ScrollView } from 'react-native';

export default function OtpVerification() {
  const router = useRouter();
  const auth = useAuth();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setCountdown(60);
    setError('');
  };

  const handleVerify = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setError('');
    setLoading(true);
    const result = await auth.verifyOtp(fullCode);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      router.push('/(auth)/reset-password');
    }
  };

  return (
    <Page>
      <ScrollView contentContainerStyle={styles.authContent}>
        <IconButton name="arrow_back" onPress={() => router.push('/(auth)/forgot-password')} />

        <View style={styles.forgotIcon}>
          <AppIcon name="mail" size={32} color={BLUE} />
        </View>

        <Text style={styles.authTitle}>Verify Code</Text>
        <Text style={styles.authSubtitle}>
          Enter the 6-digit code sent to your email address.
        </Text>

        {error ? (
          <View style={{ backgroundColor: '#fef2f2', borderRadius: 12, padding: 14, marginBottom: 16 }}>
            <Text style={{ color: '#dc2626', fontSize: 14 }}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.otpRow}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputRefs.current[index] = ref; }}
              style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
              value={digit}
              onChangeText={(text) => handleChange(text.slice(-1), index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {countdown > 0 ? (
          <Text style={styles.otpTimer}>
            Resend code in {countdown}s
          </Text>
        ) : (
          <Pressable onPress={handleResend}>
            <Text style={styles.resendLink}>Resend Code</Text>
          </Pressable>
        )}

        <Primary
          label={loading ? 'Verifying...' : 'Verify'}
          onPress={handleVerify}
          style={styles.authButton}
        />
      </ScrollView>
    </Page>
  );
}

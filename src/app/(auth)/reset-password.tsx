import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Page, AppIcon, Primary, IconButton, styles, BLUE } from '@/components/SharedUI';
import { ScrollView } from 'react-native';

function getPasswordStrength(password: string): { level: number; label: string; color: string } {
  if (password.length === 0) return { level: 0, label: '', color: '#e8ecf1' };
  if (password.length < 6) return { level: 1, label: 'Weak', color: '#dc2626' };
  if (password.length < 8) return { level: 2, label: 'Fair', color: '#f59e0b' };
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const score = [hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
  if (score >= 2 && password.length >= 8) return { level: 4, label: 'Strong', color: '#16a34a' };
  return { level: 3, label: 'Good', color: '#2563eb' };
}

export default function ResetPassword() {
  const router = useRouter();
  const auth = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const strength = getPasswordStrength(password);

  const handleSubmit = async () => {
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await auth.resetPassword(password);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      router.push('/(auth)/login');
    }
  };

  return (
    <Page>
      <ScrollView contentContainerStyle={styles.authContent}>
        <IconButton name="arrow_back" onPress={() => router.push('/(auth)/otp')} />

        <View style={styles.forgotIcon}>
          <AppIcon name="lock" size={32} color={BLUE} />
        </View>

        <Text style={styles.authTitle}>Reset Password</Text>
        <Text style={styles.authSubtitle}>
          Create a new password for your account. Make sure it's strong and memorable.
        </Text>

        {error ? (
          <View style={{ backgroundColor: '#fef2f2', borderRadius: 12, padding: 14, marginBottom: 16 }}>
            <Text style={{ color: '#dc2626', fontSize: 14 }}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>New Password</Text>
          <View style={styles.field}>
            <TextInput
              placeholder="Min. 6 characters"
              placeholderTextColor="#788397"
              style={styles.fieldInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        {password.length > 0 && (
          <>
            <View style={styles.strengthBar}>
              <View
                style={[
                  styles.strengthFill,
                  {
                    width: `${(strength.level / 4) * 100}%`,
                    backgroundColor: strength.color,
                  },
                ]}
              />
            </View>
            <Text style={[styles.strengthText, { color: strength.color }]}>
              {strength.label}
            </Text>
          </>
        )}

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Confirm New Password</Text>
          <View style={styles.field}>
            <TextInput
              placeholder="Re-enter password"
              placeholderTextColor="#788397"
              style={styles.fieldInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.pwRequirements}>
          <Text style={styles.pwReq}>- At least 6 characters</Text>
          <Text style={styles.pwReq}>- Include uppercase letters for strength</Text>
          <Text style={styles.pwReq}>- Include numbers or special characters</Text>
        </View>

        <Primary
          label={loading ? 'Resetting...' : 'Reset Password'}
          onPress={handleSubmit}
          style={styles.authButton}
        />
      </ScrollView>
    </Page>
  );
}

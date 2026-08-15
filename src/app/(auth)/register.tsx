import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Page, AppIcon, Primary, IconButton, styles, BLUE } from '@/components/SharedUI';

export default function Register() {
  const router = useRouter();
  const { pendingRole, register } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const role = pendingRole || 'customer';

  const handleRegister = async () => {
    setError('');

    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await register({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
      role,
      businessName: role === 'provider' ? businessName.trim() : undefined,
    });
    setLoading(false);

    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <Page>
      <ScrollView contentContainerStyle={styles.authContent}>
        <IconButton name="arrow_back" onPress={() => router.push('/(auth)/role-select')} />

        <View style={styles.roleBadge}>
          <AppIcon
            name={role === 'provider' ? 'storefront' : 'person'}
            size={16}
            color={BLUE}
          />
          <Text style={styles.roleBadgeText}>
            Creating {role === 'provider' ? 'Provider' : 'Customer'} Account
          </Text>
        </View>

        <Text style={styles.authTitle}>Create Account</Text>
        <Text style={styles.authSubtitle}>
          Join Laundr and experience effortless garment care.
        </Text>

        {error ? (
          <View style={{ backgroundColor: '#fef2f2', borderRadius: 12, padding: 14, marginBottom: 16 }}>
            <Text style={{ color: '#dc2626', fontSize: 14 }}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.nameRow}>
          <View style={styles.nameHalf}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>First Name</Text>
              <View style={styles.field}>
                <TextInput
                  placeholder="Anesu"
                  placeholderTextColor="#788397"
                  style={styles.fieldInput}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
            </View>
          </View>
          <View style={styles.nameHalf}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Last Name</Text>
              <View style={styles.field}>
                <TextInput
                  placeholder="Marimo"
                  placeholderTextColor="#788397"
                  style={styles.fieldInput}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Email</Text>
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

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Phone Number</Text>
          <View style={styles.field}>
            <TextInput
              placeholder="+263 77 000 0000"
              placeholderTextColor="#788397"
              style={styles.fieldInput}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Password</Text>
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

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Confirm Password</Text>
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

        {role === 'provider' && (
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Business Name</Text>
            <View style={styles.field}>
              <TextInput
                placeholder="e.g. SwiftWash & Dry"
                placeholderTextColor="#788397"
                style={styles.fieldInput}
                value={businessName}
                onChangeText={setBusinessName}
              />
            </View>
          </View>
        )}

        <Primary
          label={loading ? 'Creating Account...' : 'Create Account'}
          onPress={handleRegister}
          style={styles.authButton}
        />

        <Text style={styles.terms}>
          By creating an account, you agree to our{'\n'}Terms of Service and Privacy Policy.
        </Text>

        <Pressable onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.authSwitch}>
            Already have an account? <Text style={{ color: BLUE, fontWeight: '800' }}>Login</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </Page>
  );
}

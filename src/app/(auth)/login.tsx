import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Page, Primary, IconButton, Divider, GoogleIcon, FacebookIcon, styles, BLUE, INK, MUTED } from '@/components/SharedUI';

export default function Login() {
  const router = useRouter();
  const auth = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    const result = await auth.login(email, password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    }
  };

  const handleSocialLogin = async (demoEmail: string) => {
    setError('');
    setLoading(true);
    const result = await auth.login(demoEmail, '123456');
    setLoading(false);
    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <Page>
      <ScrollView contentContainerStyle={styles.authContent}>
        <IconButton name="arrow_back" onPress={() => router.push('/(auth)/role-select')} />

        <Text style={styles.authTitle}>Welcome Back</Text>
        <Text style={styles.authSubtitle}>
          Login to your account and manage your fresh wardrobe.
        </Text>

        {error ? (
          <View style={{ backgroundColor: '#fef2f2', borderRadius: 12, padding: 14, marginBottom: 16 }}>
            <Text style={{ color: '#dc2626', fontSize: 14 }}>{error}</Text>
          </View>
        ) : null}

        <View style={{ backgroundColor: '#f0f9ff', borderRadius: 12, padding: 14, marginBottom: 20 }}>
          <Text style={{ color: BLUE, fontSize: 12, fontWeight: '700', marginBottom: 4 }}>Demo Credentials</Text>
          <Text style={{ color: INK, fontSize: 12 }}>Customer: testcustomer@laundr.com</Text>
          <Text style={{ color: INK, fontSize: 12 }}>Provider: testprovider@laundr.com</Text>
          <Text style={{ color: MUTED, fontSize: 12 }}>Password: 123456</Text>
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
          <Text style={styles.fieldLabel}>Password</Text>
          <View style={styles.field}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#788397"
              style={styles.fieldInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.loginOptions}>
          <Pressable onPress={() => setRemember(!remember)} style={styles.rememberRow}>
            <View style={[styles.checkbox, remember && styles.checkboxActive]}>
              {remember && <Text style={styles.checkMark}>✓</Text>}
            </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/(auth)/forgot-password')}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </Pressable>
        </View>

        <Primary
          label={loading ? 'Logging in...' : 'Login'}
          onPress={handleLogin}
          style={styles.authButton}
        />

        <Divider label="Or Continue With" />

        <View style={styles.socialRow}>
          <Pressable
            onPress={() => handleSocialLogin('testcustomer@laundr.com')}
            style={styles.secondary}
          >
            <GoogleIcon />
            <Text style={styles.secondaryText}>Google</Text>
          </Pressable>
          <Pressable
            onPress={() => handleSocialLogin('testprovider@laundr.com')}
            style={styles.secondary}
          >
            <FacebookIcon />
            <Text style={styles.secondaryText}>Facebook</Text>
          </Pressable>
        </View>

        <Pressable onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.authSwitch}>
            Don't have an account? <Text style={{ color: BLUE, fontWeight: '800' }}>Sign Up</Text>
          </Text>
        </Pressable>

        <View style={styles.legal}>
          <Text style={styles.legalText}>Privacy Policy        Terms Of Service</Text>
          <Text style={styles.legalText}>© 2026 Laundr Marketplace Inc.</Text>
        </View>
      </ScrollView>
    </Page>
  );
}

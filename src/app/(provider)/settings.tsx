import React from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Page, Icon, TabBar, s, BLUE, MUTED, RED } from '@/components/ProviderSharedUI';

export default function SettingsScreen() {
  const router = useRouter();
  const { logout } = useAuth();

  const go = (target: string) => {
    if (target === 'Dashboard') router.push('/(provider)/dashboard');
    else if (target === 'Orders') router.push('/(provider)/orders');
    else if (target === 'Services') router.push('/(provider)/services');
    else if (target === 'Revenue') router.push('/(provider)/revenue');
    else if (target === 'Profile') router.push('/(provider)/profile');
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => logout() },
    ]);
  };

  const showAlert = (title: string) => {
    Alert.alert(title, 'Coming soon');
  };

  const groups = [
    {
      title: 'Account',
      items: [
        { icon: 'person', label: 'Edit Profile', onPress: () => showAlert('Edit Profile') },
        { icon: 'notifications_none', label: 'Notifications', onPress: () => router.push('/(provider)/notifications') },
        { icon: 'credit_card', label: 'Payment Settings', onPress: () => showAlert('Payment Settings') },
        { icon: 'lock', label: 'Security', onPress: () => showAlert('Security') },
      ],
    },
    {
      title: 'App',
      items: [
        { icon: 'language', label: 'Language', onPress: () => showAlert('Language') },
        { icon: 'privacy_tip', label: 'Privacy Policy', onPress: () => showAlert('Privacy Policy') },
        { icon: 'description', label: 'Terms & Conditions', onPress: () => showAlert('Terms & Conditions') },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'help_outline', label: 'Help & Support', onPress: () => showAlert('Help & Support') },
        { icon: 'info', label: 'About', onPress: () => showAlert('About Laundr v1.0') },
      ],
    },
  ];

  return (
    <Page bottom={<TabBar active="Profile" go={go} />}>
      <ScrollView style={s.flex} contentContainerStyle={s.settingsBody}>
        <Text style={s.screenTitle}>Settings</Text>

        {groups.map((group) => (
          <View key={group.title}>
            <Text style={{ fontSize: 13, color: MUTED, fontWeight: '600', marginBottom: 8, marginTop: 6, paddingHorizontal: 4 }}>{group.title}</Text>
            <View style={s.settingsGroup}>
              {group.items.map((item) => (
                <Pressable key={item.label} onPress={item.onPress} style={s.settingsRow}>
                  <View style={s.settingsRowIcon}>
                    <Icon name={item.icon} size={20} color={BLUE} />
                  </View>
                  <Text style={s.settingsRowText}>{item.label}</Text>
                  <Icon name="chevron_right" size={18} color={MUTED} />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        <Pressable onPress={handleLogout} style={s.logoutBtn}>
          <Icon name="logout" size={20} color={RED} />
          <Text style={s.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </Page>
  );
}

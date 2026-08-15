import React from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import {
  Page, AppIcon, TabBar,
  styles, BLUE, INK, MUTED, FONT,
} from '@/components/SharedUI';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const go = (target: string) => {
    if (target === 'home') router.push('/(customer)/home');
    else if (target === 'search') router.push('/(customer)/search');
    else if (target === 'orders') router.push('/(customer)/orders');
    else if (target === 'chat') router.push('/(customer)/messages');
    else if (target === 'profile') router.push('/(customer)/profile');
  };

  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : 'U';

  const menuGroups: { icon: string; title: string; sub: string }[][] = [
    [
      { icon: 'person_outline', title: 'Edit profile', sub: 'Name, phone, photo' },
      { icon: 'location_on', title: 'Saved addresses', sub: '3 saved' },
      { icon: 'credit_card', title: 'Payment methods', sub: 'EcoCash, Visa' },
    ],
    [
      { icon: 'notifications_none', title: 'Notifications', sub: 'Order and promo alerts' },
      { icon: 'star_outline', title: 'My reviews', sub: 'Reviews you left' },
      { icon: 'settings', title: 'Settings', sub: 'Language, privacy' },
    ],
    [
      { icon: 'help_outline', title: 'Help & support', sub: 'Chat with the Laundr team' },
      { icon: 'info_outline', title: 'About Laundr', sub: 'Version 1.0.0' },
    ],
  ];

  const handleMenuPress = (title: string) => {
    Alert.alert(title, 'This feature is coming soon.');
  };

  return (
    <Page bottom={<TabBar active="Profile" go={go} />}>
      <ScrollView style={styles.flexScroll} contentContainerStyle={styles.profileBody}>
        <Text style={styles.profileTitle}>Profile</Text>

        {/* User Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitials}>{initials}</Text>
          </View>
          <View>
            <Text style={styles.profileName}>
              {user?.firstName || 'User'} {user?.lastName || ''}
            </Text>
            <Text style={styles.profileMeta}>
              {user?.phone || '+263 77 123 4567'} · Mt Pleasant, Harare
            </Text>
          </View>
        </View>

        {/* Menu Groups */}
        {menuGroups.map((group, gi) => (
          <View key={gi} style={styles.profileGroup}>
            {group.map((item, i) => (
              <View key={item.title}>
                {i > 0 && <View style={styles.profileDivider} />}
                <Pressable
                  style={styles.profileRow}
                  onPress={() => handleMenuPress(item.title)}
                >
                  <View style={styles.profileRowIcon}>
                    <AppIcon name={item.icon} size={22} color={BLUE} />
                  </View>
                  <View>
                    <Text style={styles.profileRowTitle}>{item.title}</Text>
                    <Text style={styles.profileRowSub}>{item.sub}</Text>
                  </View>
                </Pressable>
              </View>
            ))}
          </View>
        ))}

        {/* Logout */}
        <Pressable onPress={logout} style={styles.logoutButton}>
          <AppIcon name="logout" size={20} color="#c0392b" />
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </Page>
  );
}

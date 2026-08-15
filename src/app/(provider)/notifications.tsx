import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useData } from '@/contexts/DataContext';
import { Page, Header, Icon, s, BLUE, MUTED, GREEN, ORANGE } from '@/components/ProviderSharedUI';

export default function NotificationsScreen() {
  const router = useRouter();
  const { providerNotifications, markProviderNotificationRead } = useData();

  const iconForType = (type: string) => {
    if (type === 'booking') return 'calendar_today';
    if (type === 'payment') return 'payments';
    if (type === 'review') return 'star';
    if (type === 'order') return 'inventory_2';
    return 'info';
  };

  const colorForType = (type: string) => {
    if (type === 'booking') return BLUE;
    if (type === 'payment') return GREEN;
    if (type === 'review') return ORANGE;
    if (type === 'order') return BLUE;
    return MUTED;
  };

  return (
    <Page>
      <Header title="Notifications" onBack={() => router.push('/(provider)/dashboard')} />
      <ScrollView style={s.flex} contentContainerStyle={s.listBody}>
        {providerNotifications.length === 0 ? (
          <View style={s.emptyState}>
            <Icon name="notifications_none" size={48} color={MUTED} />
            <Text style={s.emptyText}>No notifications</Text>
          </View>
        ) : (
          providerNotifications.map((n) => (
            <Pressable
              key={n.id}
              onPress={() => markProviderNotificationRead(n.id)}
              style={[s.notifRow, !n.read && s.notifUnread]}
            >
              <View style={[s.notifIcon, { backgroundColor: colorForType(n.type) + '15' }]}>
                <Icon name={iconForType(n.type)} size={20} color={colorForType(n.type)} />
              </View>
              <View style={s.notifContent}>
                <Text style={s.notifTitle}>{n.title}</Text>
                <Text style={s.notifMsg}>{n.message}</Text>
                <Text style={s.notifTime}>{n.time}</Text>
              </View>
              {!n.read && <View style={s.notifDot} />}
            </Pressable>
          ))
        )}
      </ScrollView>
    </Page>
  );
}

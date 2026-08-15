import React from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Page, Icon, TabBar, s, BLUE, INK, MUTED } from '@/components/ProviderSharedUI';

const CHATS = [
  { name: 'Anesu Marimo', last: 'Thanks! Please iron the two blue shirts separately.', time: '08:24', unread: 1 },
  { name: 'Tapiwa Zvobgo', last: 'When will my order be ready?', time: 'Yesterday', unread: 0 },
  { name: 'Chiedza Nyambe', last: 'Separate whites from colours please', time: 'Yesterday', unread: 0 },
  { name: 'Simba Mutasa', last: 'Is my order ready for pickup?', time: '2 days ago', unread: 0 },
  { name: 'Rudo Chikwanha', last: 'Great service, thank you!', time: '3 days ago', unread: 0 },
];

export default function MessagesScreen() {
  const router = useRouter();

  const go = (target: string) => {
    if (target === 'Dashboard') router.push('/(provider)/dashboard');
    else if (target === 'Orders') router.push('/(provider)/orders');
    else if (target === 'Services') router.push('/(provider)/services');
    else if (target === 'Revenue') router.push('/(provider)/revenue');
    else if (target === 'Profile') router.push('/(provider)/profile');
  };

  return (
    <Page bottom={<TabBar active="Dashboard" go={go} />}>
      <View style={s.ordersHeader}>
        <Text style={s.screenTitle}>Messages</Text>
        <View style={s.searchBar}>
          <Icon name="search" size={18} color={MUTED} />
          <TextInput style={s.searchInput} placeholder="Search conversations..." placeholderTextColor={MUTED} />
        </View>
      </View>

      <ScrollView style={s.flex} contentContainerStyle={s.listBody}>
        {CHATS.map((chat) => (
          <Pressable key={chat.name} onPress={() => router.push('/(provider)/chat')} style={s.chatRow}>
            <View style={s.chatAvatar}>
              <Text style={s.chatInitial}>{chat.name[0]}</Text>
            </View>
            <View style={s.chatInfo}>
              <View style={s.chatTop}>
                <Text style={s.chatName}>{chat.name}</Text>
                <Text style={s.chatTime}>{chat.time}</Text>
              </View>
              <Text style={s.chatLast} numberOfLines={1}>{chat.last}</Text>
            </View>
            {chat.unread > 0 && (
              <View style={s.chatBadge}>
                <Text style={s.chatBadgeText}>{chat.unread}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </Page>
  );
}

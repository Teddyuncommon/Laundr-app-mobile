import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Page, AppIcon, TabBar,
  styles, BLUE, INK, MUTED, FONT, SOFT,
} from '@/components/SharedUI';

type Conversation = {
  id: string;
  providerName: string;
  lastMessage: string;
  time: string;
  unread: boolean;
};

const CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    providerName: 'SwiftWash & Dry',
    lastMessage: 'Your order is ready for collection!',
    time: '10:45 AM',
    unread: true,
  },
  {
    id: '2',
    providerName: 'Sparkle Laundry Hub',
    lastMessage: 'We have picked up your laundry.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: '3',
    providerName: 'FreshFold Express',
    lastMessage: 'Thank you for your order! See you again.',
    time: 'Mon',
    unread: false,
  },
  {
    id: '4',
    providerName: 'Mt Pleasant Laundry',
    lastMessage: 'Your student bundle is ready!',
    time: 'Last week',
    unread: false,
  },
];

export default function MessagesScreen() {
  const router = useRouter();

  const go = (target: string) => {
    if (target === 'home') router.push('/(customer)/home');
    else if (target === 'search') router.push('/(customer)/search');
    else if (target === 'orders') router.push('/(customer)/orders');
    else if (target === 'chat') router.push('/(customer)/messages');
    else if (target === 'profile') router.push('/(customer)/profile');
  };

  const openChat = (convo: Conversation) => {
    router.push({ pathname: '/(customer)/chat', params: { name: convo.providerName } });
  };

  return (
    <Page bottom={<TabBar active="Messages" go={go} />}>
      <View style={{
        backgroundColor: '#fff',
        marginTop: 20,
        paddingTop: 24,
        paddingHorizontal: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e3e6eb',
      }}>
        <Text style={{
          fontFamily: FONT,
          fontSize: 24,
          fontWeight: '900',
          color: INK,
          letterSpacing: -0.8,
        }}>
          Messages
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 90 }}>
        {CONVERSATIONS.length === 0 ? (
          <View style={{ alignItems: 'center', paddingTop: 80 }}>
            <AppIcon name="chat_bubble_outline" size={48} color={MUTED} />
            <Text style={{ fontFamily: FONT, color: MUTED, fontSize: 16, marginTop: 16 }}>
              No messages yet
            </Text>
          </View>
        ) : (
          CONVERSATIONS.map(convo => (
            <Pressable
              key={convo.id}
              onPress={() => openChat(convo)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 14,
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#f0f2f5',
              }}
            >
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: convo.unread ? BLUE : SOFT,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{
                  fontFamily: FONT,
                  fontWeight: '900',
                  fontSize: 18,
                  color: convo.unread ? '#fff' : INK,
                }}>
                  {convo.providerName[0]}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{
                    fontFamily: FONT,
                    fontWeight: convo.unread ? '900' : '600',
                    fontSize: 15,
                    color: INK,
                  }}>
                    {convo.providerName}
                  </Text>
                  <Text style={{
                    fontFamily: FONT,
                    fontSize: 12,
                    color: convo.unread ? BLUE : MUTED,
                    fontWeight: convo.unread ? '700' : '400',
                  }}>
                    {convo.time}
                  </Text>
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: FONT,
                    fontSize: 14,
                    color: convo.unread ? INK : MUTED,
                    marginTop: 3,
                    fontWeight: convo.unread ? '600' : '400',
                  }}
                >
                  {convo.lastMessage}
                </Text>
              </View>

              {convo.unread && (
                <View style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: BLUE,
                }} />
              )}
            </Pressable>
          ))
        )}
      </ScrollView>
    </Page>
  );
}

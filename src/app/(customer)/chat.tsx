import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  Page, AppIcon, IconButton, BookingHeader,
  styles, BLUE, INK, MUTED, FONT,
} from '@/components/SharedUI';

type Message = {
  id: string;
  text: string;
  mine: boolean;
  time: string;
};

const INITIAL_MESSAGES: Message[] = [
  { id: '1', text: "Hi! I've received your order. We'll pick it up at 4 PM today.", mine: false, time: '10:30 AM' },
  { id: '2', text: 'Great, thank you! Please ring the gate bell.', mine: true, time: '10:32 AM' },
  { id: '3', text: 'Noted! See you then 👍', mine: false, time: '10:33 AM' },
];

export default function ChatScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: 'm-' + Date.now(),
      text: input.trim(),
      mine: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 'r-' + Date.now(),
        text: "Thanks for your message! We'll get back to you shortly.",
        mine: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }, 1500);
  };

  return (
    <Page>
      <BookingHeader
        title={name || 'Chat'}
        subtitle="Online"
        onBack={() => router.back()}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.chatBody}
        >
          <Text style={styles.today}>Today</Text>
          {messages.map(msg => (
            <View
              key={msg.id}
              style={[styles.message, msg.mine ? styles.mine : styles.theirs]}
            >
              <Text style={[styles.messageText, msg.mine && styles.mineText]}>
                {msg.text}
              </Text>
              <Text style={[styles.messageTime, msg.mine && { color: 'rgba(255,255,255,0.7)' }]}>
                {msg.time}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.composer}>
          <Pressable style={styles.attach}>
            <AppIcon name="attach_file" size={22} color={MUTED} />
          </Pressable>
          <TextInput
            style={styles.composerInput}
            placeholder="Type a message..."
            placeholderTextColor={MUTED}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <Pressable style={styles.sendButton} onPress={send}>
            <AppIcon name="send" size={20} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Page>
  );
}

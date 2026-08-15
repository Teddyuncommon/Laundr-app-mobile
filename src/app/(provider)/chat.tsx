import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Page, Header, Icon, s, BLUE, INK, MUTED } from '@/components/ProviderSharedUI';

type Message = {
  id: string;
  text: string;
  mine: boolean;
  time: string;
};

const INITIAL_MESSAGES: Message[] = [
  { id: '1', text: 'Hi, I just dropped off my laundry. When can I expect it to be ready?', mine: false, time: '08:15' },
  { id: '2', text: 'Hello! We received your order. It should be ready by tomorrow afternoon.', mine: true, time: '08:18' },
  { id: '3', text: 'Great! Can you please iron the two blue shirts separately?', mine: false, time: '08:20' },
  { id: '4', text: 'Absolutely! We will make a note of that. Anything else?', mine: true, time: '08:22' },
  { id: '5', text: 'Thanks! That is all.', mine: false, time: '08:24' },
];

export default function ChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: String(Date.now()),
      text: input.trim(),
      mine: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
  };

  return (
    <Page>
      <Header title="Anesu Marimo" subtitle="Online" onBack={() => router.back()} />
      <KeyboardAvoidingView
        style={s.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView style={s.flex} contentContainerStyle={s.chatBody}>
          {messages.map((msg) => (
            <View key={msg.id} style={[s.msg, msg.mine ? s.msgMine : s.msgTheirs]}>
              <Text style={[s.msgText, msg.mine && s.msgMineText]}>{msg.text}</Text>
              <Text style={[s.msgTime, msg.mine && { color: 'rgba(255,255,255,0.7)' }]}>{msg.time}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={s.composer}>
          <TextInput
            style={s.composerInput}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor={MUTED}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <Pressable style={s.sendBtn} onPress={sendMessage}>
            <Icon name="send" size={22} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Page>
  );
}

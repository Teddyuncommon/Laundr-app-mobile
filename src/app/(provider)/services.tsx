import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useData } from '@/contexts/DataContext';
import { Page, Icon, Btn, TabBar, s, money, BLUE, INK, MUTED } from '@/components/ProviderSharedUI';

export default function ServicesScreen() {
  const router = useRouter();
  const { providerServices, toggleService } = useData();
  const [search, setSearch] = useState('');

  const go = (target: string) => {
    if (target === 'Dashboard') router.push('/(provider)/dashboard');
    else if (target === 'Orders') router.push('/(provider)/orders');
    else if (target === 'Services') router.push('/(provider)/services');
    else if (target === 'Revenue') router.push('/(provider)/revenue');
    else if (target === 'Profile') router.push('/(provider)/profile');
  };

  const filtered = providerServices.filter((svc) =>
    svc.name.toLowerCase().includes(search.toLowerCase()) ||
    svc.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Page bottom={<TabBar active="Services" go={go} />}>
      <View style={s.ordersHeader}>
        <Text style={s.screenTitle}>Services</Text>
        <View style={s.searchBar}>
          <Icon name="search" size={18} color={MUTED} />
          <TextInput
            style={s.searchInput}
            placeholder="Search services..."
            placeholderTextColor={MUTED}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView style={s.flex} contentContainerStyle={s.listBody}>
        {filtered.map((svc) => (
          <View key={svc.id} style={s.serviceCard}>
            <View style={s.serviceCardTop}>
              <View style={s.serviceCardInfo}>
                <Text style={s.serviceCardName}>{svc.name}</Text>
                <Text style={s.serviceCardMeta}>{svc.category} - {svc.turnaround}</Text>
              </View>
              <Switch
                value={svc.enabled}
                onValueChange={() => toggleService(svc.id)}
                trackColor={{ true: BLUE, false: '#e0e4e9' }}
              />
            </View>
            <Text style={s.serviceCardDesc}>{svc.description}</Text>
            <View style={s.serviceCardBottom}>
              <Text style={s.serviceCardPrice}>
                {money(svc.price)}<Text style={s.serviceCardUnit}> / {svc.unit}</Text>
              </Text>
            </View>
          </View>
        ))}

        <Btn
          label="Add New Service"
          onPress={() => router.push('/(provider)/add-service')}
          style={s.addBtn}
        />
      </ScrollView>
    </Page>
  );
}

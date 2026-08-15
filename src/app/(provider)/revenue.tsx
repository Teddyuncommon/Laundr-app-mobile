import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useData } from '@/contexts/DataContext';
import { Page, Icon, StatCard, SectionHead, TabBar, s, money, BLUE, MUTED, GREEN, ORANGE } from '@/components/ProviderSharedUI';

export default function RevenueScreen() {
  const router = useRouter();
  const { providerEarnings } = useData();

  const go = (target: string) => {
    if (target === 'Dashboard') router.push('/(provider)/dashboard');
    else if (target === 'Orders') router.push('/(provider)/orders');
    else if (target === 'Services') router.push('/(provider)/services');
    else if (target === 'Revenue') router.push('/(provider)/revenue');
    else if (target === 'Profile') router.push('/(provider)/profile');
  };

  const total = providerEarnings.reduce((sum, e) => sum + e.amount, 0);
  const pending = providerEarnings.filter(e => e.status === 'Pending').reduce((sum, e) => sum + e.amount, 0);
  const completed = providerEarnings.filter(e => e.status === 'Completed').reduce((sum, e) => sum + e.amount, 0);

  return (
    <Page bottom={<TabBar active="Revenue" go={go} />}>
      <ScrollView style={s.flex} contentContainerStyle={s.dashBody}>
        <Text style={s.screenTitle}>Revenue</Text>

        <View style={s.statGrid}>
          <StatCard label="Total Earnings" value={money(total)} icon="account_balance_wallet" color={GREEN} />
          <StatCard label="Pending Payouts" value={money(pending)} icon="schedule" color={ORANGE} />
          <StatCard label="Completed" value={money(completed)} icon="check_circle" color={BLUE} />
          <StatCard label="This Week" value={money(total * 0.4)} icon="trending_up" color={GREEN} />
        </View>

        {/* Revenue Chart */}
        <View style={s.chartCard}>
          <Text style={s.chartTitle}>Revenue Trend</Text>
          <View style={s.chartBars}>
            {[45, 62, 38, 78, 55, 90, 68].map((h, i) => (
              <View key={i} style={s.chartBarCol}>
                <View style={[s.chartBar, { height: h }]} />
                <Text style={s.chartBarLabel}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu Links */}
        <SectionHead title="Quick Links" />
        <Pressable onPress={() => router.push('/(provider)/earnings')} style={s.menuRow}>
          <Icon name="payments" size={22} color={BLUE} />
          <Text style={s.menuRowText}>Earnings & Payouts</Text>
          <Icon name="chevron_right" size={20} color={MUTED} />
        </Pressable>
        <Pressable onPress={() => router.push('/(provider)/analytics')} style={s.menuRow}>
          <Icon name="bar_chart" size={22} color={BLUE} />
          <Text style={s.menuRowText}>Analytics & Insights</Text>
          <Icon name="chevron_right" size={20} color={MUTED} />
        </Pressable>
      </ScrollView>
    </Page>
  );
}

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Page, Header, s, BLUE, INK, MUTED } from '@/components/ProviderSharedUI';

const POPULAR_SERVICES = [
  { name: 'Wash & Fold', pct: 38 },
  { name: 'Wash & Iron', pct: 28 },
  { name: 'Dry Cleaning', pct: 18 },
  { name: 'Duvet', pct: 10 },
  { name: 'Student', pct: 6 },
];

const PERFORMANCE = [
  { label: 'Average Turnaround', value: '22 hrs' },
  { label: 'On-time Delivery', value: '94%' },
  { label: 'Order Acceptance', value: '98%' },
  { label: 'Repeat Customers', value: '67%' },
  { label: 'Orders This Month', value: '48' },
  { label: 'Avg. Order Value', value: 'US$18.50' },
];

export default function AnalyticsScreen() {
  const router = useRouter();

  return (
    <Page>
      <Header title="Analytics" onBack={() => router.push('/(provider)/revenue')} />
      <ScrollView style={s.flex} contentContainerStyle={s.dashBody}>
        {/* Popular Services */}
        <View style={s.analyticsCard}>
          <Text style={s.analyticsTitle}>Popular Services</Text>
          {POPULAR_SERVICES.map((svc) => (
            <View key={svc.name} style={s.popularRow}>
              <Text style={s.popularName}>{svc.name}</Text>
              <View style={s.popularBar}>
                <View style={[s.popularFill, { width: `${svc.pct}%` }]} />
              </View>
              <Text style={s.popularPct}>{svc.pct}%</Text>
            </View>
          ))}
        </View>

        {/* Customer Satisfaction */}
        <View style={s.analyticsCard}>
          <Text style={s.analyticsTitle}>Customer Satisfaction</Text>
          <View style={s.satisfactionRow}>
            <Text style={s.satisfactionScore}>4.9</Text>
            <Text style={s.satisfactionLabel}>/ 5.0</Text>
          </View>
          <Text style={s.satisfactionDetail}>Based on 212 reviews - 95% positive</Text>
        </View>

        {/* Performance Metrics */}
        <View style={s.analyticsCard}>
          <Text style={s.analyticsTitle}>Performance Metrics</Text>
          {PERFORMANCE.map((item) => (
            <View key={item.label} style={s.perfRow}>
              <Text style={s.perfLabel}>{item.label}</Text>
              <Text style={s.perfValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Page>
  );
}

import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useData } from '@/contexts/DataContext';
import { Page, Icon, StatCard, SectionHead, Pill, TabBar, s, statusColor, money, BLUE, INK, MUTED, GREEN, ORANGE } from '@/components/ProviderSharedUI';

export default function DashboardScreen() {
  const router = useRouter();
  const { providerOrders, providerNotifications, providerEarnings, providerProfile } = useData();

  const go = (target: string) => {
    if (target === 'Dashboard') router.push('/(provider)/dashboard');
    else if (target === 'Orders') router.push('/(provider)/orders');
    else if (target === 'Services') router.push('/(provider)/services');
    else if (target === 'Revenue') router.push('/(provider)/revenue');
    else if (target === 'Profile') router.push('/(provider)/profile');
  };

  const unreadCount = providerNotifications.filter(n => !n.read).length;
  const pendingOrders = providerOrders.filter(o => o.status === 'Pending');
  const activeOrders = providerOrders.filter(o => !['Completed', 'Cancelled', 'Pending'].includes(o.status));
  const todayEarnings = providerEarnings.filter(e => e.date === 'Today').reduce((sum, e) => sum + e.amount, 0);
  const monthlyTotal = providerEarnings.reduce((sum, e) => sum + e.amount, 0);
  const recentOrders = providerOrders.slice(0, 3);

  return (
    <Page bottom={<TabBar active="Dashboard" go={go} />}>
      <ScrollView style={s.flex} contentContainerStyle={s.dashBody}>
        {/* Header */}
        <View style={s.dashHeader}>
          <View>
            <Text style={s.dashGreeting}>Welcome back,</Text>
            <Text style={s.dashName}>{providerProfile.name}</Text>
          </View>
          <Pressable style={s.notifBtn} onPress={() => router.push('/(provider)/notifications')}>
            <Icon name="notifications" size={24} color={BLUE} />
            {unreadCount > 0 && (
              <View style={s.notifBadge}>
                <Text style={s.notifBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Stats */}
        <View style={s.statGrid}>
          <StatCard label="Today's Earnings" value={money(todayEarnings)} icon="payments" color={GREEN} />
          <StatCard label="Pending Orders" value={String(pendingOrders.length)} icon="pending_actions" color={ORANGE} />
          <StatCard label="Active Orders" value={String(activeOrders.length)} icon="local_laundry_service" color={BLUE} />
        </View>

        {/* Revenue Progress */}
        <View style={s.revenueCard}>
          <View style={s.revenueTop}>
            <Text style={s.revenueLabel}>Monthly Revenue</Text>
            <Icon name="trending_up" size={20} color={GREEN} />
          </View>
          <Text style={s.revenueAmount}>{money(monthlyTotal)}</Text>
          <View style={s.revenueBar}>
            <View style={[s.revenueFill, { width: `${Math.min((monthlyTotal / 500) * 100, 100)}%` }]} />
          </View>
          <Text style={s.revenueGoal}>Goal: US$500.00</Text>
        </View>

        {/* Quick Actions */}
        <SectionHead title="Quick Actions" />
        <View style={s.quickActions}>
          <Pressable style={s.quickAction} onPress={() => router.push('/(provider)/orders')}>
            <View style={s.quickActionIcon}><Icon name="inventory_2" size={24} color={BLUE} /></View>
            <Text style={s.quickActionLabel}>Orders</Text>
          </Pressable>
          <Pressable style={s.quickAction} onPress={() => router.push('/(provider)/messages')}>
            <View style={s.quickActionIcon}><Icon name="chat" size={24} color={BLUE} /></View>
            <Text style={s.quickActionLabel}>Messages</Text>
          </Pressable>
          <Pressable style={s.quickAction} onPress={() => router.push('/(provider)/analytics')}>
            <View style={s.quickActionIcon}><Icon name="analytics" size={24} color={BLUE} /></View>
            <Text style={s.quickActionLabel}>Analytics</Text>
          </Pressable>
          <Pressable style={s.quickAction} onPress={() => router.push('/(provider)/settings')}>
            <View style={s.quickActionIcon}><Icon name="settings" size={24} color={BLUE} /></View>
            <Text style={s.quickActionLabel}>Settings</Text>
          </Pressable>
        </View>

        {/* Recent Orders */}
        <SectionHead title="Recent Orders" action="View All" onAction={() => router.push('/(provider)/orders')} />
        {recentOrders.map((order) => (
          <Pressable
            key={order.id}
            style={s.orderCard}
            onPress={() => router.push({ pathname: '/(provider)/order-detail', params: { id: order.id } })}
          >
            <View style={s.orderCardTop}>
              <View>
                <Text style={s.orderCardService}>{order.service}</Text>
                <Text style={s.orderCardCustomer}>{order.customer} - {order.load} kg</Text>
              </View>
              <Pill label={order.status} color={statusColor(order.status)} />
            </View>
            <View style={s.orderCardBottom}>
              <Text style={s.orderCardSlot}>{order.slot}</Text>
              <Text style={s.orderCardTotal}>{money(order.total)}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </Page>
  );
}

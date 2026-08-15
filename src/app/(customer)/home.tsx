import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useBooking } from '@/contexts/BookingContext';
import {
  Page, AppIcon, SectionTitle, Pill, TabBar,
  styles, money, BLUE, INK, MUTED, SOFT, FONT,
} from '@/components/SharedUI';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { providers, orders } = useData();
  const { setSelectedOrder, selectProvider } = useBooking();

  const go = (target: string) => {
    if (target === 'home') router.push('/(customer)/home');
    else if (target === 'search') router.push('/(customer)/search');
    else if (target === 'orders') router.push('/(customer)/orders');
    else if (target === 'chat') router.push('/(customer)/messages');
    else if (target === 'profile') router.push('/(customer)/profile');
  };

  const activeOrders = orders.filter(o => o.status !== 'Ready');
  const featured = providers.slice(0, 3);
  const nearby = providers.slice(3, 5);

  return (
    <Page scroll bottom={<TabBar active="Home" go={go} />}>
      <View style={styles.homeContent}>
        {/* Header */}
        <View style={styles.homeHeader}>
          <View style={styles.homeHeaderTop}>
            <View style={styles.homeHeaderLeft}>
              <Text style={styles.homeGreeting}>Hi, {user?.firstName || 'there'}!</Text>
              <View style={styles.homeLocationRow}>
                <AppIcon name="location_on" size={16} color={MUTED} />
                <Text style={styles.homeLocationText}>Mt Pleasant, Harare</Text>
              </View>
            </View>
            <View style={styles.homeNotificationButton}>
              <AppIcon name="notifications_none" size={22} color={INK} />
              <View style={styles.homeNotificationBadge} />
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <Pressable onPress={() => router.push('/(customer)/search')} style={styles.homeSearchBar}>
          <AppIcon name="search" size={20} color={MUTED} />
          <Text style={styles.homeSearchPlaceholder}>Search laundry providers...</Text>
        </Pressable>

        {/* Active Orders */}
        {activeOrders.length > 0 && (
          <>
            <SectionTitle title="Active Orders" action="View all" onAction={() => router.push('/(customer)/orders')} />
            {activeOrders.map(order => (
              <Pressable
                key={order.id}
                style={styles.activeOrderCard}
                onPress={() => {
                  setSelectedOrder(order);
                  router.push('/(customer)/track');
                }}
              >
                <View style={styles.activeOrderTop}>
                  <View>
                    <Text style={styles.activeOrderService}>{order.service}</Text>
                    <Text style={styles.activeOrderProvider}>{order.provider}</Text>
                  </View>
                  <Pill label={order.status} />
                </View>
                <View style={styles.activeOrderBottom}>
                  <Text style={styles.activeOrderSlot}>{order.slot}</Text>
                  <Text style={styles.activeOrderTotal}>{money(order.total)}</Text>
                </View>
              </Pressable>
            ))}
          </>
        )}

        {/* Promo Card */}
        <View style={styles.promoCard}>
          <Text style={styles.promoLabel}>STUDENT FRIDAY</Text>
          <Text style={styles.promoTitle}>Free campus pickup at UZ & HIT</Text>
          <Text style={styles.promoCopy}>Book any service this Friday and get free pickup from your campus residence.</Text>
          <Pressable style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Claim offer</Text>
          </Pressable>
        </View>

        {/* Featured Providers */}
        <SectionTitle title="Featured Providers" action="See all" onAction={() => router.push('/(customer)/search')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredScroll}>
          {featured.map(provider => (
            <Pressable
              key={provider.id}
              style={styles.featuredCard}
              onPress={() => {
                selectProvider(provider);
                router.push('/(customer)/provider');
              }}
            >
              <Image source={{ uri: provider.image }} style={styles.featuredImage} />
              <View style={styles.featuredInfo}>
                <View style={styles.featuredNameRow}>
                  <Text style={styles.featuredName}>{provider.name}</Text>
                  <Text style={styles.featuredRating}>★ {provider.rating}</Text>
                </View>
                <Text style={styles.featuredMeta}>{provider.neighbourhood} · {provider.distance} km · {provider.turnaround}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* Nearby Providers */}
        <SectionTitle title="Nearby Providers" action="See all" onAction={() => router.push('/(customer)/search')} />
        {nearby.map(provider => (
          <Pressable
            key={provider.id}
            style={styles.nearbyCard}
            onPress={() => {
              selectProvider(provider);
              router.push('/(customer)/provider');
            }}
          >
            <Image source={{ uri: provider.image }} style={styles.featuredImage} />
            <View style={styles.featuredInfo}>
              <View style={styles.featuredNameRow}>
                <Text style={styles.featuredName}>{provider.name}</Text>
                <Text style={styles.featuredRating}>★ {provider.rating}</Text>
              </View>
              <Text style={styles.featuredMeta}>{provider.neighbourhood} · {provider.distance} km · {provider.turnaround}</Text>
            </View>
          </Pressable>
        ))}

        <Pressable onPress={() => router.push('/(customer)/search')} style={styles.viewMoreButton}>
          <Text style={styles.viewMoreText}>View all providers</Text>
          <AppIcon name="arrow_forward" size={18} color={BLUE} />
        </Pressable>
      </View>
    </Page>
  );
}

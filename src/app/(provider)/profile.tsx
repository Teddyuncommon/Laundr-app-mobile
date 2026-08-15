import React from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useData } from '@/contexts/DataContext';
import { Page, Icon, Btn, Pill, TabBar, s, BLUE, INK, MUTED, GREEN } from '@/components/ProviderSharedUI';

export default function ProfileScreen() {
  const router = useRouter();
  const { providerProfile } = useData();
  const p = providerProfile;

  const go = (target: string) => {
    if (target === 'Dashboard') router.push('/(provider)/dashboard');
    else if (target === 'Orders') router.push('/(provider)/orders');
    else if (target === 'Services') router.push('/(provider)/services');
    else if (target === 'Revenue') router.push('/(provider)/revenue');
    else if (target === 'Profile') router.push('/(provider)/profile');
  };

  return (
    <Page bottom={<TabBar active="Profile" go={go} />}>
      <ScrollView style={s.flex} contentContainerStyle={s.profileBody}>
        {/* Cover & Avatar */}
        <Image source={{ uri: p.coverImage }} style={s.profileCover} />
        <View style={s.profileMain}>
          <Image source={{ uri: p.image }} style={s.profileAvatar} />
          <View style={s.profileInfo}>
            <Text style={s.profileName}>{p.name}</Text>
            <Text style={s.profileMeta}>{p.city} - {p.businessType}</Text>
            <View style={s.profileRatingRow}>
              <Text style={s.profileRating}>★ {p.rating}</Text>
              <Text style={s.profileReviews}>({p.reviewCount} reviews)</Text>
            </View>
            {p.verified && <Pill label="VERIFIED" color={GREEN} />}
          </View>
        </View>

        {/* About */}
        <View style={s.profileCard}>
          <Text style={s.profileCardTitle}>About</Text>
          <Text style={s.profileCardText}>{p.description}</Text>
        </View>

        {/* Contact */}
        <View style={s.profileCard}>
          <Text style={s.profileCardTitle}>Contact</Text>
          <View style={s.profileDetailRow}>
            <Icon name="mail" size={18} color={BLUE} />
            <Text style={s.profileDetailText}>{p.email}</Text>
          </View>
          <View style={s.profileDetailRow}>
            <Icon name="phone" size={18} color={BLUE} />
            <Text style={s.profileDetailText}>{p.phone}</Text>
          </View>
          <View style={s.profileDetailRow}>
            <Icon name="location_on" size={18} color={BLUE} />
            <Text style={s.profileDetailText}>{p.address}, {p.city}</Text>
          </View>
        </View>

        {/* Operating Hours */}
        <View style={s.profileCard}>
          <Text style={s.profileCardTitle}>Operating Hours</Text>
          {p.operatingHours.map((h) => (
            <View key={h.day} style={s.hoursRow}>
              <Text style={s.hoursDay}>{h.day}</Text>
              <Text style={h.closed ? s.availClosed : s.hoursTime}>
                {h.closed ? 'Closed' : `${h.open} - ${h.close}`}
              </Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={s.profileActions}>
          <Btn label="Edit Profile" onPress={() => Alert.alert('Edit Profile', 'Coming soon')} style={s.profileBtn} />
          <Btn label="Gallery" onPress={() => Alert.alert('Gallery', 'Coming soon')} secondary style={s.profileBtn} />
          <Btn label="Availability" onPress={() => Alert.alert('Availability', 'Coming soon')} secondary style={s.profileBtn} />
        </View>
      </ScrollView>
    </Page>
  );
}

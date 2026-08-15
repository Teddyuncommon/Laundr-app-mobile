import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useBooking } from '@/contexts/BookingContext';
import {
  Page, IconButton, Pill, SectionHeading, ServiceInfo, BottomButton,
  styles, BLUE, INK, MUTED, FONT,
} from '@/components/SharedUI';
import { serviceCatalog } from '@/data/laundr-api';

export default function ProviderScreen() {
  const router = useRouter();
  const { selectedProvider } = useBooking();

  if (!selectedProvider) {
    return (
      <Page>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: FONT, color: MUTED, fontSize: 16 }}>No provider selected</Text>
        </View>
      </Page>
    );
  }

  const providerServices = serviceCatalog.filter(s =>
    selectedProvider.services.some(ps => ps.toLowerCase().includes(s.name.toLowerCase().split(' ')[0]))
  );

  const iconMap: Record<string, string> = {
    wash: 'local_laundry_service',
    iron: 'iron',
    duvet: 'bed',
    dry: 'dry_cleaning',
    student: 'school',
  };

  return (
    <Page
      scroll
      bottom={<BottomButton label="Book Now" onPress={() => router.push('/(customer)/service')} />}
    >
      {/* Hero Image */}
      <Image source={{ uri: selectedProvider.image }} style={styles.heroImage} />

      {/* Back button overlay */}
      <View style={{ position: 'absolute', top: 50, left: 16, zIndex: 10 }}>
        <IconButton
          name="arrow_back"
          onPress={() => router.back()}
          style={{ backgroundColor: '#fff', borderRadius: 22, width: 44, height: 44 }}
        />
      </View>

      {/* Provider Intro Card */}
      <View style={styles.providerIntro}>
        <Pill label="VERIFIED" />
        <Text style={styles.providerName}>{selectedProvider.name}</Text>
        <View style={styles.providerMeta}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.metaStrong}> {selectedProvider.rating}</Text>
          <Text style={{ fontFamily: FONT, color: '#4e596c', fontSize: 14 }}>
            {' '}· {selectedProvider.distance} km away
          </Text>
        </View>
        <Text style={styles.turnaround}>{selectedProvider.turnaround} turnaround</Text>
      </View>

      {/* Services */}
      <SectionHeading title="Services" />
      {providerServices.map(service => (
        <ServiceInfo
          key={service.key}
          service={service.name}
          detail={
            service.key === 'wash' ? 'Includes sorting, washing, and professional folding' :
            service.key === 'iron' ? 'Crisp steam ironing for all garment types' :
            service.key === 'dry' ? 'Eco-friendly solvents for delicate fabrics' :
            service.key === 'duvet' ? 'Deep wash and fluff for large items' :
            'Affordable student laundry packs'
          }
          price={service.price}
          unit={service.unit.replace('per ', '')}
          icon={iconMap[service.key] || 'local_laundry_service'}
        />
      ))}

      {/* About */}
      <SectionHeading title="About" />
      <View style={styles.aboutCard}>
        <Text style={styles.aboutText}>
          At {selectedProvider.name}, we treat your garments like our own. With years of experience
          in textile care, we use state-of-the-art machinery and eco-conscious detergents to ensure
          your clothes return brighter, softer, and perfectly pressed.
        </Text>
      </View>

      {/* Area / Map */}
      <SectionHeading title="Service Area" />
      <View style={styles.areaCard}>
        <Text style={styles.areaTitle}>{selectedProvider.neighbourhood}</Text>
        <Text style={styles.addressPill}>{selectedProvider.address}</Text>
        <View style={styles.mapArea}>
          <Text style={styles.mapHome}>⌂</Text>
        </View>
      </View>

      {/* Hours */}
      <View style={styles.hoursCard}>
        <Text style={styles.hoursTitle}>Operating Hours</Text>
        <Text style={styles.hoursText}>
          Mon - Sat: 08:00 AM - 07:00 PM{'\n'}Sun: 10:00 AM - 04:00 PM
        </Text>
      </View>
    </Page>
  );
}

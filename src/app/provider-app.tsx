import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  providerProfile,
  providerServices,
  providerOrders,
  providerEarnings,
  providerNotifications,
  type ProviderOrder,
  type ProviderService,
  type ProviderProfile,
  type ProviderOrderStatus,
  type ProviderNotification,
} from '@/data/laundr-api';

const BLUE = '#0967ce';
const BLUE_DARK = '#0756b3';
const INK = '#202124';
const MUTED = '#687284';
const PAGE = '#f6f8fc';
const CARD = '#ffffff';
const SOFT = '#f0f3f8';
const GREEN = '#22a861';
const RED = '#dc3545';
const ORANGE = '#f5820d';
const FONT = Platform.select({
  ios: 'Avenir LT Std',
  android: 'Avenir LT Std',
  web: "'Avenir LT Std', 'Avenir Next', Arial, sans-serif",
});

type ProviderScreen =
  | 'onboard1' | 'onboard2' | 'onboard3' | 'onboard4' | 'onboard5' | 'onboard6'
  | 'dashboard' | 'orders' | 'orderDetail' | 'activeOrders' | 'completedOrders'
  | 'services' | 'addService' | 'editService'
  | 'revenue' | 'earnings' | 'analytics'
  | 'profile' | 'editProfile' | 'gallery' | 'availability'
  | 'messages' | 'provChat' | 'notifications'
  | 'settings' | 'support';

export default function ProviderApp({ onLogout }: { onLogout: () => void }) {
  const [screen, setScreen] = useState<ProviderScreen>('dashboard');
  const [selectedOrder, setSelectedOrder] = useState<ProviderOrder>(providerOrders[0]);
  const [selectedService, setSelectedService] = useState<ProviderService>(providerServices[0]);
  const [services, setServices] = useState<ProviderService[]>(providerServices);
  const [notifs, setNotifs] = useState<ProviderNotification[]>(providerNotifications);

  const go = (s: ProviderScreen) => setScreen(s);

  let content: React.ReactNode;
  if (screen === 'onboard1') content = <Onboard1 go={go} />;
  else if (screen === 'onboard2') content = <Onboard2 go={go} />;
  else if (screen === 'onboard3') content = <Onboard3 go={go} />;
  else if (screen === 'onboard4') content = <Onboard4 go={go} />;
  else if (screen === 'onboard5') content = <Onboard5 go={go} />;
  else if (screen === 'onboard6') content = <Onboard6 go={go} />;
  else if (screen === 'dashboard') content = <Dashboard go={go} />;
  else if (screen === 'orders') content = <OrdersScreen go={go} select={(o) => { setSelectedOrder(o); go('orderDetail'); }} />;
  else if (screen === 'orderDetail') content = <OrderDetail go={go} order={selectedOrder} />;
  else if (screen === 'activeOrders') content = <ActiveOrders go={go} select={(o) => { setSelectedOrder(o); go('orderDetail'); }} />;
  else if (screen === 'completedOrders') content = <CompletedOrders go={go} select={(o) => { setSelectedOrder(o); go('orderDetail'); }} />;
  else if (screen === 'services') content = <ServicesScreen go={go} services={services} setServices={setServices} select={(s) => { setSelectedService(s); go('editService'); }} />;
  else if (screen === 'addService') content = <AddService go={go} onSave={(s) => { setServices([...services, s]); go('services'); }} />;
  else if (screen === 'editService') content = <EditService go={go} service={selectedService} onSave={(s) => { setServices(services.map((x) => x.id === s.id ? s : x)); go('services'); }} />;
  else if (screen === 'revenue') content = <RevenueScreen go={go} />;
  else if (screen === 'earnings') content = <EarningsScreen go={go} />;
  else if (screen === 'analytics') content = <AnalyticsScreen go={go} />;
  else if (screen === 'profile') content = <ProfileScreen go={go} />;
  else if (screen === 'editProfile') content = <EditProfileScreen go={go} />;
  else if (screen === 'gallery') content = <GalleryScreen go={go} />;
  else if (screen === 'availability') content = <AvailabilityScreen go={go} />;
  else if (screen === 'messages') content = <MessagesScreen go={go} />;
  else if (screen === 'provChat') content = <ProvChatScreen go={go} />;
  else if (screen === 'notifications') content = <NotificationsScreen go={go} notifs={notifs} setNotifs={setNotifs} />;
  else if (screen === 'settings') content = <SettingsScreen go={go} onLogout={onLogout} />;
  else content = <SupportScreen go={go} />;

  return content;
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function Page({ children, bottom, style }: { children: React.ReactNode; bottom?: React.ReactNode; style?: object }) {
  return <SafeAreaView style={[s.page, style]}><StatusBar style="dark" />{children}{bottom}</SafeAreaView>;
}
function Icon({ name, size, color }: { name: string; size: number; color: string }) { return <SymbolView name={{ ios: name as never, android: name as never, web: name as never }} size={size} tintColor={color} />; }
function IconBtn({ name, onPress, style }: { name: string; onPress: () => void; style?: object }) { return <Pressable onPress={onPress} hitSlop={12} style={[s.iconBtn, style]}><Icon name={name} size={24} color={BLUE} /></Pressable>; }
function Header({ title, subtitle, onBack, right }: { title: string; subtitle?: string; onBack: () => void; right?: React.ReactNode }) { return <View style={s.header}><IconBtn name="arrow_back" onPress={onBack} style={s.headerBack} /><View style={s.headerText}><Text style={s.headerTitle}>{title}</Text>{subtitle && <Text style={s.headerSub}>{subtitle}</Text>}</View>{right}</View>; }
function Btn({ label, onPress, style, secondary }: { label: string; onPress: () => void; style?: object; secondary?: boolean }) { return <Pressable onPress={onPress} style={({ pressed }) => [secondary ? s.btnSec : s.btn, style, pressed && s.pressed]}><Text style={secondary ? s.btnSecText : s.btnText}>{label}</Text></Pressable>; }
function BottomBtn({ label, onPress }: { label: string; onPress: () => void }) { return <View style={s.bottomBtn}><Btn label={label} onPress={onPress} /></View>; }
function StatCard({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) { return <View style={s.statCard}><View style={[s.statIcon, { backgroundColor: color + '18' }]}><Icon name={icon} size={22} color={color} /></View><Text style={s.statValue}>{value}</Text><Text style={s.statLabel}>{label}</Text></View>; }
function SectionHead({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) { return <View style={s.sectionHead}><Text style={s.sectionHeadText}>{title}</Text>{action && <Pressable onPress={onAction}><Text style={s.sectionAction}>{action}</Text></Pressable>}</View>; }
function Pill({ label, color }: { label: string; color?: string }) { const c = color || BLUE; return <View style={[s.pill, { backgroundColor: c + '15' }]}><Text style={[s.pillText, { color: c }]}>{label}</Text></View>; }
function InputField({ label, value, onChangeText, placeholder, multiline }: { label: string; value: string; onChangeText: (t: string) => void; placeholder?: string; multiline?: boolean }) { return <View style={s.inputGroup}><Text style={s.inputLabel}>{label}</Text><TextInput style={[s.input, multiline && s.inputMulti]} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={MUTED} multiline={multiline} /></View>; }
function TabBar({ active, go }: { active: string; go: (s: ProviderScreen) => void }) {
  const tabs: [string, string, ProviderScreen][] = [['Dashboard', 'dashboard', 'dashboard'], ['Orders', 'inventory_2', 'orders'], ['Services', 'local_laundry_service', 'services'], ['Revenue', 'account_balance_wallet', 'revenue'], ['Profile', 'person_outline', 'profile']];
  return <View style={s.tabBar}>{tabs.map(([label, icon, target]) => <Pressable key={label} onPress={() => go(target)} style={s.tab}><Icon name={icon} size={22} color={active === label ? BLUE : '#8da0bb'} /><Text style={[s.tabText, active === label && s.tabActive]}>{label}</Text></Pressable>)}</View>;
}

function statusColor(status: ProviderOrderStatus) {
  if (status === 'Completed') return GREEN;
  if (status === 'Cancelled') return RED;
  if (status === 'Pending') return ORANGE;
  return BLUE;
}

function money(v: number) { return `US$${v.toFixed(2)}`; }

// ─── ONBOARDING ───────────────────────────────────────────────────────────────

function Onboard1({ go }: { go: (s: ProviderScreen) => void }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('Laundry & Dry Cleaning');
  const [category, setCategory] = useState('Premium');
  const [regNum, setRegNum] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  return <Page bottom={<BottomBtn label="Continue" onPress={() => go('onboard2')} />}>
    <Header title="Business Registration" subtitle="Step 1 of 6" onBack={() => go('dashboard')} />
    <ScrollView contentContainerStyle={s.formBody}>
      <Text style={s.formIntro}>Tell us about your business to get started.</Text>
      <InputField label="Business Name" value={name} onChangeText={setName} placeholder="e.g. SwiftWash & Dry" />
      <InputField label="Business Type" value={type} onChangeText={setType} placeholder="e.g. Laundry & Dry Cleaning" />
      <InputField label="Business Category" value={category} onChangeText={setCategory} placeholder="e.g. Premium, Budget" />
      <InputField label="Registration Number (optional)" value={regNum} onChangeText={setRegNum} placeholder="e.g. ZW-2019-44821" />
      <InputField label="Business Email" value={email} onChangeText={setEmail} placeholder="hello@yourbusiness.co.zw" />
      <InputField label="Business Phone" value={phone} onChangeText={setPhone} placeholder="+263 77 000 0000" />
    </ScrollView>
  </Page>;
}

function Onboard2({ go }: { go: (s: ProviderScreen) => void }) {
  const [desc, setDesc] = useState('');
  const [years, setYears] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  return <Page bottom={<BottomBtn label="Continue" onPress={() => go('onboard3')} />}>
    <Header title="Business Information" subtitle="Step 2 of 6" onBack={() => go('onboard1')} />
    <ScrollView contentContainerStyle={s.formBody}>
      <Text style={s.formIntro}>Help customers understand what you offer.</Text>
      <InputField label="Business Description" value={desc} onChangeText={setDesc} placeholder="Describe your services..." multiline />
      <InputField label="Years of Experience" value={years} onChangeText={setYears} placeholder="e.g. 10" />
      <Pressable style={s.uploadBox}><Icon name="add_photo_alternate" size={32} color={MUTED} /><Text style={s.uploadText}>Upload Logo</Text></Pressable>
      <Pressable style={s.uploadBox}><Icon name="panorama" size={32} color={MUTED} /><Text style={s.uploadText}>Upload Cover Image</Text></Pressable>
      <InputField label="Physical Address" value={address} onChangeText={setAddress} placeholder="Street address" />
      <InputField label="City" value={city} onChangeText={setCity} placeholder="e.g. Harare" />
      <InputField label="Province / State" value={province} onChangeText={setProvince} placeholder="e.g. Harare Metropolitan" />
    </ScrollView>
  </Page>;
}

function Onboard3({ go }: { go: (s: ProviderScreen) => void }) {
  const [radius, setRadius] = useState('8');
  const [cities, setCities] = useState(['Harare']);
  const allCities = ['Harare', 'Chitungwiza', 'Bulawayo', 'Mutare', 'Gweru'];
  const toggle = (c: string) => setCities(cities.includes(c) ? cities.filter((x) => x !== c) : [...cities, c]);
  return <Page bottom={<BottomBtn label="Continue" onPress={() => go('onboard4')} />}>
    <Header title="Service Area" subtitle="Step 3 of 6" onBack={() => go('onboard2')} />
    <ScrollView contentContainerStyle={s.formBody}>
      <Text style={s.formIntro}>Define where you can serve customers.</Text>
      <Text style={s.inputLabel}>Cities Served</Text>
      <View style={s.chipRow}>{allCities.map((c) => <Pressable key={c} onPress={() => toggle(c)} style={[s.chipOption, cities.includes(c) && s.chipOptionActive]}><Text style={[s.chipOptionText, cities.includes(c) && s.chipOptionTextActive]}>{c}</Text></Pressable>)}</View>
      <InputField label="Service Radius (km)" value={radius} onChangeText={setRadius} placeholder="e.g. 10" />
      <View style={s.toggleRow}><Text style={s.toggleLabel}>Enable Pickup Areas</Text><Switch value={true} trackColor={{ true: BLUE }} /></View>
      <View style={s.toggleRow}><Text style={s.toggleLabel}>Enable Delivery Areas</Text><Switch value={true} trackColor={{ true: BLUE }} /></View>
      <View style={s.mapPlaceholder}><Icon name="map" size={48} color={MUTED} /><Text style={s.mapPlaceholderText}>Map Preview</Text></View>
    </ScrollView>
  </Page>;
}

function Onboard4({ go }: { go: (s: ProviderScreen) => void }) {
  const [minOrder, setMinOrder] = useState('5');
  const [expressFee, setExpressFee] = useState('3');
  const [discount, setDiscount] = useState('10');
  return <Page bottom={<BottomBtn label="Continue" onPress={() => go('onboard5')} />}>
    <Header title="Pricing Setup" subtitle="Step 4 of 6" onBack={() => go('onboard3')} />
    <ScrollView contentContainerStyle={s.formBody}>
      <Text style={s.formIntro}>Configure your service pricing.</Text>
      {providerServices.slice(0, 4).map((svc) => (
        <View key={svc.id} style={s.pricingRow}>
          <View style={s.pricingInfo}><Text style={s.pricingName}>{svc.name}</Text><Text style={s.pricingUnit}>{svc.unit}</Text></View>
          <View style={s.pricingInput}><Text style={s.pricingCurrency}>US$</Text><TextInput style={s.pricingValue} defaultValue={String(svc.price)} keyboardType="numeric" /></View>
        </View>
      ))}
      <InputField label="Minimum Order Amount (US$)" value={minOrder} onChangeText={setMinOrder} placeholder="5" />
      <InputField label="Express Service Fee (US$)" value={expressFee} onChangeText={setExpressFee} placeholder="3" />
      <InputField label="Discount (%)" value={discount} onChangeText={setDiscount} placeholder="e.g. 10" />
    </ScrollView>
  </Page>;
}

function Onboard5({ go }: { go: (s: ProviderScreen) => void }) {
  const [pickupFee, setPickupFee] = useState('2');
  const [deliveryFee, setDeliveryFee] = useState('2');
  const [maxDist, setMaxDist] = useState('10');
  return <Page bottom={<BottomBtn label="Continue" onPress={() => go('onboard6')} />}>
    <Header title="Pickup & Delivery" subtitle="Step 5 of 6" onBack={() => go('onboard4')} />
    <ScrollView contentContainerStyle={s.formBody}>
      <Text style={s.formIntro}>Set up your collection and delivery options.</Text>
      <View style={s.toggleRow}><Text style={s.toggleLabel}>Pickup Available</Text><Switch value={true} trackColor={{ true: BLUE }} /></View>
      <View style={s.toggleRow}><Text style={s.toggleLabel}>Delivery Available</Text><Switch value={true} trackColor={{ true: BLUE }} /></View>
      <InputField label="Pickup Fee (US$)" value={pickupFee} onChangeText={setPickupFee} placeholder="2" />
      <InputField label="Delivery Fee (US$)" value={deliveryFee} onChangeText={setDeliveryFee} placeholder="2" />
      <InputField label="Maximum Delivery Distance (km)" value={maxDist} onChangeText={setMaxDist} placeholder="10" />
      <Text style={s.inputLabel}>Pickup Schedule</Text>
      <View style={s.scheduleCard}><Text style={s.scheduleText}>Mon - Fri: 08:00 - 18:00</Text><Text style={s.scheduleText}>Sat: 09:00 - 14:00</Text><Text style={s.scheduleText}>Sun: Closed</Text></View>
      <Text style={s.inputLabel}>Delivery Schedule</Text>
      <View style={s.scheduleCard}><Text style={s.scheduleText}>Mon - Fri: 10:00 - 20:00</Text><Text style={s.scheduleText}>Sat: 10:00 - 16:00</Text><Text style={s.scheduleText}>Sun: Closed</Text></View>
    </ScrollView>
  </Page>;
}

function Onboard6({ go }: { go: (s: ProviderScreen) => void }) {
  const docs = [
    { label: 'National ID', uploaded: true },
    { label: 'Business License', uploaded: true },
    { label: 'Proof of Address', uploaded: false },
    { label: 'Business Certificate', uploaded: false },
    { label: 'Tax Certificate (optional)', uploaded: false },
  ];
  return <Page bottom={<BottomBtn label="Submit for Verification" onPress={() => go('dashboard')} />}>
    <Header title="Verification" subtitle="Step 6 of 6" onBack={() => go('onboard5')} />
    <ScrollView contentContainerStyle={s.formBody}>
      <Text style={s.formIntro}>Upload your documents for verification. This usually takes 24-48 hours.</Text>
      {docs.map((doc) => (
        <Pressable key={doc.label} style={s.docRow}>
          <View style={[s.docIcon, doc.uploaded && s.docIconDone]}><Icon name={doc.uploaded ? 'check_circle' : 'upload_file'} size={22} color={doc.uploaded ? GREEN : MUTED} /></View>
          <View style={s.docInfo}><Text style={s.docLabel}>{doc.label}</Text><Text style={s.docStatus}>{doc.uploaded ? 'Uploaded' : 'Tap to upload'}</Text></View>
          <Icon name="chevron_right" size={20} color={MUTED} />
        </Pressable>
      ))}
      <View style={s.verifyProgress}><View style={s.verifyBar}><View style={[s.verifyFill, { width: '40%' }]} /></View><Text style={s.verifyText}>2 of 5 documents uploaded</Text></View>
    </ScrollView>
  </Page>;
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────

function Dashboard({ go }: { go: (s: ProviderScreen) => void }) {
  const pending = providerOrders.filter((o) => o.status === 'Pending').length;
  const active = providerOrders.filter((o) => ['Accepted', 'Pickup Scheduled', 'In Progress', 'Ready', 'Out for Delivery'].includes(o.status)).length;
  const completed = providerOrders.filter((o) => o.status === 'Completed').length;
  const todayEarnings = providerEarnings.filter((e) => e.date === 'Today').reduce((sum, e) => sum + e.amount, 0);
  const monthlyRevenue = providerEarnings.reduce((sum, e) => sum + e.amount, 0);
  const unread = providerNotifications.filter((n) => !n.read).length;

  return <Page bottom={<TabBar active="Dashboard" go={go} />}>
    <ScrollView style={s.flex} contentContainerStyle={s.dashBody}>
      <View style={s.dashHeader}>
        <View><Text style={s.dashGreeting}>Welcome back,</Text><Text style={s.dashName}>{providerProfile.name}</Text></View>
        <Pressable onPress={() => go('notifications')} style={s.notifBtn}><Icon name="notifications_none" size={24} color={INK} />{unread > 0 && <View style={s.notifBadge}><Text style={s.notifBadgeText}>{unread}</Text></View>}</Pressable>
      </View>

      <View style={s.statGrid}>
        <StatCard label="Today's Earnings" value={money(todayEarnings)} icon="payments" color={GREEN} />
        <StatCard label="Pending" value={String(pending)} icon="pending_actions" color={ORANGE} />
        <StatCard label="Active" value={String(active)} icon="local_laundry_service" color={BLUE} />
        <StatCard label="Completed" value={String(completed)} icon="check_circle" color={GREEN} />
      </View>

      <View style={s.revenueCard}>
        <View style={s.revenueTop}><Text style={s.revenueLabel}>Monthly Revenue</Text><Pressable onPress={() => go('revenue')}><Text style={s.sectionAction}>Details</Text></Pressable></View>
        <Text style={s.revenueAmount}>{money(monthlyRevenue)}</Text>
        <View style={s.revenueBar}><View style={[s.revenueFill, { width: '68%' }]} /></View>
        <Text style={s.revenueGoal}>68% of US$220.00 goal</Text>
      </View>

      <View style={s.ratingCard}>
        <Text style={s.ratingBig}>★ {providerProfile.rating}</Text>
        <Text style={s.ratingMeta}>{providerProfile.reviewCount} reviews</Text>
      </View>

      <SectionHead title="Quick Actions" />
      <View style={s.quickActions}>
        {[['Orders', 'inventory_2', 'orders'], ['Messages', 'chat_bubble_outline', 'messages'], ['Analytics', 'bar_chart', 'analytics'], ['Settings', 'settings', 'settings']].map(([label, icon, target]) => (
          <Pressable key={label} onPress={() => go(target as ProviderScreen)} style={s.quickAction}><View style={s.quickActionIcon}><Icon name={icon} size={24} color={BLUE} /></View><Text style={s.quickActionLabel}>{label}</Text></Pressable>
        ))}
      </View>

      <SectionHead title="Recent Orders" action="View all" onAction={() => go('orders')} />
      {providerOrders.slice(0, 3).map((order) => (
        <Pressable key={order.id} onPress={() => { go('orderDetail'); }} style={s.orderCard}>
          <View style={s.orderCardTop}><View><Text style={s.orderCardService}>{order.service}</Text><Text style={s.orderCardCustomer}>{order.customer} · {order.load} kg</Text></View><Pill label={order.status} color={statusColor(order.status)} /></View>
          <View style={s.orderCardBottom}><Text style={s.orderCardSlot}>⌖ {order.slot}</Text><Text style={s.orderCardTotal}>{money(order.total)}</Text></View>
        </Pressable>
      ))}
    </ScrollView>
  </Page>;
}

// ─── ORDERS ───────────────────────────────────────────────────────────────────

function OrdersScreen({ go, select }: { go: (s: ProviderScreen) => void; select: (o: ProviderOrder) => void }) {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const filters = ['All', 'Pending', 'In Progress', 'Ready', 'Completed', 'Cancelled'];
  const filtered = providerOrders.filter((o) => {
    const matchFilter = filter === 'All' || o.status === filter;
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });
  return <Page bottom={<TabBar active="Orders" go={go} />}>
    <View style={s.ordersHeader}><Text style={s.screenTitle}>Orders</Text>
      <View style={s.searchBar}><Icon name="search" size={18} color={MUTED} /><TextInput style={s.searchInput} value={search} onChangeText={setSearch} placeholder="Search orders..." placeholderTextColor={MUTED} /></View>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filterRow}>
      {filters.map((f) => <Pressable key={f} onPress={() => setFilter(f)} style={[s.filterChip, filter === f && s.filterChipActive]}><Text style={[s.filterChipText, filter === f && s.filterChipTextActive]}>{f}</Text></Pressable>)}
    </ScrollView>
    <ScrollView style={s.flex} contentContainerStyle={s.listBody}>
      {filtered.map((order) => (
        <Pressable key={order.id} onPress={() => select(order)} style={s.orderCard}>
          <View style={s.orderCardTop}><View><Text style={s.orderCardService}>{order.service}</Text><Text style={s.orderCardCustomer}>{order.customer} · {order.load} kg</Text></View><Pill label={order.status} color={statusColor(order.status)} /></View>
          <View style={s.orderCardBottom}><Text style={s.orderCardSlot}>⌖ {order.slot}</Text><Text style={s.orderCardTotal}>{money(order.total)}</Text></View>
        </Pressable>
      ))}
      {filtered.length === 0 && <View style={s.emptyState}><Icon name="inventory_2" size={48} color={MUTED} /><Text style={s.emptyText}>No orders found</Text></View>}
    </ScrollView>
  </Page>;
}

function OrderDetail({ go, order }: { go: (s: ProviderScreen) => void; order: ProviderOrder }) {
  const timeline = ['Pending', 'Accepted', 'Pickup Scheduled', 'In Progress', 'Ready', 'Out for Delivery', 'Completed'];
  const currentIdx = timeline.indexOf(order.status);
  return <Page bottom={<View style={s.orderDetailBottom}><Btn label="Contact Customer" onPress={() => go('provChat')} secondary style={s.flex} /><Btn label="Update Status" onPress={() => undefined} style={s.flex} /></View>}>
    <Header title={`Order ${order.id}`} subtitle={order.customer} onBack={() => go('orders')} />
    <ScrollView contentContainerStyle={s.detailBody}>
      <View style={s.detailCard}>
        <View style={s.detailRow}><Text style={s.detailLabel}>Customer</Text><Text style={s.detailValue}>{order.customer}</Text></View>
        <View style={s.detailRow}><Text style={s.detailLabel}>Phone</Text><Text style={s.detailValue}>{order.customerPhone}</Text></View>
        <View style={s.detailRow}><Text style={s.detailLabel}>Service</Text><Text style={s.detailValue}>{order.service} · {order.load} kg</Text></View>
        <View style={s.detailRow}><Text style={s.detailLabel}>Pickup</Text><Text style={s.detailValue}>{order.pickupAddress}</Text></View>
        <View style={s.detailRow}><Text style={s.detailLabel}>Delivery</Text><Text style={s.detailValue}>{order.deliveryAddress}</Text></View>
        <View style={s.detailRow}><Text style={s.detailLabel}>Slot</Text><Text style={s.detailValue}>{order.slot}</Text></View>
        <View style={s.detailRow}><Text style={s.detailLabel}>Payment</Text><Text style={s.detailValue}>{order.payment}</Text></View>
        <View style={s.detailRow}><Text style={s.detailLabel}>Payment Status</Text><Pill label={order.paymentStatus} color={order.paymentStatus === 'Paid' ? GREEN : ORANGE} /></View>
        <View style={s.detailRow}><Text style={s.detailLabel}>Total</Text><Text style={s.detailValueBold}>{money(order.total)}</Text></View>
        {order.notes ? <View style={s.detailRow}><Text style={s.detailLabel}>Notes</Text><Text style={s.detailValue}>{order.notes}</Text></View> : null}
      </View>

      <Text style={s.timelineTitle}>Order Timeline</Text>
      <View style={s.timeline}>
        {timeline.map((step, i) => (
          <View key={step} style={s.timelineItem}>
            <View style={s.timelineRail}><View style={[s.timelineDot, i <= currentIdx && s.timelineDotActive]}><Text style={s.timelineDotText}>{i <= currentIdx ? '✓' : i + 1}</Text></View>{i < timeline.length - 1 && <View style={[s.timelineLine, i < currentIdx && s.timelineLineActive]} />}</View>
            <Text style={[s.timelineLabel, i <= currentIdx && s.timelineLabelActive]}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  </Page>;
}

function ActiveOrders({ go, select }: { go: (s: ProviderScreen) => void; select: (o: ProviderOrder) => void }) {
  const active = providerOrders.filter((o) => ['Accepted', 'Pickup Scheduled', 'In Progress', 'Ready', 'Out for Delivery'].includes(o.status));
  return <Page bottom={<TabBar active="Orders" go={go} />}>
    <Header title="Active Orders" onBack={() => go('orders')} />
    <ScrollView style={s.flex} contentContainerStyle={s.listBody}>
      {active.map((order) => (
        <Pressable key={order.id} onPress={() => select(order)} style={s.orderCard}>
          <View style={s.orderCardTop}><View><Text style={s.orderCardService}>{order.service}</Text><Text style={s.orderCardCustomer}>{order.customer}</Text></View><Pill label={order.status} color={statusColor(order.status)} /></View>
          <View style={s.orderCardBottom}><Text style={s.orderCardSlot}>⌖ {order.slot}</Text><Text style={s.orderCardTotal}>{money(order.total)}</Text></View>
        </Pressable>
      ))}
      {active.length === 0 && <View style={s.emptyState}><Icon name="check_circle" size={48} color={GREEN} /><Text style={s.emptyText}>No active orders right now</Text></View>}
    </ScrollView>
  </Page>;
}

function CompletedOrders({ go, select }: { go: (s: ProviderScreen) => void; select: (o: ProviderOrder) => void }) {
  const completed = providerOrders.filter((o) => o.status === 'Completed');
  return <Page bottom={<TabBar active="Orders" go={go} />}>
    <Header title="Completed Orders" onBack={() => go('orders')} />
    <ScrollView style={s.flex} contentContainerStyle={s.listBody}>
      {completed.map((order) => (
        <Pressable key={order.id} onPress={() => select(order)} style={s.orderCard}>
          <View style={s.orderCardTop}><View><Text style={s.orderCardService}>{order.service}</Text><Text style={s.orderCardCustomer}>{order.customer}</Text></View><Pill label={order.status} color={GREEN} /></View>
          <View style={s.orderCardBottom}><Text style={s.orderCardSlot}>{order.completedAt}</Text><Text style={s.orderCardTotal}>{money(order.total)}</Text></View>
          {order.rating && <View style={s.reviewRow}><Text style={s.reviewStars}>{'★'.repeat(order.rating)}</Text><Text style={s.reviewSnippet} numberOfLines={1}>{order.review}</Text></View>}
        </Pressable>
      ))}
    </ScrollView>
  </Page>;
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────

function ServicesScreen({ go, services, setServices, select }: { go: (s: ProviderScreen) => void; services: ProviderService[]; setServices: (s: ProviderService[]) => void; select: (s: ProviderService) => void }) {
  const [search, setSearch] = useState('');
  const filtered = services.filter((svc) => svc.name.toLowerCase().includes(search.toLowerCase()));
  const toggleService = (id: string) => setServices(services.map((svc) => svc.id === id ? { ...svc, enabled: !svc.enabled } : svc));
  return <Page bottom={<TabBar active="Services" go={go} />}>
    <View style={s.ordersHeader}><Text style={s.screenTitle}>Services</Text>
      <View style={s.searchBar}><Icon name="search" size={18} color={MUTED} /><TextInput style={s.searchInput} value={search} onChangeText={setSearch} placeholder="Search services..." placeholderTextColor={MUTED} /></View>
    </View>
    <ScrollView style={s.flex} contentContainerStyle={s.listBody}>
      {filtered.map((svc) => (
        <View key={svc.id} style={s.serviceCard}>
          <View style={s.serviceCardTop}>
            <View style={s.serviceCardInfo}><Text style={s.serviceCardName}>{svc.name}</Text><Text style={s.serviceCardMeta}>{svc.category} · {svc.turnaround}</Text></View>
            <Switch value={svc.enabled} onValueChange={() => toggleService(svc.id)} trackColor={{ true: BLUE }} />
          </View>
          <Text style={s.serviceCardDesc}>{svc.description}</Text>
          <View style={s.serviceCardBottom}>
            <Text style={s.serviceCardPrice}>{money(svc.price)} <Text style={s.serviceCardUnit}>{svc.unit}</Text></Text>
            <Pressable onPress={() => select(svc)}><Text style={s.sectionAction}>Edit</Text></Pressable>
          </View>
        </View>
      ))}
      <Btn label="+ Add New Service" onPress={() => go('addService')} secondary style={s.addBtn} />
    </ScrollView>
  </Page>;
}

function AddService({ go, onSave }: { go: (s: ProviderScreen) => void; onSave: (s: ProviderService) => void }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [turnaround, setTurnaround] = useState('');
  const [category, setCategory] = useState('');
  const save = () => { onSave({ id: `ps-${Date.now()}`, name, description: desc, price: Number(price) || 0, unit: 'per kg', turnaround, category, enabled: true }); };
  return <Page bottom={<BottomBtn label="Save Service" onPress={save} />}>
    <Header title="Add Service" onBack={() => go('services')} />
    <ScrollView contentContainerStyle={s.formBody}>
      <InputField label="Service Name" value={name} onChangeText={setName} placeholder="e.g. Express Wash" />
      <InputField label="Description" value={desc} onChangeText={setDesc} placeholder="Describe this service..." multiline />
      <InputField label="Price (US$)" value={price} onChangeText={setPrice} placeholder="e.g. 5" />
      <InputField label="Estimated Turnaround" value={turnaround} onChangeText={setTurnaround} placeholder="e.g. 12 hrs" />
      <InputField label="Category" value={category} onChangeText={setCategory} placeholder="e.g. Washing, Specialty" />
      <Pressable style={s.uploadBox}><Icon name="add_photo_alternate" size={32} color={MUTED} /><Text style={s.uploadText}>Upload Service Image</Text></Pressable>
    </ScrollView>
  </Page>;
}

function EditService({ go, service, onSave }: { go: (s: ProviderScreen) => void; service: ProviderService; onSave: (s: ProviderService) => void }) {
  const [name, setName] = useState(service.name);
  const [desc, setDesc] = useState(service.description);
  const [price, setPrice] = useState(String(service.price));
  const [turnaround, setTurnaround] = useState(service.turnaround);
  const [category, setCategory] = useState(service.category);
  const save = () => { onSave({ ...service, name, description: desc, price: Number(price) || 0, turnaround, category }); };
  return <Page bottom={<BottomBtn label="Save Changes" onPress={save} />}>
    <Header title="Edit Service" subtitle={service.name} onBack={() => go('services')} />
    <ScrollView contentContainerStyle={s.formBody}>
      <InputField label="Service Name" value={name} onChangeText={setName} placeholder="Service name" />
      <InputField label="Description" value={desc} onChangeText={setDesc} placeholder="Description..." multiline />
      <InputField label="Price (US$)" value={price} onChangeText={setPrice} placeholder="Price" />
      <InputField label="Estimated Turnaround" value={turnaround} onChangeText={setTurnaround} placeholder="e.g. 24 hrs" />
      <InputField label="Category" value={category} onChangeText={setCategory} placeholder="Category" />
      <View style={s.toggleRow}><Text style={s.toggleLabel}>Service Available</Text><Switch value={service.enabled} trackColor={{ true: BLUE }} /></View>
    </ScrollView>
  </Page>;
}

// ─── REVENUE & ANALYTICS ──────────────────────────────────────────────────────

function RevenueScreen({ go }: { go: (s: ProviderScreen) => void }) {
  const total = providerEarnings.reduce((sum, e) => sum + e.amount, 0);
  const pending = providerEarnings.filter((e) => e.status === 'Pending').reduce((sum, e) => sum + e.amount, 0);
  const completed = providerEarnings.filter((e) => e.status === 'Completed').reduce((sum, e) => sum + e.amount, 0);
  return <Page bottom={<TabBar active="Revenue" go={go} />}>
    <ScrollView style={s.flex} contentContainerStyle={s.dashBody}>
      <Text style={s.screenTitle}>Revenue</Text>
      <View style={s.statGrid}>
        <StatCard label="Total Earnings" value={money(total)} icon="account_balance_wallet" color={GREEN} />
        <StatCard label="Pending Payouts" value={money(pending)} icon="schedule" color={ORANGE} />
        <StatCard label="Completed" value={money(completed)} icon="check_circle" color={BLUE} />
        <StatCard label="This Week" value={money(total * 0.4)} icon="trending_up" color={GREEN} />
      </View>

      <View style={s.chartCard}>
        <Text style={s.chartTitle}>Revenue Trend</Text>
        <View style={s.chartBars}>
          {[45, 62, 38, 78, 55, 90, 68].map((h, i) => <View key={i} style={s.chartBarCol}><View style={[s.chartBar, { height: h }]} /><Text style={s.chartBarLabel}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</Text></View>)}
        </View>
      </View>

      <SectionHead title="Quick Links" />
      <Pressable onPress={() => go('earnings')} style={s.menuRow}><Icon name="payments" size={22} color={BLUE} /><Text style={s.menuRowText}>Earnings & Payouts</Text><Icon name="chevron_right" size={20} color={MUTED} /></Pressable>
      <Pressable onPress={() => go('analytics')} style={s.menuRow}><Icon name="bar_chart" size={22} color={BLUE} /><Text style={s.menuRowText}>Analytics & Insights</Text><Icon name="chevron_right" size={20} color={MUTED} /></Pressable>
    </ScrollView>
  </Page>;
}

function EarningsScreen({ go }: { go: (s: ProviderScreen) => void }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Completed', 'Pending', 'Processing'];
  const filtered = providerEarnings.filter((e) => filter === 'All' || e.status === filter);
  return <Page>
    <Header title="Earnings" onBack={() => go('revenue')} />
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filterRow}>
      {filters.map((f) => <Pressable key={f} onPress={() => setFilter(f)} style={[s.filterChip, filter === f && s.filterChipActive]}><Text style={[s.filterChipText, filter === f && s.filterChipTextActive]}>{f}</Text></Pressable>)}
    </ScrollView>
    <ScrollView style={s.flex} contentContainerStyle={s.listBody}>
      {filtered.map((e) => (
        <View key={e.id} style={s.earningCard}>
          <View style={s.earningTop}><Text style={s.earningOrder}>{e.orderId}</Text><Pill label={e.status} color={e.status === 'Completed' ? GREEN : e.status === 'Pending' ? ORANGE : BLUE} /></View>
          <View style={s.earningBottom}><Text style={s.earningDate}>{e.date} · {e.method}</Text><Text style={s.earningAmount}>{money(e.amount)}</Text></View>
        </View>
      ))}
    </ScrollView>
  </Page>;
}

function AnalyticsScreen({ go }: { go: (s: ProviderScreen) => void }) {
  const totalOrders = providerOrders.length;
  const completedOrders = providerOrders.filter((o) => o.status === 'Completed').length;
  const cancelledOrders = providerOrders.filter((o) => o.status === 'Cancelled').length;
  const avgRating = providerOrders.filter((o) => o.rating).reduce((sum, o) => sum + (o.rating || 0), 0) / (providerOrders.filter((o) => o.rating).length || 1);
  return <Page>
    <Header title="Analytics" onBack={() => go('revenue')} />
    <ScrollView style={s.flex} contentContainerStyle={s.dashBody}>
      <View style={s.statGrid}>
        <StatCard label="Total Orders" value={String(totalOrders)} icon="receipt_long" color={BLUE} />
        <StatCard label="Completed" value={String(completedOrders)} icon="check_circle" color={GREEN} />
        <StatCard label="Cancelled" value={String(cancelledOrders)} icon="cancel" color={RED} />
        <StatCard label="Avg Rating" value={avgRating.toFixed(1)} icon="star" color={ORANGE} />
      </View>

      <View style={s.analyticsCard}><Text style={s.analyticsTitle}>Most Popular Services</Text>
        {['Wash & Iron', 'Wash & Fold', 'Dry Cleaning'].map((svc, i) => (
          <View key={svc} style={s.popularRow}><Text style={s.popularName}>{svc}</Text><View style={s.popularBar}><View style={[s.popularFill, { width: `${[80, 60, 40][i]}%` }]} /></View><Text style={s.popularPct}>{[80, 60, 40][i]}%</Text></View>
        ))}
      </View>

      <View style={s.analyticsCard}><Text style={s.analyticsTitle}>Customer Satisfaction</Text>
        <View style={s.satisfactionRow}><Text style={s.satisfactionScore}>4.7</Text><Text style={s.satisfactionLabel}>out of 5.0</Text></View>
        <Text style={s.satisfactionDetail}>Based on {completedOrders} completed orders</Text>
      </View>

      <View style={s.analyticsCard}><Text style={s.analyticsTitle}>Performance</Text>
        <View style={s.perfRow}><Text style={s.perfLabel}>Completion Rate</Text><Text style={s.perfValue}>{Math.round((completedOrders / totalOrders) * 100)}%</Text></View>
        <View style={s.perfRow}><Text style={s.perfLabel}>Cancellation Rate</Text><Text style={s.perfValue}>{Math.round((cancelledOrders / totalOrders) * 100)}%</Text></View>
        <View style={s.perfRow}><Text style={s.perfLabel}>Avg Response Time</Text><Text style={s.perfValue}>12 min</Text></View>
      </View>
    </ScrollView>
  </Page>;
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────

function ProfileScreen({ go }: { go: (s: ProviderScreen) => void }) {
  const p = providerProfile;
  return <Page bottom={<TabBar active="Profile" go={go} />}>
    <ScrollView style={s.flex} contentContainerStyle={s.profileBody}>
      <Image source={{ uri: p.coverImage }} style={s.profileCover} />
      <View style={s.profileMain}>
        <Image source={{ uri: p.image }} style={s.profileAvatar} />
        <View style={s.profileInfo}>
          <Text style={s.profileName}>{p.name}</Text>
          <Text style={s.profileMeta}>{p.city} · {p.businessType}</Text>
          <View style={s.profileRatingRow}><Text style={s.profileRating}>★ {p.rating}</Text><Text style={s.profileReviews}>({p.reviewCount} reviews)</Text></View>
          {p.verified && <Pill label="✿ VERIFIED" color={GREEN} />}
        </View>
      </View>

      <View style={s.profileCard}>
        <Text style={s.profileCardTitle}>About</Text>
        <Text style={s.profileCardText}>{p.description}</Text>
      </View>

      <View style={s.profileCard}>
        <Text style={s.profileCardTitle}>Contact</Text>
        <View style={s.profileDetailRow}><Icon name="mail" size={18} color={BLUE} /><Text style={s.profileDetailText}>{p.email}</Text></View>
        <View style={s.profileDetailRow}><Icon name="phone" size={18} color={BLUE} /><Text style={s.profileDetailText}>{p.phone}</Text></View>
        <View style={s.profileDetailRow}><Icon name="location_on" size={18} color={BLUE} /><Text style={s.profileDetailText}>{p.address}, {p.city}</Text></View>
      </View>

      <View style={s.profileCard}>
        <Text style={s.profileCardTitle}>Operating Hours</Text>
        {p.operatingHours.filter((h) => !h.closed).slice(0, 3).map((h) => <View key={h.day} style={s.hoursRow}><Text style={s.hoursDay}>{h.day}</Text><Text style={s.hoursTime}>{h.open} - {h.close}</Text></View>)}
      </View>

      <View style={s.profileActions}>
        <Btn label="Edit Profile" onPress={() => go('editProfile')} style={s.profileBtn} />
        <Btn label="Gallery" onPress={() => go('gallery')} secondary style={s.profileBtn} />
        <Btn label="Availability" onPress={() => go('availability')} secondary style={s.profileBtn} />
      </View>
    </ScrollView>
  </Page>;
}

function EditProfileScreen({ go }: { go: (s: ProviderScreen) => void }) {
  const p = providerProfile;
  const [name, setName] = useState(p.name);
  const [desc, setDesc] = useState(p.description);
  const [email, setEmail] = useState(p.email);
  const [phone, setPhone] = useState(p.phone);
  const [address, setAddress] = useState(p.address);
  const [city, setCity] = useState(p.city);
  return <Page bottom={<BottomBtn label="Save Changes" onPress={() => go('profile')} />}>
    <Header title="Edit Profile" onBack={() => go('profile')} />
    <ScrollView contentContainerStyle={s.formBody}>
      <Pressable style={s.uploadBox}><Icon name="add_photo_alternate" size={32} color={MUTED} /><Text style={s.uploadText}>Change Logo</Text></Pressable>
      <InputField label="Business Name" value={name} onChangeText={setName} placeholder="Business name" />
      <InputField label="Description" value={desc} onChangeText={setDesc} placeholder="Description" multiline />
      <InputField label="Email" value={email} onChangeText={setEmail} placeholder="Email" />
      <InputField label="Phone" value={phone} onChangeText={setPhone} placeholder="Phone" />
      <InputField label="Address" value={address} onChangeText={setAddress} placeholder="Address" />
      <InputField label="City" value={city} onChangeText={setCity} placeholder="City" />
    </ScrollView>
  </Page>;
}

function GalleryScreen({ go }: { go: (s: ProviderScreen) => void }) {
  const images = [providerProfile.image, providerProfile.coverImage, 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=300&q=80', 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=300&q=80'];
  return <Page bottom={<BottomBtn label="Upload Photos" onPress={() => undefined} />}>
    <Header title="Gallery" subtitle={`${images.length} photos`} onBack={() => go('profile')} />
    <ScrollView contentContainerStyle={s.galleryBody}>
      <View style={s.galleryGrid}>
        {images.map((uri, i) => <Image key={i} source={{ uri }} style={s.galleryImage} />)}
        <Pressable style={s.galleryAdd}><Icon name="add" size={32} color={MUTED} /><Text style={s.galleryAddText}>Add</Text></Pressable>
      </View>
    </ScrollView>
  </Page>;
}

function AvailabilityScreen({ go }: { go: (s: ProviderScreen) => void }) {
  const [vacation, setVacation] = useState(providerProfile.vacationMode);
  return <Page bottom={<BottomBtn label="Save" onPress={() => go('profile')} />}>
    <Header title="Availability" onBack={() => go('profile')} />
    <ScrollView contentContainerStyle={s.formBody}>
      <View style={s.toggleRow}><View><Text style={s.toggleLabel}>Vacation Mode</Text><Text style={s.toggleSub}>Temporarily pause all bookings</Text></View><Switch value={vacation} onValueChange={setVacation} trackColor={{ true: RED }} /></View>
      <Text style={s.inputLabel}>Working Days & Hours</Text>
      {providerProfile.operatingHours.map((h) => (
        <View key={h.day} style={s.availRow}>
          <Text style={s.availDay}>{h.day}</Text>
          {h.closed ? <Text style={s.availClosed}>Closed</Text> : <Text style={s.availTime}>{h.open} - {h.close}</Text>}
        </View>
      ))}
      <View style={[s.toggleRow, { marginTop: 20 }]}><View><Text style={s.toggleLabel}>Accept Bookings</Text><Text style={s.toggleSub}>Toggle to pause new bookings</Text></View><Switch value={true} trackColor={{ true: BLUE }} /></View>
    </ScrollView>
  </Page>;
}

// ─── COMMUNICATION ────────────────────────────────────────────────────────────

function MessagesScreen({ go }: { go: (s: ProviderScreen) => void }) {
  const chats = [
    { name: 'Anesu Marimo', last: 'Thanks! Please iron the two blue shirts separately.', time: '08:24', unread: 1 },
    { name: 'Tapiwa Zvobgo', last: 'When will my order be ready?', time: 'Yesterday', unread: 0 },
    { name: 'Chiedza Nyambe', last: 'Separate whites from colours please', time: 'Yesterday', unread: 0 },
    { name: 'Simba Mutasa', last: 'Is my order ready for pickup?', time: '2 days ago', unread: 0 },
  ];
  return <Page bottom={<TabBar active="Dashboard" go={go} />}>
    <View style={s.ordersHeader}><Text style={s.screenTitle}>Messages</Text>
      <View style={s.searchBar}><Icon name="search" size={18} color={MUTED} /><TextInput style={s.searchInput} placeholder="Search conversations..." placeholderTextColor={MUTED} /></View>
    </View>
    <ScrollView style={s.flex} contentContainerStyle={s.listBody}>
      {chats.map((chat) => (
        <Pressable key={chat.name} onPress={() => go('provChat')} style={s.chatRow}>
          <View style={s.chatAvatar}><Text style={s.chatInitial}>{chat.name[0]}</Text></View>
          <View style={s.chatInfo}><View style={s.chatTop}><Text style={s.chatName}>{chat.name}</Text><Text style={s.chatTime}>{chat.time}</Text></View><Text style={s.chatLast} numberOfLines={1}>{chat.last}</Text></View>
          {chat.unread > 0 && <View style={s.chatBadge}><Text style={s.chatBadgeText}>{chat.unread}</Text></View>}
        </Pressable>
      ))}
    </ScrollView>
  </Page>;
}

function ProvChatScreen({ go }: { go: (s: ProviderScreen) => void }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hi, I dropped off 6 kg for wash & iron.', time: '08:20', mine: false },
    { text: 'Received! We\'ll have it ready by 4 PM.', time: '08:22', mine: true },
    { text: 'Thanks! Please iron the two blue shirts separately.', time: '08:24', mine: false },
    { text: 'Noted, no extra charge.', time: '08:25', mine: true },
  ]);
  const send = () => { if (!message.trim()) return; setMessages([...messages, { text: message.trim(), time: 'Now', mine: true }]); setMessage(''); };
  return <Page>
    <Header title="Anesu Marimo" subtitle="Order LDR-10428" onBack={() => go('messages')} />
    <ScrollView style={s.flex} contentContainerStyle={s.chatBody}>
      {messages.map((m, i) => <View key={i} style={[s.msg, m.mine ? s.msgMine : s.msgTheirs]}><Text style={[s.msgText, m.mine && s.msgMineText]}>{m.text}</Text><Text style={[s.msgTime, m.mine && s.msgMineText]}>{m.time}</Text></View>)}
    </ScrollView>
    <View style={s.composer}><TextInput style={s.composerInput} value={message} onChangeText={setMessage} placeholder="Type a message..." placeholderTextColor={MUTED} onSubmitEditing={send} /><Pressable style={s.sendBtn} onPress={send}><Icon name="send" size={22} color="#fff" /></Pressable></View>
  </Page>;
}

function NotificationsScreen({ go, notifs, setNotifs }: { go: (s: ProviderScreen) => void; notifs: ProviderNotification[]; setNotifs: (n: ProviderNotification[]) => void }) {
  const markRead = (id: string) => setNotifs(notifs.map((n) => n.id === id ? { ...n, read: true } : n));
  const iconForType = (type: string) => type === 'booking' ? 'calendar_today' : type === 'payment' ? 'payments' : type === 'review' ? 'star' : type === 'order' ? 'inventory_2' : 'info';
  const colorForType = (type: string) => type === 'booking' ? BLUE : type === 'payment' ? GREEN : type === 'review' ? ORANGE : type === 'order' ? BLUE : MUTED;
  return <Page>
    <Header title="Notifications" onBack={() => go('dashboard')} />
    <ScrollView style={s.flex} contentContainerStyle={s.listBody}>
      {notifs.map((n) => (
        <Pressable key={n.id} onPress={() => markRead(n.id)} style={[s.notifRow, !n.read && s.notifUnread]}>
          <View style={[s.notifIcon, { backgroundColor: colorForType(n.type) + '15' }]}><Icon name={iconForType(n.type)} size={20} color={colorForType(n.type)} /></View>
          <View style={s.notifContent}><Text style={s.notifTitle}>{n.title}</Text><Text style={s.notifMsg}>{n.message}</Text><Text style={s.notifTime}>{n.time}</Text></View>
          {!n.read && <View style={s.notifDot} />}
        </Pressable>
      ))}
    </ScrollView>
  </Page>;
}

// ─── SETTINGS & SUPPORT ───────────────────────────────────────────────────────

function SettingsScreen({ go, onLogout }: { go: (s: ProviderScreen) => void; onLogout: () => void }) {
  const groups: [string, string, ProviderScreen | null][][] = [
    [['business_center', 'Business Settings', 'editProfile'], ['notifications_none', 'Notification Preferences', null], ['credit_card', 'Payment Settings', null]],
    [['lock', 'Security', null], ['language', 'Language', null], ['privacy_tip', 'Privacy', null]],
    [['description', 'Terms & Conditions', null], ['help_outline', 'Help & Support', 'support']],
  ];
  return <Page bottom={<TabBar active="Profile" go={go} />}>
    <ScrollView style={s.flex} contentContainerStyle={s.settingsBody}>
      <Text style={s.screenTitle}>Settings</Text>
      {groups.map((group, gi) => (
        <View key={gi} style={s.settingsGroup}>
          {group.map(([icon, label, target]) => (
            <Pressable key={label} onPress={() => target && go(target)} style={s.settingsRow}>
              <View style={s.settingsRowIcon}><Icon name={icon} size={20} color={BLUE} /></View>
              <Text style={s.settingsRowText}>{label}</Text>
              <Icon name="chevron_right" size={18} color={MUTED} />
            </Pressable>
          ))}
        </View>
      ))}
      <Pressable onPress={onLogout} style={s.logoutBtn}><Icon name="logout" size={20} color={RED} /><Text style={s.logoutText}>Log Out</Text></Pressable>
    </ScrollView>
  </Page>;
}

function SupportScreen({ go }: { go: (s: ProviderScreen) => void }) {
  const items: [string, string][] = [['help_outline', 'Frequently Asked Questions'], ['chat_bubble_outline', 'Live Chat Support'], ['mail', 'Email Support'], ['bug_report', 'Report a Problem'], ['feedback', 'Submit Feedback']];
  return <Page>
    <Header title="Help & Support" onBack={() => go('settings')} />
    <ScrollView style={s.flex} contentContainerStyle={s.listBody}>
      <View style={s.supportHeader}><Icon name="support_agent" size={48} color={BLUE} /><Text style={s.supportTitle}>How can we help?</Text><Text style={s.supportSub}>Our team is here to assist you with any questions or issues.</Text></View>
      {items.map(([icon, label]) => (
        <Pressable key={label} style={s.menuRow}><Icon name={icon} size={22} color={BLUE} /><Text style={s.menuRowText}>{label}</Text><Icon name="chevron_right" size={20} color={MUTED} /></Pressable>
      ))}
      <View style={s.supportContact}><Text style={s.supportContactTitle}>Contact us directly</Text><Text style={s.supportContactText}>support@laundr.co.zw</Text><Text style={s.supportContactText}>+263 8677 LAUNDR</Text></View>
    </ScrollView>
  </Page>;
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: PAGE },
  flex: { flex: 1 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },

  // Header
  header: { height: 76, marginTop: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e4e7ec', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, gap: 12 },
  headerBack: { borderRadius: 22, backgroundColor: '#f3f6fa', width: 44, height: 44 },
  headerText: { flex: 1 },
  headerTitle: { fontFamily: FONT, color: INK, fontSize: 22, fontWeight: '900', letterSpacing: -0.7 },
  headerSub: { fontFamily: FONT, color: MUTED, fontSize: 13, marginTop: 2 },

  // Buttons
  btn: { minHeight: 56, borderRadius: 16, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center', shadowColor: '#07498e', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 4 },
  btnText: { color: '#fff', fontFamily: FONT, fontSize: 16, fontWeight: '900' },
  btnSec: { minHeight: 56, borderRadius: 16, backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#e0e4e9', alignItems: 'center', justifyContent: 'center' },
  btnSecText: { color: BLUE, fontFamily: FONT, fontSize: 16, fontWeight: '700' },
  bottomBtn: { backgroundColor: '#fff', padding: 14, borderTopLeftRadius: 24, borderTopRightRadius: 24, shadowColor: '#aebcd1', shadowOpacity: 0.18, shadowRadius: 10, elevation: 8 },
  iconBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },

  // Tab Bar
  tabBar: { height: 68, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#ebeff4' },
  tab: { alignItems: 'center', justifyContent: 'center', minWidth: 54, gap: 3 },
  tabText: { fontFamily: FONT, color: '#8da0bb', fontSize: 10 },
  tabActive: { color: BLUE, fontWeight: '800' },

  // Dashboard
  dashBody: { padding: 18, paddingBottom: 90 },
  dashHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 20 },
  dashGreeting: { fontFamily: FONT, fontSize: 14, color: MUTED },
  dashName: { fontFamily: FONT, fontSize: 22, fontWeight: '900', color: INK, letterSpacing: -0.7, marginTop: 2 },
  notifBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: SOFT, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  notifBadge: { position: 'absolute', top: 8, right: 8, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: RED, alignItems: 'center', justifyContent: 'center' },
  notifBadgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },

  // Stat cards
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 18 },
  statCard: { width: '47%', backgroundColor: '#fff', borderRadius: 18, padding: 16, borderWidth: 1.5, borderColor: '#e0e4e9' },
  statIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  statValue: { fontFamily: FONT, fontSize: 20, fontWeight: '900', color: INK },
  statLabel: { fontFamily: FONT, fontSize: 12, color: MUTED, marginTop: 3 },

  // Revenue card
  revenueCard: { backgroundColor: '#fff', borderRadius: 18, padding: 18, borderWidth: 1.5, borderColor: '#e0e4e9', marginBottom: 14 },
  revenueTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  revenueLabel: { fontFamily: FONT, fontSize: 14, color: MUTED },
  revenueAmount: { fontFamily: FONT, fontSize: 28, fontWeight: '900', color: INK, marginTop: 6 },
  revenueBar: { height: 8, borderRadius: 4, backgroundColor: '#e8ecf1', marginTop: 12 },
  revenueFill: { height: '100%', borderRadius: 4, backgroundColor: GREEN },
  revenueGoal: { fontFamily: FONT, fontSize: 12, color: MUTED, marginTop: 6 },

  // Rating card
  ratingCard: { backgroundColor: '#fff', borderRadius: 18, padding: 18, borderWidth: 1.5, borderColor: '#e0e4e9', marginBottom: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  ratingBig: { fontFamily: FONT, fontSize: 24, fontWeight: '900', color: '#ff9800' },
  ratingMeta: { fontFamily: FONT, fontSize: 14, color: MUTED },

  // Quick actions
  quickActions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  quickAction: { alignItems: 'center', gap: 6 },
  quickActionIcon: { width: 52, height: 52, borderRadius: 16, backgroundColor: '#e8f2ff', alignItems: 'center', justifyContent: 'center' },
  quickActionLabel: { fontFamily: FONT, fontSize: 11, color: MUTED, fontWeight: '500' },

  // Section head
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 8 },
  sectionHeadText: { fontFamily: FONT, fontSize: 18, fontWeight: '900', color: INK, letterSpacing: -0.5 },
  sectionAction: { fontFamily: FONT, fontSize: 14, color: BLUE, fontWeight: '700' },

  // Pill
  pill: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  pillText: { fontFamily: FONT, fontSize: 11, fontWeight: '800', letterSpacing: 0.3 },

  // Order cards
  orderCard: { backgroundColor: '#fff', borderRadius: 18, borderWidth: 1.5, borderColor: '#e0e4e9', padding: 16, marginBottom: 12 },
  orderCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  orderCardService: { fontFamily: FONT, color: INK, fontSize: 16, fontWeight: '800' },
  orderCardCustomer: { fontFamily: FONT, color: MUTED, fontSize: 13, marginTop: 3 },
  orderCardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  orderCardSlot: { fontFamily: FONT, color: MUTED, fontSize: 12 },
  orderCardTotal: { fontFamily: FONT, color: INK, fontWeight: '900', fontSize: 15 },
  reviewRow: { flexDirection: 'row', gap: 8, marginTop: 10, alignItems: 'center' },
  reviewStars: { color: '#ff9800', fontSize: 14 },
  reviewSnippet: { flex: 1, fontFamily: FONT, color: MUTED, fontSize: 12 },

  // Orders screen
  ordersHeader: { backgroundColor: '#fff', paddingTop: 20, paddingHorizontal: 18, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: '#e4e7ec' },
  screenTitle: { fontFamily: FONT, fontSize: 24, fontWeight: '900', color: INK, letterSpacing: -0.8, marginTop: 20, marginBottom: 14 },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, height: 44, borderRadius: 12, backgroundColor: '#e4e9f0', paddingHorizontal: 14 },
  searchInput: { flex: 1, fontFamily: FONT, fontSize: 14, color: INK, height: '100%' },
  filterRow: { paddingHorizontal: 18, paddingVertical: 12, gap: 8 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#e8ecf1' },
  filterChipActive: { backgroundColor: BLUE },
  filterChipText: { fontFamily: FONT, fontSize: 13, color: MUTED, fontWeight: '600' },
  filterChipTextActive: { color: '#fff' },
  listBody: { padding: 16, paddingBottom: 90 },

  // Order Detail
  orderDetailBottom: { flexDirection: 'row', gap: 12, padding: 14, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e4e7ec' },
  detailBody: { padding: 16, paddingBottom: 40, gap: 16 },
  detailCard: { backgroundColor: '#fff', borderRadius: 18, borderWidth: 1.5, borderColor: '#e0e4e9', padding: 18 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, gap: 12 },
  detailLabel: { fontFamily: FONT, color: MUTED, fontSize: 14, width: 90 },
  detailValue: { flex: 1, fontFamily: FONT, color: INK, fontSize: 14, textAlign: 'right' },
  detailValueBold: { flex: 1, fontFamily: FONT, color: INK, fontSize: 16, fontWeight: '900', textAlign: 'right' },
  timelineTitle: { fontFamily: FONT, fontSize: 18, fontWeight: '900', color: INK, marginBottom: 12 },
  timeline: {},
  timelineItem: { flexDirection: 'row', gap: 12, minHeight: 60 },
  timelineRail: { alignItems: 'center', width: 36 },
  timelineDot: { width: 32, height: 32, borderRadius: 16, backgroundColor: SOFT, alignItems: 'center', justifyContent: 'center' },
  timelineDotActive: { backgroundColor: BLUE },
  timelineDotText: { color: MUTED, fontFamily: FONT, fontSize: 12, fontWeight: '700' },
  timelineLine: { width: 3, flex: 1, backgroundColor: '#e1e5ed', marginVertical: 4 },
  timelineLineActive: { backgroundColor: BLUE },
  timelineLabel: { fontFamily: FONT, color: MUTED, fontSize: 14, fontWeight: '500', paddingTop: 6 },
  timelineLabelActive: { color: INK, fontWeight: '700' },

  // Services
  serviceCard: { backgroundColor: '#fff', borderRadius: 18, borderWidth: 1.5, borderColor: '#e0e4e9', padding: 16, marginBottom: 12 },
  serviceCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  serviceCardInfo: { flex: 1 },
  serviceCardName: { fontFamily: FONT, color: INK, fontSize: 17, fontWeight: '800' },
  serviceCardMeta: { fontFamily: FONT, color: MUTED, fontSize: 12, marginTop: 2 },
  serviceCardDesc: { fontFamily: FONT, color: MUTED, fontSize: 13, lineHeight: 19, marginTop: 8 },
  serviceCardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  serviceCardPrice: { fontFamily: FONT, color: BLUE_DARK, fontSize: 18, fontWeight: '900' },
  serviceCardUnit: { fontSize: 12, fontWeight: '400', color: MUTED },
  addBtn: { marginTop: 8 },

  // Forms
  formBody: { padding: 20, paddingBottom: 120, gap: 4 },
  formIntro: { fontFamily: FONT, fontSize: 14, color: MUTED, lineHeight: 20, marginBottom: 16 },
  inputGroup: { marginBottom: 18 },
  inputLabel: { fontFamily: FONT, color: INK, fontSize: 14, fontWeight: '600', marginBottom: 8 },
  input: { height: 50, borderRadius: 13, backgroundColor: '#f1f3f7', paddingHorizontal: 16, fontFamily: FONT, color: INK, fontSize: 15 },
  inputMulti: { height: 100, paddingTop: 14, textAlignVertical: 'top' },
  uploadBox: { height: 100, borderRadius: 16, borderWidth: 1.5, borderColor: '#e0e4e9', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 18 },
  uploadText: { fontFamily: FONT, color: MUTED, fontSize: 13 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18 },
  chipOption: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: '#e8ecf1' },
  chipOptionActive: { backgroundColor: BLUE },
  chipOptionText: { fontFamily: FONT, fontSize: 14, color: MUTED, fontWeight: '600' },
  chipOptionTextActive: { color: '#fff' },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f0f2f5' },
  toggleLabel: { fontFamily: FONT, color: INK, fontSize: 15, fontWeight: '600' },
  toggleSub: { fontFamily: FONT, color: MUTED, fontSize: 12, marginTop: 2 },
  mapPlaceholder: { height: 160, borderRadius: 16, backgroundColor: '#e8ecf1', alignItems: 'center', justifyContent: 'center', marginTop: 18, gap: 8 },
  mapPlaceholderText: { fontFamily: FONT, color: MUTED, fontSize: 13 },

  // Pricing
  pricingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f0f2f5' },
  pricingInfo: { flex: 1 },
  pricingName: { fontFamily: FONT, color: INK, fontSize: 15, fontWeight: '600' },
  pricingUnit: { fontFamily: FONT, color: MUTED, fontSize: 12, marginTop: 2 },
  pricingInput: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  pricingCurrency: { fontFamily: FONT, color: MUTED, fontSize: 14 },
  pricingValue: { fontFamily: FONT, color: INK, fontSize: 16, fontWeight: '800', width: 50, textAlign: 'right' },

  // Verification
  docRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f0f2f5' },
  docIcon: { width: 42, height: 42, borderRadius: 21, backgroundColor: SOFT, alignItems: 'center', justifyContent: 'center' },
  docIconDone: { backgroundColor: GREEN + '15' },
  docInfo: { flex: 1 },
  docLabel: { fontFamily: FONT, color: INK, fontSize: 15, fontWeight: '600' },
  docStatus: { fontFamily: FONT, color: MUTED, fontSize: 12, marginTop: 2 },
  verifyProgress: { marginTop: 24, alignItems: 'center' },
  verifyBar: { width: '100%', height: 8, borderRadius: 4, backgroundColor: '#e8ecf1' },
  verifyFill: { height: '100%', borderRadius: 4, backgroundColor: GREEN },
  verifyText: { fontFamily: FONT, color: MUTED, fontSize: 13, marginTop: 8 },

  // Schedule cards
  scheduleCard: { backgroundColor: '#f1f3f7', borderRadius: 14, padding: 16, marginBottom: 18 },
  scheduleText: { fontFamily: FONT, color: INK, fontSize: 14, lineHeight: 22 },

  // Revenue / Analytics
  chartCard: { backgroundColor: '#fff', borderRadius: 18, padding: 18, borderWidth: 1.5, borderColor: '#e0e4e9', marginBottom: 14 },
  chartTitle: { fontFamily: FONT, fontSize: 16, fontWeight: '800', color: INK, marginBottom: 16 },
  chartBars: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 100 },
  chartBarCol: { alignItems: 'center', gap: 6, flex: 1 },
  chartBar: { width: 24, borderRadius: 6, backgroundColor: BLUE },
  chartBarLabel: { fontFamily: FONT, fontSize: 11, color: MUTED },

  earningCard: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1.5, borderColor: '#e0e4e9', padding: 16, marginBottom: 10 },
  earningTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  earningOrder: { fontFamily: FONT, color: INK, fontSize: 15, fontWeight: '700' },
  earningBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  earningDate: { fontFamily: FONT, color: MUTED, fontSize: 12 },
  earningAmount: { fontFamily: FONT, color: GREEN, fontSize: 16, fontWeight: '900' },

  analyticsCard: { backgroundColor: '#fff', borderRadius: 18, borderWidth: 1.5, borderColor: '#e0e4e9', padding: 18, marginBottom: 14 },
  analyticsTitle: { fontFamily: FONT, fontSize: 16, fontWeight: '800', color: INK, marginBottom: 14 },
  popularRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  popularName: { fontFamily: FONT, color: INK, fontSize: 13, width: 90 },
  popularBar: { flex: 1, height: 8, borderRadius: 4, backgroundColor: '#e8ecf1' },
  popularFill: { height: '100%', borderRadius: 4, backgroundColor: BLUE },
  popularPct: { fontFamily: FONT, color: MUTED, fontSize: 12, width: 35, textAlign: 'right' },
  satisfactionRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 6 },
  satisfactionScore: { fontFamily: FONT, fontSize: 36, fontWeight: '900', color: INK },
  satisfactionLabel: { fontFamily: FONT, fontSize: 14, color: MUTED },
  satisfactionDetail: { fontFamily: FONT, fontSize: 12, color: MUTED },
  perfRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f0f2f5' },
  perfLabel: { fontFamily: FONT, color: MUTED, fontSize: 14 },
  perfValue: { fontFamily: FONT, color: INK, fontSize: 14, fontWeight: '800' },

  // Menu rows
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: '#f0f2f5' },
  menuRowText: { flex: 1, fontFamily: FONT, color: INK, fontSize: 15, fontWeight: '500' },

  // Profile
  profileBody: { paddingBottom: 90 },
  profileCover: { width: '100%', height: 160, backgroundColor: '#dde6f0' },
  profileMain: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 18, marginTop: -40, gap: 14 },
  profileAvatar: { width: 80, height: 80, borderRadius: 20, borderWidth: 3, borderColor: '#fff', backgroundColor: '#dde6f0' },
  profileInfo: { flex: 1, paddingTop: 44, gap: 3 },
  profileName: { fontFamily: FONT, fontSize: 20, fontWeight: '900', color: INK, letterSpacing: -0.5 },
  profileMeta: { fontFamily: FONT, fontSize: 13, color: MUTED },
  profileRatingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  profileRating: { fontFamily: FONT, color: '#ff9800', fontWeight: '800', fontSize: 14 },
  profileReviews: { fontFamily: FONT, color: MUTED, fontSize: 12 },
  profileCard: { backgroundColor: '#fff', borderRadius: 18, borderWidth: 1.5, borderColor: '#e0e4e9', padding: 18, marginHorizontal: 16, marginTop: 14 },
  profileCardTitle: { fontFamily: FONT, fontSize: 16, fontWeight: '800', color: INK, marginBottom: 10 },
  profileCardText: { fontFamily: FONT, fontSize: 14, color: MUTED, lineHeight: 21 },
  profileDetailRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 },
  profileDetailText: { fontFamily: FONT, fontSize: 14, color: INK },
  hoursRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  hoursDay: { fontFamily: FONT, color: INK, fontSize: 14 },
  hoursTime: { fontFamily: FONT, color: MUTED, fontSize: 14 },
  profileActions: { padding: 16, gap: 10 },
  profileBtn: { marginBottom: 0 },

  // Gallery
  galleryBody: { padding: 16 },
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  galleryImage: { width: '48%', height: 140, borderRadius: 14, backgroundColor: '#dde6f0' },
  galleryAdd: { width: '48%', height: 140, borderRadius: 14, borderWidth: 1.5, borderColor: '#e0e4e9', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 4 },
  galleryAddText: { fontFamily: FONT, color: MUTED, fontSize: 12 },

  // Availability
  availRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f0f2f5' },
  availDay: { fontFamily: FONT, color: INK, fontSize: 15, fontWeight: '600' },
  availTime: { fontFamily: FONT, color: MUTED, fontSize: 14 },
  availClosed: { fontFamily: FONT, color: RED, fontSize: 14, fontWeight: '600' },

  // Messages
  chatRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f0f2f5' },
  chatAvatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#e8f2ff', alignItems: 'center', justifyContent: 'center' },
  chatInitial: { fontFamily: FONT, color: BLUE, fontSize: 18, fontWeight: '800' },
  chatInfo: { flex: 1 },
  chatTop: { flexDirection: 'row', justifyContent: 'space-between' },
  chatName: { fontFamily: FONT, color: INK, fontSize: 15, fontWeight: '700' },
  chatTime: { fontFamily: FONT, color: MUTED, fontSize: 11 },
  chatLast: { fontFamily: FONT, color: MUTED, fontSize: 13, marginTop: 3 },
  chatBadge: { width: 20, height: 20, borderRadius: 10, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center' },
  chatBadgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },

  // Chat
  chatBody: { padding: 16, gap: 10, flexGrow: 1 },
  msg: { padding: 14, borderRadius: 20, maxWidth: '82%' },
  msgMine: { backgroundColor: BLUE, alignSelf: 'flex-end', borderBottomRightRadius: 6 },
  msgTheirs: { backgroundColor: '#fff', alignSelf: 'flex-start', borderBottomLeftRadius: 6, shadowColor: '#8a97a9', shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 },
  msgText: { fontFamily: FONT, color: INK, fontSize: 15, lineHeight: 22 },
  msgMineText: { color: '#fff' },
  msgTime: { fontFamily: FONT, color: MUTED, fontSize: 11, marginTop: 5, textAlign: 'right' },
  composer: { minHeight: 72, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e3e6eb', padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  composerInput: { flex: 1, height: 48, borderRadius: 24, borderWidth: 1.5, borderColor: '#e0e4e9', paddingHorizontal: 16, fontFamily: FONT, color: INK, fontSize: 15 },
  sendBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center' },

  // Notifications
  notifRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f0f2f5' },
  notifUnread: { backgroundColor: '#f0f6ff' },
  notifIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  notifContent: { flex: 1 },
  notifTitle: { fontFamily: FONT, color: INK, fontSize: 14, fontWeight: '700' },
  notifMsg: { fontFamily: FONT, color: MUTED, fontSize: 13, marginTop: 2, lineHeight: 18 },
  notifTime: { fontFamily: FONT, color: MUTED, fontSize: 11, marginTop: 4 },
  notifDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: BLUE, marginTop: 6 },

  // Settings
  settingsBody: { padding: 18, paddingBottom: 90 },
  settingsGroup: { backgroundColor: '#fff', borderRadius: 18, borderWidth: 1.5, borderColor: '#e0e4e9', marginBottom: 14, overflow: 'hidden' },
  settingsRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#f0f2f5' },
  settingsRowIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#e8f2ff', alignItems: 'center', justifyContent: 'center' },
  settingsRowText: { flex: 1, fontFamily: FONT, color: INK, fontSize: 15, fontWeight: '500' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 52, borderRadius: 16, borderWidth: 1.5, borderColor: '#e0e4e9', backgroundColor: '#fff', marginTop: 8 },
  logoutText: { fontFamily: FONT, color: RED, fontWeight: '700', fontSize: 15 },

  // Support
  supportHeader: { alignItems: 'center', paddingVertical: 24, gap: 8 },
  supportTitle: { fontFamily: FONT, fontSize: 20, fontWeight: '900', color: INK },
  supportSub: { fontFamily: FONT, fontSize: 14, color: MUTED, textAlign: 'center', lineHeight: 20 },
  supportContact: { backgroundColor: '#f0f6ff', borderRadius: 16, padding: 18, marginTop: 20, alignItems: 'center', gap: 4 },
  supportContactTitle: { fontFamily: FONT, fontSize: 14, fontWeight: '700', color: INK, marginBottom: 4 },
  supportContactText: { fontFamily: FONT, fontSize: 14, color: BLUE },

  // Empty state
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 80, gap: 12 },
  emptyText: { fontFamily: FONT, color: MUTED, fontSize: 16 },
});

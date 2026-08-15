import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Platform, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';

export const BLUE = '#0967ce';
const BLUE_DARK = '#0756b3';
export const INK = '#202124';
export const MUTED = '#687284';
export const PAGE = '#f6f8fc';
const CARD = '#ffffff';
const SOFT = '#f0f3f8';
export const GREEN = '#22a861';
export const RED = '#dc3545';
export const ORANGE = '#f5820d';
const FONT = Platform.select({
  ios: 'Avenir LT Std',
  android: 'Avenir LT Std',
  web: "'Avenir LT Std', 'Avenir Next', Arial, sans-serif",
});

export type ProviderScreen =
  | 'onboard1' | 'onboard2' | 'onboard3' | 'onboard4' | 'onboard5' | 'onboard6'
  | 'dashboard' | 'orders' | 'orderDetail' | 'activeOrders' | 'completedOrders'
  | 'services' | 'addService' | 'editService'
  | 'revenue' | 'earnings' | 'analytics'
  | 'profile' | 'editProfile' | 'gallery' | 'availability'
  | 'messages' | 'provChat' | 'notifications'
  | 'settings' | 'support';

export function statusColor(status: string) {
  if (status === 'Completed') return GREEN;
  if (status === 'Cancelled') return RED;
  if (status === 'Pending') return ORANGE;
  return BLUE;
}

export function money(v: number) { return `US$${v.toFixed(2)}`; }

export function Page({ children, bottom, style }: { children: React.ReactNode; bottom?: React.ReactNode; style?: object }) {
  return <SafeAreaView style={[s.page, style]}><StatusBar style="dark" />{children}{bottom}</SafeAreaView>;
}
export function Icon({ name, size, color }: { name: string; size: number; color: string }) { return <SymbolView name={{ ios: name as never, android: name as never, web: name as never }} size={size} tintColor={color} />; }
export function IconBtn({ name, onPress, style }: { name: string; onPress: () => void; style?: object }) { return <Pressable onPress={onPress} hitSlop={12} style={[s.iconBtn, style]}><Icon name={name} size={24} color={BLUE} /></Pressable>; }
export function Header({ title, subtitle, onBack, right }: { title: string; subtitle?: string; onBack: () => void; right?: React.ReactNode }) { return <View style={s.header}><IconBtn name="arrow_back" onPress={onBack} style={s.headerBack} /><View style={s.headerText}><Text style={s.headerTitle}>{title}</Text>{subtitle && <Text style={s.headerSub}>{subtitle}</Text>}</View>{right}</View>; }
export function Btn({ label, onPress, style, secondary }: { label: string; onPress: () => void; style?: object; secondary?: boolean }) { return <Pressable onPress={onPress} style={({ pressed }) => [secondary ? s.btnSec : s.btn, style, pressed && s.pressed]}><Text style={secondary ? s.btnSecText : s.btnText}>{label}</Text></Pressable>; }
export function BottomBtn({ label, onPress }: { label: string; onPress: () => void }) { return <View style={s.bottomBtn}><Btn label={label} onPress={onPress} /></View>; }
export function StatCard({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) { return <View style={s.statCard}><View style={[s.statIcon, { backgroundColor: color + '18' }]}><Icon name={icon} size={22} color={color} /></View><Text style={s.statValue}>{value}</Text><Text style={s.statLabel}>{label}</Text></View>; }
export function SectionHead({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) { return <View style={s.sectionHead}><Text style={s.sectionHeadText}>{title}</Text>{action && <Pressable onPress={onAction}><Text style={s.sectionAction}>{action}</Text></Pressable>}</View>; }
export function Pill({ label, color }: { label: string; color?: string }) { const c = color || BLUE; return <View style={[s.pill, { backgroundColor: c + '15' }]}><Text style={[s.pillText, { color: c }]}>{label}</Text></View>; }
export function InputField({ label, value, onChangeText, placeholder, multiline, keyboardType }: { label: string; value: string; onChangeText: (t: string) => void; placeholder?: string; multiline?: boolean; keyboardType?: string }) { return <View style={s.inputGroup}><Text style={s.inputLabel}>{label}</Text><TextInput style={[s.input, multiline && s.inputMulti]} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={MUTED} multiline={multiline} keyboardType={keyboardType as any} /></View>; }
export function TabBar({ active, go }: { active: string; go: (s: string) => void }) {
  const tabs: [string, string, string][] = [['Dashboard', 'dashboard', 'Dashboard'], ['Orders', 'inventory_2', 'Orders'], ['Services', 'local_laundry_service', 'Services'], ['Revenue', 'account_balance_wallet', 'Revenue'], ['Profile', 'person_outline', 'Profile']];
  return <View style={s.tabBar}>{tabs.map(([label, icon, target]) => <Pressable key={label} onPress={() => go(target)} style={s.tab}><Icon name={icon} size={22} color={active === label ? BLUE : '#8da0bb'} /><Text style={[s.tabText, active === label && s.tabActive]}>{label}</Text></Pressable>)}</View>;
}

export const s = StyleSheet.create({
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

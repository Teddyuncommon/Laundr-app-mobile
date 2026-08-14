export type ServiceKey = 'wash' | 'iron' | 'duvet' | 'dry' | 'student';
export type OrderStatus = 'In the wash' | 'Out for delivery' | 'Ready';
export type ProviderOrderStatus = 'Pending' | 'Accepted' | 'Pickup Scheduled' | 'In Progress' | 'Ready' | 'Out for Delivery' | 'Completed' | 'Cancelled';

export type ProviderOrder = {
  id: string;
  customer: string;
  customerPhone: string;
  service: string;
  load: number;
  pickupAddress: string;
  deliveryAddress: string;
  status: ProviderOrderStatus;
  payment: string;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  total: number;
  placed: string;
  slot: string;
  notes: string;
  rating?: number;
  review?: string;
  completedAt?: string;
};

export type ProviderService = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  turnaround: string;
  category: string;
  enabled: boolean;
  image?: string;
};

export type ProviderEarning = {
  id: string;
  orderId: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Processing';
  method: string;
};

export type ProviderNotification = {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'order' | 'payment' | 'review' | 'system';
  read: boolean;
  time: string;
};

export type ProviderProfile = {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  image: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  businessType: string;
  category: string;
  registrationNumber: string;
  operatingHours: { day: string; open: string; close: string; closed: boolean }[];
  pickupEnabled: boolean;
  deliveryEnabled: boolean;
  pickupFee: number;
  deliveryFee: number;
  maxDeliveryDistance: number;
  serviceRadius: number;
  citiesServed: string[];
  verified: boolean;
  vacationMode: boolean;
};

export type Provider = {
  id: string;
  name: string;
  neighbourhood: string;
  distance: number;
  rating: number;
  image: string;
  services: string[];
  turnaround: string;
  address: string;
};

export type LaundrOrder = {
  id: string;
  provider: string;
  service: string;
  load: number;
  collection: string;
  delivery: string;
  slot: string;
  address: string;
  payment: string;
  total: number;
  status: OrderStatus;
  placed: string;
};

export const providers: Provider[] = [
  {
    id: 'swiftwash',
    name: 'SwiftWash & Dry',
    neighbourhood: 'Mount Pleasant',
    distance: 1.2,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=600&q=85',
    services: ['Wash & Fold', 'Dry Cleaning', 'Curtain Cleaning'],
    turnaround: '24-48 hours',
    address: '27 Arundel Office Park, Mount Pleasant',
  },
  {
    id: 'avondale',
    name: 'Avondale Laundry',
    neighbourhood: 'Avondale',
    distance: 2.4,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=600&q=85',
    services: ['Wash & Fold', 'Wash & Iron', 'Blankets Cleaning'],
    turnaround: '24-48 hours',
    address: '8 King George Road, Avondale',
  },
  {
    id: 'mt-pleasant',
    name: 'Mt Pleasant Laundry',
    neighbourhood: 'Mount Pleasant',
    distance: 0.8,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=85',
    services: ['Wash & Fold', 'Student Bundle', 'Duvet & Blankets'],
    turnaround: '24-36 hours',
    address: '14 Churchill Avenue, Mount Pleasant',
  },
  {
    id: 'freshfold',
    name: 'FreshFold Express',
    neighbourhood: 'Borrowdale',
    distance: 4.1,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=600&q=85',
    services: ['Wash & Fold', 'Wash & Iron', 'Dry Cleaning'],
    turnaround: '12-24 hours',
    address: '3 Borrowdale Road, Borrowdale',
  },
  {
    id: 'sparkle',
    name: 'Sparkle Laundry Hub',
    neighbourhood: 'Eastlea',
    distance: 3.5,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=600&q=85',
    services: ['Wash & Fold', 'Wash & Iron', 'Curtain Cleaning', 'Dry Cleaning'],
    turnaround: '24-48 hours',
    address: '45 Baines Avenue, Eastlea',
  },
  {
    id: 'cleanslate',
    name: 'CleanSlate Laundry',
    neighbourhood: 'Marlborough',
    distance: 5.2,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?auto=format&fit=crop&w=600&q=85',
    services: ['Wash & Fold', 'Student Bundle', 'Blankets Cleaning'],
    turnaround: '36-48 hours',
    address: '12 Dowall Road, Marlborough',
  },
  {
    id: 'pristine',
    name: 'Pristine Dry Cleaners',
    neighbourhood: 'Highlands',
    distance: 3.8,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=600&q=85',
    services: ['Dry Cleaning', 'Wash & Iron', 'Curtain Cleaning'],
    turnaround: '48-72 hours',
    address: '9 Enterprise Road, Highlands',
  },
  {
    id: 'campuswash',
    name: 'CampusWash UZ',
    neighbourhood: 'Mount Pleasant',
    distance: 1.5,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1469504512102-900f29606341?auto=format&fit=crop&w=600&q=85',
    services: ['Student Bundle', 'Wash & Fold', 'Wash & Iron'],
    turnaround: '24 hours',
    address: 'New Complex, University of Zimbabwe',
  },
];

export const serviceCatalog: { key: ServiceKey; name: string; duration: string; unit: string; price: number }[] = [
  { key: 'wash', name: 'Wash & Fold', duration: '24 hrs', unit: 'per kg', price: 3 },
  { key: 'iron', name: 'Wash & Iron', duration: '24 hrs', unit: 'per kg', price: 5 },
  { key: 'duvet', name: 'Duvet & Blankets', duration: '48 hrs', unit: 'per item', price: 11 },
  { key: 'dry', name: 'Dry Cleaning', duration: '72 hrs', unit: 'per item', price: 8 },
  { key: 'student', name: 'Student Bundle', duration: '36 hrs', unit: 'per bundle', price: 9 },
];

export const seedOrders: LaundrOrder[] = [
  {
    id: 'LDR-10428', provider: 'Sparkle Laundry Hub', service: 'Wash & Iron', load: 6,
    collection: 'Pickup from me', delivery: 'Deliver to me', slot: 'Today, 16:00 - 18:00',
    address: '12 Bosman Rd, Mt Pleasant', payment: 'EcoCash', total: 30, status: 'In the wash', placed: 'Today, 08:15',
  },
  {
    id: 'LDR-10412', provider: 'FreshFold Avondale', service: 'Dry Cleaning', load: 3,
    collection: 'Pickup from me', delivery: 'Deliver to me', slot: 'Today, 12:00 - 14:00',
    address: '8 King George Rd, Avondale', payment: 'Card', total: 27, status: 'Out for delivery', placed: 'Today, 07:42',
  },
];

export const providerProfile: ProviderProfile = {
  id: 'swiftwash',
  name: 'SwiftWash & Dry',
  description: 'Premium laundry services with eco-friendly detergents and state-of-the-art European machinery. We treat every garment with care.',
  email: 'hello@swiftwash.co.zw',
  phone: '+263 77 234 5678',
  address: '27 Arundel Office Park',
  city: 'Harare',
  province: 'Harare Metropolitan',
  image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=600&q=85',
  coverImage: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=85',
  rating: 4.9,
  reviewCount: 212,
  yearsExperience: 10,
  businessType: 'Laundry & Dry Cleaning',
  category: 'Premium',
  registrationNumber: 'ZW-2019-44821',
  operatingHours: [
    { day: 'Monday', open: '08:00', close: '19:00', closed: false },
    { day: 'Tuesday', open: '08:00', close: '19:00', closed: false },
    { day: 'Wednesday', open: '08:00', close: '19:00', closed: false },
    { day: 'Thursday', open: '08:00', close: '19:00', closed: false },
    { day: 'Friday', open: '08:00', close: '19:00', closed: false },
    { day: 'Saturday', open: '09:00', close: '17:00', closed: false },
    { day: 'Sunday', open: '10:00', close: '16:00', closed: false },
  ],
  pickupEnabled: true,
  deliveryEnabled: true,
  pickupFee: 2,
  deliveryFee: 2,
  maxDeliveryDistance: 10,
  serviceRadius: 8,
  citiesServed: ['Harare', 'Chitungwiza'],
  verified: true,
  vacationMode: false,
};

export const providerServices: ProviderService[] = [
  { id: 'ps-1', name: 'Wash & Fold', description: 'Includes sorting, washing, and professional folding', price: 3, unit: 'per kg', turnaround: '24 hrs', category: 'Washing', enabled: true },
  { id: 'ps-2', name: 'Wash & Iron', description: 'Crisp steam ironing for all garment types', price: 5, unit: 'per kg', turnaround: '24 hrs', category: 'Washing', enabled: true },
  { id: 'ps-3', name: 'Dry Cleaning', description: 'Eco-friendly solvents for delicate fabrics', price: 8, unit: 'per item', turnaround: '72 hrs', category: 'Dry Cleaning', enabled: true },
  { id: 'ps-4', name: 'Duvet & Blankets', description: 'Deep wash and fluff for large items', price: 11, unit: 'per item', turnaround: '48 hrs', category: 'Specialty', enabled: true },
  { id: 'ps-5', name: 'Student Bundle', description: 'Affordable laundry packs for students', price: 9, unit: 'per bundle', turnaround: '36 hrs', category: 'Bundles', enabled: true },
  { id: 'ps-6', name: 'Curtain Cleaning', description: 'Professional curtain washing and pressing', price: 15, unit: 'per pair', turnaround: '72 hrs', category: 'Specialty', enabled: false },
];

export const providerOrders: ProviderOrder[] = [
  { id: 'LDR-10428', customer: 'Anesu Marimo', customerPhone: '+263 77 123 4567', service: 'Wash & Iron', load: 6, pickupAddress: '12 Bosman Rd, Mt Pleasant', deliveryAddress: '12 Bosman Rd, Mt Pleasant', status: 'In Progress', payment: 'EcoCash', paymentStatus: 'Paid', total: 30, placed: 'Today, 08:15', slot: 'Today, 16:00 - 18:00', notes: 'Iron the two blue shirts separately' },
  { id: 'LDR-10425', customer: 'Tapiwa Zvobgo', customerPhone: '+263 78 456 7890', service: 'Dry Cleaning', load: 4, pickupAddress: '45 Churchill Ave, Mt Pleasant', deliveryAddress: '45 Churchill Ave, Mt Pleasant', status: 'Pending', payment: 'Card', paymentStatus: 'Paid', total: 32, placed: 'Today, 09:30', slot: 'Today, 14:00 - 16:00', notes: '' },
  { id: 'LDR-10422', customer: 'Chiedza Nyambe', customerPhone: '+263 71 789 0123', service: 'Wash & Fold', load: 8, pickupAddress: '8 King George Rd, Avondale', deliveryAddress: '8 King George Rd, Avondale', status: 'Pickup Scheduled', payment: 'EcoCash', paymentStatus: 'Paid', total: 24, placed: 'Today, 07:45', slot: 'Today, 10:00 - 12:00', notes: 'Separate whites from colours' },
  { id: 'LDR-10419', customer: 'Simba Mutasa', customerPhone: '+263 77 321 6543', service: 'Wash & Iron', load: 5, pickupAddress: '22 Selous Ave, Harare CBD', deliveryAddress: '22 Selous Ave, Harare CBD', status: 'Ready', payment: 'Cash on delivery', paymentStatus: 'Pending', total: 25, placed: 'Yesterday, 14:20', slot: 'Today, 08:00 - 10:00', notes: '' },
  { id: 'LDR-10416', customer: 'Rudo Chikwanha', customerPhone: '+263 78 654 3210', service: 'Student Bundle', load: 1, pickupAddress: 'New Complex Block C, UZ', deliveryAddress: 'New Complex Block C, UZ', status: 'Completed', payment: 'EcoCash', paymentStatus: 'Paid', total: 9, placed: '2 days ago', slot: 'Yesterday, 16:00 - 18:00', notes: '', rating: 5, review: 'Fast and very clean!', completedAt: 'Yesterday, 17:30' },
  { id: 'LDR-10413', customer: 'Tatenda Moyo', customerPhone: '+263 71 111 2233', service: 'Duvet & Blankets', load: 2, pickupAddress: '5 Borrowdale Rd', deliveryAddress: '5 Borrowdale Rd', status: 'Completed', payment: 'Card', paymentStatus: 'Paid', total: 22, placed: '3 days ago', slot: '3 days ago, 10:00 - 12:00', notes: 'Handle with care, silk duvet', rating: 4, review: 'Good quality, slightly late delivery', completedAt: '2 days ago, 14:00' },
  { id: 'LDR-10410', customer: 'Farai Ndlovu', customerPhone: '+263 77 999 8877', service: 'Wash & Fold', load: 10, pickupAddress: '14 Josiah Tongogara Ave', deliveryAddress: '14 Josiah Tongogara Ave', status: 'Completed', payment: 'EcoCash', paymentStatus: 'Paid', total: 30, placed: '4 days ago', slot: '4 days ago, 08:00 - 10:00', notes: '', rating: 5, review: 'Excellent service as always', completedAt: '3 days ago, 09:00' },
  { id: 'LDR-10407', customer: 'Grace Mapfumo', customerPhone: '+263 78 444 5566', service: 'Dry Cleaning', load: 3, pickupAddress: '9 Enterprise Rd, Highlands', deliveryAddress: '9 Enterprise Rd, Highlands', status: 'Cancelled', payment: 'Card', paymentStatus: 'Failed', total: 24, placed: '5 days ago', slot: '4 days ago, 14:00 - 16:00', notes: 'Customer cancelled' },
];

export const providerEarnings: ProviderEarning[] = [
  { id: 'e-1', orderId: 'LDR-10428', amount: 28.50, date: 'Today', status: 'Pending', method: 'EcoCash' },
  { id: 'e-2', orderId: 'LDR-10416', amount: 8.55, date: 'Yesterday', status: 'Completed', method: 'EcoCash' },
  { id: 'e-3', orderId: 'LDR-10413', amount: 20.90, date: '2 days ago', status: 'Completed', method: 'Bank Transfer' },
  { id: 'e-4', orderId: 'LDR-10410', amount: 28.50, date: '3 days ago', status: 'Completed', method: 'EcoCash' },
  { id: 'e-5', orderId: 'LDR-10405', amount: 47.50, date: '4 days ago', status: 'Completed', method: 'Bank Transfer' },
  { id: 'e-6', orderId: 'LDR-10401', amount: 14.25, date: '5 days ago', status: 'Completed', method: 'EcoCash' },
];

export const providerNotifications: ProviderNotification[] = [
  { id: 'n-1', title: 'New Booking', message: 'Tapiwa Z. booked Dry Cleaning (4 items)', type: 'booking', read: false, time: '2 min ago' },
  { id: 'n-2', title: 'Payment Received', message: 'US$30.00 received for order LDR-10428', type: 'payment', read: false, time: '1 hr ago' },
  { id: 'n-3', title: 'New Review', message: 'Rudo C. rated you 5 stars', type: 'review', read: true, time: '3 hrs ago' },
  { id: 'n-4', title: 'Order Completed', message: 'Order LDR-10416 marked as delivered', type: 'order', read: true, time: 'Yesterday' },
  { id: 'n-5', title: 'Weekly Summary', message: 'You earned US$148.20 this week. 12 orders completed.', type: 'system', read: true, time: '2 days ago' },
];

/**
 * Small async repository used by the UI. It keeps all booking mutations in one
 * place, so replacing its methods with Supabase calls is a single-file change.
 */
export const laundrApi = {
  async listProviders() {
    return providers;
  },
  async listOrders() {
    return seedOrders;
  },
  async createOrder(input: Omit<LaundrOrder, 'id' | 'placed' | 'status'>): Promise<LaundrOrder> {
    const order: LaundrOrder = {
      ...input,
      id: `LDR-${10461 + seedOrders.length}`,
      placed: 'Just now',
      status: 'In the wash',
    };
    seedOrders.unshift(order);
    return order;
  },
  async getProviderOrders() { return providerOrders; },
  async getProviderServices() { return providerServices; },
  async getProviderEarnings() { return providerEarnings; },
  async getProviderNotifications() { return providerNotifications; },
  async getProviderProfile() { return providerProfile; },
};

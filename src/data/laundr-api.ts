export type ServiceKey = 'wash' | 'iron' | 'duvet' | 'dry' | 'student';
export type OrderStatus = 'In the wash' | 'Out for delivery' | 'Ready';

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
    image: 'https://images.unsplash.com/photo-1610557892470-b8b7e8b5a7fe?auto=format&fit=crop&w=600&q=85',
    services: ['Dry Cleaning', 'Curtain Cleaning', 'Blankets Cleaning'],
    turnaround: '24-48 hours',
    address: '27 Arundel Office Park, Mount Pleasant',
  },
  {
    id: 'avondale',
    name: 'Avondale Laundry',
    neighbourhood: 'Avondale',
    distance: 1.2,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=600&q=85',
    services: ['Dry Cleaning', 'Curtain Cleaning', 'Blankets Cleaning'],
    turnaround: '24-48 hours',
    address: '8 King George Road, Avondale',
  },
  {
    id: 'mt-pleasant',
    name: 'Mt Pleasant Laundry',
    neighbourhood: 'Mount Pleasant',
    distance: 1.2,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=85',
    services: ['Dry Cleaning', 'Curtain Cleaning', 'Blankets Cleaning'],
    turnaround: '24-48 hours',
    address: '14 Churchill Avenue, Mount Pleasant',
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
};

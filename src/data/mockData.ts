export type Provider = {
  id: string;
  name: string;
  distance: number;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  neighbourhood: string;
  services: string[];
  availability: string;
};

export type ServiceKey = 'wash' | 'dry' | 'iron' | 'fold';
export type LaundrOrder = {
  id: string;
  providerId: string;
  serviceId: ServiceKey;
  status: 'Booking accepted' | 'Laundry collected' | 'In the wash' | 'Ready' | 'Out for delivery';
  total: number;
  placedAt: string;
};

export const seedProviders: Provider[] = [
  { id: 'p1', name: 'Wash & Fold Kings', distance: 1.2, rating: 4.8, reviews: 124, price: 12, image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f', neighbourhood: 'Downtown', services: ['Wash', 'Fold', 'Dry Cleaning'], availability: 'Today' },
  { id: 'p2', name: 'Fresh Laundry', distance: 2.5, rating: 4.5, reviews: 89, price: 10, image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c', neighbourhood: 'Uptown', services: ['Wash', 'Iron'], availability: 'Tomorrow' },
];

export const seedOrders: LaundrOrder[] = [
  { id: '8821', providerId: 'p1', serviceId: 'wash', status: 'In the wash', total: 24.0, placedAt: new Date().toISOString() }
];

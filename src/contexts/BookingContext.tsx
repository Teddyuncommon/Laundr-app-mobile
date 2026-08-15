import React, { createContext, useContext, useState } from 'react';
import { Provider, LaundrOrder, serviceCatalog } from '@/data/laundr-api';

export type Booking = {
  provider: Provider | null;
  service: typeof serviceCatalog[number] | null;
  load: number;
  instructions: string;
  collection: 'pickup' | 'dropoff' | null;
  delivery: 'deliver' | 'collect' | null;
  date: string | null;
  slot: string | null;
  address: string;
  payment: 'ecocash' | 'card' | 'cash' | null;
};

const defaultBooking: Booking = {
  provider: null,
  service: null,
  load: 4,
  instructions: '',
  collection: null,
  delivery: null,
  date: null,
  slot: null,
  address: '',
  payment: null,
};

type BookingContextType = {
  booking: Booking;
  setBooking: React.Dispatch<React.SetStateAction<Booking>>;
  updateBooking: (fields: Partial<Booking>) => void;
  resetBooking: () => void;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  selectedOrder: LaundrOrder | null;
  setSelectedOrder: (order: LaundrOrder | null) => void;
  selectedProvider: Provider | null;
  selectProvider: (provider: Provider) => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<Booking>(defaultBooking);
  const [selectedOrder, setSelectedOrder] = useState<LaundrOrder | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  const updateBooking = (fields: Partial<Booking>) => {
    setBooking(prev => ({ ...prev, ...fields }));
  };

  const resetBooking = () => {
    setBooking(defaultBooking);
    setSelectedProvider(null);
  };

  const selectProvider = (provider: Provider) => {
    setSelectedProvider(provider);
    setBooking(prev => ({ ...prev, provider }));
  };

  const subtotal = booking.service ? booking.service.price * booking.load : 0;
  const deliveryFee = booking.collection === 'pickup' ? 2 : 0;
  const serviceFee = Math.round(subtotal * 0.05 * 100) / 100;
  const total = subtotal + deliveryFee + serviceFee;

  return (
    <BookingContext.Provider value={{
      booking, setBooking, updateBooking, resetBooking,
      subtotal, deliveryFee, serviceFee, total,
      selectedOrder, setSelectedOrder,
      selectedProvider, selectProvider,
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
}

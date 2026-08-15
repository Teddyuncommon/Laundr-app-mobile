import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Provider, LaundrOrder, ProviderOrder, ProviderService, ProviderEarning,
  ProviderNotification, ProviderProfile,
  providers as seedProviders, seedOrders, providerOrders as seedProviderOrders,
  providerServices as seedProviderServices, providerEarnings as seedProviderEarnings,
  providerNotifications as seedProviderNotifications, providerProfile as seedProviderProfile,
  serviceCatalog, laundrApi,
} from '@/data/laundr-api';

export type Notification = {
  id: string;
  title: string;
  body: string;
  date: Date;
  read: boolean;
};

type DataContextType = {
  providers: Provider[];
  orders: LaundrOrder[];
  notifications: Notification[];
  providerOrders: ProviderOrder[];
  providerServices: ProviderService[];
  providerEarnings: ProviderEarning[];
  providerNotifications: ProviderNotification[];
  providerProfile: ProviderProfile;
  bookService: (order: Partial<LaundrOrder>) => Promise<LaundrOrder>;
  updateOrderStatus: (orderId: string, status: string) => void;
  updateProviderOrderStatus: (orderId: string, status: string) => void;
  markNotificationRead: (id: string) => void;
  markProviderNotificationRead: (id: string) => void;
  toggleService: (serviceId: string) => void;
  addService: (service: Omit<ProviderService, 'id'>) => void;
  updateService: (id: string, data: Partial<ProviderService>) => void;
  deleteService: (id: string) => void;
  updateProviderProfile: (data: Partial<ProviderProfile>) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [providers] = useState<Provider[]>(seedProviders);
  const [orders, setOrders] = useState<LaundrOrder[]>(seedOrders);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Welcome to Laundr!', body: 'Your digital laundry concierge is ready.', date: new Date(), read: false },
    { id: '2', title: 'Student Friday', body: 'Free campus pickup at UZ & HIT this Friday!', date: new Date(), read: false },
  ]);
  const [providerOrders, setProviderOrders] = useState<ProviderOrder[]>(seedProviderOrders);
  const [providerServices, setProviderServices] = useState<ProviderService[]>(seedProviderServices);
  const [providerEarnings] = useState<ProviderEarning[]>(seedProviderEarnings);
  const [providerNotifications, setProviderNotifications] = useState<ProviderNotification[]>(seedProviderNotifications);
  const [providerProfile, setProviderProfile] = useState<ProviderProfile>(seedProviderProfile);

  const bookService = useCallback(async (input: Partial<LaundrOrder>): Promise<LaundrOrder> => {
    await new Promise(r => setTimeout(r, 1000));
    const order: LaundrOrder = {
      id: `LDR-${10500 + orders.length}`,
      provider: input.provider || 'Unknown',
      service: input.service || 'Wash & Fold',
      load: input.load || 4,
      collection: input.collection || 'Pickup from me',
      delivery: input.delivery || 'Deliver to me',
      slot: input.slot || 'Today, 16:00 - 18:00',
      address: input.address || '12 Bosman Rd, Mt Pleasant',
      payment: input.payment || 'EcoCash',
      total: input.total || 0,
      status: 'In the wash',
      placed: 'Just now',
    };
    setOrders(prev => [order, ...prev]);
    setNotifications(prev => [{
      id: 'n-' + Date.now(),
      title: 'Booking Confirmed',
      body: `Your ${order.service} order with ${order.provider} has been placed.`,
      date: new Date(),
      read: false,
    }, ...prev]);
    return order;
  }, [orders.length]);

  const updateOrderStatus = useCallback((orderId: string, status: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: status as LaundrOrder['status'] } : o));
  }, []);

  const updateProviderOrderStatus = useCallback((orderId: string, status: string) => {
    setProviderOrders(prev => prev.map(o =>
      o.id === orderId ? { ...o, status: status as ProviderOrder['status'] } : o
    ));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markProviderNotificationRead = useCallback((id: string) => {
    setProviderNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const toggleService = useCallback((serviceId: string) => {
    setProviderServices(prev => prev.map(s => s.id === serviceId ? { ...s, enabled: !s.enabled } : s));
  }, []);

  const addService = useCallback((service: Omit<ProviderService, 'id'>) => {
    setProviderServices(prev => [...prev, { ...service, id: 'ps-' + Date.now() }]);
  }, []);

  const updateService = useCallback((id: string, data: Partial<ProviderService>) => {
    setProviderServices(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  }, []);

  const deleteService = useCallback((id: string) => {
    setProviderServices(prev => prev.filter(s => s.id !== id));
  }, []);

  const updateProviderProfile = useCallback((data: Partial<ProviderProfile>) => {
    setProviderProfile(prev => ({ ...prev, ...data }));
  }, []);

  return (
    <DataContext.Provider value={{
      providers, orders, notifications,
      providerOrders, providerServices, providerEarnings,
      providerNotifications, providerProfile,
      bookService, updateOrderStatus, updateProviderOrderStatus,
      markNotificationRead, markProviderNotificationRead,
      toggleService, addService, updateService, deleteService,
      updateProviderProfile,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within a DataProvider');
  return context;
}

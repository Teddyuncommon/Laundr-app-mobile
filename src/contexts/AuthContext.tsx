import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, useSegments } from 'expo-router';

export type UserRole = 'customer' | 'provider';

export type User = {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone?: string;
  businessName?: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  pendingRole: UserRole | null;
  setPendingRole: (role: UserRole | null) => void;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (data: Partial<User> & { password?: string }) => Promise<{ error?: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ error?: string }>;
  verifyOtp: (code: string) => Promise<{ error?: string }>;
  resetPassword: (password: string) => Promise<{ error?: string }>;
  updateProfile: (data: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_ACCOUNTS = [
  { email: 'testcustomer@laundr.com', password: '123456', user: { id: 'c1', email: 'testcustomer@laundr.com', role: 'customer' as UserRole, firstName: 'Anesu', lastName: 'Marimo', phone: '+263 77 123 4567' } },
  { email: 'testprovider@laundr.com', password: '123456', user: { id: 'p1', email: 'testprovider@laundr.com', role: 'provider' as UserRole, firstName: 'SwiftWash', lastName: 'Admin', businessName: 'SwiftWash & Dry', phone: '+263 77 234 5678' } },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const inAuthGroup = segments[0] === '(auth)';
    const atRoot = (segments as string[]).length === 0 || segments[0] === undefined;

    if (!user && !inAuthGroup && !atRoot) {
      router.replace('/');
    } else if (user && (inAuthGroup || atRoot)) {
      if (user.role === 'customer') router.replace('/(customer)/home');
      else if (user.role === 'provider') router.replace('/(provider)/dashboard');
    }
  }, [user, segments, isLoading]);

  const login = useCallback(async (email: string, password: string): Promise<{ error?: string }> => {
    await new Promise(r => setTimeout(r, 800));
    const demo = DEMO_ACCOUNTS.find(a => a.email === email.toLowerCase().trim());
    if (demo) {
      if (demo.password !== password) return { error: 'Invalid password' };
      setUser(demo.user);
      return {};
    }
    if (password.length < 6) return { error: 'Invalid credentials' };
    setUser({
      id: 'u-' + Date.now(),
      email: email.trim(),
      role: email.includes('provider') ? 'provider' : 'customer',
      firstName: email.split('@')[0],
      lastName: 'User',
    });
    return {};
  }, []);

  const register = useCallback(async (data: Partial<User> & { password?: string }): Promise<{ error?: string }> => {
    await new Promise(r => setTimeout(r, 800));
    if (!data.email) return { error: 'Email is required' };
    if (!data.password || data.password.length < 6) return { error: 'Password must be at least 6 characters' };
    setUser({
      id: 'u-' + Date.now(),
      email: data.email,
      role: data.role || pendingRole || 'customer',
      firstName: data.firstName || 'New',
      lastName: data.lastName || 'User',
      phone: data.phone,
      businessName: data.businessName,
    });
    return {};
  }, [pendingRole]);

  const logout = useCallback(() => {
    setUser(null);
    router.replace('/');
  }, [router]);

  const forgotPassword = useCallback(async (email: string): Promise<{ error?: string }> => {
    await new Promise(r => setTimeout(r, 600));
    if (!email.includes('@')) return { error: 'Invalid email address' };
    return {};
  }, []);

  const verifyOtp = useCallback(async (code: string): Promise<{ error?: string }> => {
    await new Promise(r => setTimeout(r, 600));
    if (code.length !== 6) return { error: 'Please enter a 6-digit code' };
    if (code === '000000') return { error: 'Invalid code' };
    return {};
  }, []);

  const resetPassword = useCallback(async (password: string): Promise<{ error?: string }> => {
    await new Promise(r => setTimeout(r, 600));
    if (password.length < 6) return { error: 'Password must be at least 6 characters' };
    return {};
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user, isLoading, pendingRole, setPendingRole,
      login, register, logout,
      forgotPassword, verifyOtp, resetPassword, updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

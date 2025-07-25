import React, { createContext, useContext, useEffect, useState } from 'react';
import Purchases, { CustomerInfo, PurchasesOffering } from 'react-native-purchases';
import { SubscriptionState } from '../types';

interface RevenueCatContextType {
  subscriptionState: SubscriptionState;
  offerings: PurchasesOffering | null;
  purchasePackage: (packageToPurchase: any) => Promise<void>;
  restorePurchases: () => Promise<void>;
}

const RevenueCatContext = createContext<RevenueCatContextType | undefined>(undefined);

export function RevenueCatProvider({ children }: { children: React.ReactNode }) {
  const [subscriptionState, setSubscriptionState] = useState<SubscriptionState>({
    isPro: false,
    isLoading: true,
    error: null,
  });
  const [offerings, setOfferings] = useState<PurchasesOffering | null>(null);

  useEffect(() => {
    initializeRevenueCat();
  }, []);

  const initializeRevenueCat = async () => {
    try {
      // Initialize RevenueCat with your API key
      await Purchases.configure({
        apiKey: 'your_revenuecat_public_api_key', // Replace with your actual key
      });

      // Get initial customer info
      const customerInfo = await Purchases.getCustomerInfo();
      updateSubscriptionState(customerInfo);

      // Get available offerings
      const offerings = await Purchases.getOfferings();
      if (offerings.current) {
        setOfferings(offerings.current);
      }
    } catch (error) {
      console.error('RevenueCat initialization error:', error);
      setSubscriptionState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to initialize subscription service',
      }));
    }
  };

  const updateSubscriptionState = (customerInfo: CustomerInfo) => {
    const isPro = customerInfo.entitlements.active['pro'] !== undefined;
    
    setSubscriptionState({
      isPro,
      isLoading: false,
      error: null,
    });
  };

  const purchasePackage = async (packageToPurchase: any) => {
    try {
      setSubscriptionState(prev => ({ ...prev, isLoading: true }));
      
      const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
      updateSubscriptionState(customerInfo);
    } catch (error: any) {
      setSubscriptionState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Purchase failed',
      }));
    }
  };

  const restorePurchases = async () => {
    try {
      setSubscriptionState(prev => ({ ...prev, isLoading: true }));
      
      const customerInfo = await Purchases.restorePurchases();
      updateSubscriptionState(customerInfo);
    } catch (error: any) {
      setSubscriptionState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Restore failed',
      }));
    }
  };

  return (
    <RevenueCatContext.Provider value={{
      subscriptionState,
      offerings,
      purchasePackage,
      restorePurchases,
    }}>
      {children}
    </RevenueCatContext.Provider>
  );
}

export const useRevenueCat = () => {
  const context = useContext(RevenueCatContext);
  if (!context) {
    throw new Error('useRevenueCat must be used within RevenueCatProvider');
  }
  return context;
};
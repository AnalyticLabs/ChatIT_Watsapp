export interface User {
  id: number;
  email: string;
  firstName?: string;
  fullName?: string;
  lastName?: string;
  role?: string;
  avatar?: string;
  phoneNumber?: string;
  address?: string;
  dob?: string;
}

export interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'inactive' | 'cancelled';
  startDate: string;
  endDate?: string;
  features: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UserState {
  profile: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface SubscriptionState {
  currentSubscription: Subscription | null;
  isLoading: boolean;
  error: string | null;
  plans: Array<{
    id: string;
    name: string;
    price: number;
    features: string[];
  }>;
}

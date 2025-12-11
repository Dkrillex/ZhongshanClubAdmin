export enum MemberTier {
  REGULAR = '普通会员',
  GOLD = '金卡会员',
  DIAMOND = '钻石会员',
  LIFETIME = '终身荣誉会员'
}

export interface GolfBag {
  id: string;
  brand: string;
  tagNumber: string;
  location: string;
  status: 'stored' | 'in_use';
}

export interface Address {
  id: string;
  label: string; // e.g. "Company", "Home"
  detail: string;
  recipient: string;
  phone: string;
}

export interface InvoiceInfo {
  id: string;
  title: string;
  taxId: string;
  bank?: string;
  account?: string;
  address?: string;
  phone?: string;
  isDefault: boolean;
}

export interface Member {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  phone: string;
  tier: MemberTier;
  balance: number;
  handicap: number;
  avatar: string;
  joinDate: string;
  bags: GolfBag[];
  addresses: Address[];
  invoices: InvoiceInfo[];
  status: 'active' | 'suspended';
}

export interface Booking {
  id: string;
  courseName: string; // e.g., "Arnold Palmer Course"
  teeTime: string;
  playerCount: number;
  carts: number;
  caddies: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

export interface Transaction {
  id: string;
  date: string;
  type: 'green_fee' | 'restaurant' | 'pro_shop' | 'top_up';
  amount: number;
  description: string;
  memberId?: string;
  memberName?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  available: boolean;
  image?: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon: React.ReactNode;
  color: string;
}

export interface DrivingBay {
  id: string;
  number: number;
  status: 'available' | 'in_use' | 'maintenance';
  startTime?: string;
  customer?: string;
}

export interface GolfCart {
  id: string;
  number: string;
  status: 'available' | 'in_use' | 'charging' | 'maintenance';
  batteryLevel: number;
  location: string;
}

export interface Coupon {
  id: string;
  name: string;
  type: 'discount' | 'cash' | 'service';
  value: string;
  expiryDate: string;
  description: string;
  status: 'active' | 'expired';
}

// Staff Management Types
export type PermissionModule = 'member' | 'course' | 'finance' | 'staff' | 'marketing' | 'settings';
export type PermissionAction = 'read' | 'write' | 'delete';

export interface StaffPermission {
  module: PermissionModule;
  actions: PermissionAction[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: StaffPermission[];
}

export interface Staff {
  id: string;
  name: string;
  employeeId: string;
  avatar: string;
  phone: string;
  email: string;
  department: string;
  role: string; // Role name
  status: 'active' | 'inactive' | 'leave';
  joinDate: string;
}

import { Member, MemberTier, Transaction, Booking, Staff, Role } from './types';

export const MOCK_MEMBERS: Member[] = [
  {
    id: 'M001',
    name: '张伟',
    gender: 'Male',
    phone: '13800138000',
    tier: MemberTier.DIAMOND,
    balance: 58000.00,
    handicap: 12.5,
    avatar: 'https://picsum.photos/100/100?random=1',
    joinDate: '2018-05-20',
    status: 'active',
    bags: [
      { id: 'B001', brand: 'Honma', tagNumber: 'A-101', location: '库房A区', status: 'stored' },
      { id: 'B002', brand: 'Titleist', tagNumber: 'A-102', location: '库房A区', status: 'in_use' }
    ],
    addresses: [
      { id: 'A001', label: '公司', detail: '中山市东区中山四路88号', recipient: '张总', phone: '13800138000' }
    ],
    invoices: [
      { id: 'I001', title: '中山市伟业贸易有限公司', taxId: '91442000XXXXXXXXXX', isDefault: true }
    ]
  },
  {
    id: 'M002',
    name: '李秀英',
    gender: 'Female',
    phone: '13912345678',
    tier: MemberTier.GOLD,
    balance: 12500.50,
    handicap: 24.0,
    avatar: 'https://picsum.photos/100/100?random=2',
    joinDate: '2020-11-11',
    status: 'active',
    bags: [
       { id: 'B003', brand: 'XXIO', tagNumber: 'B-205', location: '库房B区', status: 'stored' }
    ],
    addresses: [],
    invoices: []
  },
  {
    id: 'M003',
    name: '王强',
    gender: 'Male',
    phone: '13698765432',
    tier: MemberTier.REGULAR,
    balance: 3200.00,
    handicap: 18.2,
    avatar: 'https://picsum.photos/100/100?random=3',
    joinDate: '2023-01-15',
    status: 'suspended',
    bags: [],
    addresses: [],
    invoices: []
  }
];

export const RECENT_TRANSACTIONS: Transaction[] = [
  { id: 'T001', date: '2023-10-27 14:30', type: 'restaurant', amount: -450.00, description: '温泉餐厅消费' },
  { id: 'T002', date: '2023-10-27 09:00', type: 'green_fee', amount: -1280.00, description: '18洞果岭费' },
  { id: 'T003', date: '2023-10-26 18:00', type: 'top_up', amount: 50000.00, description: '会员充值' },
  { id: 'T004', date: '2023-10-25 10:15', type: 'pro_shop', amount: -3200.00, description: '购买球杆' },
];

export const TODAY_BOOKINGS: Booking[] = [
  { id: 'BK01', courseName: '阿诺帕玛场 (A场)', teeTime: '08:00', playerCount: 4, carts: 2, caddies: 4, status: 'completed' },
  { id: 'BK02', courseName: '杰克尼克劳斯场 (B场)', teeTime: '08:15', playerCount: 3, carts: 2, caddies: 3, status: 'in_progress' }, 
  { id: 'BK03', courseName: '阿诺帕玛场 (A场)', teeTime: '09:30', playerCount: 4, carts: 2, caddies: 4, status: 'confirmed' },
  { id: 'BK04', courseName: '阿诺帕玛场 (A场)', teeTime: '13:00', playerCount: 2, carts: 1, caddies: 2, status: 'confirmed' },
] as any;

export const MENU_ITEMS = [
  { id: 'F001', name: '海南鸡饭', category: '主食', price: 68, available: true },
  { id: 'F002', name: '印尼炒饭', category: '主食', price: 78, available: true },
  { id: 'F003', name: '冻柠茶', category: '饮品', price: 28, available: true },
  { id: 'F004', name: '公司三文治', category: '小吃', price: 58, available: true },
];

export const MOCK_STAFF: Staff[] = [
  {
    id: 'S001',
    name: '陈管理员',
    employeeId: 'EMP001',
    avatar: 'https://picsum.photos/100/100?random=50',
    phone: '13800000001',
    email: 'admin@golf.com',
    department: '总经办',
    role: '超级管理员',
    status: 'active',
    joinDate: '2015-01-01'
  },
  {
    id: 'S002',
    name: '李前台',
    employeeId: 'EMP002',
    avatar: 'https://picsum.photos/100/100?random=51',
    phone: '13800000002',
    email: 'reception@golf.com',
    department: '前厅部',
    role: '前台主管',
    status: 'active',
    joinDate: '2019-03-15'
  },
  {
    id: 'S003',
    name: '王财务',
    employeeId: 'EMP003',
    avatar: 'https://picsum.photos/100/100?random=52',
    phone: '13800000003',
    email: 'finance@golf.com',
    department: '财务部',
    role: '财务经理',
    status: 'active',
    joinDate: '2018-06-20'
  },
  {
    id: 'S004',
    name: '赵球童',
    employeeId: 'EMP004',
    avatar: 'https://picsum.photos/100/100?random=53',
    phone: '13800000004',
    email: 'caddie.mgr@golf.com',
    department: '运作部',
    role: '球童经理',
    status: 'leave',
    joinDate: '2021-11-01'
  }
];

export const MOCK_ROLES: Role[] = [
  {
    id: 'R001',
    name: '超级管理员',
    description: '拥有系统所有权限',
    permissions: [
      { module: 'member', actions: ['read', 'write', 'delete'] },
      { module: 'course', actions: ['read', 'write', 'delete'] },
      { module: 'finance', actions: ['read', 'write', 'delete'] },
      { module: 'staff', actions: ['read', 'write', 'delete'] },
      { module: 'settings', actions: ['read', 'write', 'delete'] }
    ]
  },
  {
    id: 'R002',
    name: '前台主管',
    description: '负责前台接待与会员日常管理',
    permissions: [
      { module: 'member', actions: ['read', 'write'] },
      { module: 'course', actions: ['read', 'write'] },
      { module: 'finance', actions: ['read'] }
    ]
  },
  {
    id: 'R003',
    name: '财务经理',
    description: '负责财务审核与报表',
    permissions: [
      { module: 'member', actions: ['read'] },
      { module: 'finance', actions: ['read', 'write', 'delete'] },
      { module: 'course', actions: ['read'] }
    ]
  }
];

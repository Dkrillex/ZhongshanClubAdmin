import React from 'react';
import { 
  Users, 
  Flag, 
  Car, 
  Utensils, 
  Receipt, 
  Ticket, 
  LayoutDashboard, 
  Settings,
  Target,
  Briefcase
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MENU_ITEMS = [
  { path: '/', label: '概览仪表盘', icon: <LayoutDashboard size={20} /> },
  { path: '/members', label: '会员管理', icon: <Users size={20} /> },
  { path: '/course', label: '球场管理', icon: <Flag size={20} /> },
  { path: '/driving-range', label: '练习场管理', icon: <Target size={20} /> },
  { path: '/vehicles', label: '车辆管理', icon: <Car size={20} /> },
  { path: '/restaurant', label: '餐厅管理', icon: <Utensils size={20} /> },
  { path: '/finance', label: '账单与财务', icon: <Receipt size={20} /> },
  { path: '/staff', label: '员工与权限', icon: <Briefcase size={20} /> },
  { path: '/coupons', label: '优惠券管理', icon: <Ticket size={20} /> },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white text-slate-600 h-screen flex flex-col fixed left-0 top-0 z-20 shadow-xl border-r border-slate-100">
      <div className="p-6 border-b border-slate-100 flex items-center space-x-3">
        <div className="w-8 h-8 bg-golf-600 rounded-lg flex items-center justify-center font-bold text-white shadow-golf">
          Z
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wide text-slate-800">中山温泉高尔夫</h1>
          <p className="text-xs text-slate-400">后台管理系统 v1.0</p>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-golf-50 text-golf-700 font-semibold shadow-sm' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className={isActive ? 'text-golf-600' : 'text-slate-400'}>{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className="flex items-center space-x-3 text-slate-500 hover:text-slate-800 transition-colors w-full px-4 py-2 hover:bg-slate-50 rounded-lg">
          <Settings size={20} />
          <span>系统设置</span>
        </button>
      </div>
    </div>
  );
};

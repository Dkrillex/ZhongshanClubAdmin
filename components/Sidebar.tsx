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
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 z-20 shadow-xl">
      <div className="p-6 border-b border-slate-700 flex items-center space-x-3">
        <div className="w-8 h-8 bg-golf-500 rounded-full flex items-center justify-center font-bold text-white">
          Z
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wide">中山温泉高尔夫</h1>
          <p className="text-xs text-slate-400">后台管理系统 v1.0</p>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-6 py-3 transition-colors ${
                    isActive 
                      ? 'bg-golf-600 text-white border-r-4 border-golf-300' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors w-full px-2 py-2">
          <Settings size={20} />
          <span>系统设置</span>
        </button>
      </div>
    </div>
  );
};

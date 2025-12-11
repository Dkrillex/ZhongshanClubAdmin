import React from 'react';
import { Bell, Search, UserCircle } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-96">
        <Search size={18} className="text-gray-400 mr-2" />
        <input 
          type="text" 
          placeholder="搜索会员、订单或功能..." 
          className="bg-transparent border-none outline-none text-sm w-full text-gray-700"
        />
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative p-2 text-gray-500 hover:text-golf-600 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">管理员</p>
            <p className="text-xs text-gray-500">运营部</p>
          </div>
          <UserCircle size={32} className="text-golf-600" />
        </div>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { MENU_ITEMS } from '../constants';
import { MenuItem } from '../types';
import { Utensils, Coffee, Edit, Plus, ToggleLeft, ToggleRight, ChefHat } from 'lucide-react';

const TABLES = Array.from({ length: 12 }, (_, i) => ({
    id: `T${i + 1}`,
    seats: i < 4 ? 4 : i < 8 ? 6 : 10,
    status: Math.random() > 0.7 ? 'occupied' : 'empty' as 'occupied' | 'empty'
}));

export const RestaurantManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tables' | 'menu'>('tables');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);

  const toggleAvailability = (id: string) => {
    setMenuItems(prev => prev.map(item => 
        item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">餐厅管理</h2>
        <div className="flex bg-gray-100 p-1 rounded-lg">
             <button
                onClick={() => setActiveTab('tables')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center ${activeTab === 'tables' ? 'bg-white shadow-sm text-golf-700' : 'text-gray-500'}`}
             >
                <Utensils size={16} className="mr-2"/> 堂食台位
             </button>
             <button
                onClick={() => setActiveTab('menu')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center ${activeTab === 'menu' ? 'bg-white shadow-sm text-golf-700' : 'text-gray-500'}`}
             >
                <ChefHat size={16} className="mr-2"/> 菜品管理
             </button>
        </div>
      </div>

      {activeTab === 'tables' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {TABLES.map(table => (
                <div key={table.id} className={`p-6 rounded-xl border-2 flex flex-col items-center justify-center aspect-square transition-all ${table.status === 'occupied' ? 'bg-orange-50 border-orange-200' : 'bg-white border-dashed border-gray-300 hover:border-golf-400'}`}>
                    <span className="text-2xl font-bold text-gray-700 mb-2">{table.id}</span>
                    <span className="text-sm text-gray-500 mb-4">{table.seats} 人座</span>
                    {table.status === 'occupied' ? (
                        <div className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-bold rounded-full">用餐中</div>
                    ) : (
                        <span className="text-sm text-green-600 font-medium">空闲</span>
                    )}
                </div>
            ))}
        </div>
      )}

      {activeTab === 'menu' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-700">全日制菜单</h3>
                <button className="flex items-center px-3 py-1.5 bg-golf-600 text-white rounded-lg text-sm hover:bg-golf-700">
                    <Plus size={16} className="mr-1"/> 新增菜品
                </button>
             </div>
             <table className="w-full text-left">
                 <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase">
                     <tr>
                         <th className="px-6 py-3">菜品名称</th>
                         <th className="px-6 py-3">分类</th>
                         <th className="px-6 py-3">价格</th>
                         <th className="px-6 py-3">状态</th>
                         <th className="px-6 py-3 text-right">操作</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                     {menuItems.map(item => (
                         <tr key={item.id} className="hover:bg-gray-50">
                             <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                             <td className="px-6 py-4 text-sm text-gray-500">
                                 <span className="px-2 py-1 bg-gray-100 rounded text-xs">{item.category}</span>
                             </td>
                             <td className="px-6 py-4 text-gray-700 font-mono">¥{item.price}</td>
                             <td className="px-6 py-4">
                                <button 
                                    onClick={() => toggleAvailability(item.id)}
                                    className={`flex items-center space-x-2 text-sm ${item.available ? 'text-green-600' : 'text-gray-400'}`}
                                >
                                    {item.available ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                                    <span>{item.available ? '供应中' : '已售罄'}</span>
                                </button>
                             </td>
                             <td className="px-6 py-4 text-right">
                                 <button className="text-gray-400 hover:text-blue-600"><Edit size={18}/></button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
          </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Battery, BatteryCharging, BatteryWarning, Zap, Wrench, Search, Filter } from 'lucide-react';
import { GolfCart } from '../types';

const MOCK_CARTS: GolfCart[] = Array.from({ length: 20 }, (_, i) => {
  const rand = Math.random();
  let status: GolfCart['status'] = 'available';
  let batteryLevel = Math.floor(Math.random() * 60) + 40; // 40-100%

  if (rand > 0.6) {
    status = 'in_use';
    batteryLevel = Math.floor(Math.random() * 50) + 20;
  } else if (rand > 0.85) {
    status = 'charging';
    batteryLevel = Math.floor(Math.random() * 80);
  } else if (rand > 0.95) {
    status = 'maintenance';
    batteryLevel = 0;
  }

  return {
    id: `cart-${i}`,
    number: `C-${100 + i}`,
    status,
    batteryLevel,
    location: status === 'in_use' ? 'A场 5号洞' : '车库'
  };
});

export const VehicleManagement: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'available' | 'charging' | 'maintenance'>('all');

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'bg-green-500';
    if (level > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredCarts = MOCK_CARTS.filter(c => filter === 'all' || c.status === filter);

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">车辆管理</h2>
          <p className="text-sm text-gray-500">球车总数: {MOCK_CARTS.length} | 可用: {MOCK_CARTS.filter(c => c.status === 'available').length}</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-lg">
            {['all', 'available', 'charging', 'maintenance'].map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                        filter === f 
                        ? 'bg-white text-golf-700 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {f === 'all' && '全部'}
                    {f === 'available' && '可用'}
                    {f === 'charging' && '充电中'}
                    {f === 'maintenance' && '维护'}
                </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCarts.map((cart) => (
            <div key={cart.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-lg font-bold text-gray-700 border border-gray-200">
                            {cart.number}
                        </div>
                        <div>
                            <div className="text-xs text-gray-400">位置</div>
                            <div className="font-medium text-gray-800 text-sm">{cart.location}</div>
                        </div>
                    </div>
                    {cart.status === 'in_use' && <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">使用中</span>}
                    {cart.status === 'available' && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">可用</span>}
                    {cart.status === 'charging' && <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded font-medium flex items-center"><Zap size={10} className="mr-1"/>充电中</span>}
                    {cart.status === 'maintenance' && <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded font-medium">维护中</span>}
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                        <span className="flex items-center">
                            {cart.status === 'charging' ? <BatteryCharging size={14} className="mr-1"/> : <Battery size={14} className="mr-1"/>}
                            电量
                        </span>
                        <span className="font-mono">{cart.batteryLevel}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-500 ${getBatteryColor(cart.batteryLevel)}`} 
                            style={{ width: `${cart.batteryLevel}%` }}
                        ></div>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                     <button className="text-xs text-gray-500 hover:text-golf-600 font-medium">查看详情</button>
                     {cart.status === 'maintenance' ? (
                         <button className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100">结束维护</button>
                     ) : (
                        <button className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded hover:bg-gray-100 flex items-center">
                            <Wrench size={12} className="mr-1"/> 报修
                        </button>
                     )}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

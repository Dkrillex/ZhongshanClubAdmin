import React, { useState } from 'react';
import { Clock, User, Play, Square, AlertCircle } from 'lucide-react';
import { DrivingBay } from '../types';

const MOCK_BAYS: DrivingBay[] = Array.from({ length: 30 }, (_, i) => {
  const statusRandom = Math.random();
  let status: DrivingBay['status'] = 'available';
  let startTime = undefined;
  let customer = undefined;

  if (statusRandom > 0.7) {
    status = 'in_use';
    startTime = '10:30';
    customer = '张先生';
  } else if (statusRandom > 0.95) {
    status = 'maintenance';
  }

  return {
    id: `bay-${i + 1}`,
    number: i + 1,
    status,
    startTime,
    customer
  };
});

export const DrivingRangeManagement: React.FC = () => {
  const [bays, setBays] = useState<DrivingBay[]>(MOCK_BAYS);

  const getStatusColor = (status: DrivingBay['status']) => {
    switch (status) {
      case 'available': return 'bg-white border-gray-200 hover:border-golf-500';
      case 'in_use': return 'bg-golf-50 border-golf-500';
      case 'maintenance': return 'bg-gray-100 border-gray-200 opacity-60';
    }
  };

  const activeCount = bays.filter(b => b.status === 'in_use').length;
  const availableCount = bays.filter(b => b.status === 'available').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">练习场管理</h2>
          <p className="text-sm text-gray-500">当前使用率: {Math.round((activeCount / bays.length) * 100)}%</p>
        </div>
        <div className="flex space-x-3">
             <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                <div className="w-3 h-3 bg-golf-500 rounded-full"></div>
                <span className="text-sm font-medium">使用中: {activeCount}</span>
             </div>
             <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                <div className="w-3 h-3 bg-white border border-gray-400 rounded-full"></div>
                <span className="text-sm font-medium">空闲: {availableCount}</span>
             </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {bays.map((bay) => (
          <div 
            key={bay.id} 
            className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between h-32 ${getStatusColor(bay.status)}`}
          >
            <div className="flex justify-between items-start">
              <span className={`text-lg font-bold ${bay.status === 'in_use' ? 'text-golf-700' : 'text-gray-700'}`}>
                {bay.number}号
              </span>
              {bay.status === 'maintenance' && <AlertCircle size={16} className="text-gray-400" />}
              {bay.status === 'in_use' && <div className="animate-pulse w-2 h-2 bg-green-500 rounded-full"></div>}
            </div>

            {bay.status === 'in_use' ? (
              <div className="mt-2">
                <div className="flex items-center text-sm text-golf-800 font-medium mb-1">
                  <User size={14} className="mr-1" />
                  {bay.customer}
                </div>
                <div className="flex items-center text-xs text-golf-600 bg-golf-100 rounded px-1.5 py-0.5 w-fit">
                  <Clock size={12} className="mr-1" />
                  {bay.startTime} 开始
                </div>
              </div>
            ) : bay.status === 'available' ? (
               <div className="flex justify-center items-center h-full pb-4 text-gray-300">
                  <Play size={24} />
               </div>
            ) : (
                <div className="text-xs text-gray-400 mt-2">维护中</div>
            )}
            
            {/* Hover Action Overlay (Concept) */}
          </div>
        ))}
      </div>
    </div>
  );
};

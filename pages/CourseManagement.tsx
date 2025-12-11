import React from 'react';
import { Clock, User, CheckCircle } from 'lucide-react';
import { TODAY_BOOKINGS } from '../constants';

const TIMESLOTS = [
  '07:00', '07:15', '07:30', '07:45', 
  '08:00', '08:15', '08:30', '08:45',
  '09:00', '09:15', '09:30', '09:45',
  '10:00', '10:15', '10:30', '10:45',
];

export const CourseManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">球场管理</h2>
          <p className="text-sm text-gray-500">今日: 2023-10-27 (周五) - 天气: 晴朗 24°C</p>
        </div>
        <div className="flex space-x-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 shadow-sm">
                封场维护设置
            </button>
            <button className="px-4 py-2 bg-golf-600 text-white rounded-lg shadow-sm hover:bg-golf-700">
                + 新增预订
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* A Course */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 bg-golf-50 border-b border-golf-100 flex justify-between items-center">
                <h3 className="font-bold text-golf-900">A场 (阿诺帕玛)</h3>
                <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full font-medium">正常运营</span>
            </div>
            <div className="divide-y divide-gray-100">
                {TIMESLOTS.map(time => {
                    const booking = TODAY_BOOKINGS.find(b => b.teeTime === time && b.courseName.includes('A场'));
                    return (
                        <div key={`A-${time}`} className="flex group hover:bg-gray-50 transition-colors">
                            <div className="w-20 py-3 text-center border-r border-gray-100 text-sm font-mono text-gray-500 flex items-center justify-center">
                                {time}
                            </div>
                            <div className="flex-1 p-2">
                                {booking ? (
                                    <div className={`rounded-lg p-2 border flex justify-between items-center ${booking.status === 'confirmed' ? 'bg-blue-50 border-blue-200' : 'bg-gray-100 border-gray-200 opacity-60'}`}>
                                        <div className="flex items-center space-x-2">
                                            <User size={16} className="text-gray-500"/>
                                            <span className="font-medium text-sm text-gray-800">{booking.playerCount}人组</span>
                                            <span className="text-xs text-gray-500">| 球车 {booking.carts} | 球童 {booking.caddies}</span>
                                        </div>
                                        <div className="text-xs font-semibold px-2 py-0.5 rounded bg-white text-gray-600 border border-gray-200">
                                            {booking.id}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex items-center pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="text-xs bg-gray-100 hover:bg-golf-100 hover:text-golf-700 text-gray-500 px-3 py-1 rounded">
                                            + 预订
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* B Course */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 bg-orange-50 border-b border-orange-100 flex justify-between items-center">
                <h3 className="font-bold text-orange-900">B场 (杰克尼克劳斯)</h3>
                <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full font-medium">正常运营</span>
            </div>
            <div className="divide-y divide-gray-100">
                {TIMESLOTS.map(time => {
                    const booking = TODAY_BOOKINGS.find(b => b.teeTime === time && b.courseName.includes('B场'));
                    return (
                        <div key={`B-${time}`} className="flex group hover:bg-gray-50 transition-colors">
                            <div className="w-20 py-3 text-center border-r border-gray-100 text-sm font-mono text-gray-500 flex items-center justify-center">
                                {time}
                            </div>
                            <div className="flex-1 p-2">
                                {booking ? (
                                    <div className="rounded-lg p-2 border bg-blue-50 border-blue-200 flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <User size={16} className="text-gray-500"/>
                                            <span className="font-medium text-sm text-gray-800">{booking.playerCount}人组</span>
                                        </div>
                                        <div className="text-xs font-semibold px-2 py-0.5 rounded bg-white text-gray-600 border border-gray-200">
                                            {booking.id}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex items-center pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="text-xs bg-gray-100 hover:bg-golf-100 hover:text-golf-700 text-gray-500 px-3 py-1 rounded">
                                            + 预订
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>
    </div>
  );
};

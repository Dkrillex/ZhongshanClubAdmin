import React from 'react';
import { Coupon } from '../types';
import { Ticket, Plus, Clock, Gift } from 'lucide-react';

const MOCK_COUPONS: Coupon[] = [
    { id: 'C001', name: '果岭费 5折券', type: 'discount', value: '50% OFF', expiryDate: '2023-12-31', description: '仅限平日使用，节假日不可用', status: 'active' },
    { id: 'C002', name: '餐饮现金券', type: 'cash', value: '¥ 100', expiryDate: '2023-11-30', description: '满300元可用', status: 'active' },
    { id: 'C003', name: '免费租车券', type: 'service', value: '1次', expiryDate: '2023-12-31', description: '18洞租车服务', status: 'active' },
    { id: 'C004', name: '嘉宾体验券', type: 'service', value: '全免', expiryDate: '2023-10-01', description: '已过期', status: 'expired' },
];

export const CouponManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">优惠券管理</h2>
        <button className="px-4 py-2 bg-golf-600 text-white rounded-lg shadow-sm hover:bg-golf-700 flex items-center">
            <Plus size={18} className="mr-2"/> 创建优惠券
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_COUPONS.map(coupon => (
              <div key={coupon.id} className={`relative bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col ${coupon.status === 'expired' ? 'opacity-60 grayscale border-gray-200' : 'border-golf-100'}`}>
                  {/* Coupon Visual Header */}
                  <div className={`h-24 p-6 text-white flex justify-between items-center ${coupon.status === 'expired' ? 'bg-gray-400' : 'bg-gradient-to-r from-golf-500 to-golf-600'}`}>
                      <div>
                          <div className="font-bold text-2xl">{coupon.value}</div>
                          <div className="text-sm opacity-90">{coupon.name}</div>
                      </div>
                      <Gift size={32} className="opacity-80"/>
                  </div>
                  
                  {/* Dashed Line */}
                  <div className="relative h-4 bg-white">
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                          <div className="w-full border-t-2 border-dashed border-gray-300"></div>
                      </div>
                      <div className="absolute left-[-10px] top-[-10px] w-6 h-6 bg-gray-50 rounded-full"></div>
                      <div className="absolute right-[-10px] top-[-10px] w-6 h-6 bg-gray-50 rounded-full"></div>
                  </div>

                  <div className="p-6 pt-2 flex-1 flex flex-col justify-between">
                      <div>
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                              <Ticket size={12} className="mr-1"/> {coupon.type === 'discount' ? '折扣券' : coupon.type === 'cash' ? '代金券' : '服务券'}
                          </div>
                          <p className="text-sm text-gray-600">{coupon.description}</p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                          <div className="flex items-center text-xs text-red-500">
                              <Clock size={12} className="mr-1"/> 有效期至 {coupon.expiryDate}
                          </div>
                          {coupon.status === 'active' && (
                              <button className="text-xs bg-golf-50 text-golf-700 px-3 py-1.5 rounded-full font-medium hover:bg-golf-100">
                                  发放
                              </button>
                          )}
                      </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};

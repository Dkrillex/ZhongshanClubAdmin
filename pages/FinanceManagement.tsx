import React from 'react';
import { RECENT_TRANSACTIONS } from '../constants';
import { Transaction } from '../types';
import { TrendingUp, TrendingDown, Download, Filter, Receipt } from 'lucide-react';

const EXTENDED_TRANSACTIONS: Transaction[] = [
    ...RECENT_TRANSACTIONS.map(t => ({ ...t, memberName: '张伟', memberId: 'M001' })),
    { id: 'T005', date: '2023-10-25 09:30', type: 'green_fee', amount: -980.00, description: '9洞果岭费', memberName: '李秀英', memberId: 'M002' },
    { id: 'T006', date: '2023-10-24 20:00', type: 'restaurant', amount: -1250.00, description: '商务晚宴', memberName: '王强', memberId: 'M003' },
    { id: 'T007', date: '2023-10-24 14:00', type: 'top_up', amount: 10000.00, description: '会员充值', memberName: '张伟', memberId: 'M001' },
] as Transaction[];

export const FinanceManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">账单与财务</h2>
        <div className="flex space-x-3">
             <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 shadow-sm flex items-center">
                 <Download size={16} className="mr-2"/> 导出报表
             </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">本月总营收</p>
            <h3 className="text-3xl font-bold text-gray-800">¥ 1,245,800</h3>
            <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp size={16} className="mr-1"/> +12.5% 较上月
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">今日充值流水</p>
            <h3 className="text-3xl font-bold text-blue-600">¥ 85,000</h3>
            <div className="flex items-center mt-2 text-sm text-gray-400">
                <span>12 笔充值</span>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">待结算账单</p>
            <h3 className="text-3xl font-bold text-orange-600">8 笔</h3>
            <div className="flex items-center mt-2 text-sm text-gray-400">
                <span>总额 ¥ 3,420</span>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
             <h3 className="font-bold text-gray-700 flex items-center">
                 <Receipt size={18} className="mr-2"/> 交易明细
             </h3>
             <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                 <Filter size={16} className="mr-1"/> 筛选
             </button>
        </div>
        <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase">
                <tr>
                    <th className="px-6 py-4">时间 / 单号</th>
                    <th className="px-6 py-4">会员</th>
                    <th className="px-6 py-4">类型</th>
                    <th className="px-6 py-4">描述</th>
                    <th className="px-6 py-4 text-right">金额</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {EXTENDED_TRANSACTIONS.map(t => (
                    <tr key={t.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                            <div className="font-medium text-gray-800">{t.date}</div>
                            <div className="text-xs text-gray-400">{t.id}</div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="font-medium text-gray-800">{t.memberName}</div>
                            <div className="text-xs text-gray-400">{t.memberId}</div>
                        </td>
                        <td className="px-6 py-4">
                             <span className={`px-2 py-1 rounded text-xs font-medium 
                                ${t.type === 'green_fee' ? 'bg-green-100 text-green-700' : 
                                  t.type === 'restaurant' ? 'bg-orange-100 text-orange-700' :
                                  t.type === 'top_up' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                {t.type === 'green_fee' && '果岭费'}
                                {t.type === 'restaurant' && '餐饮'}
                                {t.type === 'pro_shop' && '专卖店'}
                                {t.type === 'top_up' && '充值'}
                             </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{t.description}</td>
                        <td className={`px-6 py-4 text-right font-mono font-medium ${t.amount > 0 ? 'text-blue-600' : 'text-gray-800'}`}>
                            {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

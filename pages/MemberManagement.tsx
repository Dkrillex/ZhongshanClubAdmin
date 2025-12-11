import React, { useState } from 'react';
import { MOCK_MEMBERS } from '../constants';
import { Member } from '../types';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  MapPin, 
  CreditCard, 
  ShoppingBag, 
  Activity, 
  X,
  UserCircle
} from 'lucide-react';

export const MemberManagement: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'balance' | 'bags' | 'handicap' | 'invoice'>('profile');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'suspended': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">会员管理</h2>
        <button className="bg-golf-600 hover:bg-golf-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors">
          + 新增会员
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
        <div className="flex-1 relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索姓名、电话、会员卡号..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golf-500"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
          <Filter size={18} />
          <span>筛选</span>
        </button>
      </div>

      {/* Member Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-1">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">会员信息</th>
              <th className="px-6 py-4">等级</th>
              <th className="px-6 py-4">余额</th>
              <th className="px-6 py-4">差点</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_MEMBERS.map((member) => (
              <tr 
                key={member.id} 
                onClick={() => setSelectedMember(member)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-gray-900">{member.name}</div>
                      <div className="text-xs text-gray-500">{member.id} | {member.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">
                    {member.tier}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-gray-700">
                  ¥ {member.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-gray-800">{member.handicap}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                    {member.status === 'active' ? '正常' : '停权'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-golf-600">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
            onClick={() => setSelectedMember(null)}
          ></div>
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl overflow-hidden flex flex-col animate-slide-in-right">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-golf-50">
              <div className="flex items-center space-x-4">
                <img src={selectedMember.avatar} alt="" className="w-16 h-16 rounded-full border-2 border-white shadow-md" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedMember.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                    <span>{selectedMember.tier}</span>
                    <span>•</span>
                    <span>ID: {selectedMember.id}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMember(null)}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 px-6 space-x-6">
              {[
                { id: 'profile', label: '详细信息', icon: <UserCircle size={18} /> }, // Icon defined below for map
                { id: 'balance', label: '账户余额', icon: <CreditCard size={18} /> },
                { id: 'bags', label: '球包管理', icon: <ShoppingBag size={18} /> },
                { id: 'handicap', label: '差点记录', icon: <Activity size={18} /> },
                { id: 'invoice', label: '发票信息', icon: <MapPin size={18} /> }, // Reusing MapPin icon visually for address/invoice group
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 text-sm font-medium flex items-center space-x-2 border-b-2 transition-colors ${
                    activeTab === tab.id 
                      ? 'border-golf-600 text-golf-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-gray-800 mb-4">基本信息</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-1">
                        <label className="text-gray-500">手机号码</label>
                        <p className="font-medium">{selectedMember.phone}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-gray-500">性别</label>
                        <p className="font-medium">{selectedMember.gender === 'Male' ? '男' : '女'}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-gray-500">入会日期</label>
                        <p className="font-medium">{selectedMember.joinDate}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-gray-500">会员状态</label>
                        <p className="font-medium text-green-600">正常</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center justify-between">
                      <span>常用地址</span>
                      <button className="text-xs text-golf-600">+ 新增</button>
                    </h4>
                    {selectedMember.addresses.length > 0 ? (
                      selectedMember.addresses.map(addr => (
                        <div key={addr.id} className="p-3 bg-gray-50 rounded mb-2 border border-gray-100">
                          <div className="flex justify-between">
                            <span className="font-bold text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-700">{addr.label}</span>
                          </div>
                          <p className="text-sm mt-1">{addr.detail}</p>
                          <p className="text-xs text-gray-500 mt-1">{addr.recipient} {addr.phone}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">暂无地址记录</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'bags' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-800">存包记录 ({selectedMember.bags.length})</h4>
                    <button className="text-sm text-white bg-golf-600 px-3 py-1 rounded">存入新包</button>
                  </div>
                  {selectedMember.bags.map((bag) => (
                    <div key={bag.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-800">{bag.brand}</p>
                        <p className="text-sm text-gray-500">吊牌号: {bag.tagNumber}</p>
                        <p className="text-xs text-gray-400 mt-1">位置: {bag.location}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${bag.status === 'stored' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                        {bag.status === 'stored' ? '在库' : '使用中'}
                      </span>
                    </div>
                  ))}
                  {selectedMember.bags.length === 0 && (
                     <div className="text-center py-10 text-gray-400">该会员名下无球包</div>
                  )}
                </div>
              )}

              {activeTab === 'balance' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-white shadow-lg">
                    <p className="text-gray-400 text-sm mb-1">当前余额</p>
                    <h3 className="text-3xl font-bold">¥ {selectedMember.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                    <div className="mt-4 flex space-x-3">
                      <button className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm transition-colors border border-white/10">充值</button>
                      <button className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm transition-colors border border-white/10">退款</button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">近期交易</h4>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100">
                      {[1,2,3].map(i => (
                        <div key={i} className="p-4 flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-800">果岭费消费</p>
                            <p className="text-xs text-gray-400">2023-10-27 10:30</p>
                          </div>
                          <span className="text-red-600 font-medium">- ¥1,280.00</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'handicap' && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                  <h3 className="text-4xl font-bold text-golf-600 mb-2">{selectedMember.handicap}</h3>
                  <p className="text-gray-500">当前差点指数</p>
                  <hr className="my-6 border-gray-100"/>
                  <p className="text-sm text-gray-400 mb-4">最近5场成绩趋势</p>
                  <div className="h-32 flex items-end justify-center space-x-2">
                    {[82, 85, 79, 81, 78].map((score, idx) => (
                       <div key={idx} className="flex flex-col items-center space-y-1">
                          <div className="w-8 bg-golf-200 rounded-t" style={{ height: `${(score - 70) * 3}px`}}></div>
                          <span className="text-xs text-gray-500">{score}</span>
                       </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-white flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">打印报表</button>
              <button className="px-4 py-2 bg-golf-600 text-white rounded-lg hover:bg-golf-700">保存更改</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
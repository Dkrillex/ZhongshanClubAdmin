import React, { useState } from 'react';
import { MOCK_STAFF, MOCK_ROLES } from '../constants';
import { Staff, Role } from '../types';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Briefcase,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const StaffManagement: React.FC = () => {
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'leave': return 'bg-orange-100 text-orange-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredStaff = MOCK_STAFF.filter(staff => 
    staff.name.includes(searchTerm) || 
    staff.employeeId.includes(searchTerm) ||
    staff.department.includes(searchTerm)
  );

  const getRoleDetails = (roleName: string): Role | undefined => {
    return MOCK_ROLES.find(r => r.name === roleName);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">员工管理</h2>
        <button className="bg-golf-600 hover:bg-golf-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center">
          <Plus size={18} className="mr-2" />
          新增员工
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
        <div className="flex-1 relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索姓名、工号、部门..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golf-500"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
          <Filter size={18} />
          <span>部门筛选</span>
        </button>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-1">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">员工信息</th>
              <th className="px-6 py-4">工号</th>
              <th className="px-6 py-4">部门</th>
              <th className="px-6 py-4">职位角色</th>
              <th className="px-6 py-4">入职日期</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredStaff.map((staff) => (
              <tr 
                key={staff.id} 
                onClick={() => setSelectedStaff(staff)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img src={staff.avatar} alt={staff.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-gray-900">{staff.name}</div>
                      <div className="text-xs text-gray-500">{staff.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm text-gray-600">
                  {staff.employeeId}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {staff.department}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {staff.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {staff.joinDate}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(staff.status)}`}>
                    {staff.status === 'active' && '在职'}
                    {staff.status === 'leave' && '休假'}
                    {staff.status === 'inactive' && '离职'}
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

      {/* Staff Detail Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
            onClick={() => setSelectedStaff(null)}
          ></div>
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl overflow-hidden flex flex-col animate-slide-in-right">
            
            <div className="p-6 bg-slate-900 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Shield size={120} />
               </div>
               <button 
                onClick={() => setSelectedStaff(null)}
                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10"
              >
                <X size={20} className="text-white" />
              </button>

              <div className="flex flex-col items-center relative z-10 mt-4">
                <img src={selectedStaff.avatar} alt="" className="w-24 h-24 rounded-full border-4 border-slate-700 shadow-xl" />
                <h3 className="text-2xl font-bold mt-4">{selectedStaff.name}</h3>
                <p className="text-slate-400 text-sm">{selectedStaff.role} | {selectedStaff.department}</p>
                <span className={`mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    selectedStaff.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-gray-200'
                }`}>
                    {selectedStaff.status === 'active' ? 'Active Employee' : selectedStaff.status}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
                 <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">基本资料</h4>
                 <div className="space-y-4">
                    <div className="flex items-center">
                        <User className="text-gray-400 w-5 h-5 mr-3" />
                        <div>
                            <p className="text-xs text-gray-400">工号</p>
                            <p className="text-sm font-medium text-gray-800">{selectedStaff.employeeId}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Phone className="text-gray-400 w-5 h-5 mr-3" />
                        <div>
                            <p className="text-xs text-gray-400">联系电话</p>
                            <p className="text-sm font-medium text-gray-800">{selectedStaff.phone}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Mail className="text-gray-400 w-5 h-5 mr-3" />
                        <div>
                            <p className="text-xs text-gray-400">电子邮箱</p>
                            <p className="text-sm font-medium text-gray-800">{selectedStaff.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Briefcase className="text-gray-400 w-5 h-5 mr-3" />
                        <div>
                            <p className="text-xs text-gray-400">入职时间</p>
                            <p className="text-sm font-medium text-gray-800">{selectedStaff.joinDate}</p>
                        </div>
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                 <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">权限详情</h4>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {selectedStaff.role}
                    </span>
                 </div>
                 
                 {getRoleDetails(selectedStaff.role)?.permissions.map((perm, idx) => (
                     <div key={idx} className="mb-4 last:mb-0">
                         <div className="flex items-center justify-between mb-2">
                             <span className="text-sm font-medium text-gray-700 capitalize">
                                {perm.module === 'member' && '会员管理'}
                                {perm.module === 'course' && '球场管理'}
                                {perm.module === 'finance' && '财务管理'}
                                {perm.module === 'staff' && '员工管理'}
                                {perm.module === 'settings' && '系统设置'}
                             </span>
                             <div className="flex space-x-1">
                                {perm.actions.map(action => (
                                    <span key={action} className={`text-[10px] px-1.5 py-0.5 rounded border ${
                                        action === 'delete' ? 'border-red-200 text-red-600 bg-red-50' : 
                                        action === 'write' ? 'border-blue-200 text-blue-600 bg-blue-50' : 
                                        'border-gray-200 text-gray-600 bg-gray-50'
                                    }`}>
                                        {action === 'read' && '查看'}
                                        {action === 'write' && '编辑'}
                                        {action === 'delete' && '删除'}
                                    </span>
                                ))}
                             </div>
                         </div>
                         <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                             <div className="bg-green-500 h-full w-full opacity-60"></div>
                         </div>
                     </div>
                 ))}

                 {!getRoleDetails(selectedStaff.role) && (
                     <div className="text-center py-4 text-gray-400 text-sm">
                         <AlertCircle className="mx-auto mb-2 w-6 h-6" />
                         未找到该角色的权限配置
                     </div>
                 )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-white flex space-x-3">
              <button className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">重置密码</button>
              <button className="flex-1 py-2 bg-golf-600 text-white rounded-lg hover:bg-golf-700 font-medium">编辑资料</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

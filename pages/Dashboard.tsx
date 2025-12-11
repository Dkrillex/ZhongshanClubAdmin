import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Sparkles 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { generateDailyReport } from '../services/geminiService';
import { TODAY_BOOKINGS } from '../constants';

const data = [
  { name: '周一', visits: 120, revenue: 45000 },
  { name: '周二', visits: 132, revenue: 52000 },
  { name: '周三', visits: 101, revenue: 38000 },
  { name: '周四', visits: 134, revenue: 61000 },
  { name: '周五', visits: 190, revenue: 85000 },
  { name: '周六', visits: 230, revenue: 120000 },
  { name: '周日', visits: 210, revenue: 110000 },
];

export const Dashboard: React.FC = () => {
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleGenerateReport = async () => {
    setLoadingAi(true);
    // Simulating aggregation
    const report = await generateDailyReport(TODAY_BOOKINGS, 511000, 12);
    setAiReport(report);
    setLoadingAi(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">运营概览</h2>
          <p className="text-gray-500 text-sm mt-1">欢迎回来，今日球场运行状况良好。</p>
        </div>
        <button 
          onClick={handleGenerateReport}
          disabled={loadingAi}
          className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 transition-all disabled:opacity-50"
        >
          <Sparkles size={18} />
          <span>{loadingAi ? 'AI分析中...' : '生成AI运营简报'}</span>
        </button>
      </div>

      {aiReport && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
          <h3 className="text-lg font-bold text-purple-900 mb-2 flex items-center">
            <Sparkles size={18} className="mr-2 text-purple-600" />
            Gemini 智能分析
          </h3>
          <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
            {aiReport}
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="今日预订" value="48 组" icon={<Calendar />} color="bg-blue-500" trend="+12%" />
        <StatCard title="总营收 (今日)" value="¥ 128,400" icon={<DollarSign />} color="bg-green-500" trend="+5.4%" />
        <StatCard title="活跃会员" value="156 人" icon={<Users />} color="bg-orange-500" trend="+2.1%" />
        <StatCard title="果岭使用率" value="82%" icon={<TrendingUp />} color="bg-purple-500" trend="-1.5%" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-4">营收与客流趋势</h3>
          <div className="flex-1">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
                 <XAxis dataKey="name" />
                 <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                 <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                 <Tooltip />
                 <Bar yAxisId="left" dataKey="visits" name="客流量" fill="#8884d8" radius={[4, 4, 0, 0]} />
                 <Bar yAxisId="right" dataKey="revenue" name="营收" fill="#82ca9d" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-4">实时球车状态</h3>
          <div className="flex-1 flex flex-col justify-center space-y-4">
             <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">使用中</span>
                <span className="text-green-600 font-bold text-xl">42 辆</span>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2.5">
               <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
             </div>

             <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600 font-medium">充电中</span>
                <span className="text-yellow-600 font-bold text-xl">10 辆</span>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2.5">
               <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '16%' }}></div>
             </div>

             <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600 font-medium">待维护</span>
                <span className="text-red-600 font-bold text-xl">8 辆</span>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2.5">
               <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '13%' }}></div>
             </div>
             
             <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-500 text-center">
                总计 60 辆球车
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string; trend?: string }> = ({ title, value, icon, color, trend }) => {
  const isPositive = trend?.startsWith('+');
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg text-white ${color} shadow-sm`}>
          {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend}
          </span>
          <span className="text-gray-400 ml-2">较昨日</span>
        </div>
      )}
    </div>
  );
};
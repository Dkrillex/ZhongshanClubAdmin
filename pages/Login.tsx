import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Lock, ArrowRight, Loader } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        onLogin();
        navigate('/');
      } else {
        setError('用户名或密码错误 (试一试 admin / admin)');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
         {/* Fallback Image - Always visible if video fails or loads slowly */}
         <img 
            src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop" 
            alt="Golf Course Background" 
            className="absolute inset-0 w-full h-full object-cover"
         />
         
         {/* Video Overlay */}
         <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
            poster="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop"
         >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-golf-course-11352-large.mp4" type="video/mp4" />
         </video>
         
         {/* Lightening Overlay for Light Theme */}
         <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent"></div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 relative">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-golf-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-golf border-2 border-white/40">
            <span className="text-3xl font-bold text-white">Z</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-wide">中山温泉高尔夫</h1>
          <p className="text-slate-500 text-sm mt-2">后台管理系统</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 ml-1">账号</label>
            <div className="relative">
              <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/60 border border-slate-300 rounded-lg py-3 pl-10 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-golf-500 focus:border-transparent transition-all hover:bg-white"
                placeholder="请输入用户名"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 ml-1">密码</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/60 border border-slate-300 rounded-lg py-3 pl-10 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-golf-500 focus:border-transparent transition-all hover:bg-white"
                placeholder="请输入密码"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-golf-600 hover:bg-golf-700 text-white font-bold py-3 rounded-lg shadow-golf hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
          >
            {isLoading ? (
              <Loader className="animate-spin" size={20} />
            ) : (
              <>
                <span>登录系统</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          &copy; 2023 中山温泉高尔夫球会. All rights reserved.
        </div>
      </div>
    </div>
  );
};
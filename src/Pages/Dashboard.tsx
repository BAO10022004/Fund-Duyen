// Dashboard.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../main';
import '../assets/Dashboard.css';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  path: string;
  color: string;
  adminOnly?: boolean;
  description?: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = auth.getCurrentUser();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      id: 'quy-phong_duyen',
      title: 'Quỹ Phòng',
      icon: '💰',
      path: '/quy-phong',
      color: '#3b82f6',
      description: 'Quản lý quỹ chung của phòng'
    },
    {
      id: 'accounts_duyen',
      title: 'Tài Khoản',
      icon: '👥',
      path: '/accounts',
      color: '#10b981',
      adminOnly: true,
      description: 'Quản lý tài khoản người dùng'
    },
    {
      id: 'persons_duyen',
      title: 'Người Dùng',
      icon: '👤',
      path: '/admin/persons',
      color: '#f59e0b',
      adminOnly: true,
      description: 'Quản lý thông tin cá nhân'
    },
    {
      id: 'transactions_duyen',
      title: 'Giao Dịch',
      icon: '📊',
      path: '/admin/transactions',
      color: '#8b5cf6',
      adminOnly: true,
      description: 'Xem lịch sử giao dịch'
    },
   
    {
      id: 'diary_duyen',
      title: 'Nhật ký',
      icon: '📝',
      path: '/admin/diary',
      color: '#5b5cf6',
      adminOnly: false,
      description: 'Quản lý sổ tay'
    
    },
    {
      id: 'History_duyen',
      title: 'Lịch Sử',
      icon: '📝',
      path: '/history',
      color: '#5b5cf6',
      adminOnly: true,
      description: 'Quản lý thay đổi'
    
    }
  ];

  // Filter menu theo role
  const filteredItems = (): MenuItem[] =>{
    if(currentUser?.role == 'admin'){
        return menuItems;
    } else {
        return menuItems.filter(item => !item.adminOnly);
    }
  }

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  

  if (!currentUser) {
    return null;
  }

  return (
    <div className="dashboard-container">
      
      {/* Main Content */}
      <div className="atom-container">
        <div className="atom-scene">
          {/* Left Sidebar - Account Info */}
          <div className="nucleus">
            <div className="nucleus-inner">
              {/* Profile Section */}
              <div className="nucleus-core">
                <div className="user-avatar">
                  {currentUser.username?.charAt(0).toUpperCase()}
                </div>
                <div className="nucleus-label">
                  <div className="nucleus-text">{currentUser.username}</div>
                  <p>@{currentUser.username}</p>
                  <span className={`role-badge ${currentUser.role}`}>
                    {currentUser.role === 'admin' ? '⭐ Quản trị viên' : '👤 Người dùng'}
                  </span>
                </div>
              </div>

              {/* Account Details */}
              <div className="nucleus-glow">
                <div className="info-item">
                  <span className="info-icon">🎯</span>
                  <div className="info-content">
                    <span className="info-label">Mã người dùng</span>
                    <span className="info-value">{currentUser.codePerson}</span>
                  </div>
                </div>

                <div className="info-item">
                  <span className="info-icon">👤</span>
                  <div className="info-content">
                    <span className="info-label">Vai trò</span>
                    <span className="info-value">
                      {currentUser.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
                    </span>
                  </div>
                </div>

                <div className="info-item">
                  <span className="info-icon">⏰</span>
                  <div className="info-content">
                    <span className="info-label">Đăng nhập lúc</span>
                    <span className="info-value">
                      {auth.getLoginTime()?.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                <div className="info-item">
                  <span className="info-icon">📅</span>
                  <div className="info-content">
                    <span className="info-label">Ngày</span>
                    <span className="info-value">
                      {new Date().toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Function Cards */}
          <div className="function-cards">
            {filteredItems().map((item, index) => (
              <div
                key={item.id}
                className="electron"
                style={{ backgroundColor: item.color }}
                onClick={() => handleNavigate(item.path)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="electron-inner" style={{ backgroundColor: item.color }}>
                  <span className="electron-icon">{item.icon}</span>
                  <span className="electron-glow"></span>
                </div>
                
                <div className="electron-label">
                  <span>{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Particles - Background Effect */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }}
        ></div>
      ))}

      
    </div>
  );
};

export default Dashboard;
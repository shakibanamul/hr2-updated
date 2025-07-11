import React, { useState } from 'react';
import { Search, Bell, Mail, ChevronDown, Menu, X } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setActiveSection?: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen, setActiveSection }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Mock data for notifications and user
  const notificationCount = 3;
  const messageCount = 5;
  const user = {
    name: 'John Doe',
    role: 'Admin',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Left Section - Logo, Title, and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo and Title */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <img
              src="/logo.png"
              alt="Company Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain bg-white rounded-lg p-1 shadow-sm flex-shrink-0"
            />
            <div className="hidden sm:flex flex-col">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                HR Dashboard
              </h1>
              <p className="text-gray-500 text-xs font-medium leading-tight">Management System</p>
            </div>
            {/* Mobile - Show only logo text */}
            <div className="sm:hidden">
              <h1 className="text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HR Dashboard
              </h1>
            </div>
          </div>
        </div>

        {/* Center Section - Search Bar */}
        <div className="flex-1 max-w-md sm:max-w-2xl mx-4 sm:mx-8">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Right Section - Notifications and Profile */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                if (setActiveSection) {
                  setActiveSection('notifications');
                } else {
                  setShowNotifications(!showNotifications);
                }
              }}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium">
                  {notificationCount}
                </span>
              )}
            </button>
            
            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="p-2 max-h-64 overflow-y-auto">
                  <div className="space-y-1">
                    <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <p className="text-sm text-gray-900">Performance reviews are due</p>
                      <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                    </div>
                    <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <p className="text-sm text-gray-900">New employee onboarding</p>
                      <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                    </div>
                    <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <p className="text-sm text-gray-900">Payroll processing complete</p>
                      <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-gray-100">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="relative hidden sm:block">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <Mail className="h-6 w-6" />
              {messageCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {messageCount}
                </span>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="h-6 sm:h-8 w-px bg-gray-200 hidden sm:block"></div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 sm:space-x-3 p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover ring-2 ring-gray-200"
              />
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 font-poppins">{user.name}</p>
                      <p className="text-xs text-gray-500 font-poppins">{user.role}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button 
                    onClick={() => setActiveSection && setActiveSection('settings')}
                    className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    Profile Settings
                  </button>
                  <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                    Account Preferences
                  </button>
                  <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                    Help & Support
                  </button>
                  <hr className="my-2 border-gray-100" />
                  <button className="w-full text-left p-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
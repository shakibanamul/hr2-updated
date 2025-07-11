import React from 'react';
import { semanticColors } from '../styles/colors';
import { 
  Home, 
  Users, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  UserPlus, 
  BookOpen, 
  Bell,
  HelpCircle,
  LogOut,
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, isOpen }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'payroll', label: 'Payroll', icon: DollarSign },
    { id: 'recruitment', label: 'Recruitment', icon: UserPlus },
    { id: 'training', label: 'Training', icon: BookOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 bg-white text-gray-900 transform transition-all duration-300 ease-in-out shadow-xl border-r border-gray-200
        ${isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'} pt-16
      `}>
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                  }}
                  className={`w-full flex items-center rounded-lg transition-colors ${
                    isOpen ? 'space-x-3 px-4 py-3' : 'justify-center px-2 py-3'
                  } ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:transform hover:scale-102'
                  }`}
                  title={!isOpen ? item.label : undefined}
                >
                  <Icon size={18} className={`flex-shrink-0 transition-transform ${
                    activeSection === item.id ? 'text-blue-100' : 'group-hover:text-blue-600'
                  }`} />
                  {isOpen && (
                    <span className={`font-medium text-sm lg:text-base transition-all ${
                      activeSection === item.id ? 'text-white font-semibold' : ''
                    }`}>{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
          
          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            {/* Helpline Button */}
            <button
              onClick={() => {
                // Handle helpline action - could open a modal, navigate to help page, or open chat
                alert('Helpline: Call +1-800-HR-HELP or email support@company.com');
              }}
              className={`w-full flex items-center rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-700 transition-all duration-200 hover:transform hover:scale-102 ${
                isOpen ? 'space-x-3 px-4 py-3' : 'justify-center px-2 py-3'
              }`}
              title={!isOpen ? 'Help & Support' : undefined}
            >
              <HelpCircle size={18} className="flex-shrink-0" />
              {isOpen && <span className="font-medium text-sm lg:text-base">Help & Support</span>}
            </button>
            
            {/* Logout Button */}
            <button
              onClick={() => {
                // Handle logout action
                if (confirm('Are you sure you want to logout?')) {
                  // Perform logout logic here
                  alert('Logging out...');
                  // In a real app, you would clear auth tokens and redirect
                }
              }}
              className={`w-full flex items-center rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 hover:transform hover:scale-102 ${
                isOpen ? 'space-x-3 px-4 py-3' : 'justify-center px-2 py-3'
              }`}
              title={!isOpen ? 'Logout' : undefined}
            >
              <LogOut size={18} className="flex-shrink-0" />
              {isOpen && <span className="font-medium text-sm lg:text-base font-poppins">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
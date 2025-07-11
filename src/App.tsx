import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Layout/Header';
import Overview from './components/Dashboard/Overview';
import Employees from './components/Dashboard/Employees';
import Performance from './components/Dashboard/Performance';
import Attendance from './components/Dashboard/Attendance';
import Payroll from './components/Dashboard/Payroll';
import Recruitment from './components/Dashboard/Recruitment';
import Training from './components/Dashboard/Training';
import Notifications from './components/Dashboard/Notifications';
import Settings from './components/Dashboard/Settings';

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview setActiveSection={setActiveSection} />;
      case 'employees':
        return <Employees />;
      case 'performance':
        return <Performance />;
      case 'attendance':
        return <Attendance />;
      case 'payroll':
        return <Payroll />;
      case 'recruitment':
        return <Recruitment />;
      case 'training':
        return <Training />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
      />
      
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          setActiveSection={setActiveSection} 
        />
      </div>
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        
        {/* Main content */}
        <div className="flex-1 overflow-auto" style={{ marginTop: '64px' }}>
          <div className="p-4 sm:p-6 lg:p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
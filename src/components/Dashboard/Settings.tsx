import React, { useState, useRef } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database, 
  Download, 
  Upload,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Monitor,
  Moon,
  Sun,
  Smartphone,
  Lock,
  Key,
  AlertTriangle,
  Check,
  X,
  Edit,
  Trash2,
  Plus,
  Settings as SettingsIcon,
  Camera,
  FileText,
  BarChart3,
  Users,
  Building,
  CheckCircle,
  XCircle,
  Info,
  Loader
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    performance: true,
    attendance: true,
    payroll: false,
    recruitment: true,
    training: true
  });
  
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC-5');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [timeFormat, setTimeFormat] = useState('12');
  const [sidebarBehavior, setSidebarBehavior] = useState('expanded');
  const [dashboardDensity, setDashboardDensity] = useState('comfortable');
  const [autoSave, setAutoSave] = useState(true);
  const [keyboardShortcuts, setKeyboardShortcuts] = useState(true);
  
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    position: 'HR Manager',
    department: 'Human Resources',
    location: 'New York, NY',
    joinDate: '2022-01-15',
    bio: 'Experienced HR professional with over 10 years in talent management and organizational development.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'system', label: 'System', icon: SettingsIcon },
    { id: 'data', label: 'Data & Export', icon: Database }
  ];

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = async () => {
    setSaveStatus('saving');
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would save to backend
      console.log('Saving settings:', {
        profile: profileData,
        notifications,
        theme,
        language,
        timezone,
        dateFormat,
        timeFormat,
        sidebarBehavior,
        dashboardDensity,
        autoSave,
        keyboardShortcuts
      });
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileData(prev => ({ ...prev, avatar: e.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfileData(prev => ({ 
      ...prev, 
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' 
    }));
  };

  const handleUpdatePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      alert('Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = async (type: string) => {
    setIsLoading(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a mock CSV content
      const csvContent = `data:text/csv;charset=utf-8,Name,Department,Role\nJohn Doe,HR,Manager\nJane Smith,Engineering,Developer`;
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${type}_export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert(`${type} data exported successfully!`);
    } catch (error) {
      alert(`Failed to export ${type} data. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackupNow = async () => {
    setIsLoading(true);
    try {
      // Simulate backup process
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert('Backup created successfully!');
    } catch (error) {
      alert('Failed to create backup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevokeSession = (sessionId: string) => {
    if (confirm('Are you sure you want to revoke this session?')) {
      alert(`Session ${sessionId} has been revoked.`);
    }
  };

  const handle2FAManage = () => {
    alert('Two-Factor Authentication management would open here.');
  };

  const renderProfileTab = () => (
    <div className="space-y-6 lg:space-y-8">
      {/* Profile Picture Section */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <Camera className="h-5 w-5 mr-2 text-blue-600" />
          Profile Picture
        </h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative mx-auto sm:mx-0">
            <img
              src={profileData.avatar}
              alt="Profile"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-blue-100"
            />
            <button 
              onClick={handlePhotoUpload}
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
            >
              <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
          <div className="space-y-2 text-center sm:text-left w-full sm:w-auto">
            <h4 className="font-medium text-gray-900">{profileData.firstName} {profileData.lastName}</h4>
            <p className="text-sm text-gray-600">{profileData.position}</p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button 
                onClick={handlePhotoUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Upload New Photo
              </button>
              <button 
                onClick={handleRemovePhoto}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Remove Photo
              </button>
            </div>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <User className="h-5 w-5 mr-2 text-blue-600" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => handleProfileChange('firstName', e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => handleProfileChange('lastName', e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
                className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
            <input
              type="text"
              value={profileData.position}
              onChange={(e) => handleProfileChange('position', e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={profileData.department}
                onChange={(e) => handleProfileChange('department', e.target.value)}
                className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-sm sm:text-base"
              >
                <option value="Human Resources">Human Resources</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => handleProfileChange('location', e.target.value)}
                className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={profileData.bio}
              onChange={(e) => handleProfileChange('bio', e.target.value)}
              rows={4}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6 lg:space-y-8">
      {/* Email Notifications */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <Mail className="h-5 w-5 mr-2 text-blue-600" />
          Email Notifications
        </h3>
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
            { key: 'performance', label: 'Performance Updates', description: 'Get notified about performance reviews and ratings' },
            { key: 'attendance', label: 'Attendance Alerts', description: 'Receive alerts for attendance issues' },
            { key: 'recruitment', label: 'Recruitment Updates', description: 'Get updates on hiring and recruitment activities' },
            { key: 'training', label: 'Training Notifications', description: 'Receive notifications about training programs' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="flex-1 min-w-0 mr-4">
                <h4 className="font-medium text-gray-900 text-sm sm:text-base">{item.label}</h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  checked={notifications[item.key as keyof typeof notifications]}
                  onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <Smartphone className="h-5 w-5 mr-2 text-blue-600" />
          Push Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
            <div className="flex-1 min-w-0 mr-4">
              <h4 className="font-medium text-gray-900 text-sm sm:text-base">Browser Notifications</h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Receive push notifications in your browser</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => handleNotificationChange('push', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
            <div className="flex-1 min-w-0 mr-4">
              <h4 className="font-medium text-gray-900 text-sm sm:text-base">SMS Notifications</h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Receive important alerts via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6 lg:space-y-8">
      {/* Password Settings */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <Lock className="h-5 w-5 mr-2 text-blue-600" />
          Password & Authentication
        </h3>
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 sm:pr-12 text-sm sm:text-base"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 sm:pr-12 text-sm sm:text-base"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 sm:pr-12 text-sm sm:text-base"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button 
            onClick={handleUpdatePassword}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? <Loader className="animate-spin" size={16} /> : <Lock size={16} />}
            <span>Update Password</span>
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <Key className="h-5 w-5 mr-2 text-blue-600" />
          Two-Factor Authentication
        </h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-full flex-shrink-0">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div className="min-w-0">
                <h4 className="font-medium text-green-900 text-sm sm:text-base">Two-Factor Authentication Enabled</h4>
                <p className="text-xs sm:text-sm text-green-700">Your account is protected with 2FA</p>
              </div>
            </div>
            <button 
              onClick={handle2FAManage}
              className="px-4 py-2 text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors text-sm flex-shrink-0"
            >
              Manage
            </button>
          </div>
        </div>
      </div>

      {/* Login Sessions */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <Monitor className="h-5 w-5 mr-2 text-blue-600" />
          Active Sessions
        </h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3 min-w-0">
              <Monitor className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="font-medium text-gray-900 text-sm sm:text-base">Current Session</h4>
                <p className="text-xs sm:text-sm text-gray-600 truncate">Chrome on Windows • New York, NY</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex-shrink-0">Active</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3 min-w-0">
              <Smartphone className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="font-medium text-gray-900 text-sm sm:text-base">Mobile App</h4>
                <p className="text-xs sm:text-sm text-gray-600 truncate">iPhone • Last active 2 hours ago</p>
              </div>
            </div>
            <button 
              onClick={() => handleRevokeSession('mobile')}
              className="text-red-600 hover:text-red-800 text-sm font-medium flex-shrink-0"
            >
              Revoke
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6 lg:space-y-8">
      {/* Theme Settings */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <Palette className="h-5 w-5 mr-2 text-blue-600" />
          Theme Preferences
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: 'light', label: 'Light', icon: Sun, description: 'Clean and bright interface' },
            { id: 'dark', label: 'Dark', icon: Moon, description: 'Easy on the eyes' },
            { id: 'system', label: 'System', icon: Monitor, description: 'Follows system preference' }
          ].map((themeOption) => (
            <div
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                theme === themeOption.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <themeOption.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${theme === themeOption.id ? 'text-blue-600' : 'text-gray-400'}`} />
                <h4 className={`font-medium text-sm sm:text-base ${theme === themeOption.id ? 'text-blue-900' : 'text-gray-900'}`}>
                  {themeOption.label}
                </h4>
                <p className={`text-xs ${theme === themeOption.id ? 'text-blue-700' : 'text-gray-600'}`}>
                  {themeOption.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <Monitor className="h-5 w-5 mr-2 text-blue-600" />
          Display Settings
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Sidebar Behavior</label>
            <div className="space-y-2">
              {[
                { id: 'expanded', label: 'Always expanded' },
                { id: 'auto', label: 'Auto-collapse on mobile' },
                { id: 'collapsed', label: 'Always collapsed' }
              ].map((option) => (
                <label key={option.id} className="flex items-center">
                  <input 
                    type="radio" 
                    name="sidebar" 
                    value={option.id}
                    checked={sidebarBehavior === option.id}
                    onChange={(e) => setSidebarBehavior(e.target.value)}
                    className="mr-3 text-blue-600 focus:ring-blue-500" 
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Dashboard Density</label>
            <select 
              value={dashboardDensity}
              onChange={(e) => setDashboardDensity(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="comfortable">Comfortable</option>
              <option value="compact">Compact</option>
              <option value="spacious">Spacious</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemTab = () => (
    <div className="space-y-6 lg:space-y-8">
      {/* Language & Region */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <Globe className="h-5 w-5 mr-2 text-blue-600" />
          Language & Region
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="en">English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="UTC-8">Pacific Time (UTC-8)</option>
              <option value="UTC-7">Mountain Time (UTC-7)</option>
              <option value="UTC-6">Central Time (UTC-6)</option>
              <option value="UTC-5">Eastern Time (UTC-5)</option>
              <option value="UTC+0">UTC</option>
              <option value="UTC+1">Central European Time (UTC+1)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Date & Time Format */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-blue-600" />
          Date & Time Format
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
            <select 
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2024)</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2024)</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD (2024-12-31)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
            <select 
              value={timeFormat}
              onChange={(e) => setTimeFormat(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="12">12-hour (2:30 PM)</option>
              <option value="24">24-hour (14:30)</option>
            </select>
          </div>
        </div>
      </div>

      {/* System Preferences */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <SettingsIcon className="h-5 w-5 mr-2 text-blue-600" />
          System Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg space-y-3 sm:space-y-0">
            <div className="min-w-0">
              <h4 className="font-medium text-gray-900 text-sm sm:text-base">Auto-save Changes</h4>
              <p className="text-xs sm:text-sm text-gray-600">Automatically save form changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input 
                type="checkbox" 
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg space-y-3 sm:space-y-0">
            <div className="min-w-0">
              <h4 className="font-medium text-gray-900 text-sm sm:text-base">Keyboard Shortcuts</h4>
              <p className="text-xs sm:text-sm text-gray-600">Enable keyboard navigation shortcuts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input 
                type="checkbox" 
                checked={keyboardShortcuts}
                onChange={(e) => setKeyboardShortcuts(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataTab = () => (
    <div className="space-y-6 lg:space-y-8">
      {/* Data Export */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <Download className="h-5 w-5 mr-2 text-blue-600" />
          Export Data
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { type: 'employees', label: 'Employee Data', description: 'Export all employee information' },
            { type: 'performance', label: 'Performance Reports', description: 'Export performance analytics' },
            { type: 'attendance', label: 'Attendance Records', description: 'Export attendance data' },
            { type: 'payroll', label: 'Payroll Data', description: 'Export payroll information' }
          ].map((item) => (
            <div key={item.type} className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                <div className="min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">{item.label}</h4>
                  <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                </div>
                <button
                  onClick={() => handleExportData(item.type)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 flex-shrink-0"
                >
                  {isLoading ? <Loader className="animate-spin" size={16} /> : <Download size={16} />}
                  <span>Export</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Import */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <Upload className="h-5 w-5 mr-2 text-blue-600" />
          Import Data
        </h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-blue-400 transition-colors">
          <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Upload CSV File</h4>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">Drag and drop your CSV file here, or click to browse</p>
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
            Choose File
          </button>
        </div>
      </div>

      {/* Data Backup */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <Database className="h-5 w-5 mr-2 text-blue-600" />
          Data Backup
        </h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg space-y-3 sm:space-y-0">
            <div className="min-w-0">
              <h4 className="font-medium text-green-900 text-sm sm:text-base">Last Backup</h4>
              <p className="text-xs sm:text-sm text-green-700">January 15, 2024 at 3:00 AM</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex-shrink-0">Successful</span>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button 
              onClick={handleBackupNow}
              disabled={isLoading}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              {isLoading ? <Loader className="animate-spin" size={16} /> : <Database size={16} />}
              <span>Create Backup Now</span>
            </button>
            <button className="px-4 sm:px-6 py-2 sm:py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base">
              Schedule Backup
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'security':
        return renderSecurityTab();
      case 'appearance':
        return renderAppearanceTab();
      case 'system':
        return renderSystemTab();
      case 'data':
        return renderDataTab();
      default:
        return renderProfileTab();
    }
  };

  const getSaveButtonContent = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <>
            <Loader className="animate-spin h-5 w-5" />
            <span>Saving...</span>
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle className="h-5 w-5" />
            <span>Saved!</span>
          </>
        );
      case 'error':
        return (
          <>
            <XCircle className="h-5 w-5" />
            <span>Error</span>
          </>
        );
      default:
        return (
          <>
            <Save className="h-5 w-5" />
            <span>Save Changes</span>
          </>
        );
    }
  };

  const getSaveButtonClass = () => {
    switch (saveStatus) {
      case 'saving':
        return 'bg-blue-400 cursor-not-allowed';
      case 'success':
        return 'bg-green-600 hover:bg-green-700';
      case 'error':
        return 'bg-red-600 hover:bg-red-700';
      default:
        return 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 -m-4 sm:-m-6 p-4 sm:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-white via-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg backdrop-blur-sm mb-6 sm:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg">
              <SettingsIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-sm sm:text-lg text-slate-600">Manage your account preferences and system configuration</p>
            </div>
          </div>
          <button
            onClick={handleSaveSettings}
            disabled={saveStatus === 'saving'}
            className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 text-white rounded-xl sm:rounded-2xl transition-all duration-200 font-medium shadow-lg text-sm sm:text-base ${getSaveButtonClass()}`}
          >
            {getSaveButtonContent()}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-1 sm:p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:transform hover:scale-102'
                    }`}
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
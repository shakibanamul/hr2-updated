import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  UserCheck,
  UserX,
  Clock,
  Award,
  Target,
  AlertCircle,
  Building,
  Briefcase,
  GraduationCap,
  Bell,
  ChevronRight,
  Download,
  Filter,
  MoreVertical,
  Zap,
  Star,
  TrendingDown,
  Activity,
  Eye,
  Settings,
  RefreshCw,
  BarChart3,
  PieChart,
  Globe,
  Shield,
  Sparkles
} from 'lucide-react';
import MetricCard from '../Common/MetricCard';
import Chart from '../Common/Chart';
import { mockEmployees, mockPerformanceData, mockAttendanceData, mockRecruitmentData, mockTrainingData } from '../../data/mockData';

interface OverviewProps {
  setActiveSection?: (section: string) => void;
}

const Overview: React.FC<OverviewProps> = ({ setActiveSection }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [performanceTimeRange, setPerformanceTimeRange] = useState('6M');
  const [attendanceTimeRange, setAttendanceTimeRange] = useState('1M');
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [animatedValues, setAnimatedValues] = useState({
    totalEmployees: 0,
    avgPerformance: 0,
    avgAttendance: 0,
    totalPayroll: 0
  });

  // Calculate dynamic metrics from mock data
  const totalEmployees = mockEmployees.length;
  const activeEmployees = mockEmployees.filter(emp => emp.status === 'active').length;
  const avgPerformance = mockEmployees.reduce((sum, emp) => sum + emp.performanceRating, 0) / mockEmployees.length;
  const avgAttendance = mockEmployees.reduce((sum, emp) => sum + emp.attendanceRate, 0) / mockEmployees.length;
  const totalPayroll = mockEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  
  // Animate numbers on load
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setAnimatedValues({
        totalEmployees: Math.round(totalEmployees * easeOutQuart),
        avgPerformance: avgPerformance * easeOutQuart,
        avgAttendance: Math.round(avgAttendance * easeOutQuart),
        totalPayroll: Math.round(totalPayroll * easeOutQuart)
      });
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [totalEmployees, avgPerformance, avgAttendance, totalPayroll]);
  
  // Recent attendance data
  const recentAttendance = mockAttendanceData.slice(-7);
  const todayPresent = recentAttendance[recentAttendance.length - 1]?.present || 0;
  const todayAbsent = recentAttendance[recentAttendance.length - 1]?.absent || 0;
  const todayLate = recentAttendance[recentAttendance.length - 1]?.late || 0;

  // Filter data based on time range
  const filterDataByTimeRange = (data: any[], timeRange: string) => {
    const now = new Date();
    let startDate = new Date();
    
    switch (timeRange) {
      case '1D':
        startDate.setDate(now.getDate() - 1);
        break;
      case '1W':
        startDate.setDate(now.getDate() - 7);
        break;
      case '1M':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '3M':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6M':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1Y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return data;
    }
    
    return data; // For demo purposes, return all data
  };

  // Performance trend data with enhanced formatting
  const performanceTrendData = filterDataByTimeRange(mockPerformanceData, performanceTimeRange)
    .slice(-12)
    .map((item, index) => ({
      label: item.month,
      value: item.score,
      date: `2024-${String(index + 1).padStart(2, '0')}-01`,
      performance: item.score,
      target: 85 // Target performance score
    }));
  // Attendance trend data with enhanced formatting
  const attendanceTrendData = filterDataByTimeRange(recentAttendance, attendanceTimeRange)
    .slice(-30)
    .map((item, index) => ({
      label: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round((item.present / (item.present + item.absent)) * 100),
      date: item.date,
      attendance: Math.round((item.present / (item.present + item.absent)) * 100),
      present: item.present,
      absent: item.absent,
      late: item.late
    }));

  // Multi-line chart data for advanced analytics
  const multiLineChartData = [
    {
      label: 'Performance Score',
      data: performanceTrendData,
      color: '#6366f1',
      fillOpacity: 0.1
    },
    {
      label: 'Target Score',
      data: performanceTrendData.map(item => ({
        label: item.label,
        value: 85,
        date: item.date
      })),
      color: '#8b5cf6',
      fillOpacity: 0.1
    }
  ];

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format percentage values
  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  // Format performance score
  const formatScore = (value: number) => {
    return `${value.toFixed(1)}`;
  };

  // Department breakdown with enhanced data
  const departmentBreakdown = mockEmployees.reduce((acc, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = {
        count: 0,
        avgPerformance: 0,
        avgSalary: 0,
        employees: []
      };
    }
    acc[emp.department].count += 1;
    acc[emp.department].employees.push(emp);
    return acc;
  }, {} as Record<string, any>);

  // Calculate department averages
  Object.keys(departmentBreakdown).forEach(dept => {
    const employees = departmentBreakdown[dept].employees;
    departmentBreakdown[dept].avgPerformance = employees.reduce((sum: number, emp: any) => sum + emp.performanceRating, 0) / employees.length;
    departmentBreakdown[dept].avgSalary = employees.reduce((sum: number, emp: any) => sum + emp.salary, 0) / employees.length;
  });

  const departmentData = Object.entries(departmentBreakdown).map(([dept, data]) => ({
    label: dept,
    value: data.count,
    performance: data.avgPerformance,
    salary: data.avgSalary
  }));

  // Top performers
  const topPerformers = mockEmployees
    .sort((a, b) => b.performanceRating - a.performanceRating)
    .slice(0, 5);

  // Recent hires
  const recentHires = mockEmployees
    .sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
    .slice(0, 4);

  // Upcoming reviews (simulated)
  const upcomingReviews = mockEmployees
    .filter(emp => emp.performanceRating < 4.5)
    .slice(0, 4);

  const handleQuickAction = (action: string, section?: string) => {
    if (section && setActiveSection) {
      setActiveSection(section);
    } else {
      // Handle other quick actions
      switch (action) {
        case 'add-employee':
          alert('Add Employee functionality - would open employee form');
          break;
        case 'process-payroll':
          alert('Process Payroll functionality - would open payroll processing');
          break;
        case 'generate-report':
          alert('Generate Report functionality - would open report generator');
          break;
        default:
          break;
      }
    }
  };

  const getDepartmentColor = (index: number) => {
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#8b5cf6'];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen -m-6 p-6">
      {/* Beautiful Header with Gradient */}
      <div className="bg-gradient-to-r from-white via-blue-50 to-indigo-50 border border-blue-200/50 rounded-3xl p-8 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0">
          <div className="space-y-4">
            {/* Welcome Back Greeting */}
            <div className="mb-4">
              <h2 className="text-lg font-medium text-slate-600 mb-1">
                Welcome back, <span className="text-indigo-700 font-semibold">John Doe</span> 👋
              </h2>
              <p className="text-sm text-slate-500">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Executive Dashboard
                </h1>
                <p className="text-lg text-slate-600">Real-time insights into your organization's performance</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="appearance-none bg-white/80 backdrop-blur-sm border border-indigo-200 rounded-2xl px-4 py-3 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-medium shadow-sm"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                  <option value="1year">Last Year</option>
                </select>
                <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 h-4 w-4 text-indigo-400" />
              </div>
              <button className="p-3 bg-white/80 backdrop-blur-sm border border-indigo-200 rounded-2xl hover:bg-white transition-all duration-200 shadow-sm">
                <RefreshCw className="h-5 w-5 text-indigo-600" />
              </button>
            </div>
            <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-emerald-700">Live Data</span>
              <span className="text-xs text-emerald-600">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Beautiful Metrics Grid with Gradients */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Employees Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 px-3 py-1 bg-emerald-100 rounded-full">
              <ArrowUpRight className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">+8.2%</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Total Employees</h3>
            <p className="text-3xl font-bold text-indigo-900">{animatedValues.totalEmployees}</p>
            <p className="text-sm text-blue-600">{activeEmployees} active • {totalEmployees - activeEmployees} inactive</p>
          </div>
          <div className="mt-4 w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(activeEmployees / totalEmployees) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Performance Card */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 px-3 py-1 bg-emerald-100 rounded-full">
              <ArrowUpRight className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">+5.3%</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Avg Performance</h3>
            <p className="text-3xl font-bold text-purple-900">{animatedValues.avgPerformance.toFixed(1)}</p>
            <p className="text-sm text-purple-600">Out of 5.0 rating scale</p>
          </div>
          <div className="mt-4 flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`h-4 w-4 ${star <= Math.round(avgPerformance) ? 'text-purple-600 fill-current' : 'text-purple-300'}`} 
              />
            ))}
          </div>
        </div>

        {/* Attendance Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 px-3 py-1 bg-red-100 rounded-full">
              <ArrowDownRight className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-700">-2.1%</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide font-poppins">Attendance Rate</h3>
            <p className="text-3xl font-bold text-emerald-900 font-poppins">{animatedValues.avgAttendance}%</p>
            <p className="text-sm text-emerald-600 font-poppins">This month average</p>
          </div>
          <div className="mt-4 relative">
            <div className="w-full bg-emerald-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-1000 relative"
                style={{ width: `${avgAttendance}%` }}
              >
                <div className="absolute right-0 top-0 w-2 h-3 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Payroll Card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 px-3 py-1 bg-emerald-100 rounded-full">
              <ArrowUpRight className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">+3.7%</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-amber-700 uppercase tracking-wide font-poppins">Monthly Payroll</h3>
            <p className="text-3xl font-bold text-amber-900 font-poppins">${Math.round(animatedValues.totalPayroll / 1000)}K</p>
            <p className="text-sm text-amber-600 font-poppins">Total monthly expenses</p>
          </div>
          <div className="mt-4 flex items-center space-x-2 text-xs text-amber-600">
            <Shield className="h-4 w-4" />
            <span>Processed securely</span>
          </div>
        </div>
      </div>

      {/* Today's Activity with Beautiful Colors */}
      <div className="bg-gradient-to-r from-white via-slate-50 to-gray-50 border border-slate-200 rounded-3xl p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-slate-600 to-gray-700 rounded-2xl shadow-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 font-poppins">Today's Activity</h3>
              <p className="text-slate-600 font-poppins">Real-time workforce insights</p>
            </div>
          </div>
          <button 
            onClick={() => handleQuickAction('view-attendance', 'attendance')}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg"
          >
            <Eye className="h-5 w-5" />
            <span>View Details</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Present Today */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200 rounded-3xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                <UserCheck className="h-8 w-8 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-800 font-poppins">{todayPresent}</div>
                <div className="text-sm text-emerald-600 font-medium font-poppins">Present Today</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-emerald-600">On time arrivals</span>
              <span className="font-bold text-emerald-800">{todayPresent - todayLate}</span>
            </div>
          </div>

          {/* Absent Today */}
          <div className="bg-gradient-to-br from-red-50 to-pink-100 border border-red-200 rounded-3xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-lg">
                <UserX className="h-8 w-8 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-red-800 font-poppins">{todayAbsent}</div>
                <div className="text-sm text-red-600 font-medium font-poppins">Absent Today</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-600">Unplanned absences</span>
              <span className="font-bold text-red-800">{Math.round(todayAbsent * 0.7)}</span>
            </div>
          </div>

          {/* Late Arrivals */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200 rounded-3xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl shadow-lg">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-amber-800 font-poppins">{todayLate}</div>
                <div className="text-sm text-amber-600 font-medium font-poppins">Late Arrivals</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-amber-600">Avg delay</span>
              <span className="font-bold text-amber-800">15 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Section with Beautiful Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Performance Chart */}
        <div className="bg-gradient-to-br from-white to-indigo-50 border border-indigo-200 rounded-3xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-900 font-poppins">Performance Trends</h3>
                <p className="text-indigo-600 font-poppins">Real-time performance tracking</p>
              </div>
            </div>
          </div>
          <Chart 
            datasets={multiLineChartData} 
            type="area" 
            height={350}
            showTimeRange={true}
            timeRange={performanceTimeRange}
            onTimeRangeChange={setPerformanceTimeRange}
            formatValue={formatScore}
            showLegend={true}
            interactive={true}
          />
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl">
              <div className="text-2xl font-bold text-indigo-800 font-poppins">{avgPerformance.toFixed(1)}</div>
              <div className="text-sm text-indigo-600 font-poppins">Avg Performance</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl">
              <div className="text-2xl font-bold text-purple-800 font-poppins">85.0</div>
              <div className="text-sm text-purple-600 font-poppins">Target Score</div>
            </div>
          </div>
        </div>

        {/* Attendance Analytics */}
        <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-slate-600 to-gray-700 rounded-2xl shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-poppins">Attendance Analytics</h3>
                <p className="text-slate-600 font-poppins">Daily attendance patterns</p>
              </div>
            </div>
          </div>
          
          <Chart 
            data={attendanceTrendData} 
            type="area" 
            height={350}
            color="#22c55e"
            showTimeRange={true}
            timeRange={attendanceTimeRange}
            onTimeRangeChange={setAttendanceTimeRange}
            formatValue={formatPercentage}
            interactive={true}
          />
          
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl">
              <div className="text-xl font-bold text-emerald-800 font-poppins">{Math.round(avgAttendance)}%</div>
              <div className="text-xs text-emerald-600 font-poppins">Avg Rate</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl">
              <div className="text-xl font-bold text-blue-800 font-poppins">{todayPresent}</div>
              <div className="text-xs text-blue-600 font-poppins">Present Today</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl">
              <div className="text-xl font-bold text-amber-800 font-poppins">{todayLate}</div>
              <div className="text-xs text-amber-600 font-poppins">Late Today</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section with Beautiful Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Department Performance Chart */}
        <div className="bg-gradient-to-br from-white to-purple-50 border border-purple-200 rounded-3xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-900 font-poppins">Department Performance</h3>
                <p className="text-purple-600 font-poppins">Comparative analysis</p>
              </div>
            </div>
          </div>
          
          <Chart 
            data={departmentData.map(dept => ({
              label: dept.label.substring(0, 3),
              value: dept.performance,
              department: dept.label,
              employees: dept.value
            }))} 
            type="bar" 
            height={300}
            color="#a855f7"
            formatValue={formatScore}
            interactive={true}
          />
          
          <div className="mt-4 space-y-2">
            {departmentData.slice(0, 3).map((dept, index) => (
              <div key={dept.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getDepartmentColor(index) }}></div>
                  <span className="text-gray-700 font-poppins">{dept.label}</span>
                </div>
                <span className="font-bold text-gray-900 font-poppins">{dept.performance.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-gradient-to-br from-white to-emerald-50 border border-emerald-200 rounded-3xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-900 font-poppins">Top Performers</h3>
                <p className="text-emerald-600 font-poppins">Excellence recognition</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {topPerformers.map((employee, index) => (
              <div key={employee.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-white to-emerald-50 border border-emerald-200 rounded-2xl hover:border-emerald-300 hover:shadow-md transition-all duration-200">
                <div className="relative">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-200"
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 truncate font-poppins">{employee.name}</div>
                  <div className="text-sm text-emerald-600 truncate font-poppins">{employee.department}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-emerald-600 fill-current" />
                    <span className="text-lg font-bold text-emerald-800 font-poppins">{employee.performanceRating.toFixed(1)}</span>
                  </div>
                  <div className="text-xs text-emerald-500 font-poppins">{employee.attendanceRate}% attendance</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payroll Analytics */}
        <div className="bg-gradient-to-br from-white to-amber-50 border border-amber-200 rounded-3xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-900 font-poppins">Payroll Trends</h3>
                <p className="text-amber-600 font-poppins">Monthly expenses</p>
              </div>
            </div>
          </div>
          
          <Chart 
            data={departmentData.map(dept => ({
              label: dept.label.substring(0, 3),
              value: Math.round(dept.salary / 1000),
              department: dept.label,
              totalSalary: dept.salary * dept.value
            }))} 
            type="bar" 
            height={300}
            color="#f59e0b"
            formatValue={(value) => `$${value}K`}
            interactive={true}
          />
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl">
              <div className="text-xl font-bold text-amber-800 font-poppins">{formatCurrency(totalPayroll / 12)}</div>
              <div className="text-xs text-amber-600 font-poppins">Monthly Total</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl">
              <div className="text-xl font-bold text-green-800 font-poppins">{formatCurrency(totalPayroll / totalEmployees)}</div>
              <div className="text-xs text-green-600 font-poppins">Avg Salary</div>
            </div>
          </div>
        </div>

      </div>

      {/* Beautiful Alerts Section */}
      <div className="bg-gradient-to-r from-white via-gray-50 to-slate-50 border border-gray-200 rounded-3xl p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-gray-600 to-slate-700 rounded-2xl shadow-lg">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 font-poppins">System Alerts</h3>
              <p className="text-slate-600 font-poppins">Important notifications and updates</p>
            </div>
          </div>
          <button 
            onClick={() => handleQuickAction('view-notifications', 'notifications')}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-gray-800 text-white rounded-2xl hover:from-slate-800 hover:to-gray-900 transition-all duration-200 font-medium shadow-lg"
          >
            <Globe className="h-5 w-5" />
            <span>View All Alerts</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Performance Alert */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200 rounded-3xl p-6 shadow-md">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-amber-800 mb-2 font-poppins">Performance Reviews Due</h4>
                <p className="text-sm text-amber-700 mb-3 font-poppins">4 employees need performance reviews this week</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-amber-600 font-medium font-poppins">High Priority</span>
                  <button className="text-xs bg-amber-200 text-amber-800 px-3 py-1 rounded-full hover:bg-amber-300 transition-colors font-poppins">
                    Review Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recruitment Alert */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-3xl p-6 shadow-md">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-blue-800 mb-2 font-poppins">Active Recruitment</h4>
                <p className="text-sm text-blue-700 mb-3 font-poppins">{mockRecruitmentData.length} positions currently being recruited</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-600 font-medium font-poppins">In Progress</span>
                  <button className="text-xs bg-blue-200 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-300 transition-colors font-poppins">
                    View Jobs
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Training Alert */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200 rounded-3xl p-6 shadow-md">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-emerald-800 mb-2 font-poppins">Training Progress</h4>
                <p className="text-sm text-emerald-700 mb-3 font-poppins">{mockTrainingData.length} active training programs running</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-600 font-medium font-poppins">On Track</span>
                  <button className="text-xs bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full hover:bg-emerald-300 transition-colors font-poppins">
                    View Progress
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
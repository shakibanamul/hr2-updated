import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend
} from 'recharts';

interface ChartDataPoint {
  label: string;
  value: number;
  date?: string;
  [key: string]: any;
}

interface ChartDataset {
  label: string;
  data: ChartDataPoint[];
  color: string;
  fillOpacity?: number;
}

interface ChartProps {
  data?: Array<{ label: string; value: number; date?: string; [key: string]: any }>; // Keep for backward compatibility
  datasets?: ChartDataset[]; // New prop for multi-line charts
  type: 'bar' | 'line' | 'area';
  height?: number;
  color?: string;
  showTimeRange?: boolean;
  timeRange?: string;
  onTimeRangeChange?: (range: string) => void;
  formatValue?: (value: number) => string;
  showLegend?: boolean;
  interactive?: boolean;
}

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, formatValue }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 backdrop-blur-sm">
        <div className="border-b border-gray-100 pb-2 mb-3">
          <p className="text-sm font-semibold text-gray-900">{label}</p>
          {payload[0]?.payload?.date && (
            <p className="text-xs text-gray-500">{payload[0].payload.date}</p>
          )}
        </div>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {entry.dataKey === 'value' ? entry.payload.label || 'Value' : entry.dataKey}
                </span>
              </div>
              <span className="text-sm font-bold text-gray-900">
                {formatValue ? formatValue(entry.value) : entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

// Time Range Selector Component
const TimeRangeSelector = ({ timeRange, onTimeRangeChange }: { timeRange: string; onTimeRangeChange: (range: string) => void }) => {
  const ranges = [
    { id: '1D', label: '1D' },
    { id: '1W', label: '1W' },
    { id: '1M', label: '1M' },
    { id: '3M', label: '3M' },
    { id: '6M', label: '6M' },
    { id: '1Y', label: '1Y' },
    { id: 'ALL', label: 'ALL' }
  ];

  return (
    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
      {ranges.map((range) => (
        <button
          key={range.id}
          onClick={() => onTimeRangeChange(range.id)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
            timeRange === range.id
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

const Chart: React.FC<ChartProps> = ({ 
  data, 
  datasets, 
  type, 
  height = 300, 
  color = '#3b82f6',
  showTimeRange = false,
  timeRange = '1M',
  onTimeRangeChange,
  formatValue,
  showLegend = false,
  interactive = true
}) => {
  // Use datasets if provided, otherwise convert single data to datasets format
  const chartDatasets = datasets || (data ? [{
    label: 'Data',
    data: data,
    color: color,
    fillOpacity: 0.1
  }] : []);

  if (!chartDatasets || chartDatasets.length === 0 || chartDatasets.every(dataset => !dataset.data || dataset.data.length === 0)) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  // Prepare data for Recharts (combine all datasets into single data points)
  const chartData = chartDatasets[0].data.map((point, index) => {
    const dataPoint: any = {
      label: point.label,
      date: point.date,
    };
    
    chartDatasets.forEach((dataset, datasetIndex) => {
      const value = dataset.data[index]?.value || 0;
      dataPoint[dataset.label] = value;
      if (datasetIndex === 0) {
        dataPoint.value = value; // Keep backward compatibility
      }
    });
    
    return dataPoint;
  });

  // Calculate domain for Y-axis with padding
  const allValues = chartData.flatMap(item => 
    chartDatasets.map(dataset => item[dataset.label] || 0)
  );
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const padding = (maxValue - minValue) * 0.1;
  const yAxisDomain = [
    Math.max(0, minValue - padding),
    maxValue + padding
  ];

  const renderAreaChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <defs>
          {chartDatasets.map((dataset, index) => (
            <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={dataset.color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={dataset.color} stopOpacity={0.05} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis 
          dataKey="label" 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#64748b' }}
          dy={10}
        />
        <YAxis 
          domain={yAxisDomain}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#64748b' }}
          tickFormatter={(value) => formatValue ? formatValue(value) : value.toString()}
        />
        {interactive && (
          <Tooltip 
            content={<CustomTooltip formatValue={formatValue} />}
            cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }}
          />
        )}
        {showLegend && <Legend />}
        {chartDatasets.map((dataset, index) => (
          <Area
            key={index}
            type="monotone"
            dataKey={dataset.label}
            stroke={dataset.color}
            strokeWidth={2.5}
            fill={`url(#gradient-${index})`}
            dot={{ fill: dataset.color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: dataset.color, strokeWidth: 2, fill: '#fff' }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis 
          dataKey="label" 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#64748b' }}
          dy={10}
        />
        <YAxis 
          domain={yAxisDomain}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#64748b' }}
          tickFormatter={(value) => formatValue ? formatValue(value) : value.toString()}
        />
        {interactive && (
          <Tooltip 
            content={<CustomTooltip formatValue={formatValue} />}
            cursor={{ stroke: '#e2e8f0', strokeWidth: 1 }}
          />
        )}
        {showLegend && <Legend />}
        {chartDatasets.map((dataset, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={dataset.label}
            stroke={dataset.color}
            strokeWidth={2.5}
            dot={{ fill: dataset.color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: dataset.color, strokeWidth: 2, fill: '#fff' }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis 
          dataKey="label" 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#64748b' }}
          dy={10}
        />
        <YAxis 
          domain={yAxisDomain}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#64748b' }}
          tickFormatter={(value) => formatValue ? formatValue(value) : value.toString()}
        />
        {interactive && (
          <Tooltip 
            content={<CustomTooltip formatValue={formatValue} />}
            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
          />
        )}
        {showLegend && <Legend />}
        {chartDatasets.map((dataset, index) => (
          <Bar
            key={index}
            dataKey={dataset.label}
            fill={dataset.color}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {showTimeRange && onTimeRangeChange && (
        <div className="flex justify-end p-4 border-b border-gray-100">
          <TimeRangeSelector timeRange={timeRange} onTimeRangeChange={onTimeRangeChange} />
        </div>
      )}
      <div className="p-4">
        {type === 'area' && renderAreaChart()}
        {type === 'line' && renderLineChart()}
        {type === 'bar' && renderBarChart()}
      </div>
    </div>
  );
};

export default Chart;
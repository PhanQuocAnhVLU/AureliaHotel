import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow-sm">
        <p className="fw-bold mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="mb-1" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
        <hr className="my-2" />
        <p className="fw-bold mb-0 text-navy">
          Tổng: {formatCurrency(payload.reduce((sum, entry) => sum + entry.value, 0))}
        </p>
      </div>
    );
  }
  return null;
};

const RevenueChart = ({ data }) => {
  const chartData = useMemo(() => {
    return data || [];
  }, [data]);

  return (
    <div style={{ width: '100%', height: 400, minWidth: 0 }}>
      <ResponsiveContainer width="99%" height="99%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6c757d' }} 
            dy={10}
          />
          <YAxis 
            tickFormatter={(value) => `${value / 1000000}M`}
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#6c757d' }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(181, 166, 66, 0.05)' }} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="roomRevenue" name="Doanh thu phòng" stackId="a" fill="var(--secondary-color)" radius={[0, 0, 4, 4]} />
          <Bar dataKey="serviceRevenue" name="Doanh thu dịch vụ" stackId="a" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;

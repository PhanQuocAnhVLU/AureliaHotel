import { useMemo } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = {
  Available: '#198754',
  Booked: '#0d6efd',
  Occupied: '#ffc107',
  Cleaning: '#0dcaf0',
  Maintenance: '#dc3545'
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded shadow-sm">
        <p className="mb-0 fw-bold" style={{ color: data.color }}>{data.name}</p>
        <p className="mb-0">{data.value} phòng ({data.percent}%)</p>
      </div>
    );
  }
  return null;
};

const OccupancyChart = ({ rooms }) => {
  const chartData = useMemo(() => {
    if (!rooms || rooms.length === 0) return [];

    const counts = {
      Available: 0,
      Booked: 0,
      Occupied: 0,
      Cleaning: 0,
      Maintenance: 0
    };

    rooms.forEach(room => {
      if (counts[room.status] !== undefined) {
        counts[room.status]++;
      }
    });

    const total = rooms.length;

    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key],
      color: COLORS[key],
      percent: Math.round((counts[key] / total) * 100)
    })).filter(item => item.value > 0);
  }, [rooms]);

  return (
    <div style={{ width: '100%', height: 300, minWidth: 0 }}>
      <ResponsiveContainer width="99%" height="99%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OccupancyChart;

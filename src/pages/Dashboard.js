/* eslint-disable no-console */
/* eslint-disable comma-dangle */
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Layout from '../components/layout/Layout/Layout';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3030/metrics')
      .then((response) => response.text())
      .then((data) => {
        const parsedMetrics = parseMetrics(data);
        setMetrics(parsedMetrics);
      })
      .catch((error) => console.error('Error fetching metrics:', error));
  }, []);

  const parseMetrics = (data) => {
    const lines = data.split('\n');
    const metrics = {};

    lines.forEach((line) => {
      if (line.startsWith('#')) return;
      const [key, value] = line.split(' ');
      if (key && value) {
        metrics[key] = parseFloat(value);
      }
    });

    return metrics;
  };

  const chartData = {
    labels: Object.keys(metrics || {}),
    datasets: [
      {
        label: 'Metrics',
        data: Object.values(metrics || {}),
        fill: false,
        borderColor: '#3b82f6',
        tension: 0.1,
      },
    ],
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics &&
            Object.entries(metrics).map(([key, value]) => (
              <div key={key} className="p-4 border rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">{key}</h2>
                <p className="text-gray-600">{value}</p>
              </div>
            ))}
        </div>
        <div className="mt-6 p-4 border rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">
            Graphique des métriques
          </h2>
          <Line data={chartData} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

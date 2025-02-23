/* eslint-disable no-console */
/* eslint-disable comma-dangle */
import { useEffect, useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import Layout from '../components/layout/Layout/Layout';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/metrics`
        );
        const data = await response.json();
        setMetrics(data);
        setLastUpdate(new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Erreur lors de la récupération des métriques:', error);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000);

    return () => clearInterval(interval);
  }, []);

  const getMetricValue = (metricName) => {
    if (!metrics) return 0;
    const metric = metrics.find((m) => m.name === metricName);
    if (!metric || !metric.values) return 0;
    return metric.values.reduce((sum, value) => sum + value.value, 0);
  };

  const formatMetricValue = (value) => {
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  if (!metrics) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-white text-center">
          Chargement des données...
        </div>
      </Layout>
    );
  }

  const requestsData = {
    labels: ['Requêtes réussies', 'Requêtes en erreur', 'Requêtes MongoDB'],
    datasets: [
      {
        data: [
          getMetricValue('request_success_total'),
          getMetricValue('request_error_total'),
          getMetricValue('mongo_query_count'),
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
      },
    ],
  };

  const bandwidthData = {
    labels: ['Entrée', 'Sortie'],
    datasets: [
      {
        data: [
          metrics
            .find((m) => m.name === 'http_bandwidth_bytes_total')
            ?.values.find((v) => v.labels.direction === 'in')?.value || 0,
          metrics
            .find((m) => m.name === 'http_bandwidth_bytes_total')
            ?.values.find((v) => v.labels.direction === 'out')?.value || 0,
        ],
        backgroundColor: [
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  const durationData = {
    labels:
      metrics
        .find((m) => m.name === 'request_duration')
        ?.values.filter((v) => v.metricName === 'request_duration_bucket')
        .map((v) => `${v.labels.le}ms`) || [],
    datasets: [
      {
        label: 'Durée des requêtes',
        data:
          metrics
            .find((m) => m.name === 'request_duration')
            ?.values.filter((v) => v.metricName === 'request_duration_bucket')
            .map((v) => v.value) || [],
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          Tableau de bord des métriques
          <span className="text-sm font-normal ml-4">
            Dernière mise à jour : {lastUpdate}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#29282D] p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-2">
              Requêtes réussies
            </h3>
            <p className="text-3xl font-bold text-green-500">
              {formatMetricValue(getMetricValue('request_success_total'))}
            </p>
          </div>

          <div className="bg-[#29282D] p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-2">
              Requêtes en erreur
            </h3>
            <p className="text-3xl font-bold text-red-500">
              {formatMetricValue(getMetricValue('request_error_total'))}
            </p>
          </div>

          <div className="bg-[#29282D] p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-2">
              Requêtes MongoDB
            </h3>
            <p className="text-3xl font-bold text-blue-500">
              {formatMetricValue(getMetricValue('mongo_query_count'))}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#29282D] p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">
              Distribution des requêtes
            </h3>
            <Doughnut data={requestsData} options={{ responsive: true }} />
          </div>

          <div className="bg-[#29282D] p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">
              Bande passante (octets)
            </h3>
            <Bar data={bandwidthData} options={{ responsive: true }} />
          </div>

          <div className="bg-[#29282D] p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">
              Durée des requêtes
            </h3>
            <Line data={durationData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

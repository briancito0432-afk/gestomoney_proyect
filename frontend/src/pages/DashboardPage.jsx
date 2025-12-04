// Archivo: src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Header from '../components/Layout/Header';
import SummaryCards from '../components/Dashboard/SummaryCards';
import IncomeExpenseChart from '../components/Dashboard/IncomeExpenseChart';
import CategoryChart from '../components/Dashboard/CategoryChart';
import RecentTransactions from '../components/Dashboard/RecentTransactions';
import SkeletonCard from '../components/Common/SkeletonCard';
import SkeletonChart from '../components/Common/SkeletonChart';
import SkeletonTransactionList from '../components/Common/SkeletonTransactionList';
import { dashboardService, transactionService } from '../services/api';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Escuchar cambios globales de transacciones para refrescar el dashboard
  useEffect(() => {
    const handleTransactionsChanged = () => {
      loadDashboardData();
    };

    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      window.addEventListener('transactions:changed', handleTransactionsChanged);
    }

    return () => {
      if (typeof window !== 'undefined' && typeof window.removeEventListener === 'function') {
        window.removeEventListener('transactions:changed', handleTransactionsChanged);
      }
    };
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Cargar datos del dashboard
      const dashData = await dashboardService.getSummary();
      setDashboardData(dashData);

      // Cargar transacciones recientes
      const transData = await transactionService.getAll();
      setTransactions(transData.transactions || []);

      setLoading(false);
    } catch (err) {
      console.error('Error al cargar dashboard:', err);
      setError('Error al cargar los datos del dashboard');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
  <Header subtitle="Resumen de tu actividad financiera." />

        <section className="dashboard-content">
          {/* Skeleton de tarjetas */}
          <div className="summary-cards-grid">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>

          {/* Skeleton de gráficos */}
          <div className="dashboard-grid">
            <SkeletonChart />
            <SkeletonChart />
          </div>

          {/* Skeleton de transacciones recientes */}
          <div style={{ marginTop: 'var(--spacing-lg)' }}>
            <SkeletonTransactionList />
          </div>
        </section>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div style={{ padding: '2rem' }}>
          <p style={{ color: 'var(--color-danger)' }}>{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Header 
        subtitle="Resumen de tu actividad financiera."
        showFilters={true}
      />

      <section className="dashboard-content">
        {/* Tarjetas de resumen */}
        <SummaryCards summary={dashboardData?.summary} />

        {/* Grid de gráficos */}
        <div className="dashboard-grid">
          <IncomeExpenseChart data={dashboardData?.summary} />
          <CategoryChart categories={dashboardData?.categories_spending || []} />
        </div>

        {/* Transacciones recientes */}
        <div style={{ marginTop: 'var(--spacing-lg)' }}>
          <RecentTransactions transactions={transactions} />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;
// Archivo: src/pages/ReportsPage.jsx
import { useState, useEffect } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Header from '../components/Layout/Header';
import { dashboardService } from '../services/api';
import { formatCurrency } from '../utils/formatters';
import Skeleton from '../components/Common/Skeleton';

const ReportsPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReportsData();
  }, []);

  const loadReportsData = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getSummary();
      setDashboardData(data);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar reportes:', err);
      setLoading(false);
    }
  };

  if (loading) {
  return (
    <DashboardLayout>
      <Header title="Informes" subtitle="Analiza tus datos financieros" />
      <section className="dashboard-content">
        {/* Skeleton para filtros */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: 'var(--spacing-lg)',
          padding: 'var(--spacing-md)',
          backgroundColor: 'var(--color-dark-bg)',
          borderRadius: '8px'
        }}>
          <Skeleton width="200px" height="40px" />
          <Skeleton width="200px" height="40px" />
          <Skeleton width="150px" height="40px" />
        </div>

        {/* Skeleton para gráficos */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          <div style={{ 
            backgroundColor: 'var(--color-dark-bg)', 
            padding: 'var(--spacing-md)', 
            borderRadius: '8px' 
          }}>
            <Skeleton width="60%" height="24px" marginBottom="20px" />
            <Skeleton width="100%" height="300px" />
          </div>
          <div style={{ 
            backgroundColor: 'var(--color-dark-bg)', 
            padding: 'var(--spacing-md)', 
            borderRadius: '8px' 
          }}>
            <Skeleton width="60%" height="24px" marginBottom="20px" />
            <Skeleton width="100%" height="300px" />
          </div>
        </div>

        {/* Skeleton para tabla de categorías */}
        <div style={{ 
          backgroundColor: 'var(--color-dark-bg)', 
          padding: 'var(--spacing-md)', 
          borderRadius: '8px' 
        }}>
          <Skeleton width="40%" height="24px" marginBottom="20px" />
          <Skeleton width="100%" height="50px" marginBottom="10px" />
          <Skeleton width="100%" height="50px" marginBottom="10px" />
          <Skeleton width="100%" height="50px" marginBottom="10px" />
          <Skeleton width="100%" height="50px" marginBottom="10px" />
          <Skeleton width="100%" height="50px" />
        </div>
      </section>
    </DashboardLayout>
  );
}

  const categories = dashboardData?.categories_spending || [];
  const summary = dashboardData?.summary || {};

  return (
    <DashboardLayout>
      <Header title="Informes" subtitle="Analiza tus datos financieros" />

      <section className="dashboard-content">
        {/* Grid de reportes */}
        <div className="report-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          {/* Cash Flow */}
          <div className="report-section" style={{
            backgroundColor: 'var(--color-dark-bg)',
            padding: 'var(--spacing-md)',
            borderRadius: '8px',
            minHeight: '450px'
          }}>
            <div className="report-header" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--spacing-md)',
              borderBottom: '1px solid #2c3444',
              paddingBottom: '10px'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Flujo de efectivo en el tiempo</h3>
              <span style={{ color: 'var(--color-success)' }}>
                {formatCurrency(summary.total_balance || 0)} Neto
              </span>
            </div>
            <div style={{ 
              textAlign: 'center', 
              padding: '50px', 
              color: '#9fa6ad' 
            }}>
              [Gráfico de flujo de efectivo]
            </div>
          </div>

          {/* Top 5 Categories */}
          <div className="report-section" style={{
            backgroundColor: 'var(--color-dark-bg)',
            padding: 'var(--spacing-md)',
            borderRadius: '8px',
            minHeight: '450px'
          }}>
            <div className="report-header" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--spacing-md)',
              borderBottom: '1px solid #2c3444',
              paddingBottom: '10px'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Top 5 categorías de gasto</h3>
              <button className="btn btn-text" style={{ 
                color: 'var(--color-primary)', 
                fontSize: '0.85rem' 
              }}>
                Ver todo
              </button>
            </div>

            <div className="summary-list" style={{ marginTop: '20px' }}>
              {categories.slice(0, 5).map((cat, index) => (
                <div key={index} className="summary-item" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px dashed #2c3444',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ color: 'var(--color-text-light)' }}>
                    {index + 1}. {cat.name}
                  </span>
                  <span style={{ 
                    fontWeight: 500, 
                    color: 'var(--color-danger)' 
                  }}>
                    -{formatCurrency(cat.total)}
                  </span>
                </div>
              ))}

              {categories.length === 0 && (
                <p style={{ textAlign: 'center', color: '#9fa6ad', padding: '20px' }}>
                  No hay gastos registrados
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="report-section" style={{
          backgroundColor: 'var(--color-dark-bg)',
          padding: 'var(--spacing-md)',
          borderRadius: '8px',
          minHeight: '400px'
        }}>
          <div className="report-header" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--spacing-md)',
            borderBottom: '1px solid #2c3444',
            paddingBottom: '10px'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>
              Tendencia mensual: ingresos vs gastos
            </h3>
            <span style={{ fontSize: '0.9rem', color: '#9fa6ad' }}>
              Oct 2024 - Oct 2025
            </span>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '50px', 
            color: '#9fa6ad' 
          }}>
            [Gráfico de tendencia mensual]
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default ReportsPage;
// Archivo: src/components/Dashboard/CategoryChart.jsx
import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const CategoryChart = ({ categories }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !categories || categories.length === 0) return;

    // Destruir gráfico anterior si existe
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: categories.map(c => c.name),
        datasets: [{
          data: categories.map(c => c.total),
          backgroundColor: COLORS,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: 'white',
              padding: 10,
              font: {
                size: 11
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [categories]);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Gastos por categoría</h3>
      <div style={{ position: 'relative', height: '300px' }}>
        {categories && categories.length > 0 ? (
          <canvas ref={chartRef}></canvas>
        ) : (
          <p style={{ color: '#9fa6ad', textAlign: 'center', paddingTop: '50px' }}>
            No hay gastos registrados este mes
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryChart;
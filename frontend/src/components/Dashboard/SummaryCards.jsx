// Archivo: src/components/Dashboard/SummaryCards.jsx
import { formatCurrency } from '../../utils/formatters';

const SummaryCards = ({ summary }) => {
  if (!summary) {
    return (
      <div className="summary-cards-grid">
        <div className="summary-card">Cargando...</div>
      </div>
    );
  }

  const { total_balance, monthly_income, monthly_expenses, balance_change } = summary;

  return (
    <div className="summary-cards-grid">
      <div className="summary-card">
        <span className="card-title">Saldo total</span>
        <span className="card-value balance">
          {formatCurrency(total_balance)}
        </span>
        <span className={`card-trend ${balance_change >= 0 ? 'positive' : 'negative'}`}>
          {balance_change >= 0 ? '+' : ''}{(balance_change * 100).toFixed(1)}% respecto al mes anterior
        </span>
      </div>

      <div className="summary-card">
        <span className="card-title">Ingresos mensuales</span>
        <span className="card-value income">
          {formatCurrency(monthly_income)}
        </span>
        <span className="card-trend positive">+0.1% respecto al mes anterior</span>
      </div>

      <div className="summary-card">
        <span className="card-title">Gastos mensuales</span>
        <span className="card-value expense">
          {formatCurrency(monthly_expenses)}
        </span>
        <span className="card-trend negative">-1.7% vs respecto al mes anterior</span>
      </div>
    </div>
  );
};

export default SummaryCards;
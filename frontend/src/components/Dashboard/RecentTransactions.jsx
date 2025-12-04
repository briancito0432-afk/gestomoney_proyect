// Archivo: src/components/Dashboard/RecentTransactions.jsx
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';

const RecentTransactions = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="transactions-recent-container">
        <h3 className="chart-title">Transacciones recientes</h3>
        <p style={{ color: '#9fa6ad', textAlign: 'center', paddingTop: '50px' }}>
          No hay transacciones recientes
        </p>
      </div>
    );
  }

  // Mostrar solo las últimas 5 transacciones
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="transactions-recent-container">
      <h3 className="chart-title">Transacciones recientes</h3>
      <div className="transactions-recent-list">
        {recentTransactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-details">
              <span className="name">
                {transaction.description || 'Sin descripción'}
              </span>
              <span className="date">
                {transaction.date} | {transaction.category_name}
              </span>
            </div>
            <span className={`transaction-amount ${transaction.type === 'INCOME' ? 'income' : 'expense'}`}>
              {transaction.type === 'INCOME' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </span>
          </div>
        ))}

        <Link to="/transactions" className="view-all-link">
          Ver todas las transacciones &rarr;
        </Link>
      </div>
    </div>
  );
};

export default RecentTransactions;
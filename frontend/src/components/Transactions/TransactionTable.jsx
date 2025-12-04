// Archivo: src/components/Transactions/TransactionTable.jsx
import { formatCurrency } from '../../utils/formatters';

const TransactionTable = ({ transactions, onEdit, onDelete }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#9fa6ad' }}>
        <p>No hay transacciones registradas.</p>
      </div>
    );
  }

  return (
    <div className="chart-container" style={{ minHeight: 'auto', padding: 0 }}>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Tipo</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description || 'Sin descripción'}</td>
              <td>{transaction.category_name}</td>
              <td>
                <span className={transaction.type === 'INCOME' ? 'type-income' : 'type-expense'}>
                  {transaction.type === 'INCOME' ? 'Ingreso' : 'Gasto'}
                </span>
              </td>
              <td className={transaction.type === 'INCOME' ? 'type-income' : 'type-expense'}>
                {formatCurrency(transaction.amount)}
              </td>
              <td>
                <span
                  className="action-icon"
                  onClick={() => onEdit(transaction)}
                  title="Editar"
                >
                  📝
                </span>
                <span
                  className="action-icon"
                  onClick={() => onDelete(transaction.id)}
                  title="Eliminar"
                >
                  🗑️
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
// Archivo: src/components/Transactions/TransactionModal.jsx
import { useState, useEffect } from 'react';
import { categoryService, transactionService } from '../../services/api';
import { getTodayDate } from '../../utils/formatters';
import { showSuccess, showError } from '../../utils/notifications';

const TransactionModal = ({ isOpen, onClose, onSuccess, transaction = null }) => {
  const [formData, setFormData] = useState({
    type: 'EXPENSE',
    amount: '',
    category_id: '',
    date: getTodayDate(),
    description: '',
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCategories();
      
      // Si es edición, cargar datos de la transacción
      if (transaction) {
        setFormData({
          type: transaction.type,
          amount: transaction.amount,
          category_id: transaction.category_id,
          date: transaction.date,
          description: transaction.description || '',
        });
      } else {
        // Si es nueva, resetear formulario
        setFormData({
          type: 'EXPENSE',
          amount: '',
          category_id: '',
          date: getTodayDate(),
          description: '',
        });
      }
    }
  }, [isOpen, transaction]);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
      showError('Error al cargar las categorías');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (transaction) {
        // Actualizar transacción existente
        await transactionService.update(transaction.id, formData);
        showSuccess('Transacción actualizada con éxito');
      } else {
        // Crear nueva transacción
        await transactionService.create(formData);
        showSuccess('Transacción creada con éxito');
      }

      setLoading(false);
      onSuccess();
      onClose();
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.message || 'Error al guardar la transacción';
      showError(errorMessage);
    }
  };

  const incomeCategories = categories.filter(c => c.type === 'INCOME');
  const expenseCategories = categories.filter(c => c.type === 'EXPENSE');

  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>{transaction ? 'Editar Transacción' : 'Registrar Nuevo Movimiento'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="type">Tipo de Movimiento</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="EXPENSE">Gasto</option>
              <option value="INCOME">Ingreso</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Monto ($)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              min="0.01"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category_id">Categoría</label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona Categoría</option>
              
              {formData.type === 'INCOME' && incomeCategories.length > 0 && (
                <optgroup label="Ingresos">
                  {incomeCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </optgroup>
              )}

              {formData.type === 'EXPENSE' && expenseCategories.length > 0 && (
                <optgroup label="Gastos">
                  {expenseCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Fecha</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción (Opcional)</label>
            <input
              type="text"
              id="description"
              name="description"
              maxLength="255"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {loading ? 'Guardando...' : (transaction ? 'Actualizar Transacción' : 'Guardar Transacción')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
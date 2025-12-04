// Archivo: src/pages/TransactionsPage.jsx
import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Header from '../components/Layout/Header';
import TransactionTable from '../components/Transactions/TransactionTable';
import TransactionModal from '../components/Transactions/TransactionModal';
import TransactionFilters from '../components/Transactions/TransactionFilters';
import Pagination from '../components/Common/Pagination';
import SkeletonTable from '../components/Common/SkeletonTable';
import { transactionService, categoryService } from '../services/api';
import { showConfirm, showSuccess, showError } from '../utils/notifications';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [paginatedTransactions, setPaginatedTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  
  // Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    loadInitialData();
  }, []);

  // Actualizar transacciones paginadas cuando cambien los filtros o la página
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedTransactions(filteredTransactions.slice(startIndex, endIndex));
  }, [filteredTransactions, currentPage, itemsPerPage]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      const [transData, catData] = await Promise.all([
        transactionService.getAll(),
        categoryService.getAll()
      ]);
      
      setTransactions(transData.transactions || []);
      setFilteredTransactions(transData.transactions || []);
      setCategories(catData || []);
      
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      showError('Error al cargar los datos');
      setLoading(false);
    }
  };

  const handleFilterChange = useCallback((filters) => {
    let filtered = [...transactions];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(t => 
        (t.description && t.description.toLowerCase().includes(searchLower)) ||
        t.amount.toString().includes(searchLower)
      );
    }

    if (filters.type) {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    if (filters.category_id) {
      filtered = filtered.filter(t => t.category_id === parseInt(filters.category_id));
    }

    setFilteredTransactions(filtered);
    setCurrentPage(1); // Resetear a la primera página cuando se filtran
  }, [transactions]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Resetear a la primera página
  };

  const handleQuickAdd = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    showConfirm(
      '¿Estás seguro de que quieres eliminar esta transacción?',
      async () => {
        try {
          await transactionService.delete(id);
          showSuccess('Transacción eliminada con éxito');
          loadInitialData();
        } catch (err) {
          console.error('Error al eliminar transacción:', err);
          showError('Error al eliminar la transacción');
        }
      }
    );
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleModalSuccess = () => {
    loadInitialData();
  };

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  if (loading) {
    return (
    <DashboardLayout>
      <Header title="Historial de transacciones" />

        <section className="dashboard-content">
          {/* Skeleton de filtros */}
          <div className="skeleton-filter-bar">
            <div className="skeleton skeleton-filter-input"></div>
            <div className="skeleton skeleton-filter-select"></div>
            <div className="skeleton skeleton-filter-select"></div>
          </div>

          {/* Skeleton de tabla */}
          <SkeletonTable rows={10} />
        </section>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Header 
        title="Historial de transacciones"
        onQuickAdd={handleQuickAdd}
      />

      <section className="dashboard-content">
        {/* Barra de filtros */}
        <TransactionFilters 
          categories={categories}
          onFilterChange={handleFilterChange}
          resultsCount={filteredTransactions.length}
        />

        {/* Tabla de transacciones (solo las de la página actual) */}
        <TransactionTable 
          transactions={paginatedTransactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Paginación */}
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredTransactions.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </section>

      {/* Modal de transacción */}
      <TransactionModal 
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        transaction={selectedTransaction}
      />
    </DashboardLayout>
  );
};

export default TransactionsPage;
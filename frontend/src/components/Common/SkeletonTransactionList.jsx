// Archivo: src/components/Common/SkeletonTransactionList.jsx
const SkeletonTransactionList = ({ items = 5 }) => {
  return (
    <div className="skeleton-chart">
      <div className="skeleton skeleton-chart-title"></div>
      
      <div style={{ marginTop: '20px' }}>
        {[...Array(items)].map((_, index) => (
          <div key={index} className="skeleton-transaction-item">
            <div className="skeleton-transaction-details">
              <div className="skeleton skeleton-transaction-name"></div>
              <div className="skeleton skeleton-transaction-date"></div>
            </div>
            <div className="skeleton skeleton-transaction-amount"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTransactionList;
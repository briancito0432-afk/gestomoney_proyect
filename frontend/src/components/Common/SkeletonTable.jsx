// Archivo: src/components/Common/SkeletonTable.jsx
const SkeletonTable = ({ rows = 10 }) => {
  return (
    <div className="skeleton-table">
      {/* Header */}
      <div className="skeleton-table-header">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton skeleton-table-cell"></div>
        ))}
      </div>

      {/* Rows */}
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="skeleton-table-row">
          {[...Array(6)].map((_, cellIndex) => (
            <div key={cellIndex} className="skeleton skeleton-table-cell"></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
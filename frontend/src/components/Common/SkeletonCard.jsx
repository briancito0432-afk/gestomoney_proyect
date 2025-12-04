// Archivo: src/components/Common/SkeletonCard.jsx
const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-card-title"></div>
      <div className="skeleton skeleton-card-value"></div>
      <div className="skeleton skeleton-card-trend"></div>
    </div>
  );
};

export default SkeletonCard;
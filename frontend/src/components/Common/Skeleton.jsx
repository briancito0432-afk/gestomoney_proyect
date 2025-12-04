// Archivo: src/components/Common/Skeleton.jsx
const Skeleton = ({ width = '100%', height = '20px', borderRadius = '4px', marginBottom = '10px' }) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#2c3444',
        borderRadius,
        marginBottom,
        animation: 'pulse 1.5s ease-in-out infinite',
      }}
    />
  );
};

export default Skeleton;
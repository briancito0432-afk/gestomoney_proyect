// Archivo: src/components/Layout/DashboardLayout.jsx
import Sidebar from './Sidebar';
import '../../assets/styles/dashboard.css';

const DashboardLayout = ({ children }) => {
  return (
    <div className="app-layout dark-mode">
      <Sidebar />
      <main className="content-area">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
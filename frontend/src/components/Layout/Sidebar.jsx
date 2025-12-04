// Archivo: src/components/Layout/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-header">
          <span className="logo">GESTOMONEY</span>
        </div>

        {/* USUARIO - SOLO INFORMATIVO (ARRIBA) */}
        <div style={{ 
          padding: '12px 15px', 
          marginBottom: '10px',
          borderBottom: '1px solid #2c3444'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="avatar-sm">
              {getInitials(user?.name)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ 
                margin: 0, 
                fontSize: '0.9rem', 
                fontWeight: 500,
                color: 'var(--color-text-light)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {user?.name || 'Usuario'}
              </p>
              <p style={{ 
                margin: '2px 0 0 0', 
                fontSize: '0.75rem', 
                color: '#9fa6ad',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                user@gestomoney.com
              </p>
            </div>
          </div>
        </div>

        {/* NAVEGACIÓN PRINCIPAL */}
        <nav className="sidebar-nav">
          <Link 
            to="/dashboard" 
            className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <span className="icon">🏠</span>
            Panel
          </Link>

          <Link 
            to="/transactions" 
            className={`nav-item ${isActive('/transactions') ? 'active' : ''}`}
          >
            <span className="icon">💸</span>
            Transacciones
          </Link>

          <div className="nav-item nav-disabled">
            <span className="icon">💰</span>
            Presupuestos
            <span className="badge">Próximamente</span>
          </div>

          <Link 
            to="/reports" 
            className={`nav-item ${isActive('/reports') ? 'active' : ''}`}
          >
            <span className="icon">📈</span>
            Reportes
          </Link>
        </nav>
      </div>

      {/* SETTINGS Y LOGOUT (JUNTOS AL FINAL) */}
      <div style={{ borderTop: '1px solid #2c3444', paddingTop: '5px' }}>
        <Link 
          to="/settings" 
          className={`nav-item ${isActive('/settings') ? 'active' : ''}`}
        >
          <span className="icon">⚙️</span>
          Configuración
        </Link>

        <div className="nav-item" onClick={logout}>
          <span className="icon">🚪</span>
          Cerrar sesión
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
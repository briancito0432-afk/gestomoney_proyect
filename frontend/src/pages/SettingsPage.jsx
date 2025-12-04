// Archivo: src/pages/SettingsPage.jsx
import { useState } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Header from '../components/Layout/Header';
import { useAuth } from '../context/AuthContext';
import { showSuccess, showError, showConfirm } from '../utils/notifications';

const SettingsPage = () => {
  const { user } = useAuth();

  const [profileData, setProfileData] = useState({
    fullName: user?.name || 'Usuario',
    email: 'user@gestomoney.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [preferences, setPreferences] = useState({
    language: 'es',
    currency: 'USD',
    dateFormat: 'DD/MM/YYYY',
    timezone: 'America/Mexico_City',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    budgetAlerts: true,
    weeklyReport: true,
  });

  const [appearance, setAppearance] = useState({
    theme: 'dark',
    fontSize: 'medium',
    density: 'comfortable',
  });

  const [expandedSections, setExpandedSections] = useState({
    profile: false,
    preferences: false,
    notifications: false,
    appearance: false,
    security: false,
    data: false,
    danger: false,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  const handleNotificationToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleAppearanceChange = (e) => {
    const { name, value } = e.target;
    setAppearance({ ...appearance, [name]: value });
  };

  const handleSaveProfile = () => {
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      showError('Las contraseñas no coinciden');
      return;
    }
    if (profileData.newPassword && profileData.newPassword.length < 8) {
      showError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    showSuccess('Perfil actualizado correctamente');
  };

  const handleSavePreferences = () => {
    showSuccess('Preferencias guardadas correctamente');
  };

  const handleSaveNotifications = () => {
    showSuccess('Configuración de notificaciones guardada');
  };

  const handleSaveAppearance = () => {
    showSuccess('Configuración de apariencia guardada');
  };

  const handleExportData = (format) => {
    showSuccess(`Exportando datos en formato ${format}...`);
  };

  const handleDeleteAccount = () => {
    showConfirm(
      '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.',
      () => {
        showSuccess('Cuenta eliminada correctamente');
      }
    );
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  return (
    <DashboardLayout>
  <Header title="Configuración" subtitle="Administra los ajustes y preferencias de tu cuenta" />
      <section className="dashboard-content">
        <div className="settings-container">
          
          <div className="settings-section">
            <div className="settings-section-header" onClick={() => toggleSection('profile')}>
              <div className="settings-section-header-left">
                <span className="settings-section-icon">👤</span>
                <div className="settings-section-info">
                  <h2 className="settings-section-title">Información de perfil</h2>
                  <p className="settings-section-description">Actualiza la información de tu cuenta y tu correo electrónico</p>
                </div>
              </div>
              <span className={`settings-section-toggle ${expandedSections.profile ? '' : 'collapsed'}`}>▼</span>
            </div>
            <div className={`settings-section-content ${expandedSections.profile ? 'expanded' : ''}`}>
              <div className="settings-avatar-container">
                <div className="settings-avatar">{getInitials(profileData.fullName)}</div>
                <div className="settings-avatar-info">
                  <h3>{profileData.fullName}</h3>
                  <p>{profileData.email}</p>
                </div>
                  <div className="settings-avatar-actions">
                  <button className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>Cambiar foto</button>
                  <button className="btn btn-text" style={{ fontSize: '0.9rem' }}>Eliminar</button>
                </div>
              </div>
              <form className="settings-form">
                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label htmlFor="fullName">Nombre completo</label>
                    <input type="text" id="fullName" name="fullName" value={profileData.fullName} onChange={handleProfileChange} />
                  </div>
                  <div className="settings-form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input type="email" id="email" name="email" value={profileData.email} onChange={handleProfileChange} />
                  </div>
                </div>
                <div className="settings-form-group">
                  <label htmlFor="currentPassword">Contraseña actual</label>
                  <input type="password" id="currentPassword" name="currentPassword" placeholder="Introduce la contraseña actual para cambiarla" value={profileData.currentPassword} onChange={handleProfileChange} />
                </div>
                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label htmlFor="newPassword">Nueva contraseña</label>
                    <input type="password" id="newPassword" name="newPassword" placeholder="Introduce nueva contraseña" value={profileData.newPassword} onChange={handleProfileChange} />
                    <small>Mínimo 8 caracteres con mayúsculas, minúsculas y números</small>
                  </div>
                  <div className="settings-form-group">
                    <label htmlFor="confirmPassword">Confirmar nueva contraseña</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirma nueva contraseña" value={profileData.confirmPassword} onChange={handleProfileChange} />
                  </div>
                </div>
                <div className="settings-actions">
                  <button type="button" className="btn btn-text">Cancelar</button>
                  <button type="button" className="btn btn-primary" onClick={handleSaveProfile}>Guardar cambios</button>
                </div>
              </form>
            </div>
          </div>

          <div className="settings-section">
            <div className="settings-section-header" onClick={() => toggleSection('preferences')}>
              <div className="settings-section-header-left">
                <span className="settings-section-icon">⚙️</span>
                <div className="settings-section-info">
                  <h2 className="settings-section-title">Preferencias de la aplicación</h2>
                  <p className="settings-section-description">Personaliza cómo ves e interactúas con la aplicación</p>
                </div>
              </div>
              <span className={`settings-section-toggle ${expandedSections.preferences ? '' : 'collapsed'}`}>▼</span>
            </div>
            <div className={`settings-section-content ${expandedSections.preferences ? 'expanded' : ''}`}>
              <form className="settings-form">
                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label htmlFor="language">Idioma</label>
                    <select id="language" name="language" value={preferences.language} onChange={handlePreferenceChange}>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                  <div className="settings-form-group">
                    <label htmlFor="currency">Moneda predeterminada</label>
                    <select id="currency" name="currency" value={preferences.currency} onChange={handlePreferenceChange}>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="MXN">MXN - Mexican Peso</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                    </select>
                  </div>
                </div>
                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label htmlFor="dateFormat">Formato de fecha</label>
                    <select id="dateFormat" name="dateFormat" value={preferences.dateFormat} onChange={handlePreferenceChange}>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="settings-form-group">
                    <label htmlFor="timezone">Zona horaria</label>
                    <select id="timezone" name="timezone" value={preferences.timezone} onChange={handlePreferenceChange}>
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="America/Mexico_City">Mexico City (CDMX)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Europe/Paris">Paris (CET)</option>
                    </select>
                  </div>
                </div>
                <div className="settings-actions">
                  <button type="button" className="btn btn-text">Restablecer valores predeterminados</button>
                  <button type="button" className="btn btn-primary" onClick={handleSavePreferences}>Guardar preferencias</button>
                </div>
              </form>
            </div>
          </div>

          <div className="settings-section">
            <div className="settings-section-header" onClick={() => toggleSection('notifications')}>
              <div className="settings-section-header-left">
                <span className="settings-section-icon">🔔</span>
                <div className="settings-section-info">
                  <h2 className="settings-section-title">Notificaciones</h2>
                  <p className="settings-section-description">Gestiona cómo recibes notificaciones y alertas</p>
                </div>
              </div>
              <span className={`settings-section-toggle ${expandedSections.notifications ? '' : 'collapsed'}`}>▼</span>
            </div>
            <div className={`settings-section-content ${expandedSections.notifications ? 'expanded' : ''}`}>
              <div className="settings-form">
                <div className="settings-toggle-group">
                  <div className="settings-toggle-info">
                    <span className="settings-toggle-label">Notificaciones por correo</span>
                    <span className="settings-toggle-description">Recibe actualizaciones por correo sobre la actividad de tu cuenta</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={notifications.emailNotifications} onChange={() => handleNotificationToggle('emailNotifications')} />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="settings-toggle-group">
                  <div className="settings-toggle-info">
                    <span className="settings-toggle-label">Notificaciones push</span>
                    <span className="settings-toggle-description">Recibe notificaciones push en tu dispositivo</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={notifications.pushNotifications} onChange={() => handleNotificationToggle('pushNotifications')} />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="settings-toggle-group">
                  <div className="settings-toggle-info">
                    <span className="settings-toggle-label">Alertas de presupuesto</span>
                    <span className="settings-toggle-description">Recibe notificaciones al acercarte a los límites del presupuesto</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={notifications.budgetAlerts} onChange={() => handleNotificationToggle('budgetAlerts')} />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="settings-toggle-group">
                  <div className="settings-toggle-info">
                    <span className="settings-toggle-label">Resumen semanal</span>
                    <span className="settings-toggle-description">Recibe un resumen semanal de tu actividad financiera</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={notifications.weeklyReport} onChange={() => handleNotificationToggle('weeklyReport')} />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="settings-actions">
                  <button type="button" className="btn btn-primary" onClick={handleSaveNotifications}>Guardar configuración de notificaciones</button>
                </div>
              </div>
            </div>
            
          </div>
	            <div className="settings-section">
            <div className="settings-section-header" onClick={() => toggleSection('appearance')}>
              <div className="settings-section-header-left">
                <span className="settings-section-icon">🎨</span>
                <div className="settings-section-info">
                  <h2 className="settings-section-title">Apariencia</h2>
                  <p className="settings-section-description">Personaliza el aspecto y la apariencia de la aplicación</p>
                </div>
              </div>
              <span className={`settings-section-toggle ${expandedSections.appearance ? '' : 'collapsed'}`}>▼</span>
            </div>
            <div className={`settings-section-content ${expandedSections.appearance ? 'expanded' : ''}`}>
              <form className="settings-form">
                <div className="settings-form-group">
                  <label htmlFor="theme">Tema</label>
                  <select id="theme" name="theme" value={appearance.theme} onChange={handleAppearanceChange}>
                    <option value="dark">Modo oscuro</option>
                    <option value="light">Modo claro</option>
                    <option value="auto">Automático (sistema)</option>
                  </select>
                  <small>Elige tu esquema de color preferido</small>
                </div>
                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label htmlFor="fontSize">Tamaño de fuente</label>
                    <select id="fontSize" name="fontSize" value={appearance.fontSize} onChange={handleAppearanceChange}>
                      <option value="small">Pequeño</option>
                      <option value="medium">Mediano</option>
                      <option value="large">Grande</option>
                    </select>
                  </div>
                  <div className="settings-form-group">
                    <label htmlFor="density">Densidad de información</label>
                    <select id="density" name="density" value={appearance.density} onChange={handleAppearanceChange}>
                      <option value="compact">Compacto</option>
                      <option value="comfortable">Cómodo</option>
                      <option value="spacious">Espacioso</option>
                    </select>
                  </div>
                </div>
                <div className="settings-actions">
                  <button type="button" className="btn btn-text">Restablecer valores predeterminados</button>
                  <button type="button" className="btn btn-primary" onClick={handleSaveAppearance}>Guardar apariencia</button>
                </div>
              </form>
            </div>
          </div>
          
{/* 
          <div className="settings-section">
            <div className="settings-section-header" onClick={() => toggleSection('security')}>
              <div className="settings-section-header-left">
                <span className="settings-section-icon">🔒</span>
                <div className="settings-section-info">
                  <h2 className="settings-section-title">Privacidad y seguridad</h2>
                  <p className="settings-section-description">Gestiona la seguridad y privacidad de tu cuenta</p>
                </div>
              </div>
              <span className={`settings-section-toggle ${expandedSections.security ? '' : 'collapsed'}`}>▼</span>
            </div>
            <div className={`settings-section-content ${expandedSections.security ? 'expanded' : ''}`}>
              <div className="settings-form">
                <div className="settings-toggle-group">
                  <div className="settings-toggle-info">
                    <span className="settings-toggle-label">Autenticación de dos factores (2FA)</span>
                    <span className="settings-toggle-description">Añade una capa extra de seguridad a tu cuenta</span>
                  </div>
                  <button className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>Activar 2FA</button>
                </div>
                <div className="settings-form-group" style={{ marginTop: 'var(--spacing-md)' }}>
                  <label>Sesiones activas</label>
                  <div style={{ backgroundColor: '#2c3444', padding: '12px', borderRadius: '6px', marginTop: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div>
                        <p style={{ fontWeight: 500, marginBottom: '4px' }}>💻 Windows - Chrome</p>
                        <p style={{ fontSize: '0.85rem', color: '#9fa6ad' }}>Sesión actual • Última actividad: justo ahora</p>
                      </div>
                      <span style={{ color: 'var(--color-success)', fontSize: '0.85rem', fontWeight: 500 }}>Activa</span>
                    </div>
                  </div>
                  <small style={{ display: 'block', marginTop: '8px' }}>Puedes revocar el acceso a cualquier sesión en cualquier momento</small>
                </div>
                <div className="settings-form-group" style={{ marginTop: 'var(--spacing-md)' }}>
                  <label>Registro de actividad</label>
                  <button className="btn btn-secondary" style={{ marginTop: '8px' }}>Ver historial de actividad</button>
                  <small style={{ display: 'block', marginTop: '8px' }}>Ver toda la actividad reciente de tu cuenta</small>
                </div>
              </div>
            </div>
          </div> */}

          <div className="settings-section">
            <div className="settings-section-header" onClick={() => toggleSection('data')}>
              <div className="settings-section-header-left">
                <span className="settings-section-icon">📦</span>
                <div className="settings-section-info">
                  <h2 className="settings-section-title">Datos y exportación</h2>
                  <p className="settings-section-description">Descarga tus datos o gestiona tu cuenta</p>
                </div>
              </div>
              <span className={`settings-section-toggle ${expandedSections.data ? '' : 'collapsed'}`}>▼</span>
            </div>
            <div className={`settings-section-content ${expandedSections.data ? 'expanded' : ''}`}>
              <div className="settings-form">
                <div className="settings-form-group">
                  <label>Export Your Data</label>
                  <p style={{ fontSize: '0.9rem', color: '#9fa6ad', marginBottom: '12px' }}>
                    Descarga una copia de tus transacciones, categorías e información de la cuenta
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button className="btn btn-secondary" onClick={() => handleExportData('CSV')}>📄 Exportar como CSV</button>
                    <button className="btn btn-secondary" onClick={() => handleExportData('JSON')}>📋 Exportar como JSON</button>
                    <button className="btn btn-secondary" onClick={() => handleExportData('PDF')}>📑 Exportar como PDF</button>
                  </div>
                </div>
                <div className="settings-form-group" style={{ marginTop: 'var(--spacing-lg)' }}>
                  <label>Download Complete Report</label>
                  <p style={{ fontSize: '0.9rem', color: '#9fa6ad', marginBottom: '12px' }}>
                    Genera un informe completo de todos tus datos financieros
                  </p>
                  <button className="btn btn-primary">📊 Generar informe completo</button>
                </div>
              </div>
            </div>
          </div>
          <div className="settings-section">
            <div className="settings-section-header" onClick={() => toggleSection('danger')}>
              <div className="settings-section-header-left">
                <span className="settings-section-icon">⚠️</span>
                <div className="settings-section-info">
                  <h2 className="settings-section-title">Zona de peligro</h2>
                  <p className="settings-section-description">Acciones irreversibles y destructivas</p>
                </div>
              </div>
              <span className={`settings-section-toggle ${expandedSections.danger ? '' : 'collapsed'}`}>▼</span>
            </div>
            <div className={`settings-section-content ${expandedSections.danger ? 'expanded' : ''}`}>
              <div className="settings-danger-zone">
                <h4>Eliminar cuenta</h4>
                <p>
                  Una vez que elimines tu cuenta, no hay vuelta atrás. Todos tus datos serán 
                  eliminados permanentemente. Por favor, asegúrate antes de continuar.
                </p>
                <button className="btn-danger" onClick={handleDeleteAccount}>🗑️ Eliminar mi cuenta</button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </DashboardLayout>
  );
};

export default SettingsPage;
// Archivo: src/pages/RegisterPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showSuccess, showError } from '../utils/notifications';
import PasswordInput from '../components/Common/PasswordInput';
import '../assets/styles/auth.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    text: '',
    class: 'weak',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Calcular fuerza de contraseña
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^a-zA-Z0-9\s]/)) score++;

    let strength = { score: 0, text: '', class: 'weak' };

    if (score >= 4) {
      strength = { score: 4, text: 'Fuerte', class: 'strong' };
    } else if (score >= 2) {
      strength = { score: score, text: 'Media', class: 'medium' };
    } else if (password.length > 0) {
      strength = { score: 1, text: 'Débil', class: 'weak' };
    }

    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      showError('Las contraseñas no coinciden');
      return;
    }

    if (!formData.terms) {
      showError('Debes aceptar los términos y condiciones');
      return;
    }

    if (passwordStrength.score < 2) {
      showError('La contraseña es muy débil. Usa al menos 8 caracteres con mayúsculas, minúsculas y números.');
      return;
    }

    setLoading(true);

    const result = await register({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (result.success) {
      showSuccess('¡Registro exitoso! Redirigiendo al login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      showError(result.message);
    }
  };

  return (
    <div className="auth-body">
      {/* contenedor principal */}
      <div className="auth-container">
        {/* Panel Izquierdo */}
        <div className="auth-info-panel register-info">
          {/* imagen izq */}
        </div>

        {/* Panel Derecho - Formulario */}
        <div className="auth-form-panel">
          <h2 className="auth-title">Bienvenido a Gestomoney</h2>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="fullName">Nombre completo</label>
              <input type="text" id="fullName" name="fullName" placeholder="Introduce tu nombre completo" value={formData.fullName} onChange={handleChange} required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input type="email" id="email"  name="email" placeholder="Introduce tu correo electrónico" value={formData.email} onChange={handleChange} required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <PasswordInput
                id="password"
                name="password"
                placeholder="Crea una contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />

              {/* fuerza de contraseña */}
              {formData.password && (
                <div className="password-strength-indicator">
                  <div className={`strength-bar ${passwordStrength.class}`}></div>
                  <span className={`strength-text ${passwordStrength.class}`}>
                    {passwordStrength.text}
                  </span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirma tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group form-terms">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                />
                Acepto los{' '}
                <a href="#" style={{ color: 'var(--color-primary)' }}>
                  Términos del servicio
                </a>{' '}
                y la{' '}
                <a href="#" style={{ color: 'var(--color-primary)' }}>
                  Política de privacidad
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-login-primary"
              disabled={loading}
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>

            <div className="form-footer">
              ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
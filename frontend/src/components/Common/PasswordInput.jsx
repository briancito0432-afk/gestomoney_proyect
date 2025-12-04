import { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const PasswordInput = ({ 
  id, 
  name, 
  placeholder, 
  value, 
  onChange, 
  required = false 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-input-group">
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      <button
        type="button"
        className="password-toggle password-toggle-btn"
        onClick={() => setShowPassword(!showPassword)}
        aria-pressed={showPassword}
        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
      >
        {showPassword ? (
          <MdVisibilityOff size={20} aria-hidden="true" />
        ) : (
          <MdVisibility size={20} aria-hidden="true" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;

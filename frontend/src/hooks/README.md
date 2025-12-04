# Hooks Personalizados

Esta carpeta contiene hooks personalizados reutilizables para la aplicación Gestomoney.

## useRememberMe

Hook para manejar la funcionalidad "Recuérdame" en formularios de login.

### Uso

```jsx
import { useRememberMe } from '../hooks/useRememberMe';

const LoginPage = () => {
  const { formData, setFormData, handleRememberMe, clearRemembered } = useRememberMe();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleRememberMe(); // Guarda o limpia según necesidad

    // Tu lógica de login
  };

  return (
    // Tu formulario
  );
};
```

### Props

- `initialEmail` (string): Email inicial (por defecto: '')
- `initialPassword` (string): Contraseña inicial (por defecto: '')

### Returns

- `formData`: Objeto con { email, password, rememberMe }
- `setFormData`: Función para actualizar formData
- `handleRememberMe`: Función para guardar/limpiar credenciales
- `clearRemembered`: Función para limpiar manualmente el localStorage

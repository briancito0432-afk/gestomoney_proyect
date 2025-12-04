// Archivo: src/utils/notifications.js
import toast from 'react-hot-toast';

/**
 * Muestra una notificación de éxito
 */
export const showSuccess = (message) => {
  toast.success(message);
};

/**
 * Muestra una notificación de error
 */
export const showError = (message) => {
  toast.error(message);
};

/**
 * Muestra una notificación de información
 */
export const showInfo = (message) => {
  toast(message, {
    icon: 'ℹ️',
  });
};

/**
 * Muestra una notificación de advertencia
 */
export const showWarning = (message) => {
  toast(message, {
    icon: '⚠️',
    style: {
      background: '#1c2331',
      color: '#ffc107',
    },
  });
};

/**
 * Muestra una notificación de carga (loading)
 * Retorna el ID del toast para poder cerrarlo después
 */
export const showLoading = (message = 'Cargando...') => {
  return toast.loading(message);
};

/**
 * Cierra una notificación específica por ID
 */
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

/**
 * Muestra una confirmación con promesa
 */
export const showConfirm = (message, onConfirm, onCancel) => {
  toast((t) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <span>{message}</span>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            if (onCancel) onCancel();
          }}
          style={{
            padding: '6px 12px',
            background: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            if (onConfirm) onConfirm();
          }}
          style={{
            padding: '6px 12px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Confirmar
        </button>
      </div>
    </div>
  ), {
    duration: Infinity,
    style: {
      minWidth: '300px',
    },
  });
};

/**
 * Muestra una promesa con estados de loading, success y error
 */
export const showPromise = (promise, messages) => {
  return toast.promise(promise, {
    loading: messages.loading || 'Cargando...',
    success: messages.success || '¡Éxito!',
    error: messages.error || 'Error',
  });
};